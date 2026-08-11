"use client";

import Link from "next/link";
import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
} from "react";
import { BrandStar } from "@/components/BrandStar";
import { ServicePriceList } from "@/components/ServicePriceList";
import { coursePackages } from "@/data/site";

type PriceMode = "single" | "course-5" | "course-7" | "course-9";

const priceTabs: ReadonlyArray<readonly [PriceMode, string]> = [
  ["single", "Разовые услуги"],
  ["course-5", "5 сеансов · −20%"],
  ["course-7", "7 сеансов · −25%"],
  ["course-9", "9 сеансов · −30%"],
];

function bookingHref(mode: PriceMode, itemId: string) {
  const sessions = mode.replace("course-", "");
  return `/booking?service=course-${sessions}-${itemId}`;
}

export function PriceExplorer() {
  const [priceMode, setPriceMode] = useState<PriceMode>("single");

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "courses") {
        setPriceMode("course-5");
      } else if (
        hash === "single" ||
        hash === "course-5" ||
        hash === "course-7" ||
        hash === "course-9"
      ) {
        setPriceMode(hash);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  function selectMode(mode: PriceMode) {
    setPriceMode(mode);
    window.history.replaceState(null, "", `#${mode}`);
  }

  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const lastIndex = priceTabs.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight")
      nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowLeft")
      nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;
    else return;

    event.preventDefault();
    const nextMode = priceTabs[nextIndex][0];
    selectMode(nextMode);
    requestAnimationFrame(() =>
      document.getElementById(`price-tab-${nextMode}`)?.focus(),
    );
  }

  const activeCourse =
    priceMode === "single"
      ? null
      : coursePackages.find(
          (course) => course.sessions === Number(priceMode.replace("course-", "")),
        ) ?? null;

  return (
    <div className="price-explorer" id="price-explorer">
      {["single", "courses", "course-5", "course-7", "course-9"].map(
        (anchor) => (
        <span
          className="price-hash-anchor"
            id={anchor}
            key={`anchor-${anchor}`}
          aria-hidden="true"
        />
        ),
      )}
      <div className="price-tabs" role="tablist" aria-label="Варианты прайса">
        {priceTabs.map(([mode, label], index) => (
          <button
            key={mode}
            id={`price-tab-${mode}`}
            type="button"
            role="tab"
            aria-selected={priceMode === mode}
            aria-controls="price-panel"
            tabIndex={priceMode === mode ? 0 : -1}
            className={priceMode === mode ? "active" : ""}
            onClick={() => selectMode(mode)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="price-panel"
        id="price-panel"
        role="tabpanel"
        aria-labelledby={`price-tab-${priceMode}`}
      >
        {priceMode === "single" && <ServicePriceList />}

        {activeCourse && (
          <div className="course-package-grid">
            {activeCourse.items.map((item, index) => (
              <article className="course-package-card" key={item.id}>
                <div className="course-package-top">
                  <span>0{index + 1}</span>
                  <span className="discount-badge">{activeCourse.discount}</span>
                </div>
                {item.bestseller && (
                  <p className="bestseller-badge">Хит продаж</p>
                )}
                <h3>{item.title}</h3>
                <p className="course-package-price">{item.price}</p>
                <dl className="course-package-details">
                  <div>
                    <dt>Без скидки</dt>
                    <dd>{item.regularPrice}</dd>
                  </div>
                  <div>
                    <dt>За сеанс без скидки</dt>
                    <dd>{item.regularPerSession}</dd>
                  </div>
                  <div>
                    <dt>За сеанс со скидкой</dt>
                    <dd>{item.perSession}</dd>
                  </div>
                  <div>
                    <dt>Ваша выгода</dt>
                    <dd>{item.savings}</dd>
                  </div>
                </dl>
              <Link
                className="card-action"
                  href={bookingHref(priceMode, item.id)}
              >
                  Выбрать пакет <span aria-hidden="true">↗</span>
              </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="price-note">
        <BrandStar />
        <p>
          Все суммы перенесены из предоставленного прайс-листа без пересчёта
          или математической корректировки.
        </p>
        <Link href="/booking">Получить консультацию</Link>
      </div>
    </div>
  );
}
