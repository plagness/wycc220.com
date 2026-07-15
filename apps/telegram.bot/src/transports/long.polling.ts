import type { BotConfig } from "../config.js";
import type { UpdateRouter } from "../core/router.js";
import { messageFromUpdate } from "../core/types.js";
import type { TelegramClient } from "../telegram/client.js";
import { allowedUpdates } from "../telegram/updates.js";

export async function runLongPolling(
  config: BotConfig,
  telegram: TelegramClient,
  router: UpdateRouter,
  signal: AbortSignal,
): Promise<void> {
  let offset = 0;
  while (!signal.aborted) {
    try {
      const updates = await telegram.getUpdates(offset, allowedUpdates, signal);
      for (const update of updates) {
        offset = Math.max(offset, update.update_id + 1);
        const message = messageFromUpdate(update);
        await router.route({
          config,
          telegram,
          update,
          ...(message ? { message } : {}),
        });
      }
    } catch (error) {
      if (signal.aborted) break;
      console.error(
        "Telegram polling failed",
        error instanceof Error ? error.message : "unknown error",
      );
      await new Promise((resolve) => setTimeout(resolve, 2_000));
    }
  }
}
