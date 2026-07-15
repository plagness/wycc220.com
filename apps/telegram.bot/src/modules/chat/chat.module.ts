import { commandFromText } from "../../core/commands.js";
import type { BotModule } from "../../core/module.js";

export const chatModule: BotModule = {
  name: "chat",
  supports: ({ message }) =>
    message?.chat.type === "group" || message?.chat.type === "supergroup",
  async handle({ config, message, telegram }) {
    if (!message) return;
    const command = commandFromText(message.text, config.telegram.username);
    if (command === "stream") {
      await telegram.sendMessage({
        chat_id: message.chat.id,
        text: "Стрим: https://twitch.tv/elwycco",
        ...(message.message_id
          ? { reply_parameters: { message_id: message.message_id } }
          : {}),
      });
    }
    if (command === "help") {
      await telegram.sendMessage({
        chat_id: message.chat.id,
        text: "Доступные команды: /stream — ссылка на Twitch. Остальные модули добавляются сообществом через review.",
      });
    }
  },
};
