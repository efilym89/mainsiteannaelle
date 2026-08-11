import Link from "next/link";
import Image from "next/image";
import { contact } from "@/data/site";

const studioLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О студии" },
  { href: "/specialists", label: "Специалисты" },
  { href: "/reviews", label: "Отзывы" },
] as const;

const serviceLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/prices", label: "Цены" },
  { href: "/silk", label: "Карта Silk" },
  { href: "/faq", label: "FAQ" },
  { href: "/booking", label: "Онлайн-запись" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="annaelle — на главную">
            <Image
              src="/brand/logo-horizontal-white.svg"
              alt="annaelle — студия лазерной эпиляции"
              width={520}
              height={186}
              unoptimized
            />
          </Link>
          <p>Внутренняя гармония начинается с заботы о себе.</p>
        </div>
        <div className="footer-links footer-links-wide">
          <div>
            <span>Студия</span>
            {studioLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <span>Полезное</span>
            {serviceLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <span>Связаться</span>
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
          <summary>Политика конфиденциальности</summary>
          <p>
            Данные из формы используются только для связи по вашей заявке и
            уточнения деталей записи. Мы не запрашиваем платёжные данные и не
            передаём контактные данные для сторонней рекламы.
          </p>
        </details>
        <span>Результат, количество процедур и интервалы индивидуальны.</span>
      </div>
    </footer>
  );
}
