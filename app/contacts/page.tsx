import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/contacts", "ru");

const pageCopy = {
  ru: {
    label: "Контакты",
    title: "Будем рады видеть вас в Annaelle",
    intro:
      "Студия находится на улице Шота Руставели в Ташкенте. Перед визитом оставьте заявку или свяжитесь с нами удобным способом.",
    imageAlt: "Входная зона студии Annaelle в Ташкенте",
    book: "Записаться",
    route: "Построить маршрут",
    studio: "Студия в Ташкенте",
    allContacts: "Все способы связаться",
    address: "Адрес",
    hours: "Режим работы",
    phone: "Телефон",
    city: "Ташкент",
    cards: [
      {
        title: "Выбрать услугу",
        text: "Изучите разовые услуги, комбо-пакеты и специальные предложения.",
        label: "Перейти к ценам",
        href: "/prices",
      },
      {
        title: "Подготовиться",
        text: "Посмотрите основные шаги подготовки и ответы на частые вопросы.",
        label: "Открыть FAQ",
        href: "/faq",
      },
      {
        title: "Выбрать время",
        text: "Оставьте контактные данные и предпочтительные дату и время.",
        label: "Онлайн-запись",
        href: "/booking",
      },
    ],
    ctaTitle: "Спланируем ваш первый визит",
    ctaText:
      "Оставьте заявку — администратор уточнит услугу, проверит свободные окна и подтвердит запись.",
    call: "Позвонить в студию",
  },
  uz: {
    label: "Kontaktlar",
    title: "Sizni Annaelle’da ko‘rishdan mamnun bo‘lamiz",
    intro:
      "Studiya Toshkentdagi Shota Rustaveli ko‘chasida joylashgan. Tashrifdan oldin so‘rov qoldiring yoki qulay usulda bog‘laning.",
    imageAlt: "Toshkentdagi Annaelle studiyasining kirish zonasi",
    book: "Yozilish",
    route: "Yo‘nalish qurish",
    studio: "Toshkentdagi studiya",
    allContacts: "Bog‘lanishning barcha usullari",
    address: "Manzil",
    hours: "Ish vaqti",
    phone: "Telefon",
    city: "Toshkent",
    cards: [
      {
        title: "Xizmat tanlash",
        text: "Bir martalik xizmatlar, kombo-paketlar va maxsus takliflarni ko‘ring.",
        label: "Narxlarga o‘tish",
        href: "/prices",
      },
      {
        title: "Tayyorgarlik",
        text: "Tayyorgarlikning asosiy bosqichlari va tez-tez beriladigan savollarni ko‘ring.",
        label: "FAQ’ni ochish",
        href: "/faq",
      },
      {
        title: "Vaqt tanlash",
        text: "Kontakt ma’lumotlaringiz, ma’qul sana va vaqtni qoldiring.",
        label: "Onlayn yozilish",
        href: "/booking",
      },
    ],
    ctaTitle: "Birinchi tashrifingizni rejalashtiramiz",
    ctaText:
      "So‘rov qoldiring — administrator xizmatni aniqlaydi, bo‘sh vaqtlarni tekshiradi va yozilishni tasdiqlaydi.",
    call: "Studiyaga qo‘ng‘iroq qilish",
  },
  en: {
    label: "Contacts",
    title: "We look forward to welcoming you to Annaelle",
    intro:
      "The studio is on Shota Rustaveli Street in Tashkent. Send a request or contact us in the way that suits you before your visit.",
    imageAlt: "Entrance area of the Annaelle studio in Tashkent",
    book: "Book",
    route: "Get directions",
    studio: "Studio in Tashkent",
    allContacts: "All the ways to reach us",
    address: "Address",
    hours: "Opening hours",
    phone: "Phone",
    city: "Tashkent",
    cards: [
      {
        title: "Choose a service",
        text: "Explore single services, course packages and special offers.",
        label: "View prices",
        href: "/prices",
      },
      {
        title: "Prepare for your visit",
        text: "Review the essential preparation steps and frequently asked questions.",
        label: "Open FAQ",
        href: "/faq",
      },
      {
        title: "Choose a time",
        text: "Leave your contact details and preferred date and time.",
        label: "Book online",
        href: "/booking",
      },
    ],
    ctaTitle: "Let’s plan your first visit",
    ctaText:
      "Send a request. An administrator will clarify the service, check available times and confirm your appointment.",
    call: "Call the studio",
  },
} as const;

export function ContactsPageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, pageCopy);
  const localizedContact = localizeSiteValue(contact, locale);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.label}
        title={copy.title}
        text={copy.intro}
        image="/images/contacts-hero.webp"
        imageAlt={copy.imageAlt}
        primary={{ href: "/booking", label: copy.book }}
        secondary={{ href: contact.map, label: copy.route }}
      />

      <section className="section contacts-section contacts-page-section">
        <div className="shell contacts-grid">
          <div className="contact-card">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.studio}
            </p>
            <h2>{copy.allContacts}</h2>
            <div className="contact-details">
              <div>
                <span>{copy.address}</span>
                <strong>{localizedContact.address}</strong>
              </div>
              <div>
                <span>{copy.hours}</span>
                <strong>{localizedContact.hours}</strong>
              </div>
              <div>
                <span>{copy.phone}</span>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
              <div>
                <span>E-mail</span>
                <a href={contact.emailHref}>{contact.email}</a>
              </div>
            </div>
            <div className="contact-actions">
              <a className="button" href={contact.map} target="_blank" rel="noreferrer">
                {copy.route}
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

          <div className="location-visual" aria-label={copy.studio}>
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
              <span>{localizedContact.shortAddress}</span>
              <small>{copy.city}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-help-section">
        <div className="shell info-cards-grid">
          {copy.cards.map((card, index) => (
            <article key={card.title}>
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link className="card-link" href={localeHref(locale, card.href)}>
                {card.label} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={copy.ctaTitle}
        text={copy.ctaText}
        secondary={{ href: contact.phoneHref, label: copy.call }}
      />
    </main>
  );
}

export default function ContactsPage() {
  return <ContactsPageContent locale="ru" />;
}
