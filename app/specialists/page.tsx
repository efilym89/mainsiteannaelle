import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { specialistStandards, visitSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Специалисты лазерной эпиляции",
  description:
    "Подход специалистов Annaelle: деликатная консультация, индивидуальные параметры и сопровождение после процедуры.",
  alternates: { canonical: "/specialists" },
};

export default function SpecialistsPage() {
  return (
    <main id="main-content">
      <PageHero
        label="Специалисты"
        title="Мастер рядом на каждом этапе"
        text="В Annaelle важны не только параметры процедуры, но и то, как вы чувствуете себя во время визита. Специалист объясняет процесс, слышит обратную связь и помогает спокойно пройти каждый этап."
        image="/images/specialists-hero.webp"
        imageAlt="Специалист Annaelle рядом с лазерным аппаратом"
        primary={{ href: "/booking", label: "Записаться к мастеру" }}
        secondary={{ href: "/reviews", label: "Отзывы гостей" }}
      />

      <section className="section specialists-intro-section">
        <div className="shell editorial-grid">
          <div>
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Команда Annaelle
            </p>
            <h2>Профессиональный подход без дистанции</h2>
          </div>
          <div className="editorial-copy">
            <p className="section-lead">
              Перед процедурой вы знакомитесь с мастером, обсуждаете выбранные
              зоны и задаёте все важные вопросы.
            </p>
            <p>
              Специалист уточняет необходимую информацию, объясняет этапы и
              договаривается с вами о комфортной коммуникации во время
              процедуры. Если ощущения меняются, об этом можно сказать в любой
              момент.
            </p>
          </div>
        </div>
      </section>

      <section className="section specialist-standards-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Стандарт работы
            </p>
            <h2>Что вы можете ожидать от мастера Annaelle</h2>
            <p>
              Общие принципы, которые помогают сделать посещение понятным и
              комфортным.
            </p>
          </div>
          <div className="specialist-standards-grid">
            {specialistStandards.map((item, index) => (
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
            <p className="eyebrow">Вместе с мастером</p>
            <h2>Четыре спокойных шага</h2>
            <p>
              Никакой неопределённости: каждый этап заранее понятен и
              последователен.
            </p>
          </div>
          <ol className="process-list">
            {visitSteps.map((step, index) => (
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
              alt="Зона ожидания студии Annaelle"
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
              Запись к специалисту
            </p>
            <h2>Подберём мастера и удобное время</h2>
            <p>
              Оставьте заявку и укажите интересующие зоны. Администратор
              предложит доступные окна и подтвердит детали первого визита.
            </p>
            <div className="inline-actions">
              <Link className="button" href="/booking">
                Записаться
              </Link>
              <Link className="text-link" href="/services">
                Выбрать услугу <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Первое знакомство — без спешки"
        text="Администратор поможет выбрать услугу, а мастер перед процедурой объяснит каждый этап и ответит на вопросы."
        secondary={{ href: "/reviews", label: "Отзывы о мастерах" }}
      />
    </main>
  );
}
