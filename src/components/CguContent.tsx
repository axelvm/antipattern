import { EMAIL_VALIDATION_CODE } from "@/services/emailValidation";

type CguContentProps = {
  compact?: boolean;
};

export function CguContent({ compact = false }: CguContentProps) {
  return (
    <article className="space-y-6 text-sm leading-relaxed text-white/70">
      <header className="space-y-2 border-b border-white/10 pb-5">
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.28em] text-white/40">
          document juridique
        </p>
        <h1
          className={`font-[family-name:var(--font-display)] font-bold tracking-tight text-white ${
            compact ? "text-2xl" : "text-3xl"
          }`}
        >
          Conditions générales d&apos;utilisation
        </h1>
        <p className="text-white/45">
          Version en vigueur — partie ANTIPATTERN. À lire avant toute
          ouverture de compte.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 1 — Objet
        </h2>
        <p>
          Les présentes conditions régissent l&apos;accès au site-jeu
          ANTIPATTERN, expérimentation ludique fondée sur des interfaces
          volontairement contrariantes. Toute participation vaut acceptation
          sans réserve.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 2 — Compte joueur
        </h2>
        <p>
          L&apos;inscription nécessite des informations exactes. L&apos;éditeur
          se réserve le droit de refuser un compte dont les champs seraient
          incomplets, incohérents, ou remplis trop facilement.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 3 — Mot de passe
        </h2>
        <p>
          Le mot de passe est personnel. Sa complexité est définie ailleurs que
          dans ce document. Toute tentative de collage entre champs de
          confirmation est considérée comme non humaine.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 4 — Données
        </h2>
        <p>
          Les données saisies demeurent locales à votre navigateur dans cette
          version prototype. Aucune garantie de pérennité n&apos;est offerte —
          ce qui, dans un anti-pattern, est presque une fonctionnalité.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 5 — Conduite
        </h2>
        <p>
          Le joueur s&apos;engage à chercher, se tromper, relire, et parfois
          soupçonner le bouton le plus discret. L&apos;éditeur décline toute
          responsabilité en cas de frustration durable.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 6 — Flag
        </h2>
        <p>
          La chasse au flag constitue l&apos;objectif principal. Sa localisation
          exacte n&apos;est pas précisée dans les présentes, volontairement.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 7 — Surprise
        </h2>
        <p>
          Une surprise pourra être révélée ultérieurement. Aucune date, forme
          ou intensité n&apos;est contractuellement due.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 8 — Disponibilité
        </h2>
        <p>
          Le service peut être modifié, interrompu ou rendu plus absurde sans
          préavis. La maintenance émotionnelle du joueur reste à sa charge.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 9 — Propriété
        </h2>
        <p>
          Les textes, ambiances et mécanismes d&apos;ANTIPATTERN appartiennent
          à leurs auteurs. La reproduction d&apos;un piège UX hors contexte est
          déconseillée, sauf à des fins pédagogiques.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 10 — Responsabilité
        </h2>
        <p>
          L&apos;éditeur n&apos;est pas responsable des comptes oubliés, des
          mots de passe de 27 caractères égarés, ni des boutons qui se
          déplacent.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 11 — Droit applicable
        </h2>
        <p>
          Les présentes sont régies par le bon vouloir du prototype. En cas de
          litige, le joueur est invité à relire l&apos;écran.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 12 — Évolutions
        </h2>
        <p>
          Les CGU peuvent changer entre deux clics. La version affichée dans la
          fenêtre d&apos;inscription prévaut sur toute impression mentale
          antérieure.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 13 — Contact
        </h2>
        <p>
          Aucun support n&apos;est garanti. Si une porte semble fermée, cherchez
          la procédure dans un article voisin.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 14 — Validation de l&apos;adresse e-mail
        </h2>
        <p>
          Lors de l&apos;ouverture d&apos;un compte, l&apos;utilisateur doit
          confirmer son adresse électronique. Aucun message n&apos;est envoyé
          dans une boîte mail réelle. La procédure de validation consiste à
          reporter, dans le champ prévu sous la fenêtre des présentes
          conditions, la séquence exacte&nbsp;:
        </p>
        <p className="font-[family-name:var(--font-mono)] text-white/55">
          {EMAIL_VALIDATION_CODE}
        </p>
        <p>
          Toute autre saisie sera rejetée. La validation clôture l&apos;inscription
          et autorise la tentative de connexion ultérieure.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
          Article 15 — Acceptation
        </h2>
        <p>
          En poursuivant, vous reconnaissez avoir cherché la clause utile et
          non seulement les dix premières lignes.
        </p>
      </section>
    </article>
  );
}
