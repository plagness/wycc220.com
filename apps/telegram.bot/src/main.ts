import { ChannelPublisher } from "./modules/channel/channel.publisher.js";
import { channelModule } from "./modules/channel/channel.module.js";
import { chatModule } from "./modules/chat/chat.module.js";
import { privateModule } from "./modules/private/private.module.js";
import { StreamMonitor } from "./modules/stream.monitor/stream.monitor.js";
import { MemoryStreamStateStore } from "./modules/stream.monitor/stream.state.js";
import { TwitchClient } from "./modules/stream.monitor/twitch.client.js";
import { loadConfig } from "./config.js";
import { UpdateRouter } from "./core/router.js";
import { TelegramClient } from "./telegram/client.js";
import { runLongPolling } from "./transports/long.polling.js";
import { runWebhook } from "./transports/webhook.js";

const config = loadConfig();
const telegram = new TelegramClient(config.telegram.token);
const router = new UpdateRouter([channelModule, chatModule, privateModule]);
const shutdown = new AbortController();

const streamMonitor = config.twitch
  ? new StreamMonitor(
      new TwitchClient(config.twitch.clientId, config.twitch.clientSecret),
      new ChannelPublisher(telegram, config.telegram.channelId),
      new MemoryStreamStateStore(),
      config.twitch.channelLogin,
      config.twitch.pollIntervalMs,
    )
  : undefined;

streamMonitor?.start();
console.info("Telegram bot foundation started", {
  transport: config.telegram.transport,
  modules: router.moduleNames(),
  streamMonitor: Boolean(streamMonitor),
});

const stop = () => {
  streamMonitor?.stop();
  shutdown.abort();
};
process.once("SIGINT", stop);
process.once("SIGTERM", stop);

if (config.telegram.transport === "webhook") {
  await runWebhook(config, telegram, router);
} else {
  await runLongPolling(config, telegram, router, shutdown.signal);
}
