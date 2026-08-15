"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginPlayer } from "@/lib/auth";

const REQUIRED_CLICKS = 3;
const BUTTON_WIDTH = 168;
const BUTTON_HEIGHT = 48;

type ButtonPosition = {
  top: number;
  left: number;
};

function randomButtonPosition(): ButtonPosition {
  if (typeof window === "undefined") {
    return { top: 120, left: 120 };
  }

  const padding = 16;
  const maxLeft = Math.max(padding, window.innerWidth - BUTTON_WIDTH - padding);
  const maxTop = Math.max(padding, window.innerHeight - BUTTON_HEIGHT - padding);

  return {
    left: padding + Math.random() * (maxLeft - padding),
    top: padding + Math.random() * (maxTop - padding),
  };
}

function areFieldsReady(email: string, password: string) {
  return email.trim().length > 0 && password.length > 0;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState<ButtonPosition | null>(null);

  const fieldsReady = areFieldsReady(email, password);

  const relocateButton = useCallback(() => {
    setPosition(randomButtonPosition());
  }, []);

  function syncHumanChallenge(nextEmail: string, nextPassword: string) {
    if (areFieldsReady(nextEmail, nextPassword)) {
      setPosition((current) => current ?? randomButtonPosition());
      return;
    }

    setClickCount(0);
    setPosition(null);
  }

  useEffect(() => {
    if (!fieldsReady) return;

    function onResize() {
      relocateButton();
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fieldsReady, relocateButton]);

  function attemptLogin() {
    setPending(true);
    setError(null);

    const result = loginPlayer(email, password);
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      setClickCount(0);
      relocateButton();
      return;
    }

    router.push("/jeu");
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    // Enter must not bypass the human-click ritual.
    event.preventDefault();
  }

  function onHumanClick() {
    if (!fieldsReady || pending) return;

    const next = clickCount + 1;
    if (next >= REQUIRED_CLICKS) {
      setClickCount(REQUIRED_CLICKS);
      attemptLogin();
      return;
    }

    setClickCount(next);
    relocateButton();
  }

  return (
    <>
      <div className="w-full max-w-md rounded-sm bg-[#050505] px-7 py-8 text-[#e8eef1] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:px-9 sm:py-10">
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.28em] text-white/40">
          accès joueur
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
          Connexion
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          E-mail et mot de passe pour rejoindre la partie.
        </p>

        {fieldsReady ? (
          <p
            role="status"
            className="mt-5 border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm leading-relaxed text-white/70"
          >
            Vérification que c&apos;est bien un humain qui tente de se
            connecter.
          </p>
        ) : null}

        <form className="mt-8 space-y-5" onSubmit={onFormSubmit} noValidate>
          <label className="block space-y-2">
            <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
              E-mail
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                const next = e.target.value;
                setEmail(next);
                syncHumanChallenge(next, password);
              }}
              className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
              placeholder="vous@exemple.fr"
            />
          </label>

          <label className="block space-y-2">
            <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
              Mot de passe
            </span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                const next = e.target.value;
                setPassword(next);
                syncHumanChallenge(email, next);
              }}
              className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
              placeholder="••••••••"
            />
          </label>

          {error ? (
            <p role="alert" className="text-sm text-[#e8a06a]">
              {error}
            </p>
          ) : null}
        </form>
      </div>

      {fieldsReady && position ? (
        <button
          type="button"
          onClick={onHumanClick}
          disabled={pending}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            zIndex: 50,
          }}
          className="bg-white font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-black shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Vérification…" : "Se connecter"}
        </button>
      ) : null}
    </>
  );
}
