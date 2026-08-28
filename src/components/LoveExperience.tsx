"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoveDeck } from "@/components/LoveDeck";
import { TinderSondage } from "@/components/TinderSondage";

type LoveTab = "elue" | "sondage";

export function LoveExperience() {
  const [adminMode, setAdminMode] = useState(false);
  const [tab, setTab] = useState<LoveTab>("elue");
  const showTabs = adminMode || tab === "sondage";

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

  return (
    <>
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/jeu"
          className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-fog/80 transition-colors hover:text-fog"
        >
          ANTIPATTERN
        </Link>
        {showTabs ? (
          <nav className="flex items-center gap-4">
            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                setTab("elue");
              }}
              className={`font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] ${
                tab === "elue" ? "text-fog" : "text-fog/40"
              }`}
            >
              l&apos;élue
            </button>
            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                setTab("sondage");
              }}
              className={`font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] ${
                tab === "sondage" ? "text-fog" : "text-fog/40"
              }`}
            >
              sondage
            </button>
          </nav>
        ) : (
          <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-fog/40">
            l&apos;élue
          </p>
        )}
      </header>

      <main className="flex flex-1 flex-col overflow-x-hidden px-6 pb-16 pt-4 md:px-10">
        {tab === "elue" ? (
          <>
            <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-[#fda4af]">
              quête de l&apos;élue
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight text-fog">
              Trouvez l&apos;élue
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog/65">
              Like ou dislike chaque profil. Un seul like compte vraiment.
            </p>
            <div className="mt-6">
              <LoveDeck />
            </div>
          </>
        ) : (
          <>
            <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-[#fda4af]">
              sondage
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight text-fog">
              Tes préférés
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog/65">
              Entre ton prénom, like jusqu&apos;à 5 profils. Un super like par
              personne vaut 2 votes.
            </p>
            <div className="mt-10">
              <TinderSondage />
            </div>
          </>
        )}
      </main>
    </>
  );
}
