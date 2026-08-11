import Link from "next/link";
import { singleServices } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { localeHref, type Locale } from "@/lib/i18n";

export function ServicePriceList({
  limit,
  compact = false,
  locale = "ru",
}: {
  limit?: number;
  compact?: boolean;
  locale?: Locale;
}) {
  const localizedServices = localizeSiteValue(singleServices, locale);
  const services =
    typeof limit === "number"
      ? localizedServices.slice(0, limit)
      : localizedServices;

  return (
    <div className={`service-price-list ${compact ? "is-compact" : ""}`}>
      {services.map((service) => (
        <Link
          href={localeHref(locale, `/booking?service=service-${service.id}`)}
          key={service.id}
        >
          <span>{service.name}</span>
          <strong>{service.price}</strong>
          <span className="service-price-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
