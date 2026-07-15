import Link from "next/link";
import { Badge } from "@wycc220/ui";

export default function GamesPage() {
  return (
    <>
      <header className="page.hero compact">
        <Badge>Играть в браузере</Badge>
        <h1>Игры</h1>
        <p className="page.lead">
          Независимые проекты фанатов. Запускаются на сайте или в Telegram Mini
          App, а код остаётся открытым и проверяемым.
        </p>
      </header>
      <section className="game.feature">
        <div className="game.visual" aria-hidden="true">
          <div className="game.cube">220</div>
        </div>
        <div className="game.copy">
          <span className="overline">Reference project / WebGL</span>
          <h2>Babylon.js Starter</h2>
          <p>
            Минимальная 3D-сцена с сенсорным управлением, игровым манифестом и
            безопасным мостом к платформе.
          </p>
          <div className="tag.row">
            <span>3D</span>
            <span>WebGL</span>
            <span>Telegram</span>
            <span>Open source</span>
          </div>
          <Link className="touch.button primary" href="/development">
            Сделать свою игру
          </Link>
        </div>
      </section>
      <section className="coming.grid">
        <article>
          <span>+</span>
          <h3>Место для вашей игры</h3>
          <p>
            Команда получает собственный проект и независимый релизный цикл.
          </p>
        </article>
        <article>
          <span>+</span>
          <h3>Telegram Mini App</h3>
          <p>Тот же web-build сможет запускаться внутри Legion220Bot.</p>
        </article>
      </section>
    </>
  );
}
