import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { OfferCards } from "@/components/OfferCards";
import { ReviewCards } from "@/components/ReviewCards";
import { advantages, serviceFormats } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Annaelle — лазерная эпиляция в Ташкенте" },
  description:
    "Студия лазерной эпиляции Annaelle в Ташкенте: услуги, цены, специалисты, отзывы и удобная онлайн-запись.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero" id="top">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Студия лазерной эпиляции в Ташкенте
            </p>
            <h1>Внутренняя гармония начинается с заботы о себе</h1>
            <p className="hero-lead">
              Диодная лазерная эпиляция женских зон с вниманием к вашему
              комфорту. Подберём зоны и удобный формат курса после деликатной
              консультации.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/booking">
                Записаться онлайн <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/prices">
                Посмотреть цены <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="trust-list" aria-label="Преимущества">
              <li>Женские зоны</li>
              <li>Индивидуальные параметры</li>
              <li>Памятка по подготовке</li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <Image
                src="/images/home-hero.webp"
                alt="Гостья студии Annaelle"
                width={1040}
                height={1210}
                unoptimized
                priority
                fetchPriority="high"
                sizes="(max-width: 780px) calc(100vw - 32px), (max-width: 900px) 540px, 520px"
              />
              <BrandStar className="image-star" />
            </div>
          </div>
        </div>
      </section>

      <section className="quick-services" aria-label="Форматы услуг">
        <div className="shell quick-grid">
          {serviceFormats.map((item) => (
            <article key={item.number}>
              <span className="service-number">{item.number}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <Link className="card-link" href={item.href}>
                Подробнее <span aria-hidden="true">→</span>
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
                Специальные предложения
              </p>
              <h2>Первое посещение Annaelle</h2>
            </div>
            <div className="heading-action">
              <p>
                Три предложения из актуальных материалов. Каждое действует
                только на первое посещение.
              </p>
              <Link className="text-link" href="/prices#offers">
                Весь прайс <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <OfferCards />
        </div>
      </section>

      <section className="section advantages-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                Почему Annaelle
              </p>
              <h2>Точность и забота в каждой детали</h2>
            </div>
            <div className="heading-action">
              <p>
                Профессиональная процедура может быть понятной, деликатной и
                комфортной именно для вас.
              </p>
              <Link className="text-link" href="/services">
                Все услуги <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="advantages-grid advantages-grid-three">
            {advantages.slice(0, 3).map((item, index) => (
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
              <BrandStar className="mini-star" />О студии
            </p>
            <h2>Пространство бережной заботы о себе</h2>
            <p className="section-lead">
              Annaelle — место, где профессиональная процедура сочетается с
              деликатным отношением и вниманием к деталям.
            </p>
            <p>
              Здесь можно спокойно задать вопросы, понять каждый этап и выбрать
              подходящий формат без спешки.
            </p>
            <Link className="text-link" href="/about">
              Узнать о студии <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="about-image">
            <Image
              src="/images/home-studio.webp"
              alt="Интерьер и атмосфера студии Annaelle"
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
              alt="Процедура лазерной эпиляции в Annaelle"
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
              Специалисты
            </p>
            <h2>Мастер рядом на каждом этапе</h2>
            <p className="section-lead">
              От первой консультации до рекомендаций после процедуры — вы
              понимаете, что происходит и зачем нужен каждый шаг.
            </p>
            <div className="care-points">
              <div>
                <strong>Объясняем</strong>
                <span>Спокойно отвечаем на вопросы до начала процедуры.</span>
              </div>
              <div>
                <strong>Уточняем</strong>
                <span>Ориентируемся на ваши ощущения и обратную связь.</span>
              </div>
              <div>
                <strong>Сопровождаем</strong>
                <span>Даём понятные рекомендации после визита.</span>
              </div>
            </div>
            <Link className="text-link" href="/specialists">
              О специалистах <span aria-hidden="true">→</span>
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
                Отзывы
              </p>
              <h2>Что говорят гости Annaelle</h2>
            </div>
            <div className="heading-action">
              <p>
                Впечатления о мастерах, атмосфере и первом знакомстве с лазерной
                эпиляцией.
              </p>
              <Link className="text-link" href="/reviews">
                Все отзывы <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <ReviewCards />
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div className="faq-intro">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              FAQ
            </p>
            <h2>Главное перед первым визитом</h2>
            <p>
              Коротко отвечаем на вопросы о курсе, подготовке и ощущениях во
              время процедуры.
            </p>
            <Link className="button" href="/faq">
              Все вопросы
            </Link>
          </div>
          <FaqList limit={3} />
        </div>
      </section>

      <CtaBand
        title="Выберите удобное время для себя"
        text="Оставьте контакты — администратор поможет выбрать услугу, уточнит детали и предложит свободное время."
        secondary={{ href: "/contacts", label: "Контакты студии" }}
      />
    </main>
  );
}
