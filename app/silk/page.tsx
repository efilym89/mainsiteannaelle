import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Карта Silk",
  description:
    "Silk — цифровая карта Annaelle для Apple Wallet. Подтверждённая информация о формате и оформлении карты.",
  alternates: { canonical: "/silk" },
};

const silkFacts = [
  {
    number: "01",
    title: "Название",
    text: "Карта Silk.",
  },
  {
    number: "02",
    title: "Формат",
    text: "Цифровая карта для Apple Wallet.",
  },
  {
    number: "03",
    title: "Оформление",
    text: "Тёмный шёлк, глубокий графит, мягкие волны и деликатные переливы.",
  },
] as const;

export default function SilkPage() {
  return (
    <main id="main-content">
      <PageHero
        label="Карта Silk"
        title="Silk в Apple Wallet"
        text="Цифровая карта Annaelle для Apple Wallet. На странице размещена только информация, подтверждённая доступными материалами."
        primary={{ href: "/contacts", label: "Связаться с администратором" }}
        secondary={{ href: "/prices", label: "Открыть прайс" }}
      />

      <section className="section silk-showcase-section" id="silk-card">
        <div className="shell silk-showcase-grid">
          <div
            className="silk-card-visual"
            role="img"
            aria-label="Фирменное оформление цифровой карты Silk"
          >
            <div className="silk-wave silk-wave-one" aria-hidden="true" />
            <div className="silk-wave silk-wave-two" aria-hidden="true" />
            <Image
              className="silk-card-logo"
              src="/brand/logo-horizontal-white.svg"
              alt="annaelle"
              width={520}
              height={186}
              unoptimized
            />
            <div className="silk-card-copy">
              <span>Digital card</span>
              <strong>Silk</strong>
              <small>Apple Wallet</small>
            </div>
            <BrandStar className="silk-card-star" />
          </div>

          <div className="silk-showcase-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Подтверждённая информация
            </p>
            <h2>Цифровой формат в эстетике Annaelle</h2>
            <p>
              В доступных материалах подтверждены название Silk, формат Apple
              Wallet и визуальная концепция карты.
            </p>
            <p>
              Условия получения, привилегии, срок действия и порядок
              использования в материалах не указаны. Их можно уточнить у
              администратора.
            </p>
            <Link className="text-link" href="/contacts">
              Уточнить информацию <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section silk-facts-section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              Карта Silk
            </p>
            <h2>Всё, что подтверждено материалами</h2>
          </div>
          <div className="info-cards-grid silk-facts-grid">
            {silkFacts.map((fact) => (
              <article key={fact.number}>
                <span>{fact.number}</span>
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
              </article>
            ))}
          </div>
          <p className="silk-qr-note">
            Исходный QR-код и ссылка добавления карты не предоставлены, поэтому
            они не размещены на странице.
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Карта Silk"
        title="Уточните детали у администратора"
        text="Свяжитесь со студией, чтобы получить подтверждённую информацию о доступности и условиях карты Silk."
        primary={{ href: "/contacts", label: "Контакты студии" }}
      />
    </main>
  );
}
