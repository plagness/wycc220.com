import type { BotModule } from "../../core/module.js";

export const channelModule: BotModule = {
  name: "channel",
  supports: ({ message }) => message?.chat.type === "channel",
  async handle() {
    // Channel posts are read-only by default. Publishers are invoked by explicit domain events.
  },
};
