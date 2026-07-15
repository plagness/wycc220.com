import type { SourceCollector } from "./collector.js";
import { telegramCollector } from "./sources/telegram.collector.js";
import { twitchCollector } from "./sources/twitch.collector.js";
import { youtubeCollector } from "./sources/youtube.collector.js";

const collectors: readonly SourceCollector[] = [
  youtubeCollector,
  twitchCollector,
  telegramCollector,
];

if (process.env.NODE_ENV !== "test") {
  console.info(
    `Collector foundation ready: ${collectors.map(({ source }) => source).join(", ")}`,
  );
}
