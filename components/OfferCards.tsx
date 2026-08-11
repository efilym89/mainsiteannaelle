import Link from "next/link";
import { BrandStar } from "@/components/BrandStar";
import { specialOffers } from "@/data/site";

export function OfferCards() {
  return (
    <div className="offer-grid">
      {specialOffers.map((offer, index) => (
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
            href={`/booking?service=offer-${offer.id}`}
          >
            Выбрать предложение <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
