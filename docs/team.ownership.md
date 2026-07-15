# Команды и ответственность

Команды владеют направлением работы, но не закрывают его от сообщества. Ownership означает обязанность ревью, документации и безопасного сопровождения, а не исключительное право менять код.

| Направление             | Основные пути                          | Контракт с другими командами                       |
| ----------------------- | -------------------------------------- | -------------------------------------------------- |
| Web                     | `apps/web`                             | `packages/ui`, `packages/contracts`, публичный API |
| UI and Design           | `packages/ui`, `docs/design.system.md` | типизированные компоненты и токены                 |
| API                     | `apps/api`, `docs/api.development.md`  | DTO и схемы `packages/contracts`                   |
| Games                   | `games`, `packages/game.sdk`           | `game.manifest.json`, host messages, `/v1/games`   |
| Media                   | media module API, media feature web    | нормализованные media contracts                    |
| Collectors              | `apps/collector`                       | очередь нормализованных событий                    |
| Activity                | activity modules API/web               | scoring version, агрегаты и opt-out                |
| Gallery                 | gallery modules API/web                | asset metadata, author license, moderation         |
| Platform                | `.github`, deployment, observability   | безопасные CI/CD и окружения                       |
| Security and Moderation | `SECURITY.md`, policy docs             | review границ доверия и решений модерации          |

На старте один человек может состоять в нескольких командах. Для критических путей постепенно назначаются минимум два независимых reviewer.

## Правила взаимодействия

- изменение общего контракта обсуждается до реализации потребителями;
- команда не импортирует внутренний код другого deployable-приложения;
- общий код появляется в package только после появления ясной границы и владельца;
- security, privacy и moderation имеют право остановить публикацию, но обязаны объяснить причину;
- спор о направлении фиксируется ADR, а не скрывается в личной переписке.

## Предлагаемые GitHub teams

После появления организации: `web`, `ui`, `api`, `games`, `media`, `collectors`, `activity`, `gallery`, `platform`, `security`, `moderators`. До этого CODEOWNERS указывает текущего мейнтейнера и содержит готовую карту для будущей замены на team handles.
