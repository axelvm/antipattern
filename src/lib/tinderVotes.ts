"use client";

const STORAGE_KEY = "antipattern.tinderVotes";
const VOTES_EVENT = "antipattern:tinder-votes";

export type TinderBallot = {
  name: string;
  likedIds: string[];
  superLikedId: string | null;
};

export const MAX_LIKES_PER_VOTER = 5;
export const SUPER_LIKE_WEIGHT = 2;

type VoteStore = {
  ballots: TinderBallot[];
};

const EMPTY: VoteStore = { ballots: [] };

function readStore(): VoteStore {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<VoteStore>;
    if (!Array.isArray(parsed.ballots)) return EMPTY;
    return {
      ballots: parsed.ballots.flatMap((ballot) => {
        if (
          typeof ballot?.name !== "string" ||
          !Array.isArray(ballot.likedIds) ||
          !ballot.likedIds.every((id) => typeof id === "string")
        ) {
          return [];
        }
        const superLikedId =
          typeof ballot.superLikedId === "string" ? ballot.superLikedId : null;
        return [{ name: ballot.name, likedIds: ballot.likedIds, superLikedId }];
      }),
    };
  } catch {
    return EMPTY;
  }
}

function writeStore(store: VoteStore) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event(VOTES_EVENT));
}

export function subscribeTinderVotes(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(VOTES_EVENT, onStoreChange);
  return () => window.removeEventListener(VOTES_EVENT, onStoreChange);
}

export function getTinderBallots(): TinderBallot[] {
  return readStore().ballots;
}

export function saveTinderBallot(
  name: string,
  likedIds: string[],
  superLikedId: string | null,
) {
  const normalized = name.trim();
  if (!normalized) return;
  const store = readStore();
  const others = store.ballots.filter(
    (ballot) => ballot.name.toLowerCase() !== normalized.toLowerCase(),
  );
  writeStore({
    ballots: [...others, { name: normalized, likedIds, superLikedId }],
  });
}

export function likeCountsByProfile(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const ballot of readStore().ballots) {
    for (const id of ballot.likedIds) {
      counts[id] = (counts[id] ?? 0) + 1;
    }
    if (ballot.superLikedId) {
      counts[ballot.superLikedId] =
        (counts[ballot.superLikedId] ?? 0) + SUPER_LIKE_WEIGHT;
    }
  }
  return counts;
}
