import type { Metadata, Viewport } from "next";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { contact } from "@/data/site";
import "./globals.css";

const siteUrl = "https://annaelle-studio.efilym.chatgpt.site";
const siteDescription =
  "Лазерная эпиляция женских зон в студии Annaelle в Ташкенте. Актуальные услуги, комбо-пакеты, специальные предложения и онлайн-запись.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Annaelle — студия лазерной эпиляции в Ташкенте",
    template: "%s | Annaelle",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Annaelle",
    title: "Annaelle — студия лазерной эпиляции в Ташкенте",
    description: siteDescription,
    images: [
      {
        url: "/images/home-studio.webp",
        width: 1600,
        height: 1280,
        alt: "Интерьер студии Annaelle в Ташкенте",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Annaelle — студия лазерной эпиляции в Ташкенте",
    description: siteDescription,
    images: ["/images/home-studio.webp"],
  },
  icons: {
    icon: "/brand/monogram.svg",
    shortcut: "/brand/monogram.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#fef7fb",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${siteUrl}/#studio`,
  name: "Annaelle",
  description: siteDescription,
  url: siteUrl,
  image: `${siteUrl}/images/home-studio.webp`,
  logo: `${siteUrl}/brand/logo-horizontal.svg`,
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Шота Руставели, 33",
    addressLocality: "Ташкент",
    addressCountry: "UZ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  sameAs: [contact.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href="/fonts/manrope-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/viaoda-libre-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/viaoda-libre-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Перейти к содержанию
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileStickyCta />
      </body>
    </html>
  );
}
