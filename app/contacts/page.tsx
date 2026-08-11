import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты студии в Ташкенте",
  description:
    "Контакты студии Annaelle в Ташкенте: адрес, режим работы, телефон, e-mail, Instagram и маршрут.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <main id="main-content">
      <PageHero
        label="Контакты"
        title="Будем рады видеть вас в Annaelle"
        text="Студия находится на улице Шота Руставели в Ташкенте. Перед визитом оставьте заявку или свяжитесь с нами удобным способом."
        image="/images/contacts-hero.webp"
        imageAlt="Входная зона студии Annaelle в Ташкенте"
        primary={{ href: "/booking", label: "Записаться" }}
        secondary={{ href: contact.map, label: "Построить маршрут" }}
      />

      <section className="section contacts-section contacts-page-section">
        <div className="shell contacts-grid">
          <div className="contact-card">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Студия в Ташкенте
            </p>
            <h2>Все способы связаться</h2>
            <div className="contact-details">
              <div>
                <span>Адрес</span>
                <strong>{contact.address}</strong>
              </div>
              <div>
                <span>Режим работы</span>
                <strong>{contact.hours}</strong>
              </div>
              <div>
                <span>Телефон</span>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
              <div>
                <span>E-mail</span>
                <a href={contact.emailHref}>{contact.email}</a>
              </div>
            </div>
            <div className="contact-actions">
              <a
                className="button"
                href={contact.map}
                target="_blank"
                rel="noreferrer"
              >
                Построить маршрут
              </a>
              <a
                className="text-link"
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="location-visual" aria-label="Студия в Ташкенте">
            <div className="location-pattern" />
            <Image
              src="/brand/logo-stacked.svg"
              alt=""
              width={337}
              height={326}
              loading="lazy"
              unoptimized
            />
            <div className="location-pin">
              <BrandStar />
              <span>{contact.shortAddress}</span>
              <small>Ташкент</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-help-section">
        <div className="shell info-cards-grid">
          <article>
            <span>01</span>
            <h3>Выбрать услугу</h3>
            <p>
              Изучите разовые услуги, комбо-пакеты и специальные предложения.
            </p>
            <Link className="card-link" href="/prices">
              Перейти к ценам <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article>
            <span>02</span>
            <h3>Подготовиться</h3>
            <p>
              Посмотрите основные шаги подготовки и ответы на частые вопросы.
            </p>
            <Link className="card-link" href="/faq">
              Открыть FAQ <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article>
            <span>03</span>
            <h3>Выбрать время</h3>
            <p>
              Оставьте контактные данные и предпочтительные дату и время.
            </p>
            <Link className="card-link" href="/booking">
              Онлайн-запись <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>

      <CtaBand
        title="Спланируем ваш первый визит"
        text="Оставьте заявку — администратор уточнит услугу, проверит свободные окна и подтвердит запись."
        secondary={{ href: contact.phoneHref, label: "Позвонить в студию" }}
      />
    </main>
  );
}
