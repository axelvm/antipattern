"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { TinderChoice, TinderProfile } from "@/lib/tinderProfiles";

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
  const photoRef = useRef<HTMLImageElement>(null);
  const [cardWidth, setCardWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;

    function syncWidth() {
      if (!photo?.naturalWidth) return;
      const rem = Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const maxHeight = Math.min(window.innerHeight * 0.7, 36 * rem);
      const maxWidth = Math.min(window.innerWidth - 3 * rem, 48 * rem);
      const scale = Math.min(
        1,
        maxHeight / photo.naturalHeight,
        maxWidth / photo.naturalWidth,
      );
      const nextWidth = Math.round(photo.naturalWidth * scale);
      setCardWidth((current) => (current === nextWidth ? current : nextWidth));
    }

    if (photo.complete && photo.naturalWidth) syncWidth();
    else setCardWidth(null);

    photo.addEventListener("load", syncWidth);
    window.addEventListener("resize", syncWidth);
    return () => {
      photo.removeEventListener("load", syncWidth);
      window.removeEventListener("resize", syncWidth);
    };
  }, [profile.photo]);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-white/40">
        {index + 1} / {total}
      </p>
      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#141014] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        style={cardWidth ? { width: cardWidth } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={photoRef}
          src={profile.photo}
          alt=""
          className="block h-auto max-h-[min(70vh,36rem)] max-w-[min(100vw-3rem,48rem)]"
          style={{ width: cardWidth ? "100%" : "auto" }}
        />
        <div className="px-6 py-5">
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            {profile.name.trim() || "Sans nom"}
          </p>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/55">
            {profile.bio.trim() || "Pas encore de bio."}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => onChoose("dislike")}
          className="h-14 w-14 rounded-full border border-white/20 text-sm font-bold text-white/70"
        >
          Non
        </button>
        {onSuperLike ? (
          <button
            type="button"
            onClick={onSuperLike}
            disabled={!canSuperLike}
            className="h-14 w-14 rounded-full bg-[#38bdf8] text-[0.65rem] font-bold text-black disabled:opacity-30"
          >
            Super
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onChoose("like")}
          className="h-14 w-14 rounded-full bg-[#e11d48] text-sm font-bold text-white"
        >
          Oui
        </button>
      </div>
    </div>
  );
}
