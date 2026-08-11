"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getCopy,
  localeFromPathname,
  localeHref,
  routeFromPathname,
} from "@/lib/i18n";

const copy = {
  ru: "Записаться онлайн",
  uz: "Onlayn yozilish",
  en: "Book online",
} as const;

export function MobileStickyCta() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  if (routeFromPathname(pathname).startsWith("/booking")) return null;

  return (
    <Link
      className="mobile-sticky-cta"
      href={localeHref(locale, "/booking")}
    >
      {getCopy(locale, copy)} <span aria-hidden="true">↗</span>
    </Link>
  );
}
