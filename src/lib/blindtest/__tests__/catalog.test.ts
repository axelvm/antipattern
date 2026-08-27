import assert from "node:assert/strict";
import { test } from "node:test";
import { answersMatch } from "../answers";
import {
  getBlindtestTrackById,
  getBlindtestTracks,
  getFilterForTrack,
  parseBlindtestCatalog,
} from "../catalog";

const sampleTrack = {
  id: "exemple-dry",
  title: "Exemple",
  artist: "Artiste",
  src: "/blindtest/exemple.mp3",
  filter: "dry" as const,
};

test("parse un catalogue vide", () => {
  const catalog = parseBlindtestCatalog({ tracks: [] });
  assert.deepEqual(catalog.tracks, []);
});

test("parse un catalogue valide", () => {
  const catalog = parseBlindtestCatalog({
    tracks: [sampleTrack],
  });
  assert.equal(catalog.tracks[0]?.filter, "dry");
  assert.equal(catalog.tracks[0]?.artist, "Artiste");
});

test("rejette un id dupliqué", () => {
  assert.throws(
    () =>
      parseBlindtestCatalog({
        tracks: [
          {
            id: "meme-titre",
            title: "A",
            artist: "A",
            src: "/blindtest/a.mp3",
            filter: "dry",
          },
          {
            id: "meme-titre",
            title: "B",
            artist: "B",
            src: "/blindtest/b.mp3",
            filter: "envers-ralenti",
          },
        ],
      }),
    /id dupliqué/,
  );
});

test("rejette un src hors /blindtest/", () => {
  assert.throws(
    () =>
      parseBlindtestCatalog({
        tracks: [
          {
            id: "hors-prefixe",
            title: "Hors préfixe",
            artist: "X",
            src: "/audio/exemple.mp3",
            filter: "dry",
          },
        ],
      }),
    /src doit commencer par \/blindtest\//,
  );
});

test("rejette une extension autre que .mp3", () => {
  assert.throws(
    () =>
      parseBlindtestCatalog({
        tracks: [
          {
            id: "mauvais-format",
            title: "WAV",
            artist: "X",
            src: "/blindtest/exemple.wav",
            filter: "dry",
          },
        ],
      }),
    /se terminer par \.mp3/,
  );
});

test("rejette un filtre inconnu", () => {
  assert.throws(
    () =>
      parseBlindtestCatalog({
        tracks: [
          {
            id: "filtre-invente",
            title: "Inventé",
            artist: "X",
            src: "/blindtest/exemple.mp3",
            filter: "radio-vintage",
          },
        ],
      }),
    /Catalogue blindtest invalide/,
  );
});

test("le JSON versionné expose les pistes, l'artiste et le filtre", () => {
  const tracks = getBlindtestTracks();
  assert.ok(tracks.length >= 1);
  const first = tracks[0];
  assert.ok(first);
  assert.ok(first.artist.length > 0);
  assert.equal(getBlindtestTrackById(first.id)?.src, first.src);
  assert.equal(getFilterForTrack(first.id), first.filter);
  assert.equal(first.filter, "envers-ralenti");
});

test("compare les réponses avec trim et lowercase", () => {
  assert.equal(answersMatch("  Rick Astley ", "rick astley"), true);
  assert.equal(answersMatch("Never Gonna Give You Up", "never gonna give you up"), true);
  assert.equal(answersMatch("Rick", "Rick Astley"), false);
  assert.equal(answersMatch("never gonna give you up", "Never Gonna Give You Up"), true);
});
