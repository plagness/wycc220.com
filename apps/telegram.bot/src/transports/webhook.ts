import Fastify from "fastify";
import type { BotConfig } from "../config.js";
import type { UpdateRouter } from "../core/router.js";
import { messageFromUpdate, type TelegramUpdate } from "../core/types.js";
import type { TelegramClient } from "../telegram/client.js";

export async function runWebhook(
  config: BotConfig,
  telegram: TelegramClient,
  router: UpdateRouter,
): Promise<void> {
  if (!config.telegram.webhookSecret || !config.telegram.webhookUrl) {
    throw new Error(
      "Webhook transport requires TELEGRAM_WEBHOOK_SECRET and TELEGRAM_WEBHOOK_URL",
    );
  }
  const app = Fastify({
    logger: { redact: ["req.headers.x-telegram-bot-api-secret-token"] },
  });
  app.post<{ Body: TelegramUpdate }>(
    "/telegram/webhook",
    async (request, reply) => {
      if (
        request.headers["x-telegram-bot-api-secret-token"] !==
        config.telegram.webhookSecret
      ) {
        return reply.code(401).send({ ok: false });
      }
      const update = request.body;
      const message = messageFromUpdate(update);
      await router.route({
        config,
        telegram,
        update,
        ...(message ? { message } : {}),
      });
      return reply.send({ ok: true });
    },
  );
  await telegram.call("setWebhook", {
    url: config.telegram.webhookUrl,
    secret_token: config.telegram.webhookSecret,
    allowed_updates: [
      "message",
      "edited_message",
      "channel_post",
      "edited_channel_post",
      "callback_query",
      "my_chat_member",
      "chat_member",
      "chat_join_request",
      "message_reaction",
      "message_reaction_count",
      "guest_message",
      "managed_bot",
      "subscription",
    ],
  });
  await app.listen({
    host: "0.0.0.0",
    port: Number(process.env.BOT_PORT ?? 3002),
  });
}
