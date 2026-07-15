import type { TelegramClient } from "../../telegram/client.js";
import { escapeHtml } from "../../telegram/html.js";
import type { LiveStream } from "../stream.monitor/twitch.client.js";

export class ChannelPublisher {
  constructor(
    private readonly telegram: TelegramClient,
    private readonly channelId: string,
  ) {}

  async publishStreamStarted(stream: LiveStream): Promise<void> {
    const title = escapeHtml(stream.title || "Стрим начался");
    const game = stream.gameName ? `\n🎮 ${escapeHtml(stream.gameName)}` : "";
    await this.telegram.sendMessage({
      chat_id: this.channelId,
      text: `🔴 <b>elwycco в эфире</b>\n\n${title}${game}\n\n<a href="https://twitch.tv/elwycco">Смотреть стрим</a>`,
      parse_mode: "HTML",
      link_preview_options: {
        url: "https://twitch.tv/elwycco",
        prefer_large_media: true,
      },
    });
  }
}
