import type { Metadata } from "next";
import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { CguContent } from "@/components/CguContent";

export const metadata: Metadata = {
  title: "ANTIPATTERN — Conditions générales d’utilisation",
  description: "Conditions générales d’utilisation du site-jeu ANTIPATTERN.",
};

type CguPageProps = {
  searchParams: Promise<{ embed?: string }>;
};

export default async function CguPage({ searchParams }: CguPageProps) {
  const params = await searchParams;
  const embed = params.embed === "1";

  if (embed) {
    return (
      <div className="min-h-full bg-[#0b1014] px-5 py-6 text-[#d8e0e4] sm:px-8">
        <CguContent compact />
      </div>
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
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-fog/40">
          documents
        </p>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20 pt-4 md:px-10">
        <div className="rounded-sm bg-[#0b1014]/[0.72] px-6 py-8 text-fog shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-10 sm:py-10">
          <CguContent />
        </div>
      </main>
    </Atmosphere>
  );
}
