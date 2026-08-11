import type { MetadataRoute } from "next";

const routes = [
  "",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://annaelle-studio.efilym.chatgpt.site";
  const lastModified = new Date("2026-08-11T00:00:00+05:00");

  return routes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/booking" ? 0.9 : 0.8,
  }));
}
