"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WanderingHumanButton } from "@/components/WanderingHumanButton";
import { loginAsAdmin, loginPlayer } from "@/lib/auth";

function areFieldsReady(email: string, password: string) {
  return email.trim().length > 0 && password.length > 0;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  const fieldsReady = areFieldsReady(email, password);

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

  const attemptLogin = useCallback(() => {
    setPending(true);
    setError(null);

    const result = loginPlayer(email, password);
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    router.push("/jeu");
  }, [email, password, router]);

  function bypassAsAdmin() {
    loginAsAdmin();
    router.push("/jeu");
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
              placeholder="••••••••"
            />
          </label>

          {error ? (
            <p role="alert" className="text-sm text-[#e8a06a]">
              {error}
            </p>
          ) : null}

          {adminMode ? (
            <button
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                bypassAsAdmin();
              }}
              className="w-full bg-white px-4 py-3 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-black outline-none"
            >
              Accès admin
            </button>
          ) : null}
        </form>

        <p className="mt-6 text-center text-sm text-[#0a1836]">
          <Link href="/inscription" className="cursor-default outline-none">
            S&apos;inscrire
          </Link>
        </p>
      </div>

      {fieldsReady ? (
        <WanderingHumanButton
          label="Se connecter"
          pending={pending}
          onComplete={attemptLogin}
        />
      ) : null}
    </>
  );
}
