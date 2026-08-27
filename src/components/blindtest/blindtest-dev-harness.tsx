"use client";

import { useSearchParams } from "next/navigation";
import { getBlindtestTracks } from "@/lib/blindtest/catalog";
import { useBlindtestPlayer } from "@/hooks/useBlindtestPlayer";

export function BlindtestDevHarness() {
  const searchParams = useSearchParams();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  if (searchParams.get("blindtest") !== "1") {
    return null;
  }

  return <BlindtestDevHarnessPanel />;
}

function BlindtestDevHarnessPanel() {
  const tracks = getBlindtestTracks();
  const { currentTrackId, isPlaying, error, playTrack, stop } =
    useBlindtestPlayer();

  return (
    <div className="fixed bottom-4 left-4 z-50 w-72 border border-ink/20 bg-[#120c08] px-3 py-3 text-fog shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
      <p className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[var(--lamp)]">
        harness · blindtest
      </p>
      {tracks.length === 0 ? (
        <p className="mt-2 text-xs text-fog/70">Catalogue vide.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {tracks.map((track) => (
            <li
              key={track.id}
              className="flex items-center justify-between gap-2"
            >
              <span className="min-w-0 truncate text-xs text-fog/85">
                {track.title}
                <span className="mt-0.5 block font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.14em] text-fog/45">
                  {track.filter}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  void playTrack(track.id);
                }}
                className="shrink-0 bg-[var(--lamp)] px-2 py-1 font-[family-name:var(--font-display)] text-[0.65rem] font-bold text-black"
              >
                Jouer
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="truncate font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.12em] text-fog/50">
          {isPlaying && currentTrackId
            ? `lecture · ${currentTrackId}`
            : "à l'arrêt"}
        </p>
        <button
          type="button"
          onClick={stop}
          className="bg-white px-2 py-1 font-[family-name:var(--font-display)] text-[0.65rem] font-bold text-black"
        >
          Stop
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-xs text-[var(--signal-soft)]">{error}</p>
      ) : null}
    </div>
  );
}
