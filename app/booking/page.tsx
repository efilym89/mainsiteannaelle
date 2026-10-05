import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { BrandStar } from "@/components/BrandStar";
import { PageHero } from "@/components/PageHero";
import { bookingServices, contact, preparationSteps } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/booking", "ru");

const pageCopy = {
  ru: {
    label: "Онлайн-запись",
    title: "Ваше время для себя",
    intro:
      "Оставьте контакты и пожелания по визиту. Администратор поможет выбрать услугу, уточнит важные детали и предложит удобное время.",
    prices: "Сначала посмотреть цены",
    eyebrow: "Запись в Annaelle",
    formTitle: "Расскажите, что вам удобно",
    formText:
      "Выберите услугу и предпочтительное время. Это заявка, а не автоматическое бронирование — администратор свяжется с вами для подтверждения.",
    callNote: "Обычно для подтверждения достаточно короткого звонка.",
    address: "Адрес",
    hours: "Режим работы",
    phone: "Телефон",
    before: "Перед посещением",
    preparationTitle: "Короткая памятка по подготовке",
    preparationText:
      "После подтверждения записи администратор уточнит рекомендации для выбранной зоны.",
    questions: "Все вопросы",
    backPrices: "Вернуться к ценам",
    otherContacts: "Другие способы связи",
  },
  uz: {
    label: "Onlayn yozilish",
    title: "O‘zingiz uchun ajratilgan vaqt",
    intro:
      "Kontaktlaringiz va tashrif bo‘yicha istaklaringizni qoldiring. Administrator xizmatni tanlashga yordam beradi, muhim tafsilotlarni aniqlaydi va qulay vaqt taklif qiladi.",
    prices: "Avval narxlarni ko‘rish",
    eyebrow: "Annaelle’ga yozilish",
    formTitle: "Sizga nima qulayligini ayting",
    formText:
      "Xizmat va ma’qul vaqtni tanlang. Bu avtomatik band qilish emas, so‘rovdir — administrator tasdiqlash uchun siz bilan bog‘lanadi.",
    callNote: "Odatda tasdiqlash uchun qisqa qo‘ng‘iroq yetarli.",
    address: "Manzil",
    hours: "Ish vaqti",
    phone: "Telefon",
    before: "Tashrifdan oldin",
    preparationTitle: "Qisqa tayyorgarlik eslatmasi",
    preparationText:
      "Yozilish tasdiqlangach, administrator tanlangan zona uchun tavsiyalarni aniqlashtiradi.",
    questions: "Barcha savollar",
    backPrices: "Narxlarga qaytish",
    otherContacts: "Boshqa aloqa usullari",
  },
  en: {
    label: "Online booking",
    title: "Time set aside for you",
    intro:
      "Leave your contact details and visit preferences. An administrator will help you choose a service, clarify important details and suggest a convenient time.",
    prices: "View prices first",
    eyebrow: "Book at Annaelle",
    formTitle: "Tell us what works for you",
    formText:
      "Choose a service and preferred time. This is a request rather than an automatic reservation; an administrator will contact you to confirm it.",
    callNote: "A short call is usually enough to confirm your visit.",
    address: "Address",
    hours: "Opening hours",
    phone: "Phone",
    before: "Before your visit",
    preparationTitle: "A short preparation checklist",
    preparationText:
      "Once the appointment is confirmed, an administrator will clarify the recommendations for your chosen area.",
    questions: "All questions",
    backPrices: "Back to prices",
    otherContacts: "Other ways to contact us",
  },
} as const;

export type BookingSearchParams = Promise<{ service?: string | string[] }>;

export async function BookingPageContent({
  searchParams,
  locale = "ru",
}: {
  searchParams: BookingSearchParams;
  locale?: Locale;
}) {
  const copy = getCopy(locale, pageCopy);
  const localizedContact = localizeSiteValue(contact, locale);
  const localizedPreparation = localizeSiteValue(preparationSteps, locale);
  const params = await searchParams;
  const serviceId = Array.isArray(params.service)
    ? params.service[0]
    : params.service;
  const initialService = bookingServices.some((item) => item.id === serviceId)
    ? (serviceId ?? "")
    : "";

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.label}
        title={copy.title}
        text={copy.intro}
        secondary={{ href: "/prices", label: copy.prices }}
      />

      <section className="booking-section booking-page-section">
        <div className="booking-pattern" aria-hidden="true" />
        <div className="shell booking-grid">
          <div className="booking-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2>{copy.formTitle}</h2>
            <p>{copy.formText}</p>
            <div className="booking-benefit">
              <BrandStar />
              <span>{copy.callNote}</span>
            </div>
            <dl className="booking-contact-list">
              <div>
                <dt>{copy.address}</dt>
                <dd>{localizedContact.address}</dd>
              </div>
              <div>
                <dt>{copy.hours}</dt>
                <dd>{localizedContact.hours}</dd>
              </div>
              <div>
                <dt>{copy.phone}</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </dd>
              </div>
            </dl>
          </div>
          <BookingForm initialService={initialService} locale={locale} />
        </div>
      </section>

      <section className="section booking-preparation-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.before}
              </p>
              <h2>{copy.preparationTitle}</h2>
            </div>
            <div className="heading-action">
              <p>{copy.preparationText}</p>
              <Link className="text-link" href={localeHref(locale, "/faq")}>
                {copy.questions} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="preparation-grid">
            {localizedPreparation.map((step, index) => (
              <article key={step.period}>
                <span>0{index + 1}</span>
                <h3>{step.period}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="inline-navigation">
            <Link href={localeHref(locale, "/prices")}>{copy.backPrices}</Link>
            <Link href={localeHref(locale, "/contacts")}>
              {copy.otherContacts}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: BookingSearchParams;
}) {
  return <BookingPageContent locale="ru" searchParams={searchParams} />;
}
