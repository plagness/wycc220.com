import dotenv from "dotenv";
import { resolve } from "node:path";

dotenv.config({ path: resolve(process.cwd(), "../../.env"), quiet: true });

export interface BotConfig {
  telegram: {
    token: string;
    username: string;
    channelId: string;
    chatId: string;
    transport: "long.polling" | "webhook";
    webhookSecret?: string;
    webhookUrl?: string;
  };
  twitch?: {
    clientId: string;
    clientSecret: string;
    channelLogin: string;
    pollIntervalMs: number;
  };
}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function loadConfig(): BotConfig {
  const transport = process.env.TELEGRAM_BOT_TRANSPORT ?? "long.polling";
  if (transport !== "long.polling" && transport !== "webhook") {
    throw new Error("TELEGRAM_BOT_TRANSPORT must be long.polling or webhook");
  }

  const clientId = process.env.TWITCH_CLIENT_ID?.trim();
  const clientSecret = process.env.TWITCH_CLIENT_SECRET?.trim();
  const twitch =
    clientId && clientSecret
      ? {
          clientId,
          clientSecret,
          channelLogin: process.env.TWITCH_CHANNEL_LOGIN?.trim() || "elwycco",
          pollIntervalMs: 60_000,
        }
      : undefined;

  return {
    telegram: {
      token: required("TELEGRAM_BOT_TOKEN"),
      username: process.env.TELEGRAM_BOT_USERNAME?.trim() || "Legion220Bot",
      channelId: process.env.TELEGRAM_CHANNEL_ID?.trim() || "@Wycc220fun",
      chatId: process.env.TELEGRAM_CHAT_ID?.trim() || "@WyccChat",
      transport,
      ...(process.env.TELEGRAM_WEBHOOK_SECRET?.trim()
        ? { webhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET.trim() }
        : {}),
      ...(process.env.TELEGRAM_WEBHOOK_URL?.trim()
        ? { webhookUrl: process.env.TELEGRAM_WEBHOOK_URL.trim() }
        : {}),
    },
    ...(twitch ? { twitch } : {}),
  };
}
