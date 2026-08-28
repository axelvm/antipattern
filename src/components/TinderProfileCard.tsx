"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import {
  splitProfileName,
  type TinderChoice,
  type TinderProfile,
} from "@/lib/tinderProfiles";

const SWIPE_THRESHOLD = 108;
const EXIT_MS = 280;

type ExitAction = TinderChoice | "super";

function NopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8" fill="none">
      <path
        d="M12 20.4s-6.4-4.1-8.9-7.8C1.4 10.1 2.2 6.6 5 5.5 6.9 4.8 9 5.5 12 8c3-2.5 5.1-3.2 7-2.5 2.8 1.1 3.6 4.6 1.9 7.1-2.5 3.7-8.9 7.8-8.9 7.8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="currentColor">
      <path d="M12 2.6l2.65 6.38 6.95.6-5.27 4.57 1.6 6.85L12 17.7 6.07 21l1.6-6.85L2.4 9.58l6.95-.6L12 2.6z" />
    </svg>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TinderProfileCard({
  profile,
  index,
  total,
  onChoose,
  onSuperLike,
  canSuperLike = false,
}: {
  profile: TinderProfile;
  index: number;
  total: number;
  onChoose: (choice: TinderChoice) => void;
  onSuperLike?: () => void;
  canSuperLike?: boolean;
}) {
  const { name, age } = splitProfileName(profile.name);
  const photoRef = useRef<HTMLImageElement>(null);
  const drag = useRef({
    active: false,
    originX: 0,
    originY: 0,
    x: 0,
    y: 0,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState<ExitAction | null>(null);
  const leavingRef = useRef(false);
  const [cardSize, setCardSize] = useState<{ w: number; h: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;

    function syncSize() {
      if (!photo?.naturalWidth || !photo.naturalHeight) return;
      const rem = Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const maxHeight = Math.min(window.innerHeight * 0.78, 46 * rem);
      const maxWidth = Math.min(window.innerWidth - 3 * rem, 40 * rem);
      const scale = Math.min(
        maxHeight / photo.naturalHeight,
        maxWidth / photo.naturalWidth,
      );
      const w = Math.round(photo.naturalWidth * scale);
      const h = Math.round(photo.naturalHeight * scale);
      setCardSize((current) =>
        current?.w === w && current.h === h ? current : { w, h },
      );
    }

    if (photo.complete && photo.naturalWidth) syncSize();
    else setCardSize(null);

    photo.addEventListener("load", syncSize);
    window.addEventListener("resize", syncSize);
    return () => {
      photo.removeEventListener("load", syncSize);
      window.removeEventListener("resize", syncSize);
    };
  }, [profile.photo]);

  useEffect(() => {
    leavingRef.current = false;
    setLeaving(null);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
  }, [profile.id]);

  function commit(action: ExitAction) {
    if (leavingRef.current) return;
    if (action === "super" && !onSuperLike) return;
    leavingRef.current = true;
    setDragging(false);
    setLeaving(action);
    const delay = prefersReducedMotion() ? 0 : EXIT_MS;
    window.setTimeout(() => {
      if (action === "super") onSuperLike?.();
      else onChoose(action);
    }, delay);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (leavingRef.current || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      active: true,
      originX: event.clientX,
      originY: event.clientY,
      x: 0,
      y: 0,
    };
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || leavingRef.current) return;
    const x = event.clientX - drag.current.originX;
    const y = event.clientY - drag.current.originY;
    drag.current.x = x;
    drag.current.y = y;
    setOffset({ x, y });
  }

  function onPointerUp() {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    const { x, y } = drag.current;
    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (
      onSuperLike &&
      canSuperLike &&
      y < -SWIPE_THRESHOLD &&
      absY > absX
    ) {
      commit("super");
      return;
    }
    if (absX >= SWIPE_THRESHOLD) {
      commit(x > 0 ? "like" : "dislike");
      return;
    }
    setOffset({ x: 0, y: 0 });
  }

  const likeOpacity =
    leaving === "like"
      ? 1
      : leaving
        ? 0
        : Math.min(1, Math.max(0, offset.x / 90));
  const nopeOpacity =
    leaving === "dislike"
      ? 1
      : leaving
        ? 0
        : Math.min(1, Math.max(0, -offset.x / 90));
  const superOpacity =
    !onSuperLike
      ? 0
      : leaving === "super"
        ? 1
        : leaving
          ? 0
          : Math.abs(offset.y) > Math.abs(offset.x)
            ? Math.min(1, Math.max(0, -offset.y / 90))
            : 0;

  const exitTransform =
    leaving === "like"
      ? "translate(140vw, 32px) rotate(28deg)"
      : leaving === "dislike"
        ? "translate(-140vw, 32px) rotate(-28deg)"
        : leaving === "super"
          ? "translate(0, -120vh) rotate(0deg)"
          : null;

  return (
    <div className="flex w-full flex-col items-center">
      <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-white/40">
        {index + 1} / {total}
      </p>

      <div
        className={`relative w-full ${cardSize ? "" : "max-w-[40rem]"}`}
        style={cardSize ? { width: cardSize.w } : undefined}
      >
        <div
          aria-hidden
          className="absolute inset-0 translate-y-3 scale-[0.94] rounded-[1.15rem] bg-white/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 translate-y-1.5 scale-[0.97] rounded-[1.15rem] bg-white/15"
        />

        <div
          role="group"
          aria-label={`${name}${age ? `, ${age}` : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`relative z-10 flex w-full touch-none select-none flex-col overflow-hidden rounded-[1.15rem] bg-[#1a1216] shadow-[0_18px_50px_rgba(0,0,0,0.55)] ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            transform:
              exitTransform ??
              `translate(${offset.x}px, ${offset.y}px) rotate(${offset.x / 14}deg)`,
            transition: dragging
              ? "none"
              : `transform ${EXIT_MS}ms ease-out`,
          }}
        >
          <div
            className={`relative w-full ${cardSize ? "" : "h-[min(78vh,46rem)]"}`}
            style={cardSize ? { height: cardSize.h } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={photoRef}
              src={profile.photo}
              alt=""
              draggable={false}
              className="h-full w-full object-contain"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-3 right-3 top-3 h-[3px] rounded-full bg-white/80"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute left-5 top-14 rotate-[-18deg] rounded-md border-[3.5px] px-3 py-1 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[0.18em] text-[#2ee6a6]"
              style={{
                borderColor: "#2ee6a6",
                opacity: likeOpacity,
              }}
            >
              LIKE
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute right-5 top-14 rotate-[18deg] rounded-md border-[3.5px] px-3 py-1 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[0.18em] text-[#ff4458]"
              style={{
                borderColor: "#ff4458",
                opacity: nopeOpacity,
              }}
            >
              NOPE
            </div>
            {onSuperLike ? (
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-28 left-1/2 -translate-x-1/2 rounded-md border-[3.5px] px-3 py-1 font-[family-name:var(--font-display)] text-lg font-extrabold tracking-[0.16em] text-[#3ca4ff]"
                style={{
                  borderColor: "#3ca4ff",
                  opacity: superOpacity,
                }}
              >
                SUPER LIKE
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent px-5 pb-5 pt-16">
              <p className="font-[family-name:var(--font-display)] text-[1.7rem] font-bold leading-tight text-white">
                {name}
                {age ? (
                  <span className="ml-2 text-[1.35rem] font-medium text-white/90">
                    {age}
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="whitespace-pre-line text-sm leading-relaxed text-white/80">
              {profile.bio.trim() || "Pas encore de bio."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          disabled={Boolean(leaving)}
          onClick={() => commit("dislike")}
          aria-label="Nope"
          className="flex h-16 w-16 items-center justify-center rounded-full border-[2.5px] border-[#ff4458] text-[#ff4458] transition hover:scale-105 disabled:opacity-40"
        >
          <NopeIcon />
        </button>
        {onSuperLike ? (
          <button
            type="button"
            disabled={Boolean(leaving) || !canSuperLike}
            onClick={() => commit("super")}
            aria-label="Super like"
            className="flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-[#3ca4ff] text-[#3ca4ff] transition hover:scale-105 disabled:opacity-40"
          >
            <StarIcon />
          </button>
        ) : null}
        <button
          type="button"
          disabled={Boolean(leaving)}
          onClick={() => commit("like")}
          aria-label="Like"
          className="flex h-16 w-16 items-center justify-center rounded-full border-[2.5px] border-[#2ee6a6] text-[#2ee6a6] transition hover:scale-105 disabled:opacity-40"
        >
          <HeartIcon />
        </button>
      </div>
    </div>
  );
}
