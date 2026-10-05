export const locales = ["ru", "uz", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeDocumentLang: Record<Locale, string> = {
  ru: "ru",
  uz: "uz-Latn",
  en: "en",
};

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  uz: "O‘zbekcha",
  en: "English",
};

export type LocalizedCopy<T> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getCopy<C extends Record<Locale, unknown>>(
  locale: Locale,
  copy: C,
): C[Locale] {
  return copy[locale] as C[Locale];
}

export function localeFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(firstSegment) && firstSegment !== defaultLocale
    ? firstSegment
    : defaultLocale;
}

export function routeFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0]) && parts[0] !== defaultLocale) {
    parts.shift();
  }
  return parts.length ? `/${parts.join("/")}` : "/";
}

export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const hashIndex = href.indexOf("#");
  const queryIndex = href.indexOf("?");
  const suffixIndex = [hashIndex, queryIndex]
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  const path = suffixIndex === undefined ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === undefined ? "" : href.slice(suffixIndex);

  if (locale === defaultLocale) return `${path || "/"}${suffix}`;
  if (path === "/") return `/${locale}${suffix}`;
  return `/${locale}${path}${suffix}`;
}

export function switchLocaleHref(pathname: string, locale: Locale): string {
  return localeHref(locale, routeFromPathname(pathname));
}
