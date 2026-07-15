import assert from "node:assert/strict";
import test from "node:test";
import { commandFromText } from "./commands.js";

test("parses commands addressed to the bot", () => {
  assert.equal(
    commandFromText("/stream@Legion220Bot now", "Legion220Bot"),
    "stream",
  );
  assert.equal(commandFromText("/help", "Legion220Bot"), "help");
});

test("ignores commands addressed to another bot", () => {
  assert.equal(commandFromText("/stream@OtherBot", "Legion220Bot"), undefined);
});
