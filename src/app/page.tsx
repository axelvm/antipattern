import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";

export default function Home() {
  return (
    <Atmosphere>
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
          briefing
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 flex-col justify-center px-6 pb-16 pt-6 md:max-w-[58%] md:px-10 md:pb-24">
          <p className="animate-rise font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-ink">
            ANTIPATTERN
          </p>

          <h1 className="animate-rise-delay-1 mt-6 max-w-xl font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.2vw,2rem)] font-semibold leading-snug tracking-tight text-ink/90">
            Connectez-vous. Explorez. Trouvez le flag.
          </h1>

          <p className="animate-rise-delay-2 mt-4 max-w-md text-[0.95rem] leading-relaxed text-slate">
            Un site-jeu d&apos;évasion où chaque interface ment un peu. Votre
            mission&nbsp;: participer… et décrocher le flag caché.
          </p>

          <div className="animate-rise-delay-3 mt-10">
            <Link
              href="/connexion"
              className="cta-underline relative inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-wide text-ink transition-colors hover:text-signal"
            >
              Participer à la partie
              <span aria-hidden className="text-signal">
                →
              </span>
            </Link>
          </div>
        </section>

        <section className="relative z-10 border-t border-ink/15 bg-ink/[0.06] px-6 py-14 md:px-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Comment ça marche
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate">
              Une seule règle affichée. Le reste, vous le découvrirez en
              butant contre le site.
            </p>

            <ol className="mt-10 space-y-8 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-ink/85">
              <li className="grid gap-1 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-signal">
                  01
                </span>
                <span>
                  <strong className="font-medium text-ink">Connexion.</strong>{" "}
                  Créez votre accès pour entrer dans la partie. Rien n&apos;est
                  aussi simple qu&apos;il n&apos;y paraît.
                </span>
              </li>
              <li className="grid gap-1 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-signal">
                  02
                </span>
                <span>
                  <strong className="font-medium text-ink">Le flag.</strong>{" "}
                  Fouillez les pages, les formulaires, les angles morts. Le
                  drapeau est quelque part — à vous de le trouver.
                </span>
              </li>
              <li className="grid gap-1 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-signal">
                  03
                </span>
                <span>
                  <strong className="font-medium text-ink">La surprise.</strong>{" "}
                  Une fois le flag en poche… autre chose se révélera. Plus tard.
                </span>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Atmosphere>
  );
}
