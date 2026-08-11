import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  text: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export function CtaBand({
  eyebrow = "Онлайн-запись",
  title,
  text,
  primary = { href: "/booking", label: "Записаться онлайн" },
  secondary,
}: CtaBandProps) {
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
            {eyebrow}
          </p>
          <h2>{title}</h2>
        </div>
        <div className="cta-band-copy">
          <p>{text}</p>
          <div className="cta-band-actions">
            <Link className="button button-dark" href={primary.href}>
              {primary.label} <span aria-hidden="true">↗</span>
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
              <Link className="text-link" href={secondary.href}>
                {secondary.label} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
