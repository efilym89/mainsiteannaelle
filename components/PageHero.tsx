import Link from "next/link";
import Image from "next/image";
import { BrandStar } from "@/components/BrandStar";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";

const pageHeroCopy = {
  ru: { home: "Главная", breadcrumbs: "Хлебные крошки" },
  uz: { home: "Bosh sahifa", breadcrumbs: "Navigatsiya yo‘li" },
  en: { home: "Home", breadcrumbs: "Breadcrumbs" },
} as const;

type PageHeroProps = {
  label: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  locale?: Locale;
};

export function PageHero({
  label,
  title,
  text,
  image,
  imageAlt = "",
  primary,
  secondary,
  locale = "ru",
}: PageHeroProps) {
  const copy = getCopy(locale, pageHeroCopy);
  const secondaryIsExternal =
    secondary &&
    /^(https?:|tel:|mailto:)/.test(secondary.href);

  return (
    <section className={`page-hero ${image ? "has-image" : ""}`}>
      <div className="page-hero-pattern" aria-hidden="true" />
      <div className="shell">
        <nav className="breadcrumbs" aria-label={copy.breadcrumbs}>
          <Link href={localeHref(locale, "/")}>{copy.home}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{label}</span>
        </nav>
        <div className="page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow">
              <BrandStar className="mini-star" />
              {label}
            </p>
            <h1>{title}</h1>
            <p>{text}</p>
            {(primary || secondary) && (
              <div className="hero-actions">
                {primary && (
                  <Link className="button" href={localeHref(locale, primary.href)}>
                    {primary.label} <span aria-hidden="true">↗</span>
                  </Link>
                )}
                {secondary && secondaryIsExternal && (
                  <a
                    className="text-link"
                    href={secondary.href}
                    target={secondary.href.startsWith("http") ? "_blank" : undefined}
                    rel={secondary.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {secondary.label} <span aria-hidden="true">→</span>
                  </a>
                )}
                {secondary && !secondaryIsExternal && (
                  <Link className="text-link" href={localeHref(locale, secondary.href)}>
                    {secondary.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            )}
          </div>
          {image && (
            <div className="page-hero-image">
              <Image
                src={image}
                alt={imageAlt}
                width={1040}
                height={1106}
                unoptimized
                priority
                fetchPriority="high"
                sizes="(max-width: 780px) calc(100vw - 32px), (max-width: 1120px) 42vw, 518px"
              />
              <BrandStar className="image-star" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
