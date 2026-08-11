import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { advantages, contact } from "@/data/site";

export const metadata: Metadata = {
  title: "О студии",
  description:
    "О студии Annaelle в Ташкенте: философия бережной заботы, атмосфера и подход к каждой процедуре.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const values = [advantages[1], advantages[2], advantages[3], advantages[4]];

  return (
    <main id="main-content">
      <PageHero
        label="О студии"
        title="Пространство бережной заботы о себе"
        text="Мы создали Annaelle как место, где профессиональная процедура сочетается с деликатным отношением, спокойной атмосферой и вниманием к деталям."
        image="/images/about-hero.webp"
        imageAlt="Интерьер и атмосфера студии Annaelle"
        primary={{ href: "/booking", label: "Записаться" }}
        secondary={{ href: "/contacts", label: "Как нас найти" }}
      />

      <section className="section about-story-section">
        <div className="shell editorial-grid">
          <div>
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Философия Annaelle
            </p>
            <h2>Красота заботы — в ощущении спокойствия</h2>
          </div>
          <div className="editorial-copy">
            <p className="section-lead">
              Здесь не нужно торопиться, стесняться вопросов или
              соответствовать чужим ожиданиям.
            </p>
            <p>
              Для нас важны точность, аккуратность и ваше спокойствие — от
              первой консультации до рекомендаций после процедуры. Мастер
              объясняет этапы понятным языком, а вы можете в любой момент
              поделиться своими ощущениями.
            </p>
            <blockquote>
              <BrandStar />
              Забота о себе может быть спокойной, красивой и естественной.
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Наш подход
            </p>
            <h2>То, что формирует впечатление о студии</h2>
            <p>
              Не отдельные обещания, а последовательное внимание к деталям на
              каждом этапе визита.
            </p>
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
              alt="Атмосфера заботы в студии Annaelle"
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
              Annaelle в Ташкенте
            </p>
            <h2>Знакомство начинается ещё до визита</h2>
            <p>
              На сайте можно изучить услуги и цены, познакомиться с подходом
              специалистов, получить ответы на вопросы и выбрать удобное время.
            </p>
            <dl className="facts-list">
              <div>
                <dt>Адрес</dt>
                <dd>{contact.address}</dd>
              </div>
              <div>
                <dt>Режим работы</dt>
                <dd>{contact.hours}</dd>
              </div>
            </dl>
            <div className="inline-actions">
              <Link className="button" href="/specialists">
                О специалистах
              </Link>
              <Link className="text-link" href="/reviews">
                Читать отзывы <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Познакомьтесь с Annaelle лично"
        text="Выберите удобное время — администратор уточнит детали и поможет подготовиться к первому посещению."
        secondary={{ href: "/contacts", label: "Контакты студии" }}
      />
    </main>
  );
}
