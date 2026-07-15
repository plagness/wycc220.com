"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { FanNotice } from "./fan.notice";
import { NavigationIcon, type NavigationIconName } from "./navigation.icon";

const navigation: ReadonlyArray<{
  href: string;
  label: string;
  icon: NavigationIconName;
}> = [
  { href: "/", label: "Главная", icon: "home" },
  { href: "/arts", label: "Арты", icon: "art" },
  { href: "/games", label: "Игры", icon: "games" },
  { href: "/development", label: "Разработка", icon: "development" },
];

export function SiteShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="site.shell">
      <aside className="side.navigation">
        <Link className="wordmark" href="/" aria-label="wycc220.com — главная">
          wycc<span>220</span>.com
        </Link>
        <nav className="navigation.list" aria-label="Навигация по сайту">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className="navigation.item"
                data-active={active}
                href={item.href}
                key={item.href}
              >
                <NavigationIcon className="navigation.icon" name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="side.disclaimer">
          <strong>Фан-проект</strong>
          <p>Не связан с Максимом / wycc220 и не говорит от его имени.</p>
        </div>
        <a
          className="github.link"
          href="https://github.com/plagness/wycc220.com"
        >
          GitHub ↗
        </a>
      </aside>

      <div className="mobile.header">
        <Link className="wordmark" href="/">
          wycc<span>220</span>.com
        </Link>
        <span>Фан-проект</span>
      </div>

      <main className="page.canvas">{children}</main>

      <nav className="mobile.navigation" aria-label="Мобильная навигация">
        {navigation.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              aria-current={active ? "page" : undefined}
              className="mobile.navigation.item"
              data-active={active}
              href={item.href}
              key={item.href}
            >
              <NavigationIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <FanNotice />
    </div>
  );
}
