import type { SourceCollector } from "../collector.js";

export const twitchCollector: SourceCollector = {
  source: "twitch",
  async *collect() {
    // Prefer EventSub and idempotent event handling; never log chat message bodies.
  },
};
