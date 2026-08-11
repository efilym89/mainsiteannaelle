import { faqs } from "@/data/site";

export function FaqList({
  limit,
  category,
  items: providedItems,
}: {
  limit?: number;
  category?: string;
  items?: ReadonlyArray<(typeof faqs)[number]>;
}) {
  const source = providedItems ?? faqs;
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
