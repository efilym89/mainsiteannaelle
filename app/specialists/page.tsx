import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { specialistStandards, visitSteps } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/specialists", "ru");

const specialistsPageCopy = {
  ru: {
    heroLabel: "Специалисты",
    heroTitle: "Мастер рядом на каждом этапе",
    heroText:
      "В Annaelle важны не только параметры процедуры, но и то, как вы чувствуете себя во время визита. Специалист объясняет процесс, слышит обратную связь и помогает спокойно пройти каждый этап.",
    heroAlt: "Специалист Annaelle рядом с лазерным аппаратом",
    heroPrimary: "Записаться к мастеру",
    heroSecondary: "Отзывы гостей",
    teamEyebrow: "Команда Annaelle",
    teamTitle: "Профессиональный подход без дистанции",
    teamLead:
      "Перед процедурой вы знакомитесь с мастером, обсуждаете выбранные зоны и задаёте все важные вопросы.",
    teamText:
      "Специалист уточняет необходимую информацию, объясняет этапы и договаривается с вами о комфортной коммуникации во время процедуры. Если ощущения меняются, об этом можно сказать в любой момент.",
    standardsEyebrow: "Стандарт работы",
    standardsTitle: "Что вы можете ожидать от мастера Annaelle",
    standardsText:
      "Общие принципы, которые помогают сделать посещение понятным и комфортным.",
    processEyebrow: "Вместе с мастером",
    processTitle: "Четыре спокойных шага",
    processText:
      "Никакой неопределённости: каждый этап заранее понятен и последователен.",
    choiceAlt: "Зона ожидания студии Annaelle",
    choiceEyebrow: "Запись к специалисту",
    choiceTitle: "Подберём мастера и удобное время",
    choiceText:
      "Оставьте заявку и укажите интересующие зоны. Администратор предложит доступные окна и подтвердит детали первого визита.",
    bookLink: "Записаться",
    serviceLink: "Выбрать услугу",
    ctaTitle: "Первое знакомство — без спешки",
    ctaText:
      "Администратор поможет выбрать услугу, а мастер перед процедурой объяснит каждый этап и ответит на вопросы.",
    ctaSecondary: "Отзывы о мастерах",
  },
  uz: {
    heroLabel: "Mutaxassislar",
    heroTitle: "Har bir bosqichda mutaxassis yoningizda",
    heroText:
      "Annaelle studiyasida muolaja parametrlari bilan birga tashrif davomida o‘zingizni qanday his qilishingiz ham muhim. Mutaxassis jarayonni tushuntiradi, fikr-mulohazangizni tinglaydi va har bir bosqichni xotirjam o‘tishga yordam beradi.",
    heroAlt: "Annaelle mutaxassisi lazer apparati yonida",
    heroPrimary: "Mutaxassisga yozilish",
    heroSecondary: "Mehmonlar sharhlari",
    teamEyebrow: "Annaelle jamoasi",
    teamTitle: "Samimiy professional yondashuv",
    teamLead:
      "Muolajadan oldin mutaxassis bilan tanishasiz, tanlangan zonalarni muhokama qilasiz va barcha muhim savollarni berasiz.",
    teamText:
      "Mutaxassis zarur ma‘lumotlarni aniqlashtiradi, bosqichlarni tushuntiradi va muolaja paytida sizga qulay muloqot usulini kelishib oladi. Hislaringiz o‘zgarsa, buni istalgan payt aytishingiz mumkin.",
    standardsEyebrow: "Ish standarti",
    standardsTitle: "Annaelle mutaxassisidan nimalarni kutishingiz mumkin",
    standardsText:
      "Tashrifni tushunarli va qulay qilishga yordam beradigan umumiy tamoyillar.",
    processEyebrow: "Mutaxassis bilan birga",
    processTitle: "Xotirjam o‘tadigan to‘rt bosqich",
    processText:
      "Noaniqlik yo‘q: har bir bosqich oldindan tushunarli va izchil.",
    choiceAlt: "Annaelle studiyasining kutish zonasi",
    choiceEyebrow: "Mutaxassisga yozilish",
    choiceTitle: "Mutaxassis va qulay vaqtni tanlaymiz",
    choiceText:
      "Ariza qoldiring va sizni qiziqtirgan zonalarni ko‘rsating. Administrator bo‘sh vaqtlarni taklif qiladi va ilk tashrif tafsilotlarini tasdiqlaydi.",
    bookLink: "Yozilish",
    serviceLink: "Xizmatni tanlash",
    ctaTitle: "Ilk tanishuv — shoshilmasdan",
    ctaText:
      "Administrator xizmatni tanlashga yordam beradi, mutaxassis esa muolajadan oldin har bir bosqichni tushuntiradi va savollaringizga javob beradi.",
    ctaSecondary: "Mutaxassislar haqidagi sharhlar",
  },
  en: {
    heroLabel: "Specialists",
    heroTitle: "A specialist by your side at every step",
    heroText:
      "At Annaelle, the treatment settings matter, but so does how you feel throughout your visit. Your specialist explains the process, listens to your feedback, and helps you move through every stage with confidence.",
    heroAlt: "An Annaelle specialist beside the laser equipment",
    heroPrimary: "Book with a specialist",
    heroSecondary: "Guest reviews",
    teamEyebrow: "The Annaelle team",
    teamTitle: "Professional care with a personal touch",
    teamLead:
      "Before the treatment, you’ll meet your specialist, discuss the selected areas, and ask every question that matters to you.",
    teamText:
      "Your specialist confirms the necessary information, explains each stage, and agrees with you on a comfortable way to communicate during the treatment. If anything feels different, you can say so at any time.",
    standardsEyebrow: "Our standard of care",
    standardsTitle: "What you can expect from an Annaelle specialist",
    standardsText:
      "Shared principles that help make every visit clear and comfortable.",
    processEyebrow: "Together with your specialist",
    processTitle: "Four unhurried steps",
    processText:
      "No uncertainty: every stage is clear in advance and follows a thoughtful sequence.",
    choiceAlt: "The waiting area at the Annaelle studio",
    choiceEyebrow: "Booking with a specialist",
    choiceTitle: "We’ll find the right specialist and time",
    choiceText:
      "Send a request and tell us which areas interest you. Our administrator will suggest available times and confirm the details of your first visit.",
    bookLink: "Book a visit",
    serviceLink: "Choose a service",
    ctaTitle: "Your first introduction, without the rush",
    ctaText:
      "Our administrator will help you choose a service, and your specialist will explain every stage and answer your questions before the treatment.",
    ctaSecondary: "Reviews of our specialists",
  },
};

export function SpecialistsPageContent({
  locale = "ru",
}: {
  locale?: Locale;
}) {
  const copy = getCopy(locale, specialistsPageCopy);
  const localizedStandards = localizeSiteValue(specialistStandards, locale);
  const localizedVisitSteps = localizeSiteValue(visitSteps, locale);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.heroLabel}
        title={copy.heroTitle}
        text={copy.heroText}
        image="/images/specialists-hero.webp"
        imageAlt={copy.heroAlt}
        primary={{ href: "/booking", label: copy.heroPrimary }}
        secondary={{ href: "/reviews", label: copy.heroSecondary }}
      />

      <section className="section specialists-intro-section">
        <div className="shell editorial-grid">
          <div>
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.teamEyebrow}
            </p>
            <h2>{copy.teamTitle}</h2>
          </div>
          <div className="editorial-copy">
            <p className="section-lead">{copy.teamLead}</p>
            <p>{copy.teamText}</p>
          </div>
        </div>
      </section>

      <section className="section specialist-standards-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.standardsEyebrow}
            </p>
            <h2>{copy.standardsTitle}</h2>
            <p>{copy.standardsText}</p>
          </div>
          <div className="specialist-standards-grid">
            {localizedStandards.map((item, index) => (
              <article key={item.title}>
                <div className="standard-number">
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

      <section className="section specialist-choice-section">
        <div className="shell specialist-choice-grid">
          <div className="specialist-choice-image">
            <Image
              src="/images/specialists-studio.webp"
              alt={copy.choiceAlt}
              width={1280}
              height={1280}
              unoptimized
              loading="lazy"
              sizes="(max-width: 990px) calc(100vw - 32px), 50vw"
            />
          </div>
          <div>
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.choiceEyebrow}
            </p>
            <h2>{copy.choiceTitle}</h2>
            <p>{copy.choiceText}</p>
            <div className="inline-actions">
              <Link className="button" href={localeHref(locale, "/booking")}>
                {copy.bookLink}
              </Link>
              <Link
                className="text-link"
                href={localeHref(locale, "/services")}
              >
                {copy.serviceLink} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={copy.ctaTitle}
        text={copy.ctaText}
        secondary={{ href: "/reviews", label: copy.ctaSecondary }}
      />
    </main>
  );
}

export default function SpecialistsPage() {
  return <SpecialistsPageContent locale="ru" />;
}
