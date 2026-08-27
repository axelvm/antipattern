"use client";

import { useMemo, useState } from "react";

const REQUIRED_CLICKS = 5;
const HEART_SIZE = 56;

type HeartHuntProps = {
  onComplete: () => void;
};

function randomPosition(index: number) {
  const padding = 24;
  const width = typeof window === "undefined" ? 800 : window.innerWidth;
  const height = typeof window === "undefined" ? 600 : window.innerHeight;
  return {
    id: index,
    top: padding + Math.random() * Math.max(80, height - HEART_SIZE - padding * 2),
    left: padding + Math.random() * Math.max(80, width - HEART_SIZE - padding * 2),
  };
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden>
      <path
        fill="#e11d48"
        d="M12 21s-6.6-4.35-9.3-8.1C.7 10.1.9 6.6 3.4 4.7 5.4 3.2 8 3.5 9.7 5.3L12 7.7l2.3-2.4c1.7-1.8 4.3-2.1 6.3-.6 2.5 1.9 2.7 5.4.7 8.2C18.6 16.65 12 21 12 21z"
      />
    </svg>
  );
}

export function HeartHunt({ onComplete }: HeartHuntProps) {
  const initialHearts = useMemo(
    () => Array.from({ length: REQUIRED_CLICKS }, (_, index) => randomPosition(index)),
    [],
  );
  const [hearts, setHearts] = useState(initialHearts);
  const caught = REQUIRED_CLICKS - hearts.length;

  function onHeartClick(id: number) {
    const remaining = hearts.filter((heart) => heart.id !== id);
    setHearts(remaining);
    if (remaining.length === 0) {
      onComplete();
    }
  }

  return (
    <>
      <p className="pointer-events-none fixed left-1/2 top-4 z-[95] -translate-x-1/2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#fda4af]">
        cœurs {caught}/{REQUIRED_CLICKS}
      </p>
      {hearts.map((heart) => (
        <button
          key={heart.id}
          type="button"
          onClick={() => onHeartClick(heart.id)}
          style={{ top: heart.top, left: heart.left }}
          className="fixed z-[95] flex h-14 w-14 items-center justify-center outline-none"
          aria-label="Cœur"
        >
          <HeartIcon />
        </button>
      ))}
    </>
  );
}
