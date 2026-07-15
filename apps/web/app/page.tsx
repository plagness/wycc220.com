import Link from "next/link";
import { Badge } from "@wycc220/ui";
import { NavigationIcon } from "../components/navigation.icon";

const directions = [
  {
    href: "/arts",
    icon: "art" as const,
    index: "01",
    title: "Арты",
    description: "Галерея работ сообщества с авторством и ссылкой на источник.",
  },
  {
    href: "/games",
    icon: "games" as const,
    index: "02",
    title: "Игры",
    description:
      "Фанатские браузерные игры — от маленьких экспериментов до 3D.",
  },
  {
    href: "/development",
    icon: "development" as const,
    index: "03",
    title: "Разработка",
    description:
      "Открытый код, документация и отдельные направления для команд.",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="home.hero">
        <div>
          <Badge>Некоммерческий фанатский хаб</Badge>
          <h1>
            Создано
            <br />
            <span>сообществом.</span>
          </h1>
          <p className="page.lead">
            Арты, игры и открытые инструменты вокруг творчества wycc220 /
            elwycco. Без рекламы, платного доступа и попыток говорить от имени
            Максона.
          </p>
          <div className="action.row">
            <Link className="touch.button primary" href="/games">
              Смотреть проекты
            </Link>
            <Link className="touch.button secondary" href="/development">
              Присоединиться
            </Link>
          </div>
        </div>
        <aside className="status.panel">
          <span className="status.light" />
          <p>DEV / FOUNDATION</p>
          <strong>Платформа открыта для новых команд</strong>
          <small>Выбирайте направление и делайте независимый кусок.</small>
        </aside>
      </section>

      <section className="page.section">
        <header className="section.header">
          <p>Направления</p>
          <h2>Что уже заложено</h2>
        </header>
        <div className="direction.grid">
          {directions.map((direction) => (
            <Link
              className="direction.card"
              href={direction.href}
              key={direction.href}
            >
              <div className="direction.meta">
                <span>{direction.index}</span>
                <NavigationIcon name={direction.icon} />
              </div>
              <h3>{direction.title}</h3>
              <p>{direction.description}</p>
              <strong>Открыть →</strong>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
