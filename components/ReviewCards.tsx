import { reviews } from "@/data/site";

export function ReviewCards({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? reviews.slice(0, limit) : reviews;

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
