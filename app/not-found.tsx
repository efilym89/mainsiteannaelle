import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getCopy, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

const copy = {
  ru: {
    label: "Ошибка 404",
    title: "Такой страницы здесь нет",
    text: "Возможно, ссылка устарела или адрес введён с ошибкой. Вернитесь на главную либо выберите удобный способ связаться со студией.",
    home: "На главную",
    contacts: "Контакты студии",
  },
  uz: {
    label: "404 xatosi",
    title: "Bu sahifa topilmadi",
    text: "Havola eskirgan yoki manzil xato kiritilgan bo‘lishi mumkin. Bosh sahifaga qayting yoki studiya bilan qulay usulda bog‘laning.",
    home: "Bosh sahifaga",
    contacts: "Studiya kontaktlari",
  },
  en: {
    label: "Error 404",
    title: "This page could not be found",
    text: "The link may be outdated or the address may contain an error. Return home or choose a convenient way to contact the studio.",
    home: "Go home",
    contacts: "Studio contacts",
  },
} as const;

export function NotFoundContent({ locale = "ru" }: { locale?: Locale }) {
  const text = getCopy(locale, copy);

  return (
    <main id="main-content">
      <PageHero
        locale={locale}
        label={text.label}
        title={text.title}
        text={text.text}
        primary={{ href: "/", label: text.home }}
        secondary={{ href: "/contacts", label: text.contacts }}
      />
    </main>
  );
}

export default function NotFound() {
  return <NotFoundContent locale="ru" />;
}
