"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SANDAL_SPRITE_ART, SANDAL_SPRITE_IMAGE } from "@/data/sandalSprite";
import { SANDALES_QUEST } from "@/lib/quests";

const ROWS = 16;
const COLS = 72;
const TICK_MS = 32;
const SCROLL_STEP = 2;
const SPAWN_AHEAD_COLS = 6;

const SPRITE_ROWS = SANDAL_SPRITE_ART.length;
const SPRITE_COLS = Math.max(...SANDAL_SPRITE_ART.map((line) => line.length), 1);

function groundRowAt(seed: number) {
  const hill = Math.round(2 + Math.sin(seed / 6) * 2 + Math.cos(seed / 13) * 1.5);
  return ROWS - 4 - Math.max(0, hill);
}

function landscapeChar(row: number, seed: number) {
  const ground = groundRowAt(seed);

  if (row < ground - 3) {
    if ((seed * 13 + row * 7) % 29 === 0) return ".";
    if ((seed * 5 + row) % 41 === 0) return "*";
    return " ";
  }
  if (row === ground - 3) return (seed + row) % 11 === 0 ? "^" : " ";
  if (row === ground - 2) return seed % 7 === 0 ? "~" : " ";
  if (row === ground - 1) return "_";
  if (row === ground) return "/\\/\\".charAt(Math.abs(seed) % 4);
  return "#";
}

function stampSprite(grid: string[][], screenCol: number, screenRow: number) {
  for (let row = 0; row < SPRITE_ROWS; row += 1) {
    const destRow = screenRow + row;
    if (destRow < 0 || destRow >= ROWS) continue;
    const artLine = SANDAL_SPRITE_ART[row] ?? "";
    for (let col = 0; col < artLine.length; col += 1) {
      const destCol = screenCol + col;
      if (destCol < 0 || destCol >= COLS) continue;
      const glyph = artLine[col];
      if (glyph && glyph !== " ") grid[destRow][destCol] = glyph;
    }
  }
}

function buildFrame(
  offset: number,
  sandalWorldX: number | null,
  stampAscii: boolean,
) {
  const grid: string[][] = [];
  for (let row = 0; row < ROWS; row += 1) {
    const line: string[] = [];
    for (let col = 0; col < COLS; col += 1) {
      line.push(landscapeChar(row, offset + col));
    }
    grid.push(line);
  }

  if (stampAscii && sandalWorldX != null) {
    const screenCol = sandalWorldX - offset;
    const ground = groundRowAt(sandalWorldX + Math.floor(SPRITE_COLS / 2));
    const screenRow = ground - SPRITE_ROWS + 1;
    stampSprite(grid, screenCol, screenRow);
  }

  return grid.map((line) => line.join("")).join("\n");
}

function sandalGeometry(offset: number, sandalWorldX: number) {
  const screenCol = sandalWorldX - offset;
  const ground = groundRowAt(sandalWorldX + Math.floor(SPRITE_COLS / 2));
  const screenRow = Math.max(0, ground - SPRITE_ROWS + 1);
  const visible = screenCol < COLS && screenCol + SPRITE_COLS > 0;
  return { screenCol, screenRow, visible };
}

export function SandaleAsciiGame() {
  const [offset, setOffset] = useState(0);
  const [sandalWorldX, setSandalWorldX] = useState<number | null>(COLS + SPAWN_AHEAD_COLS);
  const [spriteIsImage, setSpriteIsImage] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setOffset((current) => current + SCROLL_STEP);
    }, TICK_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- respawn tied to scroll offset */
    if (won) return;
    if (sandalWorldX == null) {
      setSandalWorldX(offset + COLS + SPAWN_AHEAD_COLS);
      return;
    }
    if (sandalWorldX + SPRITE_COLS < offset) {
      setSandalWorldX(offset + COLS + SPAWN_AHEAD_COLS);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [offset, sandalWorldX, won]);

  const geometry =
    sandalWorldX == null ? null : sandalGeometry(offset, sandalWorldX);

  const landscape = useMemo(
    () => buildFrame(offset, sandalWorldX, !spriteIsImage && !won),
    [offset, sandalWorldX, spriteIsImage, won],
  );

  function catchSandal() {
    setSandalWorldX(null);
    setWon(true);
  }

  return (
    <div className="relative w-full max-w-4xl overflow-hidden border border-white/10 bg-black">
      {/* Charge le sprite image dès que le fichier est déposé dans public/sandale/ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SANDAL_SPRITE_IMAGE}
        alt=""
        className="hidden"
        onLoad={() => setSpriteIsImage(true)}
        onError={() => setSpriteIsImage(false)}
      />

      <pre className="overflow-hidden p-3 font-[family-name:var(--font-mono)] text-[10px] leading-[1.15] text-[var(--lamp)] sm:text-xs">
        {landscape}
      </pre>

      {geometry?.visible && !won ? (
        <button
          type="button"
          onClick={catchSandal}
          aria-label="Ramasser la sandale"
          className="absolute cursor-pointer border-0 bg-transparent p-0 outline-none"
          style={{
            left: `calc(0.75rem + ${geometry.screenCol}ch)`,
            top: `calc(0.75rem + ${geometry.screenRow}lh)`,
            width: spriteIsImage ? "auto" : `${SPRITE_COLS}ch`,
            height: spriteIsImage ? "auto" : `${SPRITE_ROWS}lh`,
          }}
        >
          {spriteIsImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={SANDAL_SPRITE_IMAGE}
              alt=""
              className="block h-[4.2lh] w-auto max-w-none"
              draggable={false}
            />
          ) : null}
        </button>
      ) : null}

      {won ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-sm border border-[var(--lamp)]/40 bg-[#120c08] px-5 py-6 text-center">
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] text-[var(--lamp)]">
              victoire
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-fog">
              Sandale trouvée
            </h2>
            <p className="mt-3 text-sm text-fog/70">
              Guillaume te remercie. Voici le flag&nbsp;:
            </p>
            <p className="mt-4 break-all font-[family-name:var(--font-mono)] text-sm text-[var(--lamp)]">
              {SANDALES_QUEST.flag}
            </p>
            <Link
              href="/jeu#quetes"
              className="mt-6 inline-block bg-[var(--lamp)] px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-black"
            >
              Retour aux quêtes
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
