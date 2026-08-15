"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Atmosphere } from "@/components/Atmosphere";
import { clearSession, getSession } from "@/lib/auth";

function subscribe() {
  return () => {};
}

export default function JeuPage() {
  const router = useRouter();
  const username = useSyncExternalStore(subscribe, getSession, () => null);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/connexion");
    }
  }, [router]);

  if (!username) {
    return (
      <Atmosphere dim>
        <main className="flex flex-1 items-center justify-center px-6">
          <p className="font-[family-name:var(--font-mono)] text-sm text-fog/60">
            Ouverture de la salle…
          </p>
        </main>
      </Atmosphere>
    );
  }

  return (
    <Atmosphere dim>
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-fog/80 transition-colors hover:text-fog"
        >
          ANTIPATTERN
        </Link>
        <button
          type="button"
          onClick={() => {
            clearSession();
            router.push("/");
          }}
          className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-fog/45 transition-colors hover:text-fog/80"
        >
          Quitter
        </button>
      </header>

      <main className="flex flex-1 flex-col justify-center px-6 pb-20 md:px-10">
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-[var(--lamp)]">
          joueur · {username}
        </p>
        <h1 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight text-fog">
          Vous êtes dedans.
        </h1>
        <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-fog/65">
          La chasse au flag commence ici. Les salles suivantes — et la surprise —
          arriveront bientôt.
        </p>
      </main>
    </Atmosphere>
  );
}
