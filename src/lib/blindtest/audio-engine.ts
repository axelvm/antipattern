import { getBlindtestTrackById, getFilterForTrack } from "./catalog";
import { resolveAudioFilter, type BlindtestBiquadSpec } from "./filters";
import { canStartBlindtest } from "./launch";

export type BlindtestPlayerState = {
  currentTrackId: string | null;
  isPlaying: boolean;
  error: string | null;
};

const IDLE_STATE: BlindtestPlayerState = {
  currentTrackId: null,
  isPlaying: false,
  error: null,
};

export type PlayTrackOptions = {
  clipSeconds?: number;
  randomStart?: boolean;
};

export type BlindtestAudioEngine = {
  playTrack: (id: string, options?: PlayTrackOptions) => Promise<void>;
  stop: () => void;
  pause: () => void;
  setVolume: (value: number) => void;
  getState: () => BlindtestPlayerState;
  subscribe: (listener: () => void) => () => void;
  dispose: () => void;
};

function clampVolume(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function reverseAudioBuffer(
  context: AudioContext,
  buffer: AudioBuffer,
): AudioBuffer {
  const reversed = context.createBuffer(
    buffer.numberOfChannels,
    buffer.length,
    buffer.sampleRate,
  );
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const input = buffer.getChannelData(channel);
    const output = reversed.getChannelData(channel);
    for (let i = 0, j = input.length - 1; i < input.length; i += 1, j -= 1) {
      output[i] = input[j] ?? 0;
    }
  }
  return reversed;
}

export function createBlindtestAudioEngine(): BlindtestAudioEngine {
  const listeners = new Set<() => void>();
  const decodedBuffers = new Map<string, AudioBuffer>();
  const reversedBuffers = new Map<string, AudioBuffer>();
  let state: BlindtestPlayerState = IDLE_STATE;
  let context: AudioContext | null = null;
  let sourceNode: AudioBufferSourceNode | null = null;
  let gainNode: GainNode | null = null;
  let filterNodes: BiquadFilterNode[] = [];
  let volume = 1;
  let disposed = false;

  function emit() {
    for (const listener of listeners) {
      listener();
    }
  }

  function setState(patch: Partial<BlindtestPlayerState>) {
    state = { ...state, ...patch };
    emit();
  }

  async function ensureContext(): Promise<AudioContext> {
    if (!context) {
      context = new AudioContext();
    }
    if (context.state === "suspended") {
      await context.resume();
    }
    if (!gainNode) {
      gainNode = context.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(context.destination);
    }
    return context;
  }

  function stopSource() {
    if (!sourceNode) return;
    sourceNode.onended = null;
    try {
      sourceNode.stop();
    } catch {
      // already stopped
    }
    sourceNode.disconnect();
    sourceNode = null;
  }

  function disconnectFilters() {
    stopSource();
    for (const node of filterNodes) {
      node.disconnect();
    }
    filterNodes = [];
  }

  function connectBiquads(
    source: AudioBufferSourceNode,
    specs: readonly BlindtestBiquadSpec[],
  ) {
    if (!context || !gainNode) return;
    for (const node of filterNodes) {
      node.disconnect();
    }
    filterNodes = [];
    let previous: AudioNode = source;
    for (const spec of specs) {
      const biquad = context.createBiquadFilter();
      biquad.type = spec.type;
      biquad.frequency.value = spec.frequency;
      if (spec.Q !== undefined) {
        biquad.Q.value = spec.Q;
      }
      if (spec.gain !== undefined) {
        biquad.gain.value = spec.gain;
      }
      previous.connect(biquad);
      previous = biquad;
      filterNodes.push(biquad);
    }
    previous.connect(gainNode);
  }

  async function getDecodedBuffer(src: string): Promise<AudioBuffer> {
    const audioContext = await ensureContext();
    const cached = decodedBuffers.get(src);
    if (cached) return cached;

    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`Impossible de charger ${src}`);
    }
    const data = await response.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(data.slice(0));
    decodedBuffers.set(src, decoded);
    return decoded;
  }

  async function getPlaybackBuffer(
    src: string,
    reverse: boolean,
  ): Promise<AudioBuffer> {
    const decoded = await getDecodedBuffer(src);
    if (!reverse) return decoded;
    const cached = reversedBuffers.get(src);
    if (cached) return cached;
    const audioContext = await ensureContext();
    const reversed = reverseAudioBuffer(audioContext, decoded);
    reversedBuffers.set(src, reversed);
    return reversed;
  }

  async function playTrack(
    id: string,
    options?: PlayTrackOptions,
  ): Promise<void> {
    if (disposed) return;
    if (!canStartBlindtest(undefined)) {
      setState({
        isPlaying: false,
        error: "Le blindtest ne peut pas démarrer.",
      });
      return;
    }

    const track = getBlindtestTrackById(id);
    if (!track) {
      setState({
        currentTrackId: null,
        isPlaying: false,
        error: `Titre introuvable: ${id}`,
      });
      return;
    }

    try {
      const audioContext = await ensureContext();
      if (gainNode) {
        gainNode.gain.value = volume;
      }
      const filter = resolveAudioFilter(getFilterForTrack(track.id));
      const buffer = await getPlaybackBuffer(track.src, filter.reverse);
      stopSource();

      const rate = filter.playbackRate;
      const clipSeconds = options?.clipSeconds;
      const mediaClipLength =
        clipSeconds == null
          ? buffer.duration
          : Math.min(clipSeconds * rate, buffer.duration);
      const maxStart = Math.max(0, buffer.duration - mediaClipLength);
      const offset = options?.randomStart ? Math.random() * maxStart : 0;

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = rate;
      connectBiquads(source, filter.biquads);
      sourceNode = source;
      source.onended = () => {
        if (sourceNode === source) {
          sourceNode = null;
          setState({ isPlaying: false });
        }
      };
      if (clipSeconds == null) {
        source.start(0, offset);
      } else {
        source.start(0, offset, mediaClipLength);
      }
      setState({
        currentTrackId: track.id,
        isPlaying: true,
        error: null,
      });
    } catch (caught) {
      stopSource();
      const message =
        caught instanceof Error ? caught.message : "Lecture audio impossible";
      setState({
        currentTrackId: id,
        isPlaying: false,
        error: message,
      });
    }
  }

  function stop() {
    stopSource();
    setState({ currentTrackId: null, isPlaying: false, error: null });
  }

  function pause() {
    stopSource();
    setState({ isPlaying: false });
  }

  function setVolume(value: number) {
    volume = clampVolume(value);
    if (gainNode) {
      gainNode.gain.value = volume;
    }
  }

  function dispose() {
    disposed = true;
    disconnectFilters();
    gainNode?.disconnect();
    void context?.close();
    context = null;
    sourceNode = null;
    gainNode = null;
    decodedBuffers.clear();
    reversedBuffers.clear();
    listeners.clear();
    state = IDLE_STATE;
  }

  return {
    playTrack,
    stop,
    pause,
    setVolume,
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispose,
  };
}
