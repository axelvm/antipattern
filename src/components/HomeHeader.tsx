"use client";

import { useEffect, useState } from "react";
import { resetEntireGame } from "@/lib/auth";

export function HomeHeader() {
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
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

  function resetGame() {
    resetEntireGame();
    window.location.reload();
  }

  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
      <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-ink/70">
        salle&nbsp;00
      </p>
      {adminMode ? (
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            resetGame();
          }}
          className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-signal"
        >
          Réinitialiser la partie
        </button>
      ) : (
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-ink/50">
          briefing
        </p>
      )}
    </header>
  );
}
