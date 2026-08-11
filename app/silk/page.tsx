import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/silk", "ru");

const pageCopy = {
  ru: {
    label: "Карта Silk",
    title: "Silk в Apple Wallet",
    intro:
      "Цифровая карта Annaelle для Apple Wallet. На странице размещена только информация, подтверждённая доступными материалами.",
    contact: "Связаться с администратором",
    prices: "Открыть прайс",
    cardAlt: "Фирменное оформление цифровой карты Silk",
    digitalCard: "Цифровая карта",
    verified: "Подтверждённая информация",
    aesthetic: "Цифровой формат в эстетике Annaelle",
    verifiedText:
      "В доступных материалах подтверждены название Silk, формат Apple Wallet и визуальная концепция карты.",
    unknownText:
      "Условия получения, привилегии, срок действия и порядок использования в материалах не указаны. Их можно уточнить у администратора.",
    clarify: "Уточнить информацию",
    factsTitle: "Всё, что подтверждено материалами",
    facts: [
      { number: "01", title: "Название", text: "Карта Silk." },
      { number: "02", title: "Формат", text: "Цифровая карта для Apple Wallet." },
      {
        number: "03",
        title: "Оформление",
        text: "Тёмный шёлк, глубокий графит, мягкие волны и деликатные переливы.",
      },
    ],
    qrNote:
      "Исходный QR-код и ссылка добавления карты не предоставлены, поэтому они не размещены на странице.",
    ctaTitle: "Уточните детали у администратора",
    ctaText:
      "Свяжитесь со студией, чтобы получить подтверждённую информацию о доступности и условиях карты Silk.",
    studioContacts: "Контакты студии",
  },
  uz: {
    label: "Silk kartasi",
    title: "Apple Wallet’dagi Silk",
    intro:
      "Annaelle’ning Apple Wallet uchun raqamli kartasi. Bu sahifada faqat mavjud materiallar tasdiqlagan ma’lumotlar berilgan.",
    contact: "Administrator bilan bog‘lanish",
    prices: "Narxlarni ochish",
    cardAlt: "Silk raqamli kartasining brend dizayni",
    digitalCard: "Raqamli karta",
    verified: "Tasdiqlangan ma’lumot",
    aesthetic: "Annaelle estetikasidagi raqamli format",
    verifiedText:
      "Mavjud materiallarda Silk nomi, Apple Wallet formati va kartaning vizual konsepsiyasi tasdiqlangan.",
    unknownText:
      "Olish shartlari, imtiyozlar, amal qilish muddati va foydalanish tartibi materiallarda ko‘rsatilmagan. Ularni administratordan aniqlashtirishingiz mumkin.",
    clarify: "Ma’lumotni aniqlashtirish",
    factsTitle: "Materiallar tasdiqlagan barcha ma’lumot",
    facts: [
      { number: "01", title: "Nomi", text: "Silk kartasi." },
      { number: "02", title: "Format", text: "Apple Wallet uchun raqamli karta." },
      {
        number: "03",
        title: "Dizayn",
        text: "To‘q ipak, chuqur grafit, yumshoq to‘lqinlar va nozik tovlanishlar.",
      },
    ],
    qrNote:
      "Asl QR-kod va kartani qo‘shish havolasi taqdim etilmagan, shu sababli ular sahifaga joylanmadi.",
    ctaTitle: "Tafsilotlarni administratordan aniqlashtiring",
    ctaText:
      "Silk kartasining mavjudligi va shartlari haqida tasdiqlangan ma’lumot olish uchun studiya bilan bog‘laning.",
    studioContacts: "Studiya kontaktlari",
  },
  en: {
    label: "Silk Card",
    title: "Silk in Apple Wallet",
    intro:
      "Annaelle’s digital card for Apple Wallet. This page contains only information confirmed by the available materials.",
    contact: "Contact the administrator",
    prices: "View prices",
    cardAlt: "Branded design of the Silk digital card",
    digitalCard: "Digital card",
    verified: "Confirmed information",
    aesthetic: "A digital format with Annaelle aesthetics",
    verifiedText:
      "The available materials confirm the Silk name, Apple Wallet format and the card’s visual concept.",
    unknownText:
      "The materials do not state how to obtain the card, its benefits, validity period or terms of use. Please ask an administrator for details.",
    clarify: "Ask for details",
    factsTitle: "Everything confirmed by the materials",
    facts: [
      { number: "01", title: "Name", text: "Silk Card." },
      { number: "02", title: "Format", text: "A digital card for Apple Wallet." },
      {
        number: "03",
        title: "Design",
        text: "Dark silk, deep graphite, soft waves and subtle highlights.",
      },
    ],
    qrNote:
      "The original QR code and card-addition link were not supplied, so they are not shown on this page.",
    ctaTitle: "Ask an administrator for details",
    ctaText:
      "Contact the studio for confirmed information about Silk Card availability and terms.",
    studioContacts: "Studio contacts",
  },
} as const;

export function SilkPageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, pageCopy);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.label}
        title={copy.title}
        text={copy.intro}
        primary={{ href: "/contacts", label: copy.contact }}
        secondary={{ href: "/prices", label: copy.prices }}
      />

      <section className="section silk-showcase-section" id="silk-card">
        <div className="shell silk-showcase-grid">
          <div className="silk-card-visual" role="img" aria-label={copy.cardAlt}>
            <div className="silk-wave silk-wave-one" aria-hidden="true" />
            <div className="silk-wave silk-wave-two" aria-hidden="true" />
            <Image
              className="silk-card-logo"
              src="/brand/logo-horizontal-white.svg"
              alt="annaelle"
              width={520}
              height={186}
              unoptimized
            />
            <div className="silk-card-copy">
              <span>{copy.digitalCard}</span>
              <strong>Silk</strong>
              <small>Apple Wallet</small>
            </div>
            <BrandStar className="silk-card-star" />
          </div>

          <div className="silk-showcase-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.verified}
            </p>
            <h2>{copy.aesthetic}</h2>
            <p>{copy.verifiedText}</p>
            <p>{copy.unknownText}</p>
            <Link className="text-link" href={localeHref(locale, "/contacts")}>
              {copy.clarify} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section silk-facts-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.label}
            </p>
            <h2>{copy.factsTitle}</h2>
          </div>
          <div className="info-cards-grid silk-facts-grid">
            {copy.facts.map((fact) => (
              <article key={fact.number}>
                <span>{fact.number}</span>
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
              </article>
            ))}
          </div>
          <p className="silk-qr-note">{copy.qrNote}</p>
        </div>
      </section>

      <CtaBand
        locale={locale}
        eyebrow={copy.label}
        title={copy.ctaTitle}
        text={copy.ctaText}
        primary={{ href: "/contacts", label: copy.studioContacts }}
      />
    </main>
  );
}

export default function SilkPage() {
  return <SilkPageContent locale="ru" />;
}
