import type { Metadata } from "next";
import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "ANTIPATTERN — Inscription",
  description: "Créez un compte pour accéder à la partie ANTIPATTERN.",
};

export default function InscriptionPage() {
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
          salle&nbsp;01b
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-4">
        <RegisterForm />
      </main>
    </Atmosphere>
  );
}
