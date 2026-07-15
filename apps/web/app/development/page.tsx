import { Badge } from "@wycc220/ui";

const teams = [
  ["Web", "Страницы, доступность и производительность"],
  ["API", "Публичные данные и стабильные контракты"],
  ["Games", "Babylon.js, SDK и игровые проекты"],
  ["Telegram", "Legion220Bot, канал и чат"],
  ["Media", "YouTube, Twitch и единый каталог"],
  ["Design", "Компоненты, токены и визуальный язык"],
] as const;

export default function DevelopmentPage() {
  return (
    <>
      <header className="page.hero compact">
        <Badge>Open source / AGPL-3.0</Badge>
        <h1>Разработка</h1>
        <p className="page.lead">
          Выберите направление и делайте законченную часть. Секреты и
          production-доступ для этого не нужны: команды соединяются через
          документированные контракты.
        </p>
        <a
          className="touch.button primary"
          href="https://github.com/plagness/wycc220.com"
        >
          Открыть GitHub ↗
        </a>
      </header>
      <section className="team.grid">
        {teams.map(([name, description], index) => (
          <article key={name}>
            <span>0{index + 1}</span>
            <h2>{name}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
      <section className="workflow.panel">
        <div>
          <span>01</span>
          <strong>Fork</strong>
        </div>
        <div>
          <span>02</span>
          <strong>Маленькая задача</strong>
        </div>
        <div>
          <span>03</span>
          <strong>PR в dev</strong>
        </div>
        <div>
          <span>04</span>
          <strong>Review команды</strong>
        </div>
      </section>
    </>
  );
}
