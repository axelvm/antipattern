"use client";

import { useEffect, useId, useState } from "react";
import {
  HELP_REQUEST_GUILLAUME_MESSAGE,
  showGuillaumePopup,
} from "@/services/guillaumePopup";

const APPEAR_EVERY_MS = 20_000;
const SLIDE_IN_MS = 3000;
const SLIDE_OUT_MS = 15000;

type PopupPhase = "hidden" | "entering" | "open" | "leaving";

function popupTransform(phase: PopupPhase, expanded: boolean) {
  if (phase === "entering") {
    return "translateY(120%)";
  }

  if (phase === "leaving") {
    return "translateX(100vw)";
  }

  if (expanded) {
    return "translateY(0) scale(1.35)";
  }

  return "translateY(0) scale(1)";
}

export function HelpChatPopup() {
  const titleId = useId();
  const [phase, setPhase] = useState<PopupPhase>("hidden");
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const hasQuestion = question.trim().length > 0;

  useEffect(() => {
    if (phase !== "hidden") return;

    const timeoutId = window.setTimeout(() => {
      setExpanded(false);
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

  if (phase === "hidden") return null;

  const leaving = phase === "leaving";

  return (
    <aside
      role="dialog"
      aria-labelledby={titleId}
      className="fixed bottom-4 right-4 z-[70] w-[min(20rem,calc(100vw-1.5rem))] origin-bottom border border-white/10 bg-[#050505] px-4 py-3.5 text-[#e8eef1] shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
      style={{
        transform: popupTransform(phase, expanded),
        transition: leaving
          ? `transform ${SLIDE_OUT_MS}ms linear`
          : `transform ${SLIDE_IN_MS}ms ease-out`,
      }}
      onTransitionEnd={(event) => {
        if (event.propertyName !== "transform") return;
        if (phase !== "leaving") return;
        setPhase("hidden");
        setExpanded(false);
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

      {hasQuestion ? (
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

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="bg-[#1d4ed8] px-3 py-2 font-[family-name:var(--font-display)] text-xs font-bold tracking-wide text-white outline-none"
        >
          {expanded ? "Réduire" : "Agrandir"}
        </button>
      </div>
    </aside>
  );
}
