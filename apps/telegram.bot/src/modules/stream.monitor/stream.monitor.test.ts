import assert from "node:assert/strict";
import test from "node:test";
import { StreamMonitor } from "./stream.monitor.js";
import { MemoryStreamStateStore } from "./stream.state.js";
import type { LiveStream } from "./twitch.client.js";

test("announces each Twitch stream only once", async () => {
  const stream: LiveStream = {
    id: "stream.1",
    title: "Test stream",
    startedAt: "2026-07-15T12:00:00Z",
    viewerCount: 220,
  };
  const announced: string[] = [];
  const monitor = new StreamMonitor(
    { getLiveStream: async () => stream },
    { publishStreamStarted: async ({ id }) => void announced.push(id) },
    new MemoryStreamStateStore(),
    "elwycco",
    60_000,
  );

  await monitor.tick();
  await monitor.tick();

  assert.deepEqual(announced, ["stream.1"]);
});

test("does not announce an offline channel", async () => {
  let announcements = 0;
  const monitor = new StreamMonitor(
    { getLiveStream: async () => undefined },
    { publishStreamStarted: async () => void (announcements += 1) },
    new MemoryStreamStateStore(),
    "elwycco",
    60_000,
  );

  await monitor.tick();

  assert.equal(announcements, 0);
});
