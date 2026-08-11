"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getNavigation } from "@/data/site-i18n";
import {
  getCopy,
  localeDocumentLang,
  localeFromPathname,
  localeHref,
  localeNames,
  locales,
  routeFromPathname,
  switchLocaleHref,
} from "@/lib/i18n";

const headerCopy = {
  ru: {
    home: "annaelle — на главную",
    logoAlt: "annaelle — студия лазерной эпиляции",
    mainNavigation: "Основная навигация",
    mobileNavigation: "Мобильная навигация",
    languages: "Выбор языка",
    booking: "Онлайн-запись",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },
  uz: {
    home: "annaelle — bosh sahifaga",
    logoAlt: "annaelle — lazer epilatsiyasi studiyasi",
    mainNavigation: "Asosiy navigatsiya",
    mobileNavigation: "Mobil navigatsiya",
    languages: "Tilni tanlash",
    booking: "Onlayn yozilish",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
  },
  en: {
    home: "annaelle — home",
    logoAlt: "annaelle — laser hair removal studio",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    languages: "Choose language",
    booking: "Book online",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
} as const;

function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const routePath = routeFromPathname(pathname);
  const copy = getCopy(locale, headerCopy);
  const navigation = getNavigation(locale);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuOpen = openPath === pathname;

  useEffect(() => {
    document.documentElement.lang = localeDocumentLang[locale];
  }, [locale]);

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

  const languageSwitcher = (className: string) => (
    <nav
      className={`language-switcher ${className}`}
      aria-label={copy.languages}
    >
      {locales.map((item) => (
        <Link
          key={item}
          href={switchLocaleHref(pathname, item)}
          hrefLang={localeDocumentLang[item]}
          lang={localeDocumentLang[item]}
          title={localeNames[item]}
          aria-current={locale === item ? "page" : undefined}
          className={locale === item ? "is-active" : undefined}
          onClick={(event) => {
            closeMenu();
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            ) {
              return;
            }
            const suffix = `${window.location.search}${window.location.hash}`;
            if (!suffix) return;
            event.preventDefault();
            window.location.assign(`${switchLocaleHref(pathname, item)}${suffix}`);
          }}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="brand-link"
          href={localeHref(locale, "/")}
          aria-label={copy.home}
          onClick={closeMenu}
        >
          <Image
            src="/brand/logo-horizontal.svg"
            alt={copy.logoAlt}
            width={520}
            height={186}
            priority
            unoptimized
          />
        </Link>

        <nav className="desktop-nav" aria-label={copy.mainNavigation}>
          {navigation.map((item) => {
            const active = isActiveRoute(routePath, item.href);
            return (
              <Link
                key={item.href}
                className={active ? "is-active" : ""}
                href={localeHref(locale, item.href)}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-tools">
          {languageSwitcher("desktop-language-switcher")}
          <Link
            className="button button-small desktop-booking"
            href={localeHref(locale, "/booking")}
          >
            {copy.booking}
          </Link>

          <button
            ref={menuButtonRef}
            className={`menu-button ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
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
      </div>

      {menuOpen && (
        <nav
          className="mobile-nav is-open"
          id="mobile-navigation"
          aria-label={copy.mobileNavigation}
        >
          {languageSwitcher("mobile-language-switcher")}
          {navigation.map((item) => {
            const active = isActiveRoute(routePath, item.href);
            return (
              <Link
                key={item.href}
                className={active ? "is-active" : ""}
                href={localeHref(locale, item.href)}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className="button"
            href={localeHref(locale, "/booking")}
            onClick={closeMenu}
          >
            {copy.booking}
          </Link>
        </nav>
      )}
    </header>
  );
}
