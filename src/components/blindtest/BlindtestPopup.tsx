"use client";

import { useState, type FormEvent } from "react";
import { answersMatch } from "@/lib/blindtest/answers";
import { getBlindtestTracks } from "@/lib/blindtest/catalog";
import { useBlindtestPlayer } from "@/hooks/useBlindtestPlayer";

const CLIP_SECONDS = 20;

export function BlindtestPopup({
  startIndex,
  onClose,
  onTrackFound,
}: {
  startIndex: number;
  onClose: () => void;
  onTrackFound: (hasMore: boolean) => void;
}) {
  const tracks = getBlindtestTracks();
  const { playTrack, stop, isPlaying, error } = useBlindtestPlayer();
  const [index] = useState(startIndex);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"play" | "wrong">("play");

  const current = tracks[index];

  async function listen() {
    if (!current) return;
    await playTrack(current.id, {
      clipSeconds: CLIP_SECONDS,
      randomStart: true,
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!current) return;

    const artistOk = answersMatch(artist, current.artist);
    const titleOk = answersMatch(title, current.title);
    if (!artistOk || !titleOk) {
      setStatus("wrong");
      return;
    }

    const nextIndex = index + 1;
    const hasMore = nextIndex < tracks.length;
    stop();
    onTrackFound(hasMore);
  }

  if (tracks.length === 0) {
    return (
      <>
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[var(--lamp)]">
          blind test
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold text-fog">
          Aucun titre
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
        >
          Fermer
        </button>
      </>
    );
  }

  if (index >= tracks.length) {
    return (
      <>
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[var(--lamp)]">
          blind test
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold text-fog">
          Tout trouvé
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 bg-[var(--lamp)] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
        >
          Continuer
        </button>
      </>
    );
  }

  return (
    <div className="text-left">
      <p className="text-center font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[var(--lamp)]">
        blind test
      </p>
      <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-fog/50">
        titre {index + 1}/{tracks.length}
      </p>
      <p className="mt-3 text-center text-sm leading-relaxed text-fog/70">
        Guillaume étant ivre mort, l&apos;écoute est un petit peu affectée.
      </p>
      <button
        type="button"
        onClick={() => {
          void listen();
        }}
        className="mt-4 w-full bg-[var(--lamp)] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
      >
        {isPlaying ? "Réécouter" : "Écouter 20 s"}
      </button>
      {error ? (
        <p className="mt-2 text-center text-xs text-[var(--signal-soft)]">
          {error}
        </p>
      ) : null}

      <form className="mt-5 space-y-3" onSubmit={(event) => void submit(event)}>
        <label className="block">
          <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.16em] text-fog/55">
            Artiste
          </span>
          <input
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
            autoComplete="off"
            className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 text-sm text-fog outline-none"
          />
        </label>
        <label className="block">
          <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.16em] text-fog/55">
            Titre
          </span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoComplete="off"
            className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 text-sm text-fog outline-none"
          />
        </label>
        {status === "wrong" ? (
          <p className="text-center text-sm text-[var(--signal-soft)]">
            Ce n&apos;est pas ça.
          </p>
        ) : null}
        <button
          type="submit"
          className="w-full bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
        >
          Valider
        </button>
        <button
          type="button"
          onClick={() => {
            stop();
            onClose();
          }}
          className="w-full border border-white/20 px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-fog"
        >
          Fermer
        </button>
      </form>
    </div>
  );
}
