import type { Metadata } from "next";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { OfferCards } from "@/components/OfferCards";
import { PageHero } from "@/components/PageHero";
import { PriceExplorer } from "@/components/PriceExplorer";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/prices", "ru");

const pageCopy = {
  ru: {
    label: "Цены",
    title: "Актуальный прайс Annaelle",
    intro:
      "Разовые услуги, комбо-пакеты на 5, 7 и 9 сеансов и три специальных предложения — только по данным из предоставленных материалов.",
    book: "Записаться",
    services: "Об услугах",
    priceLabel: "Прайс Annaelle",
    format: "Выберите свой формат заботы",
    source:
      "Значения перенесены из актуального прайс-листа без добавления других услуг, цен или условий.",
    sessions: "сеансов",
    packageText: (discount: string) =>
      `Комбо-пакеты со скидкой ${discount} по предоставленному прайс-листу.`,
    procedure: "Как проходит процедура",
    courseQuestions: "Вопросы о курсе",
    offers: "Специальные предложения",
    firstVisit: "Только на первое посещение",
    offerNote:
      "Других условий или сроков действия в предоставленных материалах не указано.",
    help: "Нужна помощь с выбором?",
    helpText:
      "Оставьте заявку и укажите интересующие зоны — администратор сравнит варианты и подтвердит актуальную стоимость.",
  },
  uz: {
    label: "Narxlar",
    title: "Annaelle’ning amaldagi narxlari",
    intro:
      "Bir martalik xizmatlar, 5, 7 va 9 seansli kombo-paketlar hamda uchta maxsus taklif — faqat taqdim etilgan materiallardagi ma’lumotlar asosida.",
    book: "Yozilish",
    services: "Xizmatlar haqida",
    priceLabel: "Annaelle narxlari",
    format: "O‘zingizga mos g‘amxo‘rlik formatini tanlang",
    source:
      "Qiymatlar amaldagi narxlar ro‘yxatidan boshqa xizmat, narx yoki shart qo‘shilmasdan ko‘chirildi.",
    sessions: "seans",
    packageText: (discount: string) =>
      `Taqdim etilgan narxlar ro‘yxati bo‘yicha ${discount} chegirmali kombo-paketlar.`,
    procedure: "Muolaja qanday o‘tadi",
    courseQuestions: "Kurs haqidagi savollar",
    offers: "Maxsus takliflar",
    firstVisit: "Faqat birinchi tashrif uchun",
    offerNote:
      "Taqdim etilgan materiallarda boshqa shartlar yoki amal qilish muddati ko‘rsatilmagan.",
    help: "Tanlashda yordam kerakmi?",
    helpText:
      "So‘rov qoldiring va qiziqtirgan zonalarni ko‘rsating — administrator variantlarni solishtirib, amaldagi narxni tasdiqlaydi.",
  },
  en: {
    label: "Prices",
    title: "Current Annaelle price list",
    intro:
      "Single services, five-, seven- and nine-session packages, and three special offers, based solely on the supplied materials.",
    book: "Book",
    services: "About services",
    priceLabel: "Annaelle prices",
    format: "Choose the care format that suits you",
    source:
      "The figures are reproduced from the current price list without adding services, prices or conditions.",
    sessions: "sessions",
    packageText: (discount: string) =>
      `Course packages with a ${discount} discount, as listed in the supplied price list.`,
    procedure: "How the procedure works",
    courseQuestions: "Course questions",
    offers: "Special offers",
    firstVisit: "For your first visit only",
    offerNote:
      "The supplied materials do not state any other conditions or validity periods.",
    help: "Need help choosing?",
    helpText:
      "Send a request and tell us which areas interest you. An administrator will compare the options and confirm the current price.",
  },
} as const;

export function PricesPageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, pageCopy);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.label}
        title={copy.title}
        text={copy.intro}
        primary={{ href: "/booking", label: copy.book }}
        secondary={{ href: "/services", label: copy.services }}
      />

      <section className="section services-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.priceLabel}
              </p>
              <h2>{copy.format}</h2>
            </div>
            <p>{copy.source}</p>
          </div>
          <PriceExplorer locale={locale} />
        </div>
      </section>

      <section className="section price-guidance-section">
        <div className="shell info-cards-grid">
          {[5, 7, 9].map((sessions, index) => {
            const discount = ["20%", "25%", "30%"][index];
            return (
              <article key={sessions}>
                <span>0{index + 1}</span>
                <h3>
                  {sessions} {copy.sessions}
                </h3>
                <p>{copy.packageText(discount)}</p>
              </article>
            );
          })}
        </div>
        <div className="shell inline-navigation">
          <Link href={localeHref(locale, "/services")}>{copy.procedure}</Link>
          <Link href={localeHref(locale, "/faq")}>{copy.courseQuestions}</Link>
        </div>
      </section>

      <section className="section offers-section" id="offers">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.offers}
              </p>
              <h2>{copy.firstVisit}</h2>
            </div>
            <p>{copy.offerNote}</p>
          </div>
          <OfferCards locale={locale} />
        </div>
      </section>

      <CtaBand locale={locale} title={copy.help} text={copy.helpText} />
    </main>
  );
}

export default function PricesPage() {
  return <PricesPageContent locale="ru" />;
}
