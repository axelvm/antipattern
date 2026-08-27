import { Suspense } from "react";
import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { BlindtestDevHarness } from "@/components/blindtest/blindtest-dev-harness";
import { HomeHeader } from "@/components/HomeHeader";
import { HomeDoor } from "@/components/HomeDoor";

export default function Home() {
  return (
    <Atmosphere>
      {process.env.NODE_ENV === "development" ? (
        <Suspense fallback={null}>
          <BlindtestDevHarness />
        </Suspense>
      ) : null}
      <HomeDoor />

      <HomeHeader />

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
            mission&nbsp;: participer&nbsp;<Link
              href="/connexion"
            >
               ici...&nbsp;
            </Link>
             et décrocher le flag caché.
          </p>

          <div className="animate-rise-delay-3 mt-10">
            <Link
              href="/"
              className="cta-underline relative inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-wide text-ink transition-colors hover:text-signal"
            >
              Je ne lance pas la partie
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
                  Entrez dans la partie. Rien n&apos;est aussi simple
                  qu&apos;il n&apos;y paraît.
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
