import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { BrandStar } from "@/components/BrandStar";
import { PageHero } from "@/components/PageHero";
import { bookingServices, contact, preparationSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Онлайн-запись на лазерную эпиляцию",
  description:
    "Онлайн-запись в студию лазерной эпиляции Annaelle в Ташкенте: выберите услугу, дату и удобное время.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const serviceId = Array.isArray(params.service)
    ? params.service[0]
    : params.service;
  const initialService =
    bookingServices.find((item) => item.id === serviceId)?.value ?? "";

  return (
    <main id="main-content">
      <PageHero
        label="Онлайн-запись"
        title="Ваше время для себя"
        text="Оставьте контакты и пожелания по визиту. Администратор поможет выбрать услугу, уточнит важные детали и предложит удобное время."
        secondary={{ href: "/prices", label: "Сначала посмотреть цены" }}
      />

      <section className="booking-section booking-page-section">
        <div className="booking-pattern" aria-hidden="true" />
        <div className="shell booking-grid">
          <div className="booking-copy">
            <p className="eyebrow">Запись в Annaelle</p>
            <h2>Расскажите, что вам удобно</h2>
            <p>
              Выберите услугу и предпочтительное время. Это заявка, а не
              автоматическое бронирование — администратор свяжется с вами для
              подтверждения.
            </p>
            <div className="booking-benefit">
              <BrandStar />
              <span>Обычно для подтверждения достаточно короткого звонка.</span>
            </div>
            <dl className="booking-contact-list">
              <div>
                <dt>Адрес</dt>
                <dd>{contact.address}</dd>
              </div>
              <div>
                <dt>Режим работы</dt>
                <dd>{contact.hours}</dd>
              </div>
              <div>
                <dt>Телефон</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </dd>
              </div>
            </dl>
          </div>
          <BookingForm initialService={initialService} />
        </div>
      </section>

      <section className="section booking-preparation-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                Перед посещением
              </p>
              <h2>Короткая памятка по подготовке</h2>
            </div>
            <div className="heading-action">
              <p>
                После подтверждения записи администратор уточнит рекомендации
                для выбранной зоны.
              </p>
              <Link className="text-link" href="/faq">
                Все вопросы <span aria-hidden="true">→</span>
              </Link>
            </div>
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
          <div className="inline-navigation">
            <Link href="/prices">Вернуться к ценам</Link>
            <Link href="/contacts">Другие способы связи</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
