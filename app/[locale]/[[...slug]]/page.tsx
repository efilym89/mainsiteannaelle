import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AboutPageContent } from "@/app/about/page";
import {
  BookingPageContent,
  type BookingSearchParams,
} from "@/app/booking/page";
import { ContactsPageContent } from "@/app/contacts/page";
import { FaqPageContent } from "@/app/faq/page";
import { HomePageContent } from "@/app/page";
import { PricesPageContent } from "@/app/prices/page";
import { ReviewsPageContent } from "@/app/reviews/page";
import { ServicesPageContent } from "@/app/services/page";
import { SilkPageContent } from "@/app/silk/page";
import { SpecialistsPageContent } from "@/app/specialists/page";
import { isLocale, localeHref, type Locale } from "@/lib/i18n";
import {
  localizedMetadata,
  localizedRoutes,
  type LocalizedRoute,
} from "@/lib/page-metadata";

type LocalizedPageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: BookingSearchParams;
};

function routeFromSlug(slug: string[] | undefined): LocalizedRoute | null {
  if (!slug?.length) return "/";
  if (slug.length !== 1) return null;
  const route = `/${slug[0]}`;
  return localizedRoutes.includes(route as LocalizedRoute)
    ? (route as LocalizedRoute)
    : null;
}

function supportedLocalizedLocale(value: string): value is Locale {
  return isLocale(value) && value !== "ru";
}

export function generateStaticParams() {
  return (["uz", "en"] as const).flatMap((locale) =>
    localizedRoutes.map((route) => ({
      locale,
      ...(route === "/" ? {} : { slug: [route.slice(1)] }),
    })),
  );
}

export async function generateMetadata({
  params,
}: LocalizedPageProps): Promise<Metadata> {
  const { locale: requestedLocale, slug } = await params;
  const route = routeFromSlug(slug);
  if (!route || !supportedLocalizedLocale(requestedLocale)) return {};
  return localizedMetadata(route, requestedLocale);
}

export default async function LocalizedPage({
  params,
  searchParams,
}: LocalizedPageProps) {
  const { locale: requestedLocale, slug } = await params;
  const route = routeFromSlug(slug);

  if (!isLocale(requestedLocale) || !route) notFound();
  if (requestedLocale === "ru") redirect(localeHref("ru", route));

  const locale = requestedLocale;

  switch (route) {
    case "/":
      return <HomePageContent locale={locale} />;
    case "/services":
      return <ServicesPageContent locale={locale} />;
    case "/prices":
      return <PricesPageContent locale={locale} />;
    case "/silk":
      return <SilkPageContent locale={locale} />;
    case "/about":
      return <AboutPageContent locale={locale} />;
    case "/specialists":
      return <SpecialistsPageContent locale={locale} />;
    case "/reviews":
      return <ReviewsPageContent locale={locale} />;
    case "/faq":
      return <FaqPageContent locale={locale} />;
    case "/contacts":
      return <ContactsPageContent locale={locale} />;
    case "/booking":
      return <BookingPageContent locale={locale} searchParams={searchParams} />;
  }
}
