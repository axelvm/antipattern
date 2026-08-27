"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { TinderProfileCard } from "@/components/TinderProfileCard";
import { ELUE_QUEST } from "@/lib/quests";
import {
  didWinElueQuest,
  shuffleTinderProfiles,
  type TinderChoice,
  type TinderProfile,
} from "@/lib/tinderProfiles";

export function LoveDeck() {
  const [profiles, setProfiles] = useState<TinderProfile[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<Record<string, TinderChoice>>({});

  useEffect(() => {
    fetch("/tinder/profiles.json")
      .then((response) => {
        if (!response.ok) throw new Error("profiles.json");
        return response.json();
      })
      .then((data: { profiles: TinderProfile[] }) => {
        if (!Array.isArray(data.profiles) || data.profiles.length === 0) {
          throw new Error("empty");
        }
        setProfiles(shuffleTinderProfiles(data.profiles));
      })
      .catch(() => {
        setLoadError(true);
      });
  }, []);

  const finished = profiles != null && index >= profiles.length;
  const profile = profiles?.[index];
  const won = useMemo(
    () => finished && didWinElueQuest(choices),
    [choices, finished],
  );

  function choose(choice: TinderChoice) {
    if (!profile || finished) return;
    setChoices((current) => ({ ...current, [profile.id]: choice }));
    setIndex((current) => current + 1);
  }

  function restart() {
    setProfiles((current) =>
      current ? shuffleTinderProfiles(current) : current,
    );
    setIndex(0);
    setChoices({});
  }

  if (loadError) {
    return (
      <p className="text-center font-[family-name:var(--font-mono)] text-sm text-white/40">
        Impossible de charger les profils.
      </p>
    );
  }

  if (!profiles) {
    return (
      <p className="text-center font-[family-name:var(--font-mono)] text-sm text-white/40">
        Chargement des profils…
      </p>
    );
  }

  if (finished) {
    return (
      <div className="mx-auto w-full max-w-2xl border border-white/10 bg-[#141014] px-5 py-6 text-center">
        {won ? (
          <>
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[#fda4af]">
              match
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              C&apos;était elle.
            </h2>
            <p className="mt-3 text-sm text-white/60">Voici le flag&nbsp;:</p>
            <p className="mt-4 break-all font-[family-name:var(--font-mono)] text-sm text-[#fda4af]">
              {ELUE_QUEST.flag}
            </p>
            <Link
              href="/jeu#quetes"
              className="mt-6 inline-block bg-[#e11d48] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-white"
            >
              Retour aux quêtes
            </Link>
          </>
        ) : (
          <>
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-white/40">
              unmatched
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              Raté.
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Il ne fallait like que l&apos;élue. Recommence.
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-6 bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
            >
              Recommencer
            </button>
          </>
        )}
      </div>
    );
  }

  if (!profile) return null;

  return (
    <TinderProfileCard
      profile={profile}
      index={index}
      total={profiles.length}
      onChoose={choose}
    />
  );
}
