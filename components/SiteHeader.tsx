"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";

function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuOpen = openPath === pathname;

  useEffect(() => {
    document.body.toggleAttribute("data-navigation-open", menuOpen);

    if (!menuOpen) return;

    const desktopQuery = window.matchMedia("(min-width: 1241px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenPath(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenPath(null);
      menuButtonRef.current?.focus();
    };
    const closeOnHistoryNavigation = () => setOpenPath(null);

    desktopQuery.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("popstate", closeOnHistoryNavigation);

    return () => {
      document.body.removeAttribute("data-navigation-open");
      desktopQuery.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("popstate", closeOnHistoryNavigation);
    };
  }, [menuOpen]);

  const closeMenu = () => setOpenPath(null);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="brand-link"
          href="/"
          aria-label="annaelle — на главную"
          onClick={closeMenu}
        >
          <Image
            src="/brand/logo-horizontal.svg"
            alt="annaelle — студия лазерной эпиляции"
            width={520}
            height={186}
            priority
            unoptimized
          />
        </Link>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                className={active ? "is-active" : ""}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link className="button button-small desktop-booking" href="/booking">
          Онлайн-запись
        </Link>

        <button
          ref={menuButtonRef}
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setOpenPath((value) => (value === pathname ? null : pathname))
          }
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="mobile-nav is-open"
          id="mobile-navigation"
          aria-label="Мобильная навигация"
        >
          {navigation.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                className={active ? "is-active" : ""}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className="button"
            href="/booking"
            onClick={closeMenu}
          >
            Записаться онлайн
          </Link>
        </nav>
      )}
    </header>
  );
}
