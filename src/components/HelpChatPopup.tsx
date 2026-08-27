"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  HELP_REQUEST_GUILLAUME_MESSAGE,
  showGuillaumePopup,
} from "@/services/guillaumePopup";
import { asksAboutSandales } from "@/lib/quests";

const APPEAR_EVERY_MS = 20_000;
const SLIDE_IN_MS = 3000;
const SLIDE_OUT_MS = 15000;
const SCALE_TO_FULL_MS = 25_000;

type PopupPhase = "hidden" | "entering" | "open" | "leaving";

export function HelpChatPopup() {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<PopupPhase>("hidden");
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [growing, setGrowing] = useState(false);
  const [question, setQuestion] = useState("");
  const hasQuestion = question.trim().length > 0;
  const sandalesHint = asksAboutSandales(question);

  useEffect(() => {
    if (phase !== "hidden") return;

    const timeoutId = window.setTimeout(() => {
      setScaleX(1);
      setScaleY(1);
      setGrowing(false);
      setQuestion("");
      setPhase("entering");
    }, APPEAR_EVERY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== "entering") return;

    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setPhase("open");
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [phase]);

  useEffect(() => {
    if (phase !== "open") return;

    let rafId = 0;
    let startTime: number | null = null;
    let targetX = 1;
    let targetY = 1;

    const startId = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;

      const rect = panel.getBoundingClientRect();
      targetX = Math.max(1, window.innerWidth / rect.width);
      targetY = Math.max(1, window.innerHeight / rect.height);
      setGrowing(true);

      const tick = (now: number) => {
        if (startTime == null) startTime = now;
        const progress = Math.min(1, (now - startTime) / SCALE_TO_FULL_MS);
        setScaleX(1 + (targetX - 1) * progress);
        setScaleY(1 + (targetY - 1) * progress);
        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
        }
      };

      rafId = window.requestAnimationFrame(tick);
    }, SLIDE_IN_MS);

    return () => {
      window.clearTimeout(startId);
      window.cancelAnimationFrame(rafId);
    };
  }, [phase]);

  function popupTransform() {
    if (phase === "entering") {
      return "translateY(120%)";
    }

    if (phase === "leaving") {
      return `translateX(100vw) scale(${scaleX}, ${scaleY})`;
    }

    return `translateY(0) scale(${scaleX}, ${scaleY})`;
  }

  if (phase === "hidden") return null;

  const leaving = phase === "leaving";

  return (
    <aside
      ref={panelRef}
      role="dialog"
      aria-labelledby={titleId}
      className="fixed bottom-4 right-4 z-[70] w-[min(20rem,calc(100vw-1.5rem))] origin-bottom-right overflow-hidden border border-white/10 bg-[#050505] px-4 py-3.5 text-[#e8eef1] shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
      style={{
        transform: popupTransform(),
        transition: leaving
          ? `transform ${SLIDE_OUT_MS}ms linear`
          : growing
            ? "none"
            : `transform ${SLIDE_IN_MS}ms ease-out`,
      }}
      onTransitionEnd={(event) => {
        if (event.propertyName !== "transform") return;
        if (phase !== "leaving") return;
        setPhase("hidden");
        setScaleX(1);
        setScaleY(1);
        setGrowing(false);
      }}
    >
      <p className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.22em] text-white/40">
        assistance
      </p>
      <h2
        id={titleId}
        className="mt-1.5 font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-white"
      >
        Besoin d&apos;un coup de main&nbsp;?
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-white/55">
        Un assistant peut vous aider à avancer. Dites simplement ce qui bloque.
      </p>

      <label className="mt-3 block">
        <span className="sr-only">Votre question</span>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Posez votre question…"
          className="w-full border border-white/15 bg-black px-2.5 py-2 text-xs text-white outline-none placeholder:text-white/25"
        />
      </label>

      {sandalesHint ? (
        <p className="mt-2.5 text-xs leading-relaxed text-white/55">
          Guillaume a égaré quelque chose. L&apos;épreuve se trouve ici&nbsp;:{" "}
          <Link
            href="/sandale"
            className="text-[var(--lamp)] underline-offset-2 hover:underline"
          >
            /sandale
          </Link>
        </p>
      ) : null}

      {hasQuestion && !sandalesHint ? (
        <button
          type="button"
          onClick={() => {
            showGuillaumePopup(HELP_REQUEST_GUILLAUME_MESSAGE);
            setQuestion("");
            setPhase("leaving");
          }}
          className="mt-2.5 w-full bg-[#c01212] px-3 py-2 font-[family-name:var(--font-display)] text-xs font-bold tracking-wide text-white outline-none"
        >
          Soumettre la question
        </button>
      ) : null}

      <div className="mt-3 flex items-end justify-between gap-3">
        <button
          type="button"
          onClick={() => setPhase("leaving")}
          className="cursor-default pb-0.5 font-[family-name:var(--font-mono)] text-[0.65rem] text-white/25 outline-none"
        >
          plus tard
        </button>
      </div>
    </aside>
  );
}
