export const DICKHEAD_IMAGES = [
  "/dickheads/guillaume1.webp",
  "/dickheads/guillaume2.webp",
  "/dickheads/guillaume3.webp",
  "/dickheads/guillaume4.webp",
  "/dickheads/guillaume5.webp",
  "/dickheads/guillaume6.webp",
  "/dickheads/guillaume7.webp",
  "/dickheads/guillaume8.webp",
  "/dickheads/tom.jpg",
  "/dickheads/sandalles.webp",
] as const;

export type DickheadImage = (typeof DICKHEAD_IMAGES)[number];
export type DickheadKind = "guillaume" | "tom" | "sandales";

export const GUILLAUME_COUCOU_MESSAGE =
  "petit coucou de Guillaume au passage !";

export const TOM_WATCH_MESSAGE =
  "Le dieu de l'amour vous surveille ne craignez rien !";

export const SANDALES_HUNT_MESSAGE =
  "Guillaume a perdu ses sandales. Aide guillaume à trouver ses sandales";

export function dickheadKind(src: string): DickheadKind {
  const fileName = src.split("/").pop()?.toLowerCase() ?? "";
  if (fileName.includes("guillaume")) return "guillaume";
  if (fileName === "tom.jpg") return "tom";
  if (fileName.includes("sandall")) return "sandales";
  return "guillaume";
}

export function messageForDickhead(src: string): string {
  const kind = dickheadKind(src);

  if (kind === "tom") return TOM_WATCH_MESSAGE;
  if (kind === "sandales") return SANDALES_HUNT_MESSAGE;
  return GUILLAUME_COUCOU_MESSAGE;
}

function pickFrom(pool: readonly string[]) {
  return pool[Math.floor(Math.random() * pool.length)] as DickheadImage;
}

const TOM_WEIGHT = 4;
const SANDALES_WEIGHT = 4;
const GUILLAUME_WEIGHT = 1;

export function pickDickheadImage(): DickheadImage {
  const weighted: DickheadImage[] = [];

  for (const src of DICKHEAD_IMAGES) {
    const kind = dickheadKind(src);
    const copies =
      kind === "tom" ? TOM_WEIGHT : kind === "sandales" ? SANDALES_WEIGHT : GUILLAUME_WEIGHT;
    for (let i = 0; i < copies; i++) weighted.push(src);
  }

  return pickFrom(weighted);
}

export function pickGuillaumeImage(): DickheadImage {
  const guillaumeImages = DICKHEAD_IMAGES.filter((src) =>
    dickheadKind(src) === "guillaume",
  );
  return pickFrom(guillaumeImages);
}
