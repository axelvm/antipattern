"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  GuillaumeSprite,
  SHIRT_BUTTON_COUNT,
  SHIRT_BUTTONS,
  buttonHotspotStyle,
} from "@/data/guillaumeShirt";
import {
  SOIREE_ITEMS,
  WhiskeyCocaGlass,
  type SceneItemData,
} from "@/data/soireeFurniture";
import { BlindtestPopup } from "@/components/blindtest/BlindtestPopup";
import { SOIREE_QUEST } from "@/lib/quests";

const WHISKEY_NEEDED = 5;

type Popup =
  | { kind: "drink"; item: SceneItemData }
  | { kind: "success"; message: string; resume?: "blindtest" }
  | { kind: "notice"; message: string }
  | { kind: "blindtest" }
  | { kind: "gameover" };

function Tip({
  label,
  show,
}: {
  label: string;
  show: boolean;
}) {
  return (
    <span
      className={`pointer-events-none absolute bottom-[calc(100%+0.4rem)] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap border border-white/15 bg-[#120c08] px-2 py-1 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--lamp)] shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-opacity ${
        show ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
      }`}
    >
      {label}
    </span>
  );
}

function SceneItem({
  item,
  selected,
  onSelect,
  children,
}: {
  item: SceneItemData;
  selected: boolean;
  onSelect: (item: SceneItemData) => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={item.label}
      className="group absolute outline-none transition-transform hover:scale-[1.04] focus-visible:scale-[1.04]"
      style={{
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height,
        zIndex: item.z,
      }}
    >
      <Tip label={item.label} show={selected} />
      <span className="block h-full w-full">{item.draw}</span>
      {children}
    </button>
  );
}

function Overlay({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm border border-[var(--lamp)]/40 bg-[#120c08] px-5 py-6 text-center">
        {children}
      </div>
    </div>
  );
}

export function SoireeRoom() {
  const [openCount, setOpenCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [drunkWhiskey, setDrunkWhiskey] = useState<string[]>([]);
  const [whiskeyDone, setWhiskeyDone] = useState(false);
  const [used, setUsed] = useState<Record<string, boolean>>({});
  const [blindtestIndex, setBlindtestIndex] = useState(0);

  const sceneItems = useMemo(
    () =>
      SOIREE_ITEMS.map((entry) => {
        if (entry.action === "whiskey" && drunkWhiskey.includes(entry.id)) {
          return {
            ...entry,
            label: "Verre vide",
            draw: <WhiskeyCocaGlass empty />,
          };
        }
        return entry;
      }),
    [drunkWhiskey],
  );

  function resetScene() {
    setOpenCount(0);
    setFinished(false);
    setPopup(null);
    setDrunkWhiskey([]);
    setWhiskeyDone(false);
    setUsed({});
    setBlindtestIndex(0);
    setSelected(null);
  }

  function removeButton() {
    setOpenCount((current) => {
      const next = Math.min(current + 1, SHIRT_BUTTON_COUNT);
      if (next >= SHIRT_BUTTON_COUNT) {
        window.setTimeout(() => setFinished(true), 280);
      }
      return next;
    });
  }

  function onSelectItem(item: SceneItemData) {
    if (finished || popup) return;
    setSelected(item.id);

    if (item.action === "whiskey") {
      if (drunkWhiskey.includes(item.id)) return;
      setPopup({ kind: "drink", item });
      return;
    }
    if (item.action === "wine") {
      setPopup({ kind: "drink", item });
      return;
    }
    if (item.action === "heater") {
      if (used.heater) return;
      setUsed((current) => ({ ...current, heater: true }));
      removeButton();
      setPopup({
        kind: "success",
        message: "La température monte, Guillaume retire un bouton",
      });
      return;
    }
    if (item.action === "magazine") {
      if (used.magazine) return;
      setUsed((current) => ({ ...current, magazine: true }));
      removeButton();
      setPopup({
        kind: "success",
        message: "Une photo de Mylène tombe, Guillaume retire un Bouton",
      });
      return;
    }
    if (item.action === "phone") {
      if (used.phone) return;
      setUsed((current) => ({ ...current, phone: true }));
      removeButton();
      setPopup({
        kind: "success",
        message:
          "Un appel arrive : Le boulot ! Une urgence lui donne un coup de chaud",
      });
      return;
    }
    if (item.action === "socks") {
      if (used.socks) return;
      setUsed((current) => ({ ...current, socks: true }));
      removeButton();
      setPopup({
        kind: "success",
        message:
          "Guillaume met les chaussettes et a encore plus chaud, il retire un bouton",
      });
      return;
    }
    if (item.action === "speaker") {
      if (!whiskeyDone) {
        setPopup({
          kind: "notice",
          message: "Ce n'est pas encore l'heure du blind test",
        });
        return;
      }
      setPopup({ kind: "blindtest" });
    }
  }

  function drink(item: SceneItemData) {
    if (item.action === "wine") {
      setPopup({ kind: "gameover" });
      return;
    }
    if (item.action !== "whiskey") return;

    const nextDrunk = drunkWhiskey.includes(item.id)
      ? drunkWhiskey
      : [...drunkWhiskey, item.id];
    setDrunkWhiskey(nextDrunk);

    if (!whiskeyDone && nextDrunk.length >= WHISKEY_NEEDED) {
      setWhiskeyDone(true);
      removeButton();
      setPopup({
        kind: "success",
        message: "Guillaume a bien bu, il retire un bouton",
      });
      return;
    }
    setPopup(null);
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#1a140e]">
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/jeu"
          className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-fog/80 transition-colors hover:text-fog"
        >
          ANTIPATTERN
        </Link>
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-fog/40">
          soirée d&apos;enfer
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 pb-8">
        <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.28em] text-[var(--lamp)]">
          salon · vue du dessus
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.2vw,2.2rem)] font-bold tracking-tight text-fog">
          Guillaume est déjà là.
        </h1>
        <p className="mt-2 max-w-lg text-center text-sm text-fog/65">
          Faites monter la chaleur. Chaque bonne interaction retire un bouton.
        </p>

        <div className="relative mt-5 w-full max-w-5xl overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          <div className="relative aspect-[5/3] w-full">
            <button
              type="button"
              onClick={() => setSelected("floor")}
              aria-label="Parquet"
              className="group absolute inset-0"
              style={{ zIndex: 1 }}
            >
              <Tip label="Parquet" show={selected === "floor"} />
              <svg viewBox="0 0 1000 600" className="h-full w-full">
                <polygon points="0,0 1000,0 1000,600 0,600" fill="#2c2118" />
                <polygon points="0,0 520,0 480,600 0,600" fill="#3d2c1e" />
                <polygon points="520,0 1000,0 1000,600 480,600" fill="#342418" />
                {Array.from({ length: 9 }, (_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={40 + i * 64}
                    x2="1000"
                    y2={18 + i * 64}
                    stroke="#4a3624"
                    strokeWidth="6"
                  />
                ))}
                <polygon points="0,0 1000,0 1000,28 0,40" fill="#24180f" />
                <polygon points="0,0 36,0 28,600 0,600" fill="#1e140c" />
                <polygon points="964,0 1000,0 1000,600 972,600" fill="#1e140c" />
                <polygon points="0,572 1000,560 1000,600 0,600" fill="#1a120b" />
              </svg>
            </button>

            {sceneItems.map((entry) => (
              <SceneItem
                key={entry.id}
                item={entry}
                selected={selected === entry.id}
                onSelect={onSelectItem}
              />
            ))}

            <div
              className="absolute z-[9] aspect-[90/160] h-[42%]"
              style={{
                left: "56%",
                top: "38%",
              }}
            >
              <button
                type="button"
                onClick={() => setSelected("guillaume")}
                aria-label="Guillaume"
                className="group absolute inset-0 outline-none"
              >
                <Tip label="Guillaume" show={selected === "guillaume"} />
                <GuillaumeSprite openCount={openCount} />
              </button>

              <button
                type="button"
                onClick={() => setSelected("shirt")}
                aria-label="Chemise"
                className="group absolute outline-none"
                style={{
                  left: "20%",
                  top: "34%",
                  width: "60%",
                  height: "34%",
                  zIndex: 2,
                }}
              >
                <Tip label="Chemise" show={selected === "shirt"} />
              </button>

              {SHIRT_BUTTONS.map((_, index) => {
                if (index < openCount) return null;
                const id = `button-${index + 1}`;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    aria-label={`Bouton ${index + 1}`}
                    className="group absolute z-[4] rounded-full outline-none"
                    style={buttonHotspotStyle(index)}
                  >
                    <Tip label={`Bouton ${index + 1}`} show={selected === id} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-fog/45">
          boutons {openCount}/{SHIRT_BUTTON_COUNT}
        </p>
      </main>

      {popup?.kind === "drink" ? (
        <Overlay>
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[var(--lamp)]">
            {popup.item.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-fog">
            Boire le contenant&nbsp;?
          </h2>
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => drink(popup.item)}
              className="bg-[var(--lamp)] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
            >
              Boire
            </button>
            <button
              type="button"
              onClick={() => setPopup(null)}
              className="bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
            >
              Laisser
            </button>
          </div>
        </Overlay>
      ) : null}

      {popup?.kind === "success" ? (
        <Overlay>
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[var(--lamp)]">
            succès
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold text-fog">
            {popup.message}
          </h2>
          <button
            type="button"
            onClick={() => {
              if (popup.resume === "blindtest") {
                setPopup({ kind: "blindtest" });
                return;
              }
              setPopup(null);
            }}
            className="mt-6 bg-[var(--lamp)] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
          >
            Continuer
          </button>
        </Overlay>
      ) : null}

      {popup?.kind === "notice" ? (
        <Overlay>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-fog">
            {popup.message}
          </h2>
          <button
            type="button"
            onClick={() => setPopup(null)}
            className="mt-6 bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
          >
            Fermer
          </button>
        </Overlay>
      ) : null}

      {popup?.kind === "blindtest" ? (
        <Overlay>
          <BlindtestPopup
            startIndex={blindtestIndex}
            onClose={() => setPopup(null)}
            onTrackFound={(hasMore) => {
              removeButton();
              setBlindtestIndex((current) => current + 1);
              setPopup({
                kind: "success",
                message:
                  "Guillaume est trop chaud au blind test, il retire un bouton",
                resume: hasMore ? "blindtest" : undefined,
              });
            }}
          />
        </Overlay>
      ) : null}

      {popup?.kind === "gameover" ? (
        <Overlay>
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[#e8a06a]">
            game over
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-fog">
            Guillaume a vomi&nbsp;!
          </h2>
          <button
            type="button"
            onClick={resetScene}
            className="mt-6 bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
          >
            Recommencer
          </button>
        </Overlay>
      ) : null}

      {finished ? (
        <Overlay>
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[var(--lamp)]">
            soirée terminée
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-fog">
            Chemise déboutonnée
          </h2>
          <p className="mt-3 text-sm text-fog/70">Voici le flag&nbsp;:</p>
          <p className="mt-4 break-all font-[family-name:var(--font-mono)] text-sm text-[var(--lamp)]">
            {SOIREE_QUEST.flag}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={resetScene}
              className="bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
            >
              Recommencer
            </button>
            <Link
              href="/jeu#quetes"
              className="inline-block bg-[var(--lamp)] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
            >
              Retour aux quêtes
            </Link>
          </div>
        </Overlay>
      ) : null}
    </div>
  );
}
