"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  clearSessionLocalData,
  ensureSessionStartedAt,
  getSessionStartedAt,
  subscribeSession,
} from "@/lib/auth";

const FLASH_MS = 280;

function formatElapsed(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${mm}:${ss}`;
  }

  return `${mm}:${ss}`;
}

function elapsedFrom(startedAt: number) {
  return Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
}

/** Starts when the home page opens, then stays visible across pages. */
export function SessionTimer() {
  const pathname = usePathname();
  const startedAt = useSyncExternalStore(
    subscribeSession,
    getSessionStartedAt,
    () => null,
  );
  const [tick, setTick] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        setAdminMode(true);
      }
    }

    function onKeyUp(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        setAdminMode(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    ensureSessionStartedAt();
  }, [pathname]);

  useEffect(() => {
    if (startedAt == null) return;

    let flashTimer = 0;
    let lastSecond = -1;

    const intervalId = window.setInterval(() => {
      const next = elapsedFrom(startedAt);
      if (next === lastSecond) return;
      lastSecond = next;
      setTick(next);
      setFlashing(true);
      window.clearTimeout(flashTimer);
      flashTimer = window.setTimeout(() => setFlashing(false), FLASH_MS);
    }, 250);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(flashTimer);
    };
  }, [startedAt]);

  if (startedAt == null) return null;

  const displayedElapsed = tick || elapsedFrom(startedAt);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center pt-[1.35rem]"
    >
      <time
        dateTime={`PT${displayedElapsed}S`}
        className={`font-[family-name:var(--font-mono)] text-2xl font-medium tabular-nums tracking-[0.18em] transition-colors duration-150 ${
          flashing
            ? "text-[#ff1a1a]"
            : pathname === "/"
              ? "text-ink/80"
              : "text-fog/75"
        }`}
      >
        {formatElapsed(displayedElapsed)}
      </time>
      {adminMode ? (
        <button
          type="button"
          className="pointer-events-auto ml-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-ink/70"
          onClick={() => {
            clearSessionLocalData();
            setAdminMode(false);
            ensureSessionStartedAt()
          }}
        >
          Clear Session
        </button>
      ) : null}
    </div>
  );
}
