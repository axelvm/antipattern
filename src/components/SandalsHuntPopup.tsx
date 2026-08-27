"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SANDALES_HUNT_MESSAGE } from "@/lib/dickheads";
import { getSession } from "@/lib/auth";
import { unlockSandalesQuest } from "@/lib/quests";

type SandalsHuntPopupProps = {
  titleId: string;
  imageSrc: string;
  fullscreen: boolean;
  countdownDone: boolean;
  secondsLeft: number;
  onToggleFullscreen: () => void;
  onClose: () => void;
  onResetCountdown: () => void;
};

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

export function SandalsHuntPopup({
  titleId,
  imageSrc,
  fullscreen,
  countdownDone,
  secondsLeft,
  onToggleFullscreen,
  onClose,
  onResetCountdown,
}: SandalsHuntPopupProps) {
  const router = useRouter();

  useEffect(() => {
    unlockSandalesQuest();
  }, []);

  function startHunt() {
    onClose();
    router.push(getSession() ? "/jeu#quetes" : "/connexion");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`flex flex-col overflow-hidden border border-[var(--lamp)]/35 bg-[#120c08] text-[#e8eef1] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${
        fullscreen
          ? "h-full w-full max-h-none max-w-none"
          : "h-[min(36rem,86vh)] w-full max-w-lg"
      }`}
    >
      <div className="flex items-start justify-end px-3 pt-3">
        <button
          type="button"
          onClick={onToggleFullscreen}
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
          className="shrink-0 text-center font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--lamp)] sm:text-2xl"
        >
          {SANDALES_HUNT_MESSAGE}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-3 px-5 pb-4 pt-3">
        <button
          type="button"
          onClick={startHunt}
          className="w-full bg-[var(--lamp)] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-black outline-none"
        >
          Aider Guillaume
        </button>

        <div className="grid w-full grid-cols-3 items-end">
          <button
            type="button"
            disabled={!countdownDone}
            onClick={onClose}
            className="cursor-default justify-self-start pb-1 font-[family-name:var(--font-mono)] text-xs text-white/20 outline-none"
          >
            ©lose 2026
          </button>

          <button
            type="button"
            onClick={() => {
              if (!countdownDone) return;
              onResetCountdown();
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
