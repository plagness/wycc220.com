# Legion220Bot

Модульный Telegram-бот экосистемы wycc220:

- `@Wycc220fun` — канал фан-проекта, куда бот публикует системные объявления;
- `@Legion220Bot` — единая точка автоматизации и личного взаимодействия;
- `@WyccChat` — чат сообщества, где бот реагирует только на явные команды и утверждённые moderation events.

## Запуск

Локальный `.env` должен находиться в корне monorepo и никогда не коммитится.

```bash
pnpm --filter @wycc220/telegram.bot dev
```

Без Twitch credentials запускаются Telegram-модули, но monitor остаётся выключенным. Для production используется webhook с отдельным `TELEGRAM_WEBHOOK_SECRET`; long polling предназначен для локальной разработки и одного процесса.

## Структура

```text
src/
  core/                         router, context, commands
  telegram/                     Bot API adapter and types
  transports/                   webhook and long polling
  modules/
    channel/                    channel posts and publishers
    chat/                       group and supergroup behavior
    private/                    direct messages and private topics
    stream.monitor/             Twitch live transition producer
```

## Новый модуль

1. Создать `src/modules/<name>/<name>.module.ts`.
2. Реализовать `BotModule` с узким `supports` и идемпотентным `handle`.
3. Зарегистрировать модуль в composition root `src/main.ts`.
4. Добавить тесты маршрутизации, permissions и повторной доставки.
5. Документировать команды, необходимые Telegram admin rights и данные.
6. Не отправлять сообщения без пользовательской команды или явного domain event.

Модуль не читает `process.env` самостоятельно, не получает bot token и не вызывает Twitch напрямую. Внешние зависимости передаются через context/constructor.

Полное руководство: [`docs/telegram.bot.md`](../../docs/telegram.bot.md).
