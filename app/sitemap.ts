import type { MetadataRoute } from "next";
import { localeHref, type Locale } from "@/lib/i18n";
import { localizedRoutes } from "@/lib/page-metadata";

const baseUrl = "https://annaelle-studio.efilym.chatgpt.site";
const publishedLocales: Locale[] = ["ru", "uz", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-11T00:00:00+05:00");

  return publishedLocales.flatMap((locale) =>
    localizedRoutes.map((route, index) => {
      const path = localeHref(locale, route);
      return {
        url: `${baseUrl}${path}`,
        lastModified,
        changeFrequency: index === 0 ? "weekly" : "monthly",
        priority: index === 0 ? 1 : route === "/booking" ? 0.9 : 0.8,
        alternates: {
          languages: {
            ru: `${baseUrl}${localeHref("ru", route)}`,
            "uz-Latn": `${baseUrl}${localeHref("uz", route)}`,
            en: `${baseUrl}${localeHref("en", route)}`,
            "x-default": `${baseUrl}${localeHref("ru", route)}`,
          },
        },
      };
    }),
  );
}
