"use client";

import {
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Atmosphere } from "@/components/Atmosphere";
import { WanderingHumanButton } from "@/components/WanderingHumanButton";
import { registerPlayer } from "@/lib/auth";
import {
  clearPendingRegistration,
  getPendingRegistration,
} from "@/services/emailValidation";

function blockClipboard(event: ClipboardEvent<HTMLInputElement>) {
  event.preventDefault();
}

function blockPasteShortcuts(event: KeyboardEvent<HTMLInputElement>) {
  if ((event.ctrlKey || event.metaKey) && ["v", "V", "c", "C", "x", "X"].includes(event.key)) {
    event.preventDefault();
  }
}

export function ConfirmMailForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const fieldReady = email.trim().length > 0;

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function attemptValidation() {
    setPending(true);
    setError(null);

    const draft = getPendingRegistration();
    if (!draft) {
      setError("Aucune inscription en cours. Reprenez depuis le formulaire.");
      setPending(false);
      return;
    }

    if (email.trim().toLowerCase() !== draft.email.trim().toLowerCase()) {
      setError("L’adresse saisie ne correspond pas.");
      setPending(false);
      return;
    }

    const result = registerPlayer(draft);
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    clearPendingRegistration();
    router.push("/connexion?inscrit=1");
  }

  return (
    <>
      <div className="w-full max-w-md rounded-sm bg-[#050505] px-7 py-8 text-[#e8eef1] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:px-9 sm:py-10">
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.28em] text-white/40">
          confirmation cachee
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
          Valider l&apos;e-mail
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Réécrivez votre adresse e-mail pour confirmer. Le bouton OK n&apos;apparaît
          qu&apos;ensuite.
        </p>

        {fieldReady ? (
          <p
            role="status"
            className="mt-5 border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm leading-relaxed text-white/70"
          >
            Vérification que c&apos;est bien un humain qui valide l&apos;adresse.
          </p>
        ) : null}

        <form className="mt-8 space-y-5" onSubmit={onFormSubmit} noValidate>
          <label className="block space-y-2">
            <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
              E-mail (resaisie)
            </span>
            <input
              name="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              onPaste={blockClipboard}
              onCopy={blockClipboard}
              onCut={blockClipboard}
              onKeyDown={blockPasteShortcuts}
              className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
              placeholder="rétapez votre e-mail"
            />
          </label>

          {error ? (
            <p role="alert" className="text-sm text-[#e8a06a]">
              {error}
            </p>
          ) : null}
        </form>
      </div>

      {fieldReady ? (
        <WanderingHumanButton
          label="OK"
          pending={pending}
          onComplete={attemptValidation}
        />
      ) : null}
    </>
  );
}

export function ConfirmMailPageShell({ children }: { children: React.ReactNode }) {
  return (
    <Atmosphere dim>
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-fog/50">
          ANTIPATTERN
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-fog/35">
          sys · mail
        </p>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-4">
        {children}
      </main>
    </Atmosphere>
  );
}
