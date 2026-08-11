"use client";

import { usePathname } from "next/navigation";
import { getCopy, localeFromPathname } from "@/lib/i18n";

const copy = {
  ru: "Перейти к содержанию",
  uz: "Asosiy mazmunga o‘tish",
  en: "Skip to content",
} as const;

export function SkipLink() {
  const locale = localeFromPathname(usePathname());

  return (
    <a className="skip-link" href="#main-content">
      {getCopy(locale, copy)}
    </a>
  );
}
