"use client";

const STORAGE_KEY = "antipattern.players";
const SESSION_KEY = "antipattern.session";

export type Player = {
  username: string;
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

export function registerPlayer(
  username: string,
  password: string,
): { ok: true } | { ok: false; error: string } {
  const trimmed = username.trim();
  if (!trimmed || !password) {
    return { ok: false, error: "Identifiant et mot de passe requis." };
  }
  if (trimmed.length < 3) {
    return { ok: false, error: "Identifiant trop court (3 caractères min.)." };
  }
  if (password.length < 4) {
    return { ok: false, error: "Mot de passe trop court (4 caractères min.)." };
  }

  const players = readPlayers();
  if (players.some((p) => p.username.toLowerCase() === trimmed.toLowerCase())) {
    return { ok: false, error: "Cet identifiant est déjà pris." };
  }

  players.push({ username: trimmed, password });
  writePlayers(players);
  return { ok: true };
}

export function loginPlayer(
  username: string,
  password: string,
): { ok: true } | { ok: false; error: string } {
  const trimmed = username.trim();
  const players = readPlayers();
  const match = players.find(
    (p) => p.username.toLowerCase() === trimmed.toLowerCase() && p.password === password,
  );

  if (!match) {
    return { ok: false, error: "Identifiants incorrects." };
  }

  sessionStorage.setItem(SESSION_KEY, match.username);
  return { ok: true };
}

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_KEY);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
