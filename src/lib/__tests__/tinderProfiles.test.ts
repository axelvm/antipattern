import assert from "node:assert/strict";
import { test } from "node:test";
import { didWinElueQuest, splitProfileName } from "../tinderProfiles";

test("gagne seulement avec un like unique sur tinder2", () => {
  assert.equal(didWinElueQuest({ tinder2: "like" }), true);
  assert.equal(
    didWinElueQuest({ tinder2: "like", tinder1: "dislike", tinder3: "dislike" }),
    true,
  );
});

test("perd si un autre profil est liké", () => {
  assert.equal(didWinElueQuest({ tinder2: "like", tinder1: "like" }), false);
  assert.equal(didWinElueQuest({ tinder1: "like" }), false);
  assert.equal(didWinElueQuest({ tinder3: "like", tinder5: "dislike" }), false);
});

test("perd sans like sur tinder2", () => {
  assert.equal(didWinElueQuest({ tinder2: "dislike" }), false);
  assert.equal(didWinElueQuest({}), false);
});

test("sépare le prénom et l'âge du profil", () => {
  assert.deepEqual(splitProfileName("Virginie, 54"), {
    name: "Virginie",
    age: "54",
  });
  assert.deepEqual(splitProfileName("Mymy"), {
    name: "Mymy",
    age: null,
  });
  assert.deepEqual(splitProfileName("Tom de cromagnon, 28"), {
    name: "Tom de cromagnon",
    age: "28",
  });
});
