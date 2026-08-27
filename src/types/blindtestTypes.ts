import * as z from "zod";
import {
  BLINDTEST_FILTER_IDS,
  type BlindtestFilterId,
} from "../lib/blindtest/filters";

const TRACK_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TRACK_SRC_PATTERN = /^\/blindtest\/[^?#]+\.mp3$/;

export const BlindtestFilterIdSchema = z.enum(BLINDTEST_FILTER_IDS);

export const BlindtestTrackSchema = z.object({
  id: z
    .string()
    .regex(TRACK_ID_PATTERN, "id doit être un slug kebab-case"),
  title: z.string().min(1),
  artist: z.string().min(1),
  src: z
    .string()
    .regex(
      TRACK_SRC_PATTERN,
      "src doit commencer par /blindtest/ et se terminer par .mp3",
    )
    .refine((src) => !src.includes(".."), "src ne peut pas contenir .."),
  filter: BlindtestFilterIdSchema,
});

export const BlindtestCatalogSchema = z
  .object({
    tracks: z.array(BlindtestTrackSchema),
  })
  .superRefine((catalog, ctx) => {
    const seen = new Map<string, number>();
    catalog.tracks.forEach((track, index) => {
      const firstIndex = seen.get(track.id);
      if (firstIndex !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["tracks", index, "id"],
          message: `id dupliqué: ${track.id}`,
        });
        return;
      }
      seen.set(track.id, index);
    });
  });

export type BlindtestTrack = z.infer<typeof BlindtestTrackSchema>;
export type BlindtestCatalog = z.infer<typeof BlindtestCatalogSchema>;
export type { BlindtestFilterId };
