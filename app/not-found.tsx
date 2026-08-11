import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content">
      <PageHero
        label="Ошибка 404"
        title="Такой страницы здесь нет"
        text="Возможно, ссылка устарела или адрес введён с ошибкой. Вернитесь на главную либо выберите удобный способ связаться со студией."
        primary={{ href: "/", label: "На главную" }}
        secondary={{ href: "/contacts", label: "Контакты студии" }}
      />
    </main>
  );
}
