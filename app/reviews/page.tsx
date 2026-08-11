import type { Metadata } from "next";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ReviewCards } from "@/components/ReviewCards";

export const metadata: Metadata = {
  title: "Отзывы о студии лазерной эпиляции",
  description:
    "Отзывы гостей Annaelle об атмосфере студии, консультации и процедуре лазерной эпиляции.",
  alternates: { canonical: "/reviews" },
};

const reviewThemes = [
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
] as const;

export default function ReviewsPage() {
  return (
    <main id="main-content">
      <PageHero
        label="Отзывы"
        title="Впечатления гостей Annaelle"
        text="Истории о первом знакомстве с лазерной эпиляцией, внимании мастеров и атмосфере, в которой можно чувствовать себя спокойно."
        image="/images/reviews-hero.webp"
        imageAlt="Специалист и гостья студии Annaelle"
        primary={{ href: "/booking", label: "Записаться" }}
        secondary={{ href: "/specialists", label: "О специалистах" }}
      />

      <section className="section reviews-section reviews-page-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              От первого лица
            </p>
            <h2>Что запомнилось после посещения</h2>
            <p>
              Отзывы о консультации, ощущениях во время процедуры и внимании к
              деталям.
            </p>
          </div>
          <ReviewCards />
        </div>
      </section>

      <section className="section review-themes-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                В центре внимания
              </p>
              <h2>То, что помогает чувствовать доверие</h2>
            </div>
            <p>
              Эти темы повторяются в впечатлениях гостей и отражают подход
              Annaelle к процедуре.
            </p>
          </div>
          <div className="info-cards-grid">
            {reviewThemes.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="inline-navigation">
            <Link href="/about">О студии</Link>
            <Link href="/specialists">Подход специалистов</Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Создайте своё впечатление об Annaelle"
        text="Выберите удобное время для первого визита — администратор поможет с услугой и подготовкой."
      />
    </main>
  );
}
