import Link from "next/link";
import { singleServices } from "@/data/site";

export function ServicePriceList({
  limit,
  compact = false,
}: {
  limit?: number;
  compact?: boolean;
}) {
  const services =
    typeof limit === "number" ? singleServices.slice(0, limit) : singleServices;

  return (
    <div className={`service-price-list ${compact ? "is-compact" : ""}`}>
      {services.map((service) => (
        <Link
          href={`/booking?service=service-${service.id}`}
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
