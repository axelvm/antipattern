"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerPlayer } from "@/lib/auth";

export function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      setPending(false);
      return;
    }

    const result = registerPlayer(username, password);
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    router.push("/connexion?inscrit=1");
  }

  return (
    <div className="w-full max-w-md rounded-sm bg-[#050505] px-7 py-8 text-[#e8eef1] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:px-9 sm:py-10">
      <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.28em] text-white/40">
        nouvel accès
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
        Inscription
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-white/55">
        Créez un compte pour pouvoir vous connecter à la partie.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <label className="block space-y-2">
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
            Identifiant
          </span>
          <input
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
            placeholder="votre_pseudo"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
            Mot de passe
          </span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
            placeholder="••••••••"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
            Confirmer
          </span>
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
            placeholder="••••••••"
          />
        </label>

        {error ? (
          <p role="alert" className="text-sm text-[#e8a06a]">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-white px-4 py-3 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Création…" : "Créer mon compte"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/40">
        Déjà inscrit&nbsp;?{" "}
        <Link href="/connexion" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
