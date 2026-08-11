# Annaelle — студия лазерной эпиляции

Исходный код сайта Annaelle в Ташкенте. Проект построен на Next.js, React,
Vinext и Cloudflare Workers; заявки сохраняются в D1.

## Тестовая версия

Визуальный GitHub Pages preview:
https://efilym89.github.io/mainsiteannaelle/

GitHub Pages не запускает Worker и D1, поэтому в тестовом preview отключена
отправка формы записи. Навигация между страницами и мобильное меню работают;
production-версия продолжает работать через Sites.

## Локальный запуск

Требуется Node.js 22.13 или новее и Git Bash/Linux shell.

```bash
npm ci
npm run dev
```

Основные команды:

- `npm run lint` — проверка кода;
- `npm test` — production-сборка и тесты маршрутов;
- `npm run preview:github` — пересобрать статический preview в `docs/`.

## Структура

- `app/` — страницы, API и стили;
- `components/` — интерфейсные компоненты;
- `data/` — услуги, цены и контент;
- `public/` — фирменные изображения, фотографии и шрифты;
- `worker/` — Cloudflare Worker entrypoint;
- `drizzle/` и `db/` — схема D1;
- `docs/` — статический GitHub Pages preview.

## Права на материалы

Код, фотографии, тексты, логотипы и фирменные материалы не передаются под
открытой лицензией. Условия использования сторонних шрифтов и ограничения для
брендовых материалов описаны в `ASSETS-LICENSE.md`.
