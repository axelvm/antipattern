"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { isEmailValidationCode } from "@/services/emailValidation";

type EmailValidationPopupProps = {
  email: string;
  onValidated: () => void;
  onCancel: () => void;
};

export function EmailValidationPopup({
  email,
  onValidated,
  onCancel,
}: EmailValidationPopupProps) {
  const titleId = useId();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showCgu, setShowCgu] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // After the ask, the popup displays the CGU page.
    const timer = window.setTimeout(() => setShowCgu(true), 650);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onCancel]);

  function onConfirm(event: FormEvent) {
    event.preventDefault();
    if (!isEmailValidationCode(code)) {
      setError("Validation incorrecte. Relisez la procédure.");
      return;
    }
    onValidated();
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-[min(92vh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-white/10 bg-[#050505] text-[#e8eef1] shadow-[0_30px_80px_rgba(0,0,0,0.55)] outline-none"
      >
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.28em] text-white/40">
            confirmation requise
          </p>
          <h2
            id={titleId}
            className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white"
          >
            Validez votre adresse e-mail
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Un dernier contrôle est nécessaire pour{" "}
            <span className="text-white/85">{email}</span>. Pour savoir comment
            procéder, consultez les conditions générales d&apos;utilisation —
            elles s&apos;affichent ci-dessous.
          </p>
        </div>

        <div className="min-h-0 flex-1 bg-[#0b1014]">
          {showCgu ? (
            <iframe
              title="Conditions générales d’utilisation"
              src="/cgu?embed=1"
              className="h-[min(48vh,420px)] w-full border-0 bg-[#0b1014]"
            />
          ) : (
            <div className="flex h-[min(48vh,420px)] items-center justify-center px-6">
              <p className="font-[family-name:var(--font-mono)] text-sm text-white/45">
                Chargement des conditions générales d&apos;utilisation…
              </p>
            </div>
          )}
        </div>

        <form
          onSubmit={onConfirm}
          className="space-y-3 border-t border-white/10 px-5 py-4 sm:px-6"
        >
          <label className="block space-y-2">
            <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] text-white/45">
              Preuve de validation
            </span>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              className="w-full border border-white/15 bg-black px-3 py-2.5 text-sm text-white outline-none transition-[border-color] placeholder:text-white/25 focus:border-white/40"
              placeholder="Saisissez la procédure trouvée dans les CGU"
              autoComplete="off"
            />
          </label>

          {error ? (
            <p role="alert" className="text-sm text-[#e8a06a]">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white/80"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-white px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-black transition-opacity hover:opacity-90"
            >
              Confirmer l&apos;e-mail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
