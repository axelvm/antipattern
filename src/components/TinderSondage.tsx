"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { TinderProfileCard } from "@/components/TinderProfileCard";
import {
  shuffleTinderProfiles,
  type TinderChoice,
  type TinderProfile,
} from "@/lib/tinderProfiles";
import {
  getTinderBallots,
  likeCountsByProfile,
  MAX_LIKES_PER_VOTER,
  saveTinderBallot,
  subscribeTinderVotes,
} from "@/lib/tinderVotes";

function useVoteStoreVersion() {
  return useSyncExternalStore(
    subscribeTinderVotes,
    () => JSON.stringify(getTinderBallots()),
    () => "[]",
  );
}

export function TinderSondage() {
  const [profiles, setProfiles] = useState<TinderProfile[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [index, setIndex] = useState(0);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [superLikedId, setSuperLikedId] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const voteVersion = useVoteStoreVersion();

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

  const ranking = useMemo(() => {
    if (!profiles) return [];
    const counts = likeCountsByProfile();
    return [...profiles]
      .map((profile) => ({
        profile,
        likes: counts[profile.id] ?? 0,
      }))
      .sort((a, b) => b.likes - a.likes || a.profile.name.localeCompare(b.profile.name));
  }, [profiles, voteVersion]);

  const likeCount = likedIds.length + (superLikedId ? 1 : 0);
  const reachedLikeLimit = likeCount >= MAX_LIKES_PER_VOTER;
  const finished =
    profiles != null && (index >= profiles.length || reachedLikeLimit);
  const profile = profiles?.[index];
  const ballotCount = getTinderBallots().length;

  function startVote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = nameInput.trim();
    if (!name) return;
    setVoterName(name);
    setIndex(0);
    setLikedIds([]);
    setSuperLikedId(null);
    setProfiles((current) =>
      current ? shuffleTinderProfiles(current) : current,
    );
  }

  function persist(nextLiked: string[], nextSuper: string | null) {
    saveTinderBallot(voterName, nextLiked, nextSuper);
  }

  function choose(choice: TinderChoice) {
    if (!profile || !profiles || finished) return;
    if (choice === "like" && likeCount >= MAX_LIKES_PER_VOTER) return;

    const nextLiked =
      choice === "like" ? [...likedIds, profile.id] : likedIds;
    const nextLikeCount = nextLiked.length + (superLikedId ? 1 : 0);
    const nextIndex = index + 1;
    setLikedIds(nextLiked);
    setIndex(nextIndex);

    if (nextIndex >= profiles.length || nextLikeCount >= MAX_LIKES_PER_VOTER) {
      persist(nextLiked, superLikedId);
    }
  }

  function superLike() {
    if (!profile || !profiles || finished) return;
    if (superLikedId || likeCount >= MAX_LIKES_PER_VOTER) return;

    const nextSuper = profile.id;
    const nextLikeCount = likedIds.length + 1;
    const nextIndex = index + 1;
    setSuperLikedId(nextSuper);
    setIndex(nextIndex);

    if (nextIndex >= profiles.length || nextLikeCount >= MAX_LIKES_PER_VOTER) {
      persist(likedIds, nextSuper);
    }
  }

  function nextVoter() {
    setVoterName("");
    setNameInput("");
    setIndex(0);
    setLikedIds([]);
    setSuperLikedId(null);
    setProfiles((current) =>
      current ? shuffleTinderProfiles(current) : current,
    );
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

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-white/40">
          {ballotCount} vote{ballotCount === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={() => setShowStats(true)}
          className="bg-white px-3 py-2 font-[family-name:var(--font-display)] text-sm font-bold text-black"
        >
          Statistiques
        </button>
      </div>

      {!voterName ? (
        <form
          onSubmit={startVote}
          className="mx-auto mt-10 w-full max-w-md border border-white/10 bg-[#141014] px-5 py-6"
        >
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[#fda4af]">
            participant
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Qui vote&nbsp;?
          </h2>
          <label className="mt-5 block">
            <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.16em] text-white/45">
              Prénom
            </span>
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              autoComplete="given-name"
              className="mt-2 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-5 w-full bg-[#e11d48] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-white"
          >
            Commencer
          </button>
        </form>
      ) : finished ? (
        <div className="mx-auto mt-10 w-full max-w-md border border-white/10 bg-[#141014] px-5 py-6 text-center">
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[#fda4af]">
            enregistré
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Merci {voterName}.
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Tes likes sont dans la session (max {MAX_LIKES_PER_VOTER}, un super
            like = 2 votes).
          </p>
          <button
            type="button"
            onClick={nextVoter}
            className="mt-6 bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
          >
            Nouvelle personne
          </button>
        </div>
      ) : profile ? (
        <div className="mt-8">
          <p className="mb-4 text-center text-sm text-white/50">
            {voterName} · likes {likeCount}/{MAX_LIKES_PER_VOTER}
            {superLikedId ? " · super like utilisé" : " · 1 super like"}
          </p>
          <TinderProfileCard
            key={profile.id}
            profile={profile}
            index={index}
            total={profiles.length}
            onChoose={choose}
            onSuperLike={superLike}
            canSuperLike={!superLikedId && !reachedLikeLimit}
          />
        </div>
      ) : null}

      {showStats ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6">
          <div className="max-h-[min(86vh,40rem)] w-full max-w-lg overflow-y-auto border border-white/10 bg-[#141014] px-5 py-6">
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[#fda4af]">
              classement
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              Statistiques
            </h2>
            {ranking.every((row) => row.likes === 0) ? (
              <p className="mt-4 text-sm text-white/55">
                Aucun like pour l&apos;instant.
              </p>
            ) : (
              <ol className="mt-5 space-y-3">
                {ranking.map((row, rank) => (
                  <li
                    key={row.profile.id}
                    className="flex items-center gap-3 border border-white/10 px-3 py-2"
                  >
                    <span className="w-6 font-[family-name:var(--font-mono)] text-sm text-white/40">
                      {rank + 1}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={row.profile.photo}
                      alt=""
                      className="h-12 w-12 object-cover"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm text-white">
                      {row.profile.name}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-sm text-[#fda4af]">
                      {row.likes}
                    </span>
                  </li>
                ))}
              </ol>
            )}
            <button
              type="button"
              onClick={() => setShowStats(false)}
              className="mt-6 w-full bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
            >
              Fermer
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
