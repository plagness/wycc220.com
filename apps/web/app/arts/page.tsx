import { Badge } from "@wycc220/ui";

const placeholders = [
  { title: "Иллюстрации", note: "Рисунки и цифровой арт", tone: "lime" },
  { title: "Пиксель-арт", note: "Спрайты и маленькие миры", tone: "orange" },
  { title: "3D", note: "Модели и сцены", tone: "blue" },
  { title: "Мемы", note: "Культурный слой сообщества", tone: "pink" },
] as const;

export default function ArtsPage() {
  return (
    <>
      <header className="page.hero compact">
        <Badge>Галерея сообщества</Badge>
        <h1>Арты</h1>
        <p className="page.lead">
          Здесь будут работы фанатов с видимым авторством, лицензией и
          возможностью перейти к первоисточнику. Платформа не присваивает себе
          творчество участников.
        </p>
      </header>
      <section className="art.grid" aria-label="Будущие категории галереи">
        {placeholders.map((item, index) => (
          <article className={`art.card ${item.tone}`} key={item.title}>
            <span>0{index + 1}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.note}</p>
            </div>
            <small>Скоро</small>
          </article>
        ))}
      </section>
      <aside className="info.strip">
        <strong>Хотите добавить работу?</strong>
        <p>
          Процесс публикации и лицензирования сейчас проектируется вместе с
          сообществом.
        </p>
      </aside>
    </>
  );
}
