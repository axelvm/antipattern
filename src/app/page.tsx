import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* Full-bleed atmospheric plane */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 70% 15%, rgba(240, 201, 138, 0.45) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 20% 80%, rgba(90, 107, 117, 0.35) 0%, transparent 50%),
            linear-gradient(165deg, #c5d0d6 0%, #9aaab4 38%, #6d7f8a 72%, #4a5a64 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        aria-hidden
        className="lamp-glow pointer-events-none absolute -top-24 right-[12%] h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,rgba(240,201,138,0.55)_0%,transparent_70%)] blur-2xl"
      />

      {/* Corridor / door visual anchor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] md:block"
      >
        <div className="absolute inset-y-[8%] right-[10%] w-[56%] door-frame bg-[linear-gradient(180deg,#2a353c_0%,#1a2228_45%,#12181c_100%)]">
          <div className="absolute inset-[10%] border border-[rgba(232,238,241,0.12)]" />
          <div className="absolute left-[18%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--signal)] opacity-80" />
          <div className="absolute inset-x-[18%] bottom-[18%] h-px bg-[rgba(232,238,241,0.2)]" />
          <div className="absolute inset-x-[18%] top-[22%] h-px bg-[rgba(232,238,241,0.12)]" />
        </div>
        <div className="absolute bottom-[8%] right-[8%] h-[4%] w-[70%] bg-[linear-gradient(90deg,transparent,rgba(26,34,40,0.35))]" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-ink/70">
          salle&nbsp;00
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-ink/50">
          session ouverte
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-16 pt-6 md:max-w-[58%] md:px-10 md:pb-24">
        <p className="animate-rise font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-ink">
          ANTIPATTERN
        </p>

        <h1 className="animate-rise-delay-1 mt-6 max-w-xl font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.2vw,2rem)] font-semibold leading-snug tracking-tight text-ink/90">
          Vous êtes enfermé dans un site qui fait tout de travers.
        </h1>

        <p className="animate-rise-delay-2 mt-4 max-w-md text-[0.95rem] leading-relaxed text-slate">
          Observez. Cliquez. Doutez. Chaque mauvais réflexe est une porte — ou un
          piège.
        </p>

        <div className="animate-rise-delay-3 mt-10">
          <Link
            href="#entrer"
            className="cta-underline relative inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-wide text-ink transition-colors hover:text-signal"
          >
            Entrer dans la pièce
            <span aria-hidden className="text-signal">
              →
            </span>
          </Link>
        </div>
      </main>

      <footer
        id="entrer"
        className="relative z-10 border-t border-ink/10 px-6 py-4 md:px-10"
      >
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-ink/45">
          Prototype · page d&apos;accueil · à suivre
        </p>
      </footer>
    </div>
  );
}
