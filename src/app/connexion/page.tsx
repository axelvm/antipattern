import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Atmosphere } from "@/components/Atmosphere";
import { LoginForm } from "@/components/LoginForm";
import { LoginNotice } from "@/components/LoginNotice";

export const metadata: Metadata = {
  title: "ANTIPATTERN — Connexion",
  description: "Connectez-vous pour participer à la partie et chercher le flag.",
};

export default function ConnexionPage() {
  return (
    <Atmosphere dim>
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-fog/80 transition-colors hover:text-fog"
        >
          ANTIPATTERN
        </Link>
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-fog/40">
          salle&nbsp;01
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-4">
        <Suspense fallback={null}>
          <LoginNotice />
        </Suspense>
        <LoginForm />
      </main>
    </Atmosphere>
  );
}
