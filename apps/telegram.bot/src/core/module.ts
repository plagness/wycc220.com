import type { BotConfig } from "../config.js";
import type { TelegramClient } from "../telegram/client.js";
import type { TelegramMessage, TelegramUpdate } from "./types.js";

export interface BotContext {
  config: BotConfig;
  telegram: TelegramClient;
  update: TelegramUpdate;
  message?: TelegramMessage;
}

export interface BotModule {
  readonly name: string;
  supports(context: BotContext): boolean;
  handle(context: BotContext): Promise<void>;
}
