import {
  BlindtestCatalogSchema,
  type BlindtestCatalog,
  type BlindtestTrack,
} from "../../types/blindtestTypes";
import type { BlindtestFilterId } from "./filters";
import rawCatalog from "./tracks.json";

export function parseBlindtestCatalog(raw: unknown): BlindtestCatalog {
  const parsed = BlindtestCatalogSchema.safeParse(raw);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join(".") : "catalogue";
        return `${path}: ${issue.message}`;
      })
      .join("; ");
    throw new Error(`Catalogue blindtest invalide: ${details}`);
  }
  return parsed.data;
}

const catalog = parseBlindtestCatalog(rawCatalog);

export function getBlindtestTracks(): readonly BlindtestTrack[] {
  return catalog.tracks;
}

export function getBlindtestTrackById(id: string): BlindtestTrack | undefined {
  return catalog.tracks.find((track) => track.id === id);
}

export function getFilterForTrack(id: string): BlindtestFilterId {
  const track = getBlindtestTrackById(id);
  if (!track) {
    throw new Error(`Titre blindtest introuvable: ${id}`);
  }
  return track.filter;
}
