"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { getSession, subscribeSession } from "@/lib/auth";
import { unlockSoireeQuest } from "@/lib/quests";

export function HomeDoor() {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeSession, getSession, () => null);
  const canEnter = session != null;

  function enter() {
    if (!canEnter) return;
    unlockSoireeQuest();
    router.push("/soiree");
  }

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[42%] md:block">
      <button
        type="button"
        disabled={!canEnter}
        onClick={enter}
        aria-label={canEnter ? "Entrer dans la soirée d'enfer" : undefined}
        aria-hidden={!canEnter}
        tabIndex={canEnter ? 0 : -1}
        className={`absolute inset-y-[8%] right-[10%] w-[56%] door-frame bg-[linear-gradient(180deg,#2a353c_0%,#1a2228_45%,#12181c_100%)] ${
          canEnter
            ? "pointer-events-auto cursor-pointer outline-none transition-[filter] hover:brightness-125"
            : "pointer-events-none"
        }`}
      >
        <span className="absolute inset-[10%] border border-[rgba(232,238,241,0.12)]" />
        <span className="absolute left-[18%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--signal)] opacity-80" />
        <span className="absolute inset-x-[18%] bottom-[18%] h-px bg-[rgba(232,238,241,0.2)]" />
        <span className="absolute inset-x-[18%] top-[22%] h-px bg-[rgba(232,238,241,0.12)]" />
      </button>
      <div className="absolute bottom-[8%] right-[8%] h-[4%] w-[70%] bg-[linear-gradient(90deg,transparent,rgba(26,34,40,0.35))]" />
    </div>
  );
}
