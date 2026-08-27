"use client";

import { CSSProperties, useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";
import {
  areAllQuestsSolved,
  getQuestsSnapshot,
  subscribeQuests,
} from "@/lib/quests";

/** Déposer la photo dans `public/mariage.jpg`. */
export const WEDDING_PHOTO_SRC = "/mariage.jpg";

const CONFETTI_COLORS = [
  "#f0c98a",
  "#c45c26",
  "#e8a06a",
  "#f8f4ec",
  "#fda4af",
  "#dc2626",
  "#ffffff",
];

function ConfettiRain() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 96 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: `${Math.random() * 2.6}s`,
        duration: `${2.6 + Math.random() * 2.8}s`,
        drift: `${(Math.random() - 0.5) * 140}px`,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        width: `${6 + Math.random() * 8}px`,
        height: `${8 + Math.random() * 10}px`,
        radius: Math.random() > 0.45 ? "1px" : "999px",
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[201] overflow-hidden"
      aria-hidden
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={
            {
              left: `${piece.left}%`,
              width: piece.width,
              height: piece.height,
              background: piece.color,
              borderRadius: piece.radius,
              "--confetti-delay": piece.delay,
              "--confetti-duration": piece.duration,
              "--confetti-drift": piece.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function WeddingReward() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const snapshot = useSyncExternalStore(
    subscribeQuests,
    getQuestsSnapshot,
    () => ({ unlocked: [], solved: [] }),
  );

  const ready = areAllQuestsSolved(snapshot.solved);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!ready) return null;

  return (
    <>
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-[var(--lamp)] px-8 py-3 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-black shadow-[0_0_28px_rgba(240,201,138,0.4)] transition hover:brightness-110"
        >
          Récompense
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4 py-6">
          <ConfettiRain />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[202] flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden border border-[var(--lamp)]/40 bg-[#120c08] text-[#e8eef1] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 bg-black/55 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-fog/80 hover:text-white"
            >
              Fermer
            </button>
            <div className="min-h-0 flex-1 overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={WEDDING_PHOTO_SRC}
                alt="Guillaume et Mylène"
                className="h-full max-h-[52vh] w-full object-cover"
              />
            </div>
            <div className="px-6 py-5 text-center">
              <p
                id={titleId}
                className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--lamp)]"
              >
                Félicitations
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fog/80">
                Tous nos vœux de bonheur pour le mariage de Guillaume et
                Mylène. Qu’ils soient entourés d’amour, de rires, et d’une
                très longue vie à deux.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
