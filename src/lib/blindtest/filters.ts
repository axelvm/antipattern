export const BLINDTEST_FILTER_IDS = ["dry", "envers-ralenti"] as const;

export type BlindtestFilterId = (typeof BLINDTEST_FILTER_IDS)[number];

export type BlindtestBiquadSpec = {
  type: "lowpass" | "highpass" | "peaking";
  frequency: number;
  Q?: number;
  gain?: number;
};

export type BlindtestAudioFilter = {
  reverse: boolean;
  playbackRate: number;
  biquads: readonly BlindtestBiquadSpec[];
};

const DRY_FILTER: BlindtestAudioFilter = {
  reverse: false,
  playbackRate: 1,
  biquads: [],
};

/** Premier titre : à l'envers, 20 % de vitesse, passe-bas 400 Hz. */
export function enversRalenti(): BlindtestAudioFilter {
  return {
    reverse: true,
    playbackRate: 0.8,
    biquads: [{ type: "lowpass", frequency: 400, Q: 0.7 }],
  };
}

export function resolveAudioFilter(
  filterId: BlindtestFilterId,
): BlindtestAudioFilter {
  switch (filterId) {
    case "envers-ralenti":
      return enversRalenti();
    case "dry":
      return DRY_FILTER;
    default: {
      const exhaustive: never = filterId;
      throw new Error(`Filtre audio inconnu: ${exhaustive}`);
    }
  }
}

export function isBlindtestFilterId(value: string): value is BlindtestFilterId {
  return (BLINDTEST_FILTER_IDS as readonly string[]).includes(value);
}
