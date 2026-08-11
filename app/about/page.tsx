import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { advantages, contact } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/about", "ru");

const aboutPageCopy = {
  ru: {
    heroLabel: "О студии",
    heroTitle: "Пространство бережной заботы о себе",
    heroText:
      "Мы создали Annaelle как место, где профессиональная процедура сочетается с деликатным отношением, спокойной атмосферой и вниманием к деталям.",
    heroAlt: "Интерьер и атмосфера студии Annaelle",
    heroPrimary: "Записаться",
    heroSecondary: "Как нас найти",
    philosophyEyebrow: "Философия Annaelle",
    philosophyTitle: "Красота заботы — в ощущении спокойствия",
    philosophyLead:
      "Здесь не нужно торопиться, стесняться вопросов или соответствовать чужим ожиданиям.",
    philosophyText:
      "Для нас важны точность, аккуратность и ваше спокойствие — от первой консультации до рекомендаций после процедуры. Мастер объясняет этапы понятным языком, а вы можете в любой момент поделиться своими ощущениями.",
    philosophyQuote:
      "Забота о себе может быть спокойной, красивой и естественной.",
    approachEyebrow: "Наш подход",
    approachTitle: "То, что формирует впечатление о студии",
    approachText:
      "Не отдельные обещания, а последовательное внимание к деталям на каждом этапе визита.",
    atmosphereAlt: "Атмосфера заботы в студии Annaelle",
    tashkentEyebrow: "Annaelle в Ташкенте",
    previsitTitle: "Знакомство начинается ещё до визита",
    previsitText:
      "На сайте можно изучить услуги и цены, познакомиться с подходом специалистов, получить ответы на вопросы и выбрать удобное время.",
    addressLabel: "Адрес",
    hoursLabel: "Режим работы",
    specialistsLink: "О специалистах",
    reviewsLink: "Читать отзывы",
    ctaTitle: "Познакомьтесь с Annaelle лично",
    ctaText:
      "Выберите удобное время — администратор уточнит детали и поможет подготовиться к первому посещению.",
    ctaSecondary: "Контакты студии",
  },
  uz: {
    heroLabel: "Studiya haqida",
    heroTitle: "O‘zingizga ehtiyotkorlik bilan g‘amxo‘rlik qilinadigan makon",
    heroText:
      "Biz Annaelle studiyasini professional muolaja nozik munosabat, xotirjam muhit va tafsilotlarga e‘tibor bilan uyg‘unlashadigan makon sifatida yaratdik.",
    heroAlt: "Annaelle studiyasining interyeri va muhiti",
    heroPrimary: "Yozilish",
    heroSecondary: "Bizni qanday topish mumkin",
    philosophyEyebrow: "Annaelle falsafasi",
    philosophyTitle: "G‘amxo‘rlikning go‘zalligi — xotirjamlik hissida",
    philosophyLead:
      "Bu yerda shoshilish, savollardan uyalish yoki boshqalarning kutganlariga moslashish shart emas.",
    philosophyText:
      "Biz uchun aniqlik, puxtalik va sizning xotirjamligingiz muhim — ilk maslahatdan muolajadan keyingi tavsiyalargacha. Mutaxassis har bir bosqichni sodda tilda tushuntiradi, siz esa istalgan payt hislaringiz bilan bo‘lishishingiz mumkin.",
    philosophyQuote:
      "O‘zingizga g‘amxo‘rlik xotirjam, chiroyli va tabiiy bo‘lishi mumkin.",
    approachEyebrow: "Bizning yondashuvimiz",
    approachTitle: "Studiya haqidagi taassurotni shakllantiradigan jihatlar",
    approachText:
      "Alohida va‘dalar emas, balki tashrifning har bir bosqichida tafsilotlarga izchil e‘tibor.",
    atmosphereAlt: "Annaelle studiyasidagi g‘amxo‘rlik muhiti",
    tashkentEyebrow: "Toshkentdagi Annaelle",
    previsitTitle: "Tanishuv tashrifdan oldin boshlanadi",
    previsitText:
      "Saytda xizmatlar va narxlarni o‘rganish, mutaxassislarning yondashuvi bilan tanishish, savollarga javob topish va qulay vaqtni tanlash mumkin.",
    addressLabel: "Manzil",
    hoursLabel: "Ish vaqti",
    specialistsLink: "Mutaxassislar haqida",
    reviewsLink: "Sharhlarni o‘qish",
    ctaTitle: "Annaelle bilan yaqindan tanishing",
    ctaText:
      "Qulay vaqtni tanlang — administrator tafsilotlarni aniqlashtiradi va ilk tashrifga tayyorlanishga yordam beradi.",
    ctaSecondary: "Studiya kontaktlari",
  },
  en: {
    heroLabel: "About the studio",
    heroTitle: "A space for thoughtful self-care",
    heroText:
      "We created Annaelle as a place where professional treatment meets a considerate approach, a calm atmosphere, and close attention to detail.",
    heroAlt: "The interior and atmosphere of the Annaelle studio",
    heroPrimary: "Book a visit",
    heroSecondary: "How to find us",
    philosophyEyebrow: "The Annaelle philosophy",
    philosophyTitle: "The beauty of care lies in feeling at ease",
    philosophyLead:
      "Here, there is no need to rush, feel self-conscious about questions, or live up to anyone else’s expectations.",
    philosophyText:
      "Precision, thoughtful work, and your peace of mind matter to us—from the first consultation to your aftercare guidance. Your specialist explains each step clearly, and you can share how you feel at any time.",
    philosophyQuote: "Self-care can feel calm, beautiful, and natural.",
    approachEyebrow: "Our approach",
    approachTitle: "What shapes your impression of the studio",
    approachText:
      "Not isolated promises, but consistent attention to detail throughout every stage of your visit.",
    atmosphereAlt: "The caring atmosphere at the Annaelle studio",
    tashkentEyebrow: "Annaelle in Tashkent",
    previsitTitle: "Your introduction begins before you arrive",
    previsitText:
      "On our website, you can explore services and prices, learn about our specialists’ approach, find answers to your questions, and choose a convenient time.",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    specialistsLink: "Meet our specialists",
    reviewsLink: "Read reviews",
    ctaTitle: "Meet Annaelle in person",
    ctaText:
      "Choose a convenient time and our administrator will confirm the details and help you prepare for your first visit.",
    ctaSecondary: "Studio contacts",
  },
};

export function AboutPageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, aboutPageCopy);
  const localizedAdvantages = localizeSiteValue(advantages, locale);
  const localizedContact = localizeSiteValue(contact, locale);
  const values = [
    localizedAdvantages[1],
    localizedAdvantages[2],
    localizedAdvantages[3],
    localizedAdvantages[4],
  ];

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.heroLabel}
        title={copy.heroTitle}
        text={copy.heroText}
        image="/images/about-hero.webp"
        imageAlt={copy.heroAlt}
        primary={{ href: "/booking", label: copy.heroPrimary }}
        secondary={{ href: "/contacts", label: copy.heroSecondary }}
      />

      <section className="section about-story-section">
        <div className="shell editorial-grid">
          <div>
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.philosophyEyebrow}
            </p>
            <h2>{copy.philosophyTitle}</h2>
          </div>
          <div className="editorial-copy">
            <p className="section-lead">{copy.philosophyLead}</p>
            <p>{copy.philosophyText}</p>
            <blockquote>
              <BrandStar />
              {copy.philosophyQuote}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.approachEyebrow}
            </p>
            <h2>{copy.approachTitle}</h2>
            <p>{copy.approachText}</p>
          </div>
          <div className="advantages-grid advantages-grid-four">
            {values.map((item, index) => (
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

      <section className="section studio-facts-section">
        <div className="shell studio-facts-grid">
          <div className="studio-facts-image">
            <Image
              src="/images/about-atmosphere.webp"
              alt={copy.atmosphereAlt}
              width={1280}
              height={1280}
              unoptimized
              loading="lazy"
              sizes="(max-width: 990px) calc(100vw - 32px), 50vw"
            />
          </div>
          <div className="studio-facts-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.tashkentEyebrow}
            </p>
            <h2>{copy.previsitTitle}</h2>
            <p>{copy.previsitText}</p>
            <dl className="facts-list">
              <div>
                <dt>{copy.addressLabel}</dt>
                <dd>{localizedContact.address}</dd>
              </div>
              <div>
                <dt>{copy.hoursLabel}</dt>
                <dd>{localizedContact.hours}</dd>
              </div>
            </dl>
            <div className="inline-actions">
              <Link
                className="button"
                href={localeHref(locale, "/specialists")}
              >
                {copy.specialistsLink}
              </Link>
              <Link
                className="text-link"
                href={localeHref(locale, "/reviews")}
              >
                {copy.reviewsLink} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
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

export default function AboutPage() {
  return <AboutPageContent locale="ru" />;
}
