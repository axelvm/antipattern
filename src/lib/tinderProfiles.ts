export type TinderProfile = {
  id: string;
  photo: string;
  name: string;
  bio: string;
};

export type TinderChoice = "like" | "dislike";

export const ELUE_PROFILE_ID = "tinder2";

export function didWinElueQuest(choices: Record<string, TinderChoice>) {
  const likedIds = Object.entries(choices)
    .filter(([, choice]) => choice === "like")
    .map(([id]) => id);
  return likedIds.length === 1 && likedIds[0] === ELUE_PROFILE_ID;
}

export function shuffleTinderProfiles(list: TinderProfile[]) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = next[i];
    const swap = next[j];
    if (current && swap) {
      next[i] = swap;
      next[j] = current;
    }
  }
  return next;
}
