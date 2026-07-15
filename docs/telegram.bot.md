# Telegram bot platform

## Три опоры

| Пространство    | Назначение     | Поведение бота                                            |
| --------------- | -------------- | --------------------------------------------------------- |
| `@Wycc220fun`   | канал проекта  | проверенные объявления, начало стрима, важные обновления  |
| `@Legion220Bot` | бот            | команды, личные сценарии, Mini App и системные интеграции |
| `@WyccChat`     | чат сообщества | команды, будущая прозрачная модерация и community-функции |

Бот не должен превращать канал и чат в рекламную ленту. Системные сообщения имеют понятный источник, причину и ограничение частоты.

## Telegram Bot API 2026

Основа спроектирована по Bot API 10.2 и учитывает ключевые изменения 2026 года.

### 9.4 — 9 февраля

Topics в личных чатах, стили и custom emoji для кнопок, управление profile photo бота, video qualities и profile audio. Личные сценарии не предполагают, что все сообщения находятся в одном потоке: сохраняется `message_thread_id`.

### 9.5 — 1 марта

Entity `date_time`, `sendMessageDraft` для всех ботов, member tags и связанные admin permissions. Tags относятся к отдельному moderation-модулю и не включаются без публичных правил.

### 9.6 — 3 апреля

Managed bots, Mini App `requestChat`, расширенные quizzes/polls с постоянными идентификаторами и пользовательскими вариантами. Poll-функции можно добавлять отдельным модулем без изменения core.

### 10.0 — 8 мая

Guest mode, управление reactions, получение некоторых сообщений других ботов, media polls, live photos и bot-to-bot communication. Тип `guest_message` предусмотрен на границе Update, но ответы guest query не включаются без отдельного сценария. Bot-to-bot сообщения требуют allowlist и защиты от циклов.

### 10.1 — 11 июня

Structured Rich Messages, streaming drafts, join request queries и Web App для заявок. Raw client может вызвать новый метод без обновления framework. Rich Messages будут отдельным renderer с fallback на HTML `sendMessage`.

### 10.2 — 14 июля

Media и block entities в исходящих Rich Messages, ephemeral messages, initial Communities support, усиленная origin-защита Mini Apps и subscription updates. Модель учитывает ephemeral id, receiver user и community events. Origin-защита Mini App не отключается. Payment subscriptions не используются из-за некоммерческой хартии.

Источник: [официальный Bot API changelog](https://core.telegram.org/bots/api-changelog).

## Архитектура обновлений

Telegram может доставлять updates повторно, поэтому update id и domain-event обрабатываются идемпотентно. Webhook является production-транспортом, проверяет `X-Telegram-Bot-Api-Secret-Token` и подписывается только на необходимые `allowed_updates`. Long polling и webhook нельзя использовать одновременно.

Raw Bot API adapter изолирован в `src/telegram`. Он не логирует URL, потому что URL содержит bot token. Модули получают готовый client и не знают token.

## Twitch stream monitor

Первая реализация запрашивает официальный Twitch Helix `streams` endpoint. При обнаружении нового stream id она публикует ровно одно сообщение в `@Wycc220fun`.

```text
Twitch Helix
    ↓ live stream snapshot
StreamMonitor
    ↓ new stream id only
ChannelPublisher
    ↓ sendMessage
@Wycc220fun
```

Для production `MemoryStreamStateStore` заменяется PostgreSQL/Redis repository до включения автоматических анонсов, иначе рестарт процесса может повторить сообщение. Следующий этап — Twitch EventSub webhook с polling как reconciliation fallback.

## Права бота

- канал: bot administrator с правом публикации, без права добавлять администраторов;
- чат: обычный участник для команд; moderation rights выдаются только при появлении утверждённого модуля;
- личка: пользователь сам начинает диалог;
- Mini App: один доверенный production origin, origin protection включена.

Privacy Mode в чате остаётся включённым, пока функции не требуют чтения обычных сообщений. Это уменьшает сбор данных и область риска.

## Безопасность

- bot token хранится только в secret store/локальном `.env`;
- токен никогда не передаётся в query, log или exception приложения;
- production, preview и development используют разные bots/tokens;
- webhook secret не совпадает с bot token;
- команды администратора проверяют Telegram user id и актуальное membership/rights;
- HTML экранируется до отправки;
- внешние URL формируются из allowlist;
- retry учитывает `retry_after` и не создаёт message storm;
- входящие файлы не скачиваются автоматически;
- raw update не сохраняется целиком.

Токен, попавший в issue, PR, чат разработки или CI output, немедленно отзывается через BotFather.

## Добавление функции

Новая функция оформляется как модуль с одним владельцем и ясным пространством: channel, chat или private. В PR указываются commands/events, необходимые права, собираемые данные, rate limit, opt-out и поведение при повторной доставке.

Запрещены скрытая аналитика, массовые личные сообщения, unsolicited-реклама, платежи, донаты, реферальные ссылки и объединение Telegram-профиля с Twitch/YouTube без подтверждения пользователя.
