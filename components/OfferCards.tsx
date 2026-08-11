import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { specialOffers } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import { getCopy, localeHref, type Locale } from "@/lib/i18n";

const offerCopy = {
  ru: "Выбрать предложение",
  uz: "Taklifni tanlash",
  en: "Choose offer",
} as const;

export function OfferCards({ locale = "ru" }: { locale?: Locale }) {
  const offers = localizeSiteValue(specialOffers, locale);
  return (
    <div className="offer-grid">
      {offers.map((offer, index) => (
        <article className="offer-card" key={offer.id}>
          <div className="offer-card-top">
            <span>0{index + 1}</span>
            <BrandStar />
          </div>
          <h3>{offer.title}</h3>
          <p className="offer-price">{offer.price}</p>
          <p className="offer-condition">*{offer.condition}</p>
          <Link
            className="card-action"
            href={localeHref(locale, `/booking?service=offer-${offer.id}`)}
          >
            {getCopy(locale, offerCopy)} <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
