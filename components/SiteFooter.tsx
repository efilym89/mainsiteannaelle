"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavigation } from "@/data/site-i18n";
import { contact } from "@/data/site";
import { getCopy, localeFromPathname, localeHref } from "@/lib/i18n";

const footerCopy = {
  ru: {
    home: "annaelle — на главную",
    logoAlt: "annaelle — студия лазерной эпиляции",
    promise: "Внутренняя гармония начинается с заботы о себе.",
    studio: "Студия",
    useful: "Полезное",
    contact: "Связаться",
    privacy: "Политика конфиденциальности",
    privacyText:
      "Данные из формы используются только для связи по вашей заявке и уточнения деталей записи. Мы не запрашиваем платёжные данные и не передаём контактные данные для сторонней рекламы.",
    disclaimer: "Результат, количество процедур и интервалы индивидуальны.",
    booking: "Онлайн-запись",
  },
  uz: {
    home: "annaelle — bosh sahifaga",
    logoAlt: "annaelle — lazer epilatsiyasi studiyasi",
    promise: "Ichki uyg‘unlik o‘zingizga g‘amxo‘rlik qilishdan boshlanadi.",
    studio: "Studiya",
    useful: "Foydali",
    contact: "Bog‘lanish",
    privacy: "Maxfiylik siyosati",
    privacyText:
      "Shakldagi ma’lumotlardan faqat so‘rovingiz bo‘yicha bog‘lanish va yozilish tafsilotlarini aniqlashtirish uchun foydalanamiz. To‘lov ma’lumotlarini so‘ramaymiz va kontaktlaringizni begona reklama uchun bermaymiz.",
    disclaimer: "Natija, muolajalar soni va oraliqlar individualdir.",
    booking: "Onlayn yozilish",
  },
  en: {
    home: "annaelle — home",
    logoAlt: "annaelle — laser hair removal studio",
    promise: "Inner harmony begins with caring for yourself.",
    studio: "Studio",
    useful: "Explore",
    contact: "Contact",
    privacy: "Privacy policy",
    privacyText:
      "We use the information from the form only to respond to your request and confirm appointment details. We do not request payment details or share your contact information for third-party advertising.",
    disclaimer: "Results, the number of sessions and intervals vary individually.",
    booking: "Book online",
  },
} as const;

const studioRoutes = ["/", "/about", "/specialists", "/reviews"] as const;
const serviceRoutes = ["/services", "/prices", "/silk", "/faq"] as const;

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const copy = getCopy(locale, footerCopy);
  const navigation = getNavigation(locale);
  const labelFor = (href: string) =>
    navigation.find((item) => item.href === href)?.label ?? href;

  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link href={localeHref(locale, "/")} aria-label={copy.home}>
            <Image
              src="/brand/logo-horizontal-white.svg"
              alt={copy.logoAlt}
              width={520}
              height={186}
              unoptimized
            />
          </Link>
          <p>{copy.promise}</p>
        </div>
        <div className="footer-links footer-links-wide">
          <div>
            <span>{copy.studio}</span>
            {studioRoutes.map((href) => (
              <Link key={href} href={localeHref(locale, href)}>
                {labelFor(href)}
              </Link>
            ))}
          </div>
          <div>
            <span>{copy.useful}</span>
            {serviceRoutes.map((href) => (
              <Link key={href} href={localeHref(locale, href)}>
                {labelFor(href)}
              </Link>
            ))}
            <Link href={localeHref(locale, "/booking")}>{copy.booking}</Link>
          </div>
          <div>
            <span>{copy.contact}</span>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={contact.emailHref}>E-mail</a>
            <a href={contact.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom" id="privacy">
        <span>© 2026 annaelle</span>
        <details>
          <summary>{copy.privacy}</summary>
          <p>{copy.privacyText}</p>
        </details>
        <span>{copy.disclaimer}</span>
      </div>
    </footer>
  );
}
