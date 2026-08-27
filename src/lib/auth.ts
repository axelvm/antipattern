"use client";

import { resetQuests } from "@/lib/quests";

const STORAGE_KEY = "antipattern.players";
const SESSION_KEY = "antipattern.session";
const SESSION_STARTED_AT_KEY = "antipattern.sessionStartedAt";
const SESSION_CHANGE_EVENT = "antipattern:session";

export type Player = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
};

export type RegisterInput = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
};

function readPlayers(): Player[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Player[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePlayers(players: Player[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export function emailAlreadyRegistered(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return readPlayers().some((p) => p.email.toLowerCase() === normalized);
}

export function registerPlayer(
  input: RegisterInput,
): { ok: true } | { ok: false; error: string } {
  const lastName = input.lastName.trim();
  const firstName = input.firstName.trim();
  const email = input.email.trim().toLowerCase();
  const { password } = input;

  if (!lastName || !firstName || !email || !password) {
    return { ok: false, error: "Tous les champs sont requis." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Adresse e-mail invalide." };
  }

  const players = readPlayers();
  if (players.some((p) => p.email.toLowerCase() === email)) {
    return { ok: false, error: "Cette adresse e-mail est déjà utilisée." };
  }

  players.push({ lastName, firstName, email, password });
  writePlayers(players);
  return { ok: true };
}

const ADMIN_SESSION = "admin";

export function loginAsAdmin() {
  sessionStorage.setItem(SESSION_KEY, ADMIN_SESSION);
  notifySessionChange();
}

export function loginPlayer(
  email: string,
  password: string,
): { ok: true } | { ok: false; error: string } {
  const normalized = email.trim().toLowerCase();
  const players = readPlayers();
  const match = players.find(
    (p) => p.email.toLowerCase() === normalized && p.password === password,
  );

  if (!match) {
    return { ok: false, error: "Identifiants incorrects." };
  }

  sessionStorage.setItem(SESSION_KEY, match.email);
  notifySessionChange();
  return { ok: true };
}

export function subscribeSession(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(SESSION_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(SESSION_CHANGE_EVENT, onStoreChange);
}

function notifySessionChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_KEY);
}

export function getSessionStartedAt(): number | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_STARTED_AT_KEY);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function ensureSessionStartedAt(): number {
  const existing = getSessionStartedAt();
  if (existing != null) return existing;
  const now = Date.now();
  sessionStorage.setItem(SESSION_STARTED_AT_KEY, String(now));
  notifySessionChange();
  return now;
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  notifySessionChange();
}

export function resetEntireGame() {
  if (typeof window === "undefined") return;
  for (const storage of [window.localStorage, window.sessionStorage]) {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i += 1) {
      const key = storage.key(i);
      if (key?.startsWith("antipattern")) {
        keys.push(key);
      }
    }
    for (const key of keys) {
      storage.removeItem(key);
    }
  }
  resetQuests();
  notifySessionChange();
}

export function clearSessionLocalData() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_STARTED_AT_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_STARTED_AT_KEY);
  notifySessionChange();
}
