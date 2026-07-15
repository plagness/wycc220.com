import { Badge, FeatureCard, SectionHeading } from "@wycc220/ui";

const sections = [
  {
    marker: "01",
    title: "Смотреть",
    description: "Видео, стримы и моменты — с поиском и ссылкой на оригинал.",
    status: "Каталог",
  },
  {
    marker: "02",
    title: "Играть",
    description:
      "Самостоятельные фанатские игры в изолированной web-песочнице.",
    status: "Babylon.js",
  },
  {
    marker: "03",
    title: "Создавать",
    description:
      "Галерея работ с авторством, лицензией и прозрачной модерацией.",
    status: "Сообщество",
  },
  {
    marker: "04",
    title: "Исследовать",
    description:
      "Открытое API и понятные агрегаты активности без торговли данными.",
    status: "API v1",
  },
] as const;

export default function Home() {
  return (
    <main>
      <header className="site.header">
        <a className="wordmark" href="#top" aria-label="wycc220.com — наверх">
          wycc<span>220</span>.com
        </a>
        <nav aria-label="Основная навигация">
          <a href="#directions">Разделы</a>
          <a href="https://github.com/plagness/wycc220.com">GitHub</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero.copy">
          <Badge>Неофициальный фанатский проект</Badge>
          <h1>
            Архивируем.
            <br />
            Играем.
            <br />
            <span>Создаём.</span>
          </h1>
          <p className="lead">
            Открытая площадка вокруг творчества wycc220 / elwycco. Никакой
            рекламы, платного доступа и самопродвижения — только работы
            сообщества.
          </p>
          <div className="hero.actions">
            <a className="button.primary" href="#directions">
              Смотреть направления
            </a>
            <a
              className="button.ghost"
              href="https://github.com/plagness/wycc220.com"
            >
              Начать разработку ↗
            </a>
          </div>
        </div>
        <aside className="signal" aria-label="Статус платформы">
          <span className="signal.dot" />
          <p>Foundation / dev</p>
          <strong>Сообщество строит открытую платформу</strong>
          <small>Мейнтейнеры модерируют инфраструктуру, а не творчество.</small>
        </aside>
      </section>

      <section className="directions" id="directions">
        <SectionHeading
          eyebrow="Карта платформы"
          title="Разные команды. Общие правила."
          description="Каждое направление развивается независимо и соединяется через версионируемые контракты."
        />
        <div className="feature.grid">
          {sections.map((section) => (
            <FeatureCard key={section.marker} {...section} />
          ))}
        </div>
      </section>

      <footer>
        <strong>wycc220.com</strong>
        <p>Неофициально. Некоммерчески. Сделано фанатами.</p>
      </footer>
    </main>
  );
}
