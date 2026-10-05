import { faqs } from "@/data/site";
import { localizeSiteValue } from "@/data/site-i18n";
import type { Locale } from "@/lib/i18n";

export function FaqList({
  limit,
  category,
  items: providedItems,
  locale = "ru",
}: {
  limit?: number;
  category?: string;
  items?: ReadonlyArray<(typeof faqs)[number]>;
  locale?: Locale;
}) {
  const source = localizeSiteValue(providedItems ?? faqs, locale);
  const filtered = category
    ? source.filter((item) => item.category === category)
    : source;
  const items = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.question}>
          <summary>
            <span className="faq-number">0{index + 1}</span>
            <span>{item.question}</span>
            <span className="faq-toggle" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
