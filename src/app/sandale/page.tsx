import type { Metadata } from "next";
import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { SandaleAsciiGame } from "@/components/SandaleAsciiGame";

export const metadata: Metadata = {
  title: "ANTIPATTERN — Les sandales de Guillaume",
  description: "Guillaume a perdu ses sandales. Aidez-le à les retrouver.",
};

export default function SandalePage() {
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
          quête
        </p>
      </header>

      <main className="flex flex-1 flex-col px-6 pb-16 pt-4 md:px-10">
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-[var(--lamp)]">
          objet manquant
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight text-fog">
          Les sandales de Guillaume
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog/65">
          Le paysage défile. La sandale est posée dans le décor : cliquez-la avant qu&apos;elle ne sorte.
        </p>
        <div className="mt-8">
          <SandaleAsciiGame />
        </div>
      </main>
    </Atmosphere>
  );
}
