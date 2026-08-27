export const SANDALES_QUEST_ID = "sandales-guillaume";
export const ELUE_QUEST_ID = "elue";
export const SOIREE_QUEST_ID = "soiree-enfer";

export type QuestId =
  | typeof SANDALES_QUEST_ID
  | typeof ELUE_QUEST_ID
  | typeof SOIREE_QUEST_ID;

export type QuestDefinition = {
  id: QuestId;
  title: string;
  href: string;
  flag: string;
};

export const SANDALES_QUEST: QuestDefinition = {
  id: SANDALES_QUEST_ID,
  title: "Les sandales de Guillaume",
  href: "/sandale",
  flag: "sandale-1-pied-27534977",
};

export const ELUE_QUEST: QuestDefinition = {
  id: ELUE_QUEST_ID,
  title: "La quête de l'élue",
  href: "/love",
  flag: "mymy-la-goat-12579544",
};

export const SOIREE_QUEST: QuestDefinition = {
  id: SOIREE_QUEST_ID,
  title: "Soirée d'enfer",
  href: "/soiree",
  flag: "big-party67676767§676767",
};

export const QUEST_CATALOG: QuestDefinition[] = [
  SANDALES_QUEST,
  ELUE_QUEST,
  SOIREE_QUEST,
];

export const SANDALES_QUEST_TITLE = SANDALES_QUEST.title;
export const SANDALES_QUEST_HREF = SANDALES_QUEST.href;

const QUESTS_KEY = "antipattern.quests";
const QUESTS_EVENT = "antipattern:quests";
const LEGACY_SANDALES_ID = "sandalles-guillaume";

type StoredQuests = {
  unlocked: string[];
  solved: string[];
};

const EMPTY: StoredQuests = { unlocked: [], solved: [] };
let cached: StoredQuests = EMPTY;

function normalizeId(id: string): string {
  if (id === LEGACY_SANDALES_ID) return SANDALES_QUEST_ID;
  return id;
}

function readFromStorage(): StoredQuests {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(QUESTS_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<StoredQuests>;
    return {
      unlocked: Array.isArray(parsed.unlocked)
        ? parsed.unlocked.map(normalizeId)
        : [],
      solved: Array.isArray(parsed.solved) ? parsed.solved.map(normalizeId) : [],
    };
  } catch {
    return EMPTY;
  }
}

function loadSnapshot(): StoredQuests {
  const next = readFromStorage();
  if (
    JSON.stringify(next.unlocked) === JSON.stringify(cached.unlocked) &&
    JSON.stringify(next.solved) === JSON.stringify(cached.solved)
  ) {
    return cached;
  }
  cached = next;
  return cached;
}

export function resetQuests() {
  cached = EMPTY;
  if (typeof window === "undefined") return;
  localStorage.removeItem(QUESTS_KEY);
  window.dispatchEvent(new Event(QUESTS_EVENT));
}

function writeQuests(quests: StoredQuests) {
  cached = quests;
  localStorage.setItem(QUESTS_KEY, JSON.stringify(quests));
  window.dispatchEvent(new Event(QUESTS_EVENT));
}

export function subscribeQuests(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(QUESTS_EVENT, onStoreChange);
  return () => window.removeEventListener(QUESTS_EVENT, onStoreChange);
}

export function getQuestsSnapshot(): StoredQuests {
  return loadSnapshot();
}

export function hasSandalesQuest(): boolean {
  return loadSnapshot().unlocked.includes(SANDALES_QUEST_ID);
}

export function hasElueQuest(): boolean {
  return loadSnapshot().unlocked.includes(ELUE_QUEST_ID);
}

export function hasSoireeQuest(): boolean {
  return loadSnapshot().unlocked.includes(SOIREE_QUEST_ID);
}

export function isQuestSolved(id: QuestId): boolean {
  return loadSnapshot().solved.includes(id);
}

export function areAllQuestsSolved(solved: string[] = loadSnapshot().solved) {
  return QUEST_CATALOG.every((quest) => solved.includes(quest.id));
}

export function unlockSandalesQuest() {
  const quests = loadSnapshot();
  if (quests.unlocked.includes(SANDALES_QUEST_ID)) return;
  writeQuests({
    ...quests,
    unlocked: [...quests.unlocked, SANDALES_QUEST_ID],
  });
}

export function unlockElueQuest() {
  const quests = loadSnapshot();
  if (quests.unlocked.includes(ELUE_QUEST_ID)) return;
  writeQuests({
    ...quests,
    unlocked: [...quests.unlocked, ELUE_QUEST_ID],
  });
}

export function unlockSoireeQuest() {
  const quests = loadSnapshot();
  if (quests.unlocked.includes(SOIREE_QUEST_ID)) return;
  writeQuests({
    ...quests,
    unlocked: [...quests.unlocked, SOIREE_QUEST_ID],
  });
}

export function submitQuestFlag(
  id: QuestId,
  value: string,
): { ok: true } | { ok: false; message: string } {
  const quest = QUEST_CATALOG.find((item) => item.id === id);
  if (!quest) {
    return { ok: false, message: "Quête inconnue." };
  }

  if (value.trim() !== quest.flag) {
    return { ok: false, message: "Flag incorrect." };
  }

  const quests = loadSnapshot();
  if (!quests.solved.includes(id)) {
    writeQuests({
      ...quests,
      solved: [...quests.solved, id],
    });
  }

  return { ok: true };
}

export function asksAboutSandales(text: string) {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return normalized.includes("sandal") && normalized.includes("guillaume");
}
