import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";

const ctaDefaults = {
  ru: { eyebrow: "Онлайн-запись", primary: "Записаться онлайн" },
  uz: { eyebrow: "Onlayn yozilish", primary: "Onlayn yozilish" },
  en: { eyebrow: "Online booking", primary: "Book online" },
} as const;

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  text: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  locale?: Locale;
};

export function CtaBand({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  locale = "ru",
}: CtaBandProps) {
  const defaults = getCopy(locale, ctaDefaults);
  const resolvedEyebrow = eyebrow ?? defaults.eyebrow;
  const resolvedPrimary = primary ?? {
    href: "/booking",
    label: defaults.primary,
  };
  const secondaryIsExternal =
    secondary &&
    /^(https?:|tel:|mailto:)/.test(secondary.href);

  return (
    <section className="cta-band">
      <div className="cta-band-pattern" aria-hidden="true" />
      <div className="shell cta-band-grid">
        <div>
          <p className="eyebrow">
            <BrandStar className="mini-star" />
            {resolvedEyebrow}
          </p>
          <h2>{title}</h2>
        </div>
        <div className="cta-band-copy">
          <p>{text}</p>
          <div className="cta-band-actions">
            <Link
              className="button button-dark"
              href={localeHref(locale, resolvedPrimary.href)}
            >
              {resolvedPrimary.label} <span aria-hidden="true">↗</span>
            </Link>
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
        </div>
      </div>
    </section>
  );
}
