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

export const metadata: Metadata = {
  title: "Услуги и зоны лазерной эпиляции",
  description:
    "Услуги лазерной эпиляции Annaelle: 15 разовых услуг, комбо-пакеты на 5, 7 и 9 сеансов и предложения первого посещения.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        label="Услуги"
        title="Услуги из актуального прайс-листа"
        text="Выберите одну из 15 разовых услуг, комбо-пакет на 5, 7 или 9 сеансов либо специальное предложение первого посещения."
        image="/images/services-hero.webp"
        imageAlt="Процедура лазерной эпиляции в студии Annaelle"
        primary={{ href: "/booking", label: "Записаться" }}
        secondary={{ href: "/prices", label: "Смотреть цены" }}
      />

      <section className="section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Форматы услуг
            </p>
            <h2>Выберите удобную точку старта</h2>
            <p>
              Все форматы строятся вокруг одного принципа: понятный процесс,
              индивидуальные параметры и внимание к вашим ощущениям.
            </p>
          </div>
          <div className="service-overview-grid">
            {serviceFormats.map((item) => (
              <article key={item.number}>
                <span className="service-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link className="card-link" href={item.href}>
                  Посмотреть варианты <span aria-hidden="true">→</span>
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
                Разовые услуги
              </p>
              <h2>15 услуг с фиксированной стоимостью</h2>
            </div>
            <div className="heading-action">
              <p>
                Названия и суммы перенесены из предоставленного прайс-листа без
                изменения.
              </p>
              <Link className="text-link" href="/prices#single">
                Открыть весь прайс <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <ServicePriceList />
        </div>
      </section>

      <section className="section care-section">
        <div className="shell care-grid">
          <div className="care-image image-mask">
            <Image
              src="/images/services-consultation.webp"
              alt="Специалист Annaelle обсуждает процедуру с гостьей"
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
              Спокойно на каждом этапе
            </p>
            <h2>Всё понятно уже с первого посещения</h2>
            <p className="section-lead">
              До процедуры мастер уточнит важную информацию, расскажет, как всё
              проходит, и ответит на вопросы без спешки.
            </p>
            <div className="care-points">
              <div>
                <strong>До визита</strong>
                <span>Пришлём короткую памятку по подготовке.</span>
              </div>
              <div>
                <strong>Во время</strong>
                <span>Ориентируемся на ваши ощущения и комфорт.</span>
              </div>
              <div>
                <strong>После</strong>
                <span>Дадим рекомендации по домашнему уходу.</span>
              </div>
            </div>
            <Link className="text-link" href="/faq">
              Ответы на частые вопросы <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="shell process-shell">
          <div className="process-intro">
            <p className="eyebrow">Первый визит</p>
            <h2>Четыре спокойных шага</h2>
            <p>
              Вы понимаете, что происходит и зачем нужен каждый этап процедуры.
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

      <section className="section preparation-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                Подготовка
              </p>
              <h2>Небольшие шаги до посещения</h2>
            </div>
            <p>
              Если у вас есть сомнения по подготовке или состоянию кожи,
              уточните детали у администратора до визита.
            </p>
          </div>
          <div className="preparation-grid">
            {preparationSteps.map((step, index) => (
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
        title="Не уверены, какой формат выбрать?"
        text="Расскажите, какие зоны вас интересуют. Администратор сравнит варианты и поможет начать с комфортного решения."
        secondary={{ href: "/prices", label: "Сравнить цены" }}
      />
    </main>
  );
}
