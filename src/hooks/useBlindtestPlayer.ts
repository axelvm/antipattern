"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createBlindtestAudioEngine,
  type BlindtestAudioEngine,
  type BlindtestPlayerState,
  type PlayTrackOptions,
} from "@/lib/blindtest/audio-engine";

const IDLE_STATE: BlindtestPlayerState = {
  currentTrackId: null,
  isPlaying: false,
  error: null,
};

export function useBlindtestPlayer() {
  const engineRef = useRef<BlindtestAudioEngine | null>(null);
  const [state, setState] = useState<BlindtestPlayerState>(IDLE_STATE);

  useEffect(() => {
    const engine = createBlindtestAudioEngine();
    engineRef.current = engine;
    const unsubscribe = engine.subscribe(() => {
      setState(engine.getState());
    });
    return () => {
      unsubscribe();
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  const playTrack = useCallback(
    async (id: string, options?: PlayTrackOptions) => {
      await engineRef.current?.playTrack(id, options);
    },
    [],
  );

  const stop = useCallback(() => {
    engineRef.current?.stop();
  }, []);

  const pause = useCallback(() => {
    engineRef.current?.pause();
  }, []);

  const setVolume = useCallback((value: number) => {
    engineRef.current?.setVolume(value);
  }, []);

  return {
    ...state,
    playTrack,
    stop,
    pause,
    setVolume,
  };
}
