import { reviews } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import type { Locale } from "@/lib/i18n";

export function ReviewCards({
  limit,
  locale = "ru",
}: {
  limit?: number;
  locale?: Locale;
}) {
  const localizedReviews = localizeSiteValue(reviews, locale);
  const items =
    typeof limit === "number"
      ? localizedReviews.slice(0, limit)
      : localizedReviews;

  return (
    <div className="reviews-grid">
      {items.map((review, index) => (
        <article key={review.name}>
          <div className="quote-mark" aria-hidden="true">
            “
          </div>
          <p>«{review.text}»</p>
          <footer>
            <span className="avatar" aria-hidden="true">
              {review.name.slice(0, 1)}
            </span>
            <div>
              <strong>{review.name}</strong>
              <small>{review.detail}</small>
            </div>
            <span className="review-index" aria-hidden="true">
              0{index + 1}
            </span>
          </footer>
        </article>
      ))}
    </div>
  );
}
