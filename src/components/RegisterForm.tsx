"use client";

import {
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerPlayer } from "@/lib/auth";
import {
  assertPasswordConfirmedThrice,
  verifyPassword,
} from "@/services/passwordRules";

const fieldClassName =
  "w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40";

function blockClipboard(event: ClipboardEvent<HTMLInputElement>) {
  event.preventDefault();
}

function blockPasteShortcuts(event: KeyboardEvent<HTMLInputElement>) {
  if ((event.ctrlKey || event.metaKey) && ["v", "V", "c", "C", "x", "X"].includes(event.key)) {
    event.preventDefault();
  }
}

export function RegisterForm() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordThrice, setPasswordThrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    if (!lastName.trim() || !firstName.trim() || !email.trim()) {
      setError("Nom, prénom et e-mail sont requis.");
      setPending(false);
      return;
    }

    const confirmation = assertPasswordConfirmedThrice(
      password,
      passwordAgain,
      passwordThrice,
    );
    if (!confirmation.ok) {
      setError(confirmation.message);
      setPending(false);
      return;
    }

    // Suitability is checked only after the triple confirmation.
    // A single rule error is revealed at a time.
    const suitability = verifyPassword(confirmation.password);
    if (!suitability.ok) {
      setError(suitability.message);
      setPending(false);
      return;
    }

    const result = registerPlayer({
      lastName,
      firstName,
      email,
      password: confirmation.password,
    });
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
        Renseignez vos informations. Le mot de passe doit être saisi trois fois
        — sans coller.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <label className="block space-y-2">
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
            Nom
          </span>
          <input
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClassName}
            placeholder="Dupont"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
            Prénom
          </span>
          <input
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClassName}
            placeholder="Alex"
          />
        </label>

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
            className={fieldClassName}
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPaste={blockClipboard}
            onCopy={blockClipboard}
            onCut={blockClipboard}
            onKeyDown={blockPasteShortcuts}
            className={fieldClassName}
            placeholder="saisie 1 / 3"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
            Mot de passe (encore)
          </span>
          <input
            name="passwordAgain"
            type="password"
            autoComplete="new-password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            onPaste={blockClipboard}
            onCopy={blockClipboard}
            onCut={blockClipboard}
            onKeyDown={blockPasteShortcuts}
            className={fieldClassName}
            placeholder="saisie 2 / 3"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
            Mot de passe (preuve humaine)
          </span>
          <input
            name="passwordThrice"
            type="password"
            autoComplete="new-password"
            value={passwordThrice}
            onChange={(e) => setPasswordThrice(e.target.value)}
            onPaste={blockClipboard}
            onCopy={blockClipboard}
            onCut={blockClipboard}
            onKeyDown={blockPasteShortcuts}
            className={fieldClassName}
            placeholder="saisie 3 / 3"
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
        <Link
          href="/connexion"
          className="text-white/70 underline-offset-2 hover:text-white hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}
