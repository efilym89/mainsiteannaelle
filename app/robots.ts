import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://annaelle-studio.efilym.chatgpt.site/sitemap.xml",
  };
}
