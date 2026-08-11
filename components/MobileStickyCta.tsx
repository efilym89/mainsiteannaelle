"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileStickyCta() {
  const pathname = usePathname();

  if (pathname.startsWith("/booking")) return null;

  return (
    <Link className="mobile-sticky-cta" href="/booking">
      Записаться онлайн <span aria-hidden="true">↗</span>
    </Link>
  );
}
