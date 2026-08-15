"use client";

const STORAGE_KEY = "antipattern.players";
const SESSION_KEY = "antipattern.session";

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
  return { ok: true };
}

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_KEY);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
