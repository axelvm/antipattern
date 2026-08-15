import { EMAIL_VALIDATION_PATH } from "@/services/emailValidation";

/**
 * Mur de CGU volontairement illisible.
 * La procédure de validation e-mail est enfouie dans le texte (lien « cliquez ici »).
 */
export function CguContent() {
  return (
    <article className="cgu-wall">
      <h1 className="cgu-wall__title">Conditions générales d&apos;utilisation</h1>

      <div className="cgu-wall__body">
        <p>
          <span className="cgu-y">
            Les présentes conditions générales d&apos;utilisation régissent
            l&apos;ensemble des accès, consultations, inscriptions,
            connexions, navigations, tentatives, erreurs et persistances
            relatifs au site-jeu ANTIPATTERN.{" "}
          </span>
          <span className="cgu-r">
            Toute personne qui poursuit l&apos;usage du service est réputée
            avoir pris connaissance du présent texte dans son intégralité,
            y compris les passages peu contrastés, les clauses de faible
            corps typographique et les formulations volontairement denses.{" "}
          </span>
          <span className="cgu-y">
            L&apos;éditeur se réserve le droit de modifier, suspendre,
            contredire ou complexifier le service sans préavis, notification
            préalable, ni justification proportionnée.{" "}
          </span>
          <span className="cgu-r">
            Le joueur reconnaît que l&apos;expérience proposée repose sur des
            interfaces atypiques, des contrôles inhabituels et des parcours
            dont la découvrabilité n&apos;est pas garantie.{" "}
          </span>
          <span className="cgu-y">
            L&apos;ouverture d&apos;un compte implique la fourniture d&apos;un
            nom, d&apos;un prénom, d&apos;une adresse e-mail et d&apos;un mot
            de passe conforme aux exigences techniques du moment, lesquelles
            peuvent être dispersées hors de ce document.{" "}
          </span>
          <span className="cgu-r">
            Le mot de passe est personnel, non cessible, non affichable en
            clair par l&apos;éditeur, et sa saisie répétée constitue une
            mesure de preuve d&apos;humanité au sens du prototype.{" "}
          </span>
          <span className="cgu-y">
            Toute opération de copie, collage, importation automatique ou
            remplissage assisté entre champs de confirmation peut être
            interprétée comme un comportement non conforme.{" "}
          </span>
          <span className="cgu-r">
            Les données collectées dans la version actuelle demeurent
            localisées dans l&apos;environnement du navigateur du joueur ;
            aucune promesse de conservation, de synchronisation ou de
            récupération n&apos;est attachée au service.{" "}
          </span>
          <span className="cgu-y">
            L&apos;éditeur décline toute responsabilité en cas de perte de
            session, d&apos;oubli d&apos;identifiants, de déplacement
            aléatoire d&apos;éléments d&apos;interface, ou de fatigue liée à
            la lecture du présent document.{" "}
          </span>
          <span className="cgu-r">
            La participation à la chasse au flag constitue l&apos;objectif
            principal annoncé ; sa localisation, son format et les conditions
            de sa révélation ne sont pas contractuellement détaillés ici.{" "}
          </span>
          <span className="cgu-y">
            Une surprise pourra être introduite ultérieurement sans que cela
            crée un droit acquis, une date ferme, ni une obligation de
            résultat pour l&apos;éditeur.{" "}
          </span>
          <span className="cgu-r">
            Le service peut être indisponible, partiellement disponible, ou
            disponible sous une forme plus absurde que la précédente, sans
            que le joueur puisse exiger un niveau de confort particulier.{" "}
          </span>
          <span className="cgu-y">
            Les contenus textuels, mécaniques, ambiances et pièges
            d&apos;interaction restent la propriété de leurs auteurs ;
            toute reproduction hors contexte pédagogique est déconseillée.{" "}
          </span>
          <span className="cgu-r">
            En cas de litige relatif à l&apos;interprétation des présentes,
            le joueur est invité à relire l&apos;écran, puis à relire encore,
            puis à chercher la clause utile parmi les formulations voisines.{" "}
          </span>
          <span className="cgu-y">
            Les présentes peuvent évoluer entre deux affichages ; la version
            visible dans la fenêtre d&apos;inscription prévaut sur toute
            version mémorisée, imprimée mentalement ou partiellement lue.{" "}
          </span>
          <span className="cgu-r">
            Aucun support utilisateur n&apos;est garanti. Les demandes
            d&apos;aide, de clarification ou de contraste amélioré pourront
            rester sans réponse.{" "}
          </span>
          <span className="cgu-y">
            L&apos;accès aux fonctionnalités de jeu après inscription peut
            dépendre d&apos;étapes supplémentaires de confirmation dont la
            procédure n&apos;est pas nécessairement signalée de manière
            saillante.{" "}
          </span>
          <span className="cgu-r">
            Le joueur accepte que certains boutons n&apos;apparaissent
            qu&apos;après remplissage de champs, que leur position puisse
            varier, et que plusieurs activations soient requises avant
            transmission.{" "}
          </span>
          <span className="cgu-y">
            Toute tentative de contournement des contrôles d&apos;humanité,
            y compris par automatisation, scripts ou assistance externe, est
            réputée contraire à l&apos;esprit du service.{" "}
          </span>
          <span className="cgu-r">
            L&apos;éditeur ne garantit pas que les messages d&apos;erreur
            soient exhaustifs, simultanés ou pédagogiques ; une seule
            information peut être révélée à la fois.{" "}
          </span>
          <span className="cgu-y">
            Les intitulés de champs, libellés de boutons et microcopies
            peuvent être trompeurs, incomplets ou volontairement discrets
            sans constituer un vice du consentement au sens du présent jeu.{" "}
          </span>
          <span className="cgu-r">
            Le fait de quitter une page en cours de saisie n&apos;ouvre droit
            à aucune restauration automatique des informations perdues.{" "}
          </span>
          <span className="cgu-y">
            Les cookies, stockages locaux et mémoires de session éventuellement
            utilisés le sont à des fins de prototype et peuvent être effacés
            sans préavis par le joueur ou par l&apos;environnement
            d&apos;exécution.{" "}
          </span>
          <span className="cgu-r">
            L&apos;utilisateur s&apos;engage à ne pas perturber le
            fonctionnement du service au-delà de ce que le service lui-même
            perturbe déjà délibérément.{" "}
          </span>
          <span className="cgu-y">
            Toute clause du présent document s&apos;interprète dans le sens
            le plus compatible avec la poursuite du jeu, y compris lorsque ce
            sens est peu confortable.{" "}
          </span>
          <span className="cgu-r">
            Si une disposition était tenue pour inapplicable, les autres
            dispositions resteraient en vigueur, y compris celles rédigées en
            jaune fluo sur fond sombre.{" "}
          </span>
          <span className="cgu-y">
            Le joueur reconnaît avoir été informé que la lisibilité n&apos;est
            pas un critère d&apos;opposabilité dans le cadre de cette
            expérience.{" "}
          </span>
          <span className="cgu-r">
            Les délais de réponse, de validation et de progression dépendent
            de la persévérance du joueur autant que de l&apos;état du
            prototype.{" "}
          </span>
          <span className="cgu-y">
            Aucune compensation n&apos;est due en cas de sentiment
            d&apos;injustice interface, de bouton fuyant, ou de formulaire
            exigeant une saisie triple.{" "}
          </span>
          <span className="cgu-r">
            L&apos;éditeur peut introduire de nouvelles salles, règles ou
            exigences sans mettre à jour de manière visible le présent
            document.{" "}
          </span>
          <span className="cgu-y">
            La poursuite de la navigation vaut acceptation successive des
            évolutions, même non relues.{" "}
          </span>
          <span className="cgu-r">
            Les références à un « flag », à une « surprise » ou à une « salle »
            sont descriptives et ne créent pas d&apos;obligation de contenu
            permanent.{" "}
          </span>
          <span className="cgu-y">
            Toute demande de transcription accessible, de mode contraste élevé
            ou de synthèse vocale pourra être traitée comme hors périmètre du
            prototype actuel.{" "}
          </span>
          <span className="cgu-r">
            Le joueur reste seul responsable de la confidentialité de ses
            identifiants et de la qualité de sa mémoire à vingt-sept
            caractères.{" "}
          </span>
          <span className="cgu-y">
            Les liens internes éventuellement présents peuvent mener à des
            pages utiles, inutiles, ou simplement atmosphériques.{" "}
          </span>
          <span className="cgu-r">
            L&apos;absence de titre intermédiaire dans le corps du texte ne
            signifie pas l&apos;absence de clauses ; elle signifie seulement
            que vous devez chercher autrement.{" "}
          </span>
          <span className="cgu-y">
            En validant un compte, le joueur déclare disposer de la capacité
            à supporter une certaine dose d&apos;ambiguïté procedurale.{" "}
          </span>
          <span className="cgu-r">
            Les présentes conditions constituent l&apos;intégralité de
            l&apos;accord relatif à l&apos;usage du service, sous réserve des
            messages d&apos;interface qui pourraient les contredire pour des
            raisons ludiques.{" "}
          </span>
          <span className="cgu-y">
            Toute tolérance de l&apos;éditeur à l&apos;égard d&apos;un
            manquement ne saurait valoir renonciation définitive à se prévaloir
            d&apos;autres manquements.{" "}
          </span>
          <span className="cgu-r">
            Le droit applicable est celui du prototype en cours
            d&apos;exécution ; le for compétent est l&apos;écran devant vous.{" "}
          </span>
          <span className="cgu-y">
            Si vous lisez encore, vous êtes probablement le public cible.{" "}
          </span>
          <span className="cgu-r">
            Les exemples, illustrations et formulations humoristiques n&apos;ont
            pas de valeur normative inférieure aux formulations sérieuses,
            faute de distinction typographique fiable.{" "}
          </span>
          <span className="cgu-y">
            L&apos;utilisateur s&apos;interdit de prétendre n&apos;avoir pas
            vu une information au seul motif qu&apos;elle était rouge sur fond
            sombre ou jaune sur zone saturée.{" "}
          </span>
          <span className="cgu-r">
            Les durées d&apos;affichage des fenêtres modales, iframes et
            messages de chargement peuvent varier selon l&apos;humeur du
            chronomètre interne.{" "}
          </span>
          <span className="cgu-y">
            Toute interruption de connexion pendant une inscription peut
            nécessiter de recommencer depuis une étape antérieure non
            mémorisée.{" "}
          </span>
          <span className="cgu-r">
            Le service peut enregistrer localement des états de progression
            partiels sans en informer clairement le joueur.{" "}
          </span>
          <span className="cgu-y">
            Les libellés « annuler », « confirmer », « créer » et « se
            connecter » doivent être lus avec une prudence particulière.{" "}
          </span>
          <span className="cgu-r">
            En cas de conflit entre une aide contextuelle et le présent texte,
            aucun des deux ne gagne automatiquement.{" "}
          </span>
          <span className="cgu-y">
            Vous acceptez que la difficulté de lecture fasse partie du
            dispositif.{" "}
          </span>
          <span className="cgu-r">
            Fin des dispositions générales. Place à la clause de validation
            électronique, elle aussi présentée sans relief.{" "}
          </span>
          <span className="cgu-y">
            Section relative à la validation de l&apos;adresse e-mail : lors de
            l&apos;inscription, aucun courrier n&apos;est expédié vers une
            boîte mail réelle. Pour valider votre adresse e-mail,{" "}
          </span>
          <a
            href={EMAIL_VALIDATION_PATH}
            target="_top"
            rel="noopener"
            className="cgu-r cgu-wall__link"
          >
            cliquez ici
          </a>
          <span className="cgu-y">
            {" "}
            : vous accéderez à une page où vous devrez réécrire votre e-mail
            puis valider. Le bouton OK se comporte comme le contrôle d&apos;humanité
            de connexion — position aléatoire, trois activations requises.{" "}
          </span>
          <span className="cgu-r">
            Sans cette validation, le compte n&apos;est pas créé. Toute
            adresse resaisie incorrecte sera rejetée.{" "}
          </span>
          <span className="cgu-y">
            En poursuivant, vous reconnaissez avoir parcouru le document, y
            compris les passages que vous auriez préféré ne pas lire.{" "}
          </span>
          <span className="cgu-r">
            Dernière ligne utile ou inutile selon votre persévérance :
            l&apos;acceptation des présentes est réputée parfaite dès lors que
            le compte est effectivement créé après validation électronique.
          </span>
        </p>
      </div>
    </article>
  );
}
