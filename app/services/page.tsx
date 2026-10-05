import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ServicePriceList } from "@/components/ServicePriceList";
import {
  preparationSteps,
  serviceFormats,
  visitSteps,
} from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/services", "ru");

const servicesPageCopy = {
  ru: {
    heroLabel: "Услуги",
    heroTitle: "Услуги из актуального прайс-листа",
    heroText:
      "Выберите одну из 15 разовых услуг, комбо-пакет на 5, 7 или 9 сеансов либо специальное предложение первого посещения.",
    heroAlt: "Процедура лазерной эпиляции в студии Annaelle",
    heroPrimary: "Записаться",
    heroSecondary: "Смотреть цены",
    formatsEyebrow: "Форматы услуг",
    formatsTitle: "Выберите удобную точку старта",
    formatsText:
      "Все форматы строятся вокруг одного принципа: понятный процесс, индивидуальные параметры и внимание к вашим ощущениям.",
    viewOptions: "Посмотреть варианты",
    singleEyebrow: "Разовые услуги",
    singleTitle: "15 услуг с фиксированной стоимостью",
    singleText:
      "Названия и суммы перенесены из предоставленного прайс-листа без изменения.",
    openFullPrice: "Открыть весь прайс",
    consultationAlt: "Специалист Annaelle обсуждает процедуру с гостьей",
    careEyebrow: "Спокойно на каждом этапе",
    careTitle: "Всё понятно уже с первого посещения",
    careLead:
      "До процедуры мастер уточнит важную информацию, расскажет, как всё проходит, и ответит на вопросы без спешки.",
    carePoints: [
      {
        title: "До визита",
        text: "Пришлём короткую памятку по подготовке.",
      },
      {
        title: "Во время",
        text: "Ориентируемся на ваши ощущения и комфорт.",
      },
      {
        title: "После",
        text: "Дадим рекомендации по домашнему уходу.",
      },
    ],
    faqLink: "Ответы на частые вопросы",
    processEyebrow: "Первый визит",
    processTitle: "Четыре спокойных шага",
    processText:
      "Вы понимаете, что происходит и зачем нужен каждый этап процедуры.",
    preparationEyebrow: "Подготовка",
    preparationTitle: "Небольшие шаги до посещения",
    preparationText:
      "Если у вас есть сомнения по подготовке или состоянию кожи, уточните детали у администратора до визита.",
    ctaTitle: "Не уверены, какой формат выбрать?",
    ctaText:
      "Расскажите, какие зоны вас интересуют. Администратор сравнит варианты и поможет начать с комфортного решения.",
    ctaSecondary: "Сравнить цены",
  },
  uz: {
    heroLabel: "Xizmatlar",
    heroTitle: "Amaldagi narxlar ro‘yxatidagi xizmatlar",
    heroText:
      "15 ta bir martalik xizmatdan birini, 5, 7 yoki 9 seanslik kombo-paketni yoxud ilk tashrif uchun maxsus taklifni tanlang.",
    heroAlt: "Annaelle studiyasida lazer epilyatsiyasi muolajasi",
    heroPrimary: "Yozilish",
    heroSecondary: "Narxlarni ko‘rish",
    formatsEyebrow: "Xizmat formatlari",
    formatsTitle: "Boshlash uchun qulay variantni tanlang",
    formatsText:
      "Barcha formatlar bitta tamoyilga asoslanadi: tushunarli jarayon, individual parametrlar va hislaringizga e‘tibor.",
    viewOptions: "Variantlarni ko‘rish",
    singleEyebrow: "Bir martalik xizmatlar",
    singleTitle: "Belgilangan narxdagi 15 ta xizmat",
    singleText:
      "Nomlar va narxlar taqdim etilgan narxlar ro‘yxatidan o‘zgartirilmasdan ko‘chirildi.",
    openFullPrice: "To‘liq narxlarni ochish",
    consultationAlt:
      "Annaelle mutaxassisi mehmon bilan muolajani muhokama qilmoqda",
    careEyebrow: "Har bir bosqichda xotirjamlik",
    careTitle: "Ilk tashrifdanoq hammasi tushunarli",
    careLead:
      "Muolajadan oldin mutaxassis muhim ma‘lumotlarni aniqlashtiradi, jarayonni tushuntiradi va shoshilmasdan savollaringizga javob beradi.",
    carePoints: [
      {
        title: "Tashrifdan oldin",
        text: "Tayyorgarlik bo‘yicha qisqa eslatma yuboramiz.",
      },
      {
        title: "Muolaja paytida",
        text: "Hislaringiz va qulayligingizga e‘tibor beramiz.",
      },
      {
        title: "Muolajadan keyin",
        text: "Uy sharoitidagi parvarish bo‘yicha tavsiyalar beramiz.",
      },
    ],
    faqLink: "Ko‘p so‘raladigan savollarga javoblar",
    processEyebrow: "Ilk tashrif",
    processTitle: "Xotirjam o‘tadigan to‘rt bosqich",
    processText:
      "Nima sodir bo‘layotgani va har bir bosqich nima uchun kerakligini tushunasiz.",
    preparationEyebrow: "Tayyorgarlik",
    preparationTitle: "Tashrifgacha bo‘lgan kichik qadamlar",
    preparationText:
      "Tayyorgarlik yoki terining holati bo‘yicha shubhangiz bo‘lsa, tashrifdan oldin administratordan aniqlashtiring.",
    ctaTitle: "Qaysi formatni tanlashni bilmayapsizmi?",
    ctaText:
      "Qaysi zonalar sizni qiziqtirishini ayting. Administrator variantlarni taqqoslab, qulay yechimdan boshlashingizga yordam beradi.",
    ctaSecondary: "Narxlarni taqqoslash",
  },
  en: {
    heroLabel: "Services",
    heroTitle: "Services from our current price list",
    heroText:
      "Choose from 15 single-session services, a 5-, 7-, or 9-session package, or a special offer for your first visit.",
    heroAlt: "A laser hair removal treatment at the Annaelle studio",
    heroPrimary: "Book a visit",
    heroSecondary: "View prices",
    formatsEyebrow: "Service formats",
    formatsTitle: "Choose the right place to begin",
    formatsText:
      "Every format follows the same principle: a clear process, personalized settings, and attention to how you feel.",
    viewOptions: "View options",
    singleEyebrow: "Single-session services",
    singleTitle: "15 services with fixed prices",
    singleText:
      "The service names and prices are shown exactly as provided in the current price list.",
    openFullPrice: "Open the full price list",
    consultationAlt:
      "An Annaelle specialist discussing the treatment with a guest",
    careEyebrow: "Comfort at every step",
    careTitle: "Everything is clear from your very first visit",
    careLead:
      "Before the treatment, your specialist will confirm important details, explain the process, and answer your questions without rushing.",
    carePoints: [
      {
        title: "Before your visit",
        text: "We’ll send you a short preparation guide.",
      },
      {
        title: "During treatment",
        text: "We pay attention to how you feel and keep you comfortable.",
      },
      {
        title: "Afterward",
        text: "We’ll provide clear at-home aftercare advice.",
      },
    ],
    faqLink: "Answers to common questions",
    processEyebrow: "Your first visit",
    processTitle: "Four unhurried steps",
    processText:
      "You’ll understand what is happening and why every stage of the treatment matters.",
    preparationEyebrow: "Preparation",
    preparationTitle: "A few simple steps before your visit",
    preparationText:
      "If you have any questions about preparation or the condition of your skin, check the details with our administrator before your visit.",
    ctaTitle: "Not sure which format to choose?",
    ctaText:
      "Tell us which areas interest you. Our administrator will compare the options and help you begin with a comfortable choice.",
    ctaSecondary: "Compare prices",
  },
};

export function ServicesPageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, servicesPageCopy);
  const localizedServiceFormats = localizeSiteValue(serviceFormats, locale);
  const localizedVisitSteps = localizeSiteValue(visitSteps, locale);
  const localizedPreparationSteps = localizeSiteValue(preparationSteps, locale);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.heroLabel}
        title={copy.heroTitle}
        text={copy.heroText}
        image="/images/services-hero.webp"
        imageAlt={copy.heroAlt}
        primary={{ href: "/booking", label: copy.heroPrimary }}
        secondary={{ href: "/prices", label: copy.heroSecondary }}
      />

      <section className="section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.formatsEyebrow}
            </p>
            <h2>{copy.formatsTitle}</h2>
            <p>{copy.formatsText}</p>
          </div>
          <div className="service-overview-grid">
            {localizedServiceFormats.map((item) => (
              <article key={item.number}>
                <span className="service-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link
                  className="card-link"
                  href={localeHref(locale, item.href)}
                >
                  {copy.viewOptions} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-zones-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.singleEyebrow}
              </p>
              <h2>{copy.singleTitle}</h2>
            </div>
            <div className="heading-action">
              <p>{copy.singleText}</p>
              <Link
                className="text-link"
                href={localeHref(locale, "/prices#single")}
              >
                {copy.openFullPrice} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <ServicePriceList locale={locale} />
        </div>
      </section>

      <section className="section care-section">
        <div className="shell care-grid">
          <div className="care-image image-mask">
            <Image
              src="/images/services-consultation.webp"
              alt={copy.consultationAlt}
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
              {copy.careEyebrow}
            </p>
            <h2>{copy.careTitle}</h2>
            <p className="section-lead">{copy.careLead}</p>
            <div className="care-points">
              {copy.carePoints.map((point) => (
                <div key={point.title}>
                  <strong>{point.title}</strong>
                  <span>{point.text}</span>
                </div>
              ))}
            </div>
            <Link className="text-link" href={localeHref(locale, "/faq")}>
              {copy.faqLink} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="shell process-shell">
          <div className="process-intro">
            <p className="eyebrow">{copy.processEyebrow}</p>
            <h2>{copy.processTitle}</h2>
            <p>{copy.processText}</p>
          </div>
          <ol className="process-list">
            {localizedVisitSteps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section preparation-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.preparationEyebrow}
              </p>
              <h2>{copy.preparationTitle}</h2>
            </div>
            <p>{copy.preparationText}</p>
          </div>
          <div className="preparation-grid">
            {localizedPreparationSteps.map((step, index) => (
              <article key={step.period}>
                <span>0{index + 1}</span>
                <h3>{step.period}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={copy.ctaTitle}
        text={copy.ctaText}
        secondary={{ href: "/prices", label: copy.ctaSecondary }}
      />
    </main>
  );
}

export default function ServicesPage() {
  return <ServicesPageContent locale="ru" />;
}
