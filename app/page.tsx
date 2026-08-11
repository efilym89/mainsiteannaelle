import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { OfferCards } from "@/components/OfferCards";
import { ReviewCards } from "@/components/ReviewCards";
import { advantages, serviceFormats } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/", "ru");

const homePageCopy = {
  ru: {
    heroEyebrow: "Студия лазерной эпиляции в Ташкенте",
    heroTitle: "Внутренняя гармония начинается с заботы о себе",
    heroLead:
      "Диодная лазерная эпиляция женских зон с вниманием к вашему комфорту. Подберём зоны и удобный формат курса после деликатной консультации.",
    bookOnline: "Записаться онлайн",
    viewPrices: "Посмотреть цены",
    advantagesAria: "Преимущества",
    trustItems: [
      "Женские зоны",
      "Индивидуальные параметры",
      "Памятка по подготовке",
    ],
    heroAlt: "Гостья студии Annaelle",
    serviceFormatsAria: "Форматы услуг",
    moreDetails: "Подробнее",
    offersEyebrow: "Специальные предложения",
    offersTitle: "Первое посещение Annaelle",
    offersText:
      "Три предложения из актуальных материалов. Каждое действует только на первое посещение.",
    fullPrice: "Весь прайс",
    advantagesEyebrow: "Почему Annaelle",
    advantagesTitle: "Точность и забота в каждой детали",
    advantagesText:
      "Профессиональная процедура может быть понятной, деликатной и комфортной именно для вас.",
    allServices: "Все услуги",
    aboutEyebrow: "О студии",
    aboutTitle: "Пространство бережной заботы о себе",
    aboutLead:
      "Annaelle — место, где профессиональная процедура сочетается с деликатным отношением и вниманием к деталям.",
    aboutText:
      "Здесь можно спокойно задать вопросы, понять каждый этап и выбрать подходящий формат без спешки.",
    learnAbout: "Узнать о студии",
    studioAlt: "Интерьер и атмосфера студии Annaelle",
    procedureAlt: "Процедура лазерной эпиляции в Annaelle",
    specialistsEyebrow: "Специалисты",
    specialistsTitle: "Мастер рядом на каждом этапе",
    specialistsLead:
      "От первой консультации до рекомендаций после процедуры — вы понимаете, что происходит и зачем нужен каждый шаг.",
    carePoints: [
      {
        title: "Объясняем",
        text: "Спокойно отвечаем на вопросы до начала процедуры.",
      },
      {
        title: "Уточняем",
        text: "Ориентируемся на ваши ощущения и обратную связь.",
      },
      {
        title: "Сопровождаем",
        text: "Даём понятные рекомендации после визита.",
      },
    ],
    aboutSpecialists: "О специалистах",
    reviewsEyebrow: "Отзывы",
    reviewsTitle: "Что говорят гости Annaelle",
    reviewsText:
      "Впечатления о мастерах, атмосфере и первом знакомстве с лазерной эпиляцией.",
    allReviews: "Все отзывы",
    faqEyebrow: "FAQ",
    faqTitle: "Главное перед первым визитом",
    faqText:
      "Коротко отвечаем на вопросы о курсе, подготовке и ощущениях во время процедуры.",
    allQuestions: "Все вопросы",
    ctaTitle: "Выберите удобное время для себя",
    ctaText:
      "Оставьте контакты — администратор поможет выбрать услугу, уточнит детали и предложит свободное время.",
    ctaSecondary: "Контакты студии",
  },
  uz: {
    heroEyebrow: "Toshkentdagi lazer epilyatsiyasi studiyasi",
    heroTitle: "Ichki uyg‘unlik o‘zingizga g‘amxo‘rlik qilishdan boshlanadi",
    heroLead:
      "Ayollar zonalari uchun diodli lazer epilyatsiyasi — qulayligingizga alohida e‘tibor bilan. Nozik maslahatdan so‘ng zonalar va kursning sizga mos formatini tanlaymiz.",
    bookOnline: "Onlayn yozilish",
    viewPrices: "Narxlarni ko‘rish",
    advantagesAria: "Afzalliklar",
    trustItems: [
      "Ayollar zonalari",
      "Individual parametrlar",
      "Tayyorgarlik bo‘yicha eslatma",
    ],
    heroAlt: "Annaelle studiyasi mehmoni",
    serviceFormatsAria: "Xizmat formatlari",
    moreDetails: "Batafsil",
    offersEyebrow: "Maxsus takliflar",
    offersTitle: "Annaelle studiyasiga ilk tashrif",
    offersText:
      "Amaldagi materiallardagi uchta taklif. Har biri faqat ilk tashrif uchun amal qiladi.",
    fullPrice: "To‘liq narxlar",
    advantagesEyebrow: "Nega aynan Annaelle",
    advantagesTitle: "Har bir tafsilotda aniqlik va g‘amxo‘rlik",
    advantagesText:
      "Professional muolaja aynan siz uchun tushunarli, nozik va qulay bo‘lishi mumkin.",
    allServices: "Barcha xizmatlar",
    aboutEyebrow: "Studiya haqida",
    aboutTitle: "O‘zingizga ehtiyotkorlik bilan g‘amxo‘rlik qilinadigan makon",
    aboutLead:
      "Annaelle — professional muolaja nozik munosabat va tafsilotlarga e‘tibor bilan uyg‘unlashadigan joy.",
    aboutText:
      "Bu yerda savollarni bemalol berish, har bir bosqichni tushunish va shoshilmasdan mos formatni tanlash mumkin.",
    learnAbout: "Studiya haqida bilish",
    studioAlt: "Annaelle studiyasining interyeri va muhiti",
    procedureAlt: "Annaelle studiyasida lazer epilyatsiyasi muolajasi",
    specialistsEyebrow: "Mutaxassislar",
    specialistsTitle: "Har bir bosqichda mutaxassis yoningizda",
    specialistsLead:
      "Ilk maslahatdan muolajadan keyingi tavsiyalargacha — nima bo‘layotganini va har bir qadam nima uchun kerakligini tushunasiz.",
    carePoints: [
      {
        title: "Tushuntiramiz",
        text: "Muolaja boshlanishidan oldin savollaringizga xotirjam javob beramiz.",
      },
      {
        title: "Aniqlashtiramiz",
        text: "Sizning hislaringiz va fikr-mulohazalaringizga tayanamiz.",
      },
      {
        title: "Hamrohlik qilamiz",
        text: "Tashrifdan keyin tushunarli tavsiyalar beramiz.",
      },
    ],
    aboutSpecialists: "Mutaxassislar haqida",
    reviewsEyebrow: "Sharhlar",
    reviewsTitle: "Annaelle mehmonlari nima deydi",
    reviewsText:
      "Mutaxassislar, muhit va lazer epilyatsiyasi bilan ilk tanishuv haqidagi taassurotlar.",
    allReviews: "Barcha sharhlar",
    faqEyebrow: "Savol-javob",
    faqTitle: "Ilk tashrif oldidan eng muhimlari",
    faqText:
      "Kurs, tayyorgarlik va muolaja paytidagi hislar haqidagi savollarga qisqacha javob beramiz.",
    allQuestions: "Barcha savollar",
    ctaTitle: "O‘zingiz uchun qulay vaqtni tanlang",
    ctaText:
      "Kontaktlaringizni qoldiring — administrator xizmatni tanlashga yordam beradi, tafsilotlarni aniqlashtiradi va bo‘sh vaqtlarni taklif qiladi.",
    ctaSecondary: "Studiya kontaktlari",
  },
  en: {
    heroEyebrow: "Laser hair removal studio in Tashkent",
    heroTitle: "Inner harmony begins with caring for yourself",
    heroLead:
      "Diode laser hair removal for women, with close attention to your comfort. After a thoughtful consultation, we’ll help you choose the right areas and course format.",
    bookOnline: "Book online",
    viewPrices: "View prices",
    advantagesAria: "Benefits",
    trustItems: [
      "Women’s treatment areas",
      "Personalized settings",
      "Preparation guide",
    ],
    heroAlt: "A guest at the Annaelle studio",
    serviceFormatsAria: "Service formats",
    moreDetails: "Learn more",
    offersEyebrow: "Special offers",
    offersTitle: "Your first visit to Annaelle",
    offersText:
      "Three offers from our current materials. Each is available for your first visit only.",
    fullPrice: "View all prices",
    advantagesEyebrow: "Why Annaelle",
    advantagesTitle: "Precision and care in every detail",
    advantagesText:
      "A professional treatment can feel clear, considerate, and comfortable for you.",
    allServices: "All services",
    aboutEyebrow: "About the studio",
    aboutTitle: "A space for thoughtful self-care",
    aboutLead:
      "Annaelle is where professional treatment meets a considerate approach and close attention to detail.",
    aboutText:
      "Here, you can ask questions comfortably, understand every step, and choose the right format without feeling rushed.",
    learnAbout: "Discover the studio",
    studioAlt: "The interior and atmosphere of the Annaelle studio",
    procedureAlt: "A laser hair removal treatment at Annaelle",
    specialistsEyebrow: "Specialists",
    specialistsTitle: "A specialist by your side at every step",
    specialistsLead:
      "From the first consultation to aftercare advice, you’ll understand what is happening and why each step matters.",
    carePoints: [
      {
        title: "We explain",
        text: "We answer your questions calmly before the treatment begins.",
      },
      {
        title: "We check in",
        text: "We listen to how you feel and respond to your feedback.",
      },
      {
        title: "We support you",
        text: "We provide clear aftercare guidance following your visit.",
      },
    ],
    aboutSpecialists: "Meet our specialists",
    reviewsEyebrow: "Reviews",
    reviewsTitle: "What Annaelle guests say",
    reviewsText:
      "Guests share their impressions of our specialists, the atmosphere, and their first laser hair removal experience.",
    allReviews: "All reviews",
    faqEyebrow: "FAQ",
    faqTitle: "What to know before your first visit",
    faqText:
      "Brief answers to common questions about your course, preparation, and what a treatment feels like.",
    allQuestions: "All questions",
    ctaTitle: "Choose a time that works for you",
    ctaText:
      "Leave your contact details and our administrator will help you choose a service, confirm the details, and suggest available times.",
    ctaSecondary: "Studio contacts",
  },
};

export function HomePageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, homePageCopy);
  const localizedServiceFormats = localizeSiteValue(serviceFormats, locale);
  const localizedAdvantages = localizeSiteValue(advantages, locale);

  return (
    <main id="main-content">
      <section className="hero" id="top">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.heroEyebrow}
            </p>
            <h1>{copy.heroTitle}</h1>
            <p className="hero-lead">{copy.heroLead}</p>
            <div className="hero-actions">
              <Link className="button" href={localeHref(locale, "/booking")}>
                {copy.bookOnline} <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href={localeHref(locale, "/prices")}>
                {copy.viewPrices} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="trust-list" aria-label={copy.advantagesAria}>
              {copy.trustItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <Image
                src="/images/home-hero.webp"
                alt={copy.heroAlt}
                width={1040}
                height={1210}
                unoptimized
                priority
                fetchPriority="high"
                sizes="(max-width: 780px) calc(100vw - 32px), (max-width: 1060px) 580px, (max-width: 1199px) 520px, 600px"
              />
              <BrandStar className="image-star" />
            </div>
          </div>
        </div>
      </section>

      <section className="quick-services" aria-label={copy.serviceFormatsAria}>
        <div className="shell quick-grid">
          {localizedServiceFormats.map((item) => (
            <article key={item.number}>
              <span className="service-number">{item.number}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <Link className="card-link" href={localeHref(locale, item.href)}>
                {copy.moreDetails} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section offers-section" id="offers">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.offersEyebrow}
              </p>
              <h2>{copy.offersTitle}</h2>
            </div>
            <div className="heading-action">
              <p>{copy.offersText}</p>
              <Link
                className="text-link"
                href={localeHref(locale, "/prices#offers")}
              >
                {copy.fullPrice} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <OfferCards locale={locale} />
        </div>
      </section>

      <section className="section advantages-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.advantagesEyebrow}
              </p>
              <h2>{copy.advantagesTitle}</h2>
            </div>
            <div className="heading-action">
              <p>{copy.advantagesText}</p>
              <Link
                className="text-link"
                href={localeHref(locale, "/services")}
              >
                {copy.allServices} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="advantages-grid advantages-grid-three">
            {localizedAdvantages.slice(0, 3).map((item, index) => (
              <article key={item.title}>
                <div className="advantage-icon">
                  <BrandStar />
                  <span>0{index + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="shell about-grid">
          <div className="about-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.aboutEyebrow}
            </p>
            <h2>{copy.aboutTitle}</h2>
            <p className="section-lead">{copy.aboutLead}</p>
            <p>{copy.aboutText}</p>
            <Link className="text-link" href={localeHref(locale, "/about")}>
              {copy.learnAbout} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="about-image">
            <Image
              src="/images/home-studio.webp"
              alt={copy.studioAlt}
              width={1600}
              height={1280}
              unoptimized
              loading="lazy"
              sizes="(max-width: 900px) calc(100vw - 32px), 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section care-section">
        <div className="shell care-grid">
          <div className="care-image image-mask">
            <Image
              src="/images/home-procedure.webp"
              alt={copy.procedureAlt}
              width={1000}
              height={1220}
              unoptimized
              loading="lazy"
              sizes="(max-width: 900px) calc(100vw - 32px), 500px"
            />
            <BrandStar className="image-star" />
          </div>
          <div className="care-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.specialistsEyebrow}
            </p>
            <h2>{copy.specialistsTitle}</h2>
            <p className="section-lead">{copy.specialistsLead}</p>
            <div className="care-points">
              {copy.carePoints.map((point) => (
                <div key={point.title}>
                  <strong>{point.title}</strong>
                  <span>{point.text}</span>
                </div>
              ))}
            </div>
            <Link
              className="text-link"
              href={localeHref(locale, "/specialists")}
            >
              {copy.aboutSpecialists} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="shell">
          <div className="section-heading split-heading reviews-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.reviewsEyebrow}
              </p>
              <h2>{copy.reviewsTitle}</h2>
            </div>
            <div className="heading-action">
              <p>{copy.reviewsText}</p>
              <Link
                className="text-link"
                href={localeHref(locale, "/reviews")}
              >
                {copy.allReviews} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <ReviewCards locale={locale} />
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div className="faq-intro">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.faqEyebrow}
            </p>
            <h2>{copy.faqTitle}</h2>
            <p>{copy.faqText}</p>
            <Link className="button" href={localeHref(locale, "/faq")}>
              {copy.allQuestions}
            </Link>
          </div>
          <FaqList limit={3} locale={locale} />
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={copy.ctaTitle}
        text={copy.ctaText}
        secondary={{ href: "/contacts", label: copy.ctaSecondary }}
      />
    </main>
  );
}

export default function HomePage() {
  return <HomePageContent locale="ru" />;
}
