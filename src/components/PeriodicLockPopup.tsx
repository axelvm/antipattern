"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";

const INTERVAL_MS = 60_000;
const COUNTDOWN_SECONDS = 5;
const DICKHEAD_IMAGES = ["/dickheads/tom.jpg"] as const;

function pickDickheadImage() {
  return DICKHEAD_IMAGES[Math.floor(Math.random() * DICKHEAD_IMAGES.length)];
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
    </svg>
  );
}

export function PeriodicLockPopup() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [imageSrc, setImageSrc] = useState<(typeof DICKHEAD_IMAGES)[number]>(
    DICKHEAD_IMAGES[0],
  );

  useEffect(() => {
    if (open) return;

    const timeoutId = window.setTimeout(() => {
      setFullscreen(false);
      setSecondsLeft(COUNTDOWN_SECONDS);
      setImageSrc(pickDickheadImage());
      setOpen(true);
    }, INTERVAL_MS);

    return () => window.clearTimeout(timeoutId);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || secondsLeft <= 0) return;

    const timeoutId = window.setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [open, secondsLeft]);

  if (!open) return null;

  const countdownDone = secondsLeft <= 0;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 px-4 py-6"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`flex flex-col overflow-hidden border border-white/10 bg-[#050505] text-[#e8eef1] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${
          fullscreen
            ? "h-full w-full max-h-none max-w-none"
            : "h-[min(36rem,86vh)] w-full max-w-lg"
        }`}
      >
        <div className="flex items-start justify-end px-3 pt-3">
          <button
            type="button"
            onClick={() => setFullscreen((current) => !current)}
            className="flex h-8 w-8 items-center justify-center text-white/55 outline-none hover:text-white"
            aria-label={fullscreen ? "Réduire" : "Plein écran"}
          >
            {fullscreen ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 pb-4">
          <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
          <h2
            id={titleId}
            className="shrink-0 text-center font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            petit coucou de Guillaume au passage&nbsp;!
          </h2>
        </div>

        <div className="relative grid grid-cols-3 items-end px-5 pb-4 pt-3">
          <button
            type="button"
            disabled={!countdownDone}
            onClick={() => setOpen(false)}
            className="cursor-default justify-self-start pb-1 font-[family-name:var(--font-mono)] text-xs text-white/20 outline-none"
          >
            ©lose 2026
          </button>

          <button
            type="button"
            onClick={() => {
              if (!countdownDone) return;
              setSecondsLeft(COUNTDOWN_SECONDS);
            }}
            className="justify-self-center bg-[#c01212] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-white outline-none"
          >
            {countdownDone ? "Réinitialiser" : `Fermer dans (${secondsLeft})`}
          </button>

          <span />
        </div>
      </div>
    </div>
  );
}
