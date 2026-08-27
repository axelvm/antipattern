import assert from "node:assert/strict";
import { test } from "node:test";
import { didWinElueQuest } from "../tinderProfiles";

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
