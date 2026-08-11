import type { Metadata } from "next";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { faqs } from "@/data/site";

export const metadata: Metadata = {
  title: "Вопросы о лазерной эпиляции",
  description:
    "Ответы Annaelle на частые вопросы о лазерной эпиляции, подготовке, курсе, ощущениях и противопоказаниях.",
  alternates: { canonical: "/faq" },
};

const groups = [
  {
    title: "Процедура и результат",
    text: "Курс, ощущения и постепенные изменения.",
    items: [faqs[0], faqs[2], faqs[4]],
  },
  {
    title: "Подготовка и уход",
    text: "Что сделать до визита и между процедурами.",
    items: [faqs[1], faqs[3]],
  },
  {
    title: "Безопасность",
    text: "Ситуации, которые важно обсудить до записи.",
    items: [faqs[5], faqs[6]],
  },
  {
    title: "Выбор услуги",
    text: "Как сравнить разовую услугу и комбо-пакет.",
    items: [faqs[7]],
  },
] as const;

export default function FaqPage() {
  return (
    <main id="main-content">
      <PageHero
        label="FAQ"
        title="Ответы на важные вопросы"
        text="Собрали основную информацию о подготовке, ходе процедуры и выборе услуги. Если вашей ситуации нет в списке, задайте вопрос администратору до визита."
        primary={{ href: "/booking", label: "Задать вопрос" }}
        secondary={{ href: "/services", label: "Об услугах" }}
      />

      <section className="section faq-page-section">
        <div className="shell faq-categories">
          {groups.map((group, index) => (
            <section className="faq-category" key={group.title}>
              <div className="faq-category-intro">
                <span>0{index + 1}</span>
                <h2>{group.title}</h2>
                <p>{group.text}</p>
              </div>
              <FaqList items={group.items} />
            </section>
          ))}
        </div>
      </section>

      <section className="section faq-help-section">
        <div className="shell faq-help-grid">
          <div>
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Не нашли ответ?
            </p>
            <h2>Уточните свою ситуацию до визита</h2>
          </div>
          <div>
            <p>
              Администратор поможет с организационными вопросами. При
              сомнениях, связанных со здоровьем или препаратами, заранее
              проконсультируйтесь с врачом.
            </p>
            <div className="inline-actions">
              <Link className="button" href="/contacts">
                Связаться
              </Link>
              <Link className="text-link" href="/prices">
                Сравнить услуги <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Готовы выбрать время?"
        text="Оставьте контакты — администратор уточнит детали, ответит на организационные вопросы и подтвердит запись."
      />
    </main>
  );
}
