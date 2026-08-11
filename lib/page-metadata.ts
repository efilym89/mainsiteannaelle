import type { Metadata } from "next";
import { localeHref, type Locale } from "@/lib/i18n";

export const localizedRoutes = [
  "/",
  "/services",
  "/prices",
  "/silk",
  "/about",
  "/specialists",
  "/reviews",
  "/faq",
  "/contacts",
  "/booking",
] as const;

export type LocalizedRoute = (typeof localizedRoutes)[number];

const metadataCopy: Record<
  LocalizedRoute,
  Record<Locale, { title: string; description: string }>
> = {
  "/": {
    ru: {
      title: "Annaelle — лазерная эпиляция в Ташкенте",
      description:
        "Студия лазерной эпиляции Annaelle в Ташкенте: услуги, цены, специалисты, отзывы и удобная онлайн-запись.",
    },
    uz: {
      title: "Annaelle — Toshkentdagi lazer epilatsiyasi",
      description:
        "Toshkentdagi Annaelle lazer epilatsiyasi studiyasi: xizmatlar, narxlar, mutaxassislar, fikrlar va qulay onlayn yozilish.",
    },
    en: {
      title: "Annaelle — laser hair removal in Tashkent",
      description:
        "Annaelle laser hair removal studio in Tashkent: services, prices, specialists, reviews and convenient online booking.",
    },
  },
  "/services": {
    ru: {
      title: "Услуги лазерной эпиляции",
      description:
        "Услуги лазерной эпиляции Annaelle: отдельные зоны, комбо-пакеты, подготовка и порядок первого визита.",
    },
    uz: {
      title: "Lazer epilatsiyasi xizmatlari",
      description:
        "Annaelle lazer epilatsiyasi xizmatlari: alohida zonalar, kombo-paketlar, tayyorgarlik va birinchi tashrif jarayoni.",
    },
    en: {
      title: "Laser hair removal services",
      description:
        "Annaelle laser hair removal services: individual areas, course packages, preparation and your first-visit journey.",
    },
  },
  "/prices": {
    ru: {
      title: "Цены на лазерную эпиляцию",
      description:
        "Актуальный прайс Annaelle: разовые услуги, комбо-пакеты на 5, 7 и 9 сеансов и специальные предложения.",
    },
    uz: {
      title: "Lazer epilatsiyasi narxlari",
      description:
        "Annaelle’ning amaldagi narxlari: bir martalik xizmatlar, 5, 7 va 9 seansli kombo-paketlar hamda maxsus takliflar.",
    },
    en: {
      title: "Laser hair removal prices",
      description:
        "Current Annaelle prices: single services, five-, seven- and nine-session packages, and special offers.",
    },
  },
  "/silk": {
    ru: {
      title: "Карта Silk",
      description: "Silk — цифровая карта Annaelle для Apple Wallet.",
    },
    uz: {
      title: "Silk kartasi",
      description: "Silk — Annaelle’ning Apple Wallet uchun raqamli kartasi.",
    },
    en: {
      title: "Silk Card",
      description: "Silk is Annaelle’s digital card for Apple Wallet.",
    },
  },
  "/about": {
    ru: {
      title: "О студии Annaelle",
      description:
        "Annaelle — студия лазерной эпиляции в Ташкенте с вниманием к комфорту, приватности и понятному плану курса.",
    },
    uz: {
      title: "Annaelle studiyasi haqida",
      description:
        "Annaelle — Toshkentdagi lazer epilatsiyasi studiyasi: qulaylik, maxfiylik va tushunarli kurs rejasiga e’tibor.",
    },
    en: {
      title: "About Annaelle studio",
      description:
        "Annaelle is a laser hair removal studio in Tashkent focused on comfort, privacy and a clear course plan.",
    },
  },
  "/specialists": {
    ru: {
      title: "Специалисты Annaelle",
      description:
        "Подход специалистов Annaelle: спокойная коммуникация, индивидуальные параметры и рекомендации после визита.",
    },
    uz: {
      title: "Annaelle mutaxassislari",
      description:
        "Annaelle mutaxassislarining yondashuvi: xotirjam muloqot, individual sozlamalar va tashrifdan keyingi tavsiyalar.",
    },
    en: {
      title: "Annaelle specialists",
      description:
        "The Annaelle approach: calm communication, individual settings and clear aftercare guidance.",
    },
  },
  "/reviews": {
    ru: {
      title: "Отзывы об Annaelle",
      description:
        "Отзывы гостей Annaelle об атмосфере студии, консультации и процедуре лазерной эпиляции.",
    },
    uz: {
      title: "Annaelle haqidagi fikrlar",
      description:
        "Mehmonlarning Annaelle muhiti, maslahat va lazer epilatsiyasi muolajasi haqidagi fikrlari.",
    },
    en: {
      title: "Annaelle reviews",
      description:
        "Guest reviews of the Annaelle atmosphere, consultation and laser hair removal experience.",
    },
  },
  "/faq": {
    ru: {
      title: "Вопросы о лазерной эпиляции",
      description:
        "Ответы на частые вопросы о подготовке, курсе, ощущениях и противопоказаниях.",
    },
    uz: {
      title: "Lazer epilatsiyasi haqida savollar",
      description:
        "Tayyorgarlik, kurs, hislar va qarshi ko‘rsatmalar haqidagi ko‘p beriladigan savollarga javoblar.",
    },
    en: {
      title: "Laser hair removal FAQ",
      description:
        "Answers to common questions about preparation, the course, sensations and contraindications.",
    },
  },
  "/contacts": {
    ru: {
      title: "Контакты Annaelle в Ташкенте",
      description:
        "Адрес, режим работы, телефон, e-mail, Instagram и маршрут до студии Annaelle.",
    },
    uz: {
      title: "Toshkentdagi Annaelle kontaktlari",
      description:
        "Annaelle studiyasining manzili, ish vaqti, telefoni, e-mail manzili, Instagram’i va yo‘nalishi.",
    },
    en: {
      title: "Annaelle contacts in Tashkent",
      description:
        "Annaelle studio address, opening hours, phone, email, Instagram and directions.",
    },
  },
  "/booking": {
    ru: {
      title: "Онлайн-запись в Annaelle",
      description:
        "Онлайн-запись в Annaelle: выберите услугу, дату и удобное время.",
    },
    uz: {
      title: "Annaelle’ga onlayn yozilish",
      description:
        "Annaelle’ga onlayn yoziling: xizmat, sana va qulay vaqtni tanlang.",
    },
    en: {
      title: "Book Annaelle online",
      description:
        "Book Annaelle online: choose a service, date and convenient time.",
    },
  },
};

const openGraphLocale: Record<Locale, string> = {
  ru: "ru_RU",
  uz: "uz_UZ",
  en: "en_US",
};

const socialImageAlt: Record<Locale, string> = {
  ru: "Интерьер студии Annaelle в Ташкенте",
  uz: "Toshkentdagi Annaelle studiyasi interyeri",
  en: "Annaelle studio interior in Tashkent",
};

export function localizedMetadata(
  route: LocalizedRoute,
  locale: Locale,
): Metadata {
  const copy = metadataCopy[route][locale];
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: localeHref(locale, route),
      languages: {
        ru: localeHref("ru", route),
        "uz-Latn": localeHref("uz", route),
        en: localeHref("en", route),
        "x-default": localeHref("ru", route),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Annaelle",
      title: copy.title,
      description: copy.description,
      url: localeHref(locale, route),
      locale: openGraphLocale[locale],
      alternateLocale: (["ru", "uz", "en"] as Locale[])
        .filter((item) => item !== locale)
        .map((item) => openGraphLocale[item]),
      images: [
        {
          url: "/images/home-studio.webp",
          width: 1600,
          height: 1280,
          alt: socialImageAlt[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/images/home-studio.webp"],
    },
  };
}
