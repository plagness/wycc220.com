import { commandFromText } from "../../core/commands.js";
import type { BotModule } from "../../core/module.js";

export const privateModule: BotModule = {
  name: "private",
  supports: ({ message }) => message?.chat.type === "private",
  async handle({ config, message, telegram }) {
    if (!message) return;
    const command = commandFromText(message.text, config.telegram.username);
    if (!command || command === "start" || command === "help") {
      await telegram.sendMessage({
        chat_id: message.chat.id,
        text: "Legion220Bot — неофициальный бот сообщества wycc220.\n\n/stream — открыть Twitch\n/help — помощь",
      });
      return;
    }
    if (command === "stream") {
      await telegram.sendMessage({
        chat_id: message.chat.id,
        text: "https://twitch.tv/elwycco",
      });
    }
  },
};
