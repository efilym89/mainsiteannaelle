import type { Metadata } from "next";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { OfferCards } from "@/components/OfferCards";
import { PageHero } from "@/components/PageHero";
import { PriceExplorer } from "@/components/PriceExplorer";

export const metadata: Metadata = {
  title: "Цены на лазерную эпиляцию",
  description:
    "Актуальный прайс Annaelle: разовые услуги, комбо-пакеты на 5, 7 и 9 сеансов и специальные предложения.",
  alternates: { canonical: "/prices" },
};

export default function PricesPage() {
  return (
    <main id="main-content">
      <PageHero
        label="Цены"
        title="Актуальный прайс Annaelle"
        text="Разовые услуги, комбо-пакеты на 5, 7 и 9 сеансов и три специальных предложения — только по данным из предоставленных материалов."
        primary={{ href: "/booking", label: "Записаться" }}
        secondary={{ href: "/services", label: "Об услугах" }}
      />

      <section className="section services-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <BrandStar className="mini-star" />
                Прайс Annaelle
              </p>
              <h2>Выберите свой формат заботы</h2>
            </div>
            <p>
              Значения перенесены из актуального прайс-листа без добавления
              других услуг, цен или условий.
            </p>
          </div>
          <PriceExplorer />
        </div>
      </section>

      <section className="section price-guidance-section">
        <div className="shell info-cards-grid">
          <article>
            <span>01</span>
            <h3>5 сеансов</h3>
            <p>
              Комбо-пакеты со скидкой 20% по предоставленному прайс-листу.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>7 сеансов</h3>
            <p>
              Комбо-пакеты со скидкой 25% по предоставленному прайс-листу.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>9 сеансов</h3>
            <p>
              Комбо-пакеты со скидкой 30% по предоставленному прайс-листу.
            </p>
          </article>
        </div>
        <div className="shell inline-navigation">
          <Link href="/services">Как проходит процедура</Link>
          <Link href="/faq">Вопросы о курсе</Link>
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
              <h2>Только на первое посещение</h2>
            </div>
            <p>
              Других условий или сроков действия в предоставленных материалах
              не указано.
            </p>
          </div>
          <OfferCards />
        </div>
      </section>

      <CtaBand
        title="Нужна помощь с выбором?"
        text="Оставьте заявку и укажите интересующие зоны — администратор сравнит варианты и подтвердит актуальную стоимость."
      />
    </main>
  );
}
