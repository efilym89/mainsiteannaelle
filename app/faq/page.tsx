import type { Metadata } from "next";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { faqs } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/faq", "ru");

const pageCopy = {
  ru: {
    title: "Ответы на важные вопросы",
    intro:
      "Собрали основную информацию о подготовке, ходе процедуры и выборе услуги. Если вашей ситуации нет в списке, задайте вопрос администратору до визита.",
    ask: "Задать вопрос",
    services: "Об услугах",
    groups: [
      ["Процедура и результат", "Курс, ощущения и постепенные изменения."],
      ["Подготовка и уход", "Что сделать до визита и между процедурами."],
      ["Безопасность", "Ситуации, которые важно обсудить до записи."],
      ["Выбор услуги", "Как сравнить разовую услугу и комбо-пакет."],
    ],
    noAnswer: "Не нашли ответ?",
    clarifyTitle: "Уточните свою ситуацию до визита",
    clarifyText:
      "Администратор поможет с организационными вопросами. При сомнениях, связанных со здоровьем или препаратами, заранее проконсультируйтесь с врачом.",
    contact: "Связаться",
    compare: "Сравнить услуги",
    ctaTitle: "Готовы выбрать время?",
    ctaText:
      "Оставьте контакты — администратор уточнит детали, ответит на организационные вопросы и подтвердит запись.",
  },
  uz: {
    title: "Muhim savollarga javoblar",
    intro:
      "Tayyorgarlik, muolaja jarayoni va xizmat tanlash haqidagi asosiy ma’lumotlarni jamladik. Vaziyatingiz ro‘yxatda bo‘lmasa, tashrifdan oldin administratorga savol bering.",
    ask: "Savol berish",
    services: "Xizmatlar haqida",
    groups: [
      ["Muolaja va natija", "Kurs, hislar va bosqichma-bosqich o‘zgarishlar."],
      ["Tayyorgarlik va parvarish", "Tashrifdan oldin va muolajalar orasida nimalar qilish kerak."],
      ["Xavfsizlik", "Yozilishdan oldin muhokama qilish muhim bo‘lgan holatlar."],
      ["Xizmat tanlash", "Bir martalik xizmat va kombo-paketni qanday solishtirish mumkin."],
    ],
    noAnswer: "Javob topmadingizmi?",
    clarifyTitle: "Tashrifdan oldin vaziyatingizni aniqlashtiring",
    clarifyText:
      "Administrator tashkiliy savollarda yordam beradi. Sog‘liq yoki dorilar bilan bog‘liq shubhalar bo‘lsa, oldindan shifokor bilan maslahatlashishni tavsiya qilamiz.",
    contact: "Bog‘lanish",
    compare: "Xizmatlarni solishtirish",
    ctaTitle: "Vaqt tanlashga tayyormisiz?",
    ctaText:
      "Kontaktlaringizni qoldiring — administrator tafsilotlarni aniqlaydi, tashkiliy savollarga javob beradi va yozilishni tasdiqlaydi.",
  },
  en: {
    title: "Answers to important questions",
    intro:
      "Here is the essential information about preparation, the procedure and choosing a service. If your situation is not listed, ask an administrator before your visit.",
    ask: "Ask a question",
    services: "About services",
    groups: [
      ["Procedure and results", "The course, sensations and gradual changes."],
      ["Preparation and care", "What to do before a visit and between sessions."],
      ["Safety", "Situations to discuss before booking."],
      ["Choosing a service", "How to compare a single service with a course package."],
    ],
    noAnswer: "Couldn’t find an answer?",
    clarifyTitle: "Discuss your situation before your visit",
    clarifyText:
      "An administrator can help with practical questions. If you have health- or medication-related concerns, please consult a doctor in advance.",
    contact: "Contact us",
    compare: "Compare services",
    ctaTitle: "Ready to choose a time?",
    ctaText:
      "Leave your contact details. An administrator will clarify the details, answer practical questions and confirm your appointment.",
  },
} as const;

const groupIndexes = [[0, 2, 4], [1, 3], [5, 6], [7]] as const;

export function FaqPageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, pageCopy);
  const localizedFaqs = localizeSiteValue(faqs, locale);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label="FAQ"
        title={copy.title}
        text={copy.intro}
        primary={{ href: "/booking", label: copy.ask }}
        secondary={{ href: "/services", label: copy.services }}
      />

      <section className="section faq-page-section">
        <div className="shell faq-categories">
          {copy.groups.map(([title, text], index) => (
            <section className="faq-category" key={title}>
              <div className="faq-category-intro">
                <span>0{index + 1}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
              <FaqList
                locale={locale}
                items={groupIndexes[index].map((itemIndex) => localizedFaqs[itemIndex])}
              />
            </section>
          ))}
        </div>
      </section>

      <section className="section faq-help-section">
        <div className="shell faq-help-grid">
          <div>
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.noAnswer}
            </p>
            <h2>{copy.clarifyTitle}</h2>
          </div>
          <div>
            <p>{copy.clarifyText}</p>
            <div className="inline-actions">
              <Link className="button" href={localeHref(locale, "/contacts")}>
                {copy.contact}
              </Link>
              <Link className="text-link" href={localeHref(locale, "/prices")}>
                {copy.compare} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={copy.ctaTitle} text={copy.ctaText} />
    </main>
  );
}

export default function FaqPage() {
  return <FaqPageContent locale="ru" />;
}
