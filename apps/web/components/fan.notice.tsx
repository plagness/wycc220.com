"use client";

import { useEffect, useRef } from "react";

const acknowledgementKey = "wycc220.fan.notice.v1";

export function FanNotice() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (window.localStorage.getItem(acknowledgementKey) !== "accepted") {
      dialogRef.current?.showModal();
    }
  }, []);

  function acknowledge() {
    window.localStorage.setItem(acknowledgementKey, "accepted");
    dialogRef.current?.close();
  }

  return (
    <dialog
      aria-labelledby="fan.notice.title"
      aria-describedby="fan.notice.description"
      className="fan.notice"
      ref={dialogRef}
    >
      <div className="fan.notice.marker">Важно / 220</div>
      <h2 id="fan.notice.title">Это фанатский проект</h2>
      <p id="fan.notice.description">
        wycc220.com создан сообществом и{" "}
        <strong>не имеет отношения к Максиму, wycc220 или elwycco</strong>. Мы
        не говорим от его имени, не собираем деньги и не продаём доступ.
      </p>
      <button
        className="touch.button primary"
        onClick={acknowledge}
        type="button"
      >
        Понятно, продолжить
      </button>
      <small>Уведомление сохранится только в этом браузере.</small>
    </dialog>
  );
}
