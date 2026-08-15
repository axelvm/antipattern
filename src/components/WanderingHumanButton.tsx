"use client";

import { useCallback, useEffect, useState } from "react";

const REQUIRED_CLICKS = 3;
const BUTTON_WIDTH = 168;
const BUTTON_HEIGHT = 48;

type ButtonPosition = {
  top: number;
  left: number;
};

function randomButtonPosition(): ButtonPosition {
  if (typeof window === "undefined") {
    return { top: 120, left: 120 };
  }

  const padding = 16;
  const maxLeft = Math.max(padding, window.innerWidth - BUTTON_WIDTH - padding);
  const maxTop = Math.max(padding, window.innerHeight - BUTTON_HEIGHT - padding);

  return {
    left: padding + Math.random() * (maxLeft - padding),
    top: padding + Math.random() * (maxTop - padding),
  };
}

type WanderingHumanButtonProps = {
  label: string;
  pendingLabel?: string;
  pending?: boolean;
  onComplete: () => void;
};

/** Mount only when the human challenge should be active. */
export function WanderingHumanButton({
  label,
  pendingLabel = "Vérification…",
  pending = false,
  onComplete,
}: WanderingHumanButtonProps) {
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState<ButtonPosition>(randomButtonPosition);

  const relocateButton = useCallback(() => {
    setPosition(randomButtonPosition());
  }, []);

  useEffect(() => {
    function onResize() {
      relocateButton();
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [relocateButton]);

  function onHumanClick() {
    if (pending) return;

    const next = clickCount + 1;
    if (next >= REQUIRED_CLICKS) {
      setClickCount(REQUIRED_CLICKS);
      onComplete();
      return;
    }

    setClickCount(next);
    relocateButton();
  }

  return (
    <button
      type="button"
      onClick={onHumanClick}
      disabled={pending}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        zIndex: 50,
      }}
      className="bg-white font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-black shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
