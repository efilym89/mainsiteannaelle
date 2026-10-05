import type { Metadata } from "next";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ReviewCards } from "@/components/ReviewCards";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("/reviews", "ru");

const pageCopy = {
  ru: {
    label: "Отзывы",
    title: "Впечатления гостей Annaelle",
    intro:
      "Истории о первом знакомстве с лазерной эпиляцией, внимании мастеров и атмосфере, в которой можно чувствовать себя спокойно.",
    imageAlt: "Специалист и гостья студии Annaelle",
    book: "Записаться",
    specialists: "О специалистах",
    firstPerson: "От первого лица",
    remembered: "Что запомнилось после посещения",
    reviewsLead:
      "Отзывы о консультации, ощущениях во время процедуры и внимании к деталям.",
    focus: "В центре внимания",
    trust: "То, что помогает чувствовать доверие",
    trustLead:
      "Эти темы повторяются в впечатлениях гостей и отражают подход Annaelle к процедуре.",
    themes: [
      {
        title: "Понятное объяснение",
        text: "Мастер предупреждает о каждом этапе и оставляет время для вопросов.",
      },
      {
        title: "Внимание к ощущениям",
        text: "Во время процедуры можно спокойно сообщить о любом дискомфорте.",
      },
      {
        title: "Время на консультацию",
        text: "Перед началом уточняется важная информация и обсуждается план визита.",
      },
    ],
    about: "О студии",
    approach: "Подход специалистов",
    ctaTitle: "Создайте своё впечатление об Annaelle",
    ctaText:
      "Выберите удобное время для первого визита — администратор поможет с услугой и подготовкой.",
  },
  uz: {
    label: "Sharhlar",
    title: "Annaelle mehmonlarining taassurotlari",
    intro:
      "Lazer epilatsiyasi bilan ilk tanishuv, mutaxassislarning e’tibori va o‘zingizni xotirjam his qilishingiz mumkin bo‘lgan muhit haqidagi hikoyalar.",
    imageAlt: "Annaelle studiyasi mutaxassisi va mehmoni",
    book: "Yozilish",
    specialists: "Mutaxassislar haqida",
    firstPerson: "Mehmonlar hikoyasi",
    remembered: "Tashrifdan keyin nimalar yodda qoldi",
    reviewsLead:
      "Maslahat, muolaja paytidagi hislar va tafsilotlarga e’tibor haqidagi sharhlar.",
    focus: "E’tibor markazida",
    trust: "Ishonchni his qilishga yordam beradigan jihatlar",
    trustLead:
      "Bu mavzular mehmonlar taassurotlarida takrorlanadi va Annaelle’ning muolajaga yondashuvini aks ettiradi.",
    themes: [
      {
        title: "Tushunarli izoh",
        text: "Mutaxassis har bir bosqichni oldindan aytadi va savollar uchun vaqt qoldiradi.",
      },
      {
        title: "His-tuyg‘ularga e’tibor",
        text: "Muolaja paytida har qanday noqulaylik haqida bemalol aytishingiz mumkin.",
      },
      {
        title: "Maslahat uchun vaqt",
        text: "Boshlashdan oldin muhim ma’lumotlar aniqlanadi va tashrif rejasi muhokama qilinadi.",
      },
    ],
    about: "Studiya haqida",
    approach: "Mutaxassislar yondashuvi",
    ctaTitle: "Annaelle haqidagi o‘z taassurotingizni yarating",
    ctaText:
      "Birinchi tashrif uchun qulay vaqtni tanlang — administrator xizmat va tayyorgarlik bo‘yicha yordam beradi.",
  },
  en: {
    label: "Reviews",
    title: "Annaelle guest experiences",
    intro:
      "Stories about discovering laser hair removal, attentive specialists and an atmosphere where you can feel at ease.",
    imageAlt: "An Annaelle specialist with a studio guest",
    book: "Book",
    specialists: "Meet the specialists",
    firstPerson: "In their own words",
    remembered: "What guests remember after their visit",
    reviewsLead:
      "Reviews of the consultation, sensations during the procedure and attention to detail.",
    focus: "What matters",
    trust: "The details that build trust",
    trustLead:
      "These themes recur in guest feedback and reflect Annaelle’s approach to every procedure.",
    themes: [
      {
        title: "Clear explanations",
        text: "The specialist explains every stage and leaves time for questions.",
      },
      {
        title: "Attention to comfort",
        text: "You can calmly mention any discomfort during the procedure.",
      },
      {
        title: "Time for consultation",
        text: "Important information is discussed and the visit is planned before the procedure begins.",
      },
    ],
    about: "About the studio",
    approach: "Our specialists’ approach",
    ctaTitle: "Create your own Annaelle experience",
    ctaText:
      "Choose a convenient time for your first visit. An administrator will help with the service and preparation.",
  },
} as const;

export function ReviewsPageContent({ locale = "ru" }: { locale?: Locale }) {
  const copy = getCopy(locale, pageCopy);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={copy.label}
        title={copy.title}
        text={copy.intro}
        image="/images/reviews-hero.webp"
        imageAlt={copy.imageAlt}
        primary={{ href: "/booking", label: copy.book }}
        secondary={{ href: "/specialists", label: copy.specialists }}
      />

      <section className="section reviews-section reviews-page-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {copy.firstPerson}
            </p>
            <h2>{copy.remembered}</h2>
            <p>{copy.reviewsLead}</p>
          </div>
          <ReviewCards locale={locale} />
        </div>
      </section>

      <section className="section review-themes-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                {copy.focus}
              </p>
              <h2>{copy.trust}</h2>
            </div>
            <p>{copy.trustLead}</p>
          </div>
          <div className="info-cards-grid">
            {copy.themes.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="inline-navigation">
            <Link href={localeHref(locale, "/about")}>{copy.about}</Link>
            <Link href={localeHref(locale, "/specialists")}>{copy.approach}</Link>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={copy.ctaTitle} text={copy.ctaText} />
    </main>
  );
}

export default function ReviewsPage() {
  return <ReviewsPageContent locale="ru" />;
}
