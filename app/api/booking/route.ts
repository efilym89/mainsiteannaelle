import { getDb } from "../../../db";
import { bookings } from "../../../db/schema";
import { bookingServices, contact } from "../../../data/site";
import { isLocale, type Locale } from "../../../lib/i18n";

const contactMethods = new Set(["telegram", "whatsapp", "call"]);
const bookingServiceBySubmissionValue = new Map(
  bookingServices.flatMap(
    (service): [string, string][] => [
      [service.id, service.value],
      [service.value, service.value],
    ],
  ),
);
const maxRequestSize = 12_000;

const messages = {
  ru: {
    invalidRequest: "Неверный формат запроса.",
    tooLarge: "Запрос слишком большой.",
    unreadable: "Не удалось прочитать данные формы.",
    name: "Укажите имя — минимум 2 символа.",
    phone: "Проверьте номер телефона.",
    contactMethod: "Выберите удобный способ связи.",
    service: "Выберите услугу из списка.",
    consent: "Нужно согласие на обработку данных.",
    date: "Выберите корректную дату — сегодня или позже.",
    time: "Выберите время с 09:00 до 21:00.",
    success:
      "Спасибо! Заявка отправлена. Администратор свяжется с вами, чтобы подтвердить услугу и время.",
    failure:
      "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь со студией по телефону.",
  },
  uz: {
    invalidRequest: "So‘rov formati noto‘g‘ri.",
    tooLarge: "So‘rov hajmi juda katta.",
    unreadable: "Shakl ma’lumotlarini o‘qib bo‘lmadi.",
    name: "Ismni kiriting — kamida 2 ta belgi.",
    phone: "Telefon raqamini tekshiring.",
    contactMethod: "Qulay aloqa usulini tanlang.",
    service: "Xizmatni ro‘yxatdan tanlang.",
    consent: "Ma’lumotlarni qayta ishlashga rozilik kerak.",
    date: "Bugungi yoki undan keyingi to‘g‘ri sanani tanlang.",
    time: "09:00 dan 21:00 gacha bo‘lgan vaqtni tanlang.",
    success:
      "Rahmat! So‘rovingiz yuborildi. Xizmat va vaqtni tasdiqlash uchun administrator siz bilan bog‘lanadi.",
    failure:
      "So‘rov yuborilmadi. Yana urinib ko‘ring yoki studiyaga telefon orqali bog‘laning.",
  },
  en: {
    invalidRequest: "Invalid request format.",
    tooLarge: "The request is too large.",
    unreadable: "We could not read the form data.",
    name: "Enter a name of at least 2 characters.",
    phone: "Check the phone number.",
    contactMethod: "Choose a preferred contact method.",
    service: "Choose a service from the list.",
    consent: "Consent to data processing is required.",
    date: "Choose a valid date: today or later.",
    time: "Choose a time between 09:00 and 21:00.",
    success:
      "Thank you! Your request has been sent. An administrator will contact you to confirm the service and time.",
    failure:
      "We could not send your request. Please try again or call the studio.",
  },
} as const;

function requestLocale(request: Request): Locale {
  const requested = request.headers.get("x-annaelle-locale") ?? "ru";
  return isLocale(requested) ? requested : "ru";
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, maxLength)
    : "";
}

function todayInTashkent() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return `${values.year}-${values.month}-${values.day}`;
}

function isRealIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [, year, month, day] = match;
  const date = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day)),
  );
  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day)
  );
}

function isStudioTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return (
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59 &&
    value >= "09:00" &&
    value <= "21:00"
  );
}

export async function POST(request: Request) {
  const locale = requestLocale(request);
  const copy = messages[locale];
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return Response.json(
        { error: copy.invalidRequest },
        { status: 415 },
      );
    }

    const declaredSize = Number(request.headers.get("content-length") || 0);
    if (declaredSize > maxRequestSize) {
      return Response.json(
        { error: copy.tooLarge },
        { status: 413 },
      );
    }

    const body = await request.text();
    if (body.length > maxRequestSize) {
      return Response.json(
        { error: copy.tooLarge },
        { status: 413 },
      );
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(body) as Record<string, unknown>;
    } catch {
      return Response.json(
        { error: copy.unreadable },
        { status: 400 },
      );
    }

    // A hidden field catches basic automated spam without inconveniencing guests.
    if (clean(payload.company, 120)) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const name = clean(payload.name, 80);
    const phone = clean(payload.phone, 30);
    const contactMethod = clean(payload.contactMethod, 16);
    const zone = clean(payload.zone, 160);
    const canonicalZone = zone
      ? bookingServiceBySubmissionValue.get(zone)
      : "";
    const preferredDate = clean(payload.preferredDate, 10);
    const preferredTime = clean(payload.preferredTime, 5);
    const consent = payload.consent === true;

    if (name.length < 2) {
      return Response.json(
        { error: copy.name },
        { status: 400 },
      );
    }

    if (!/^[+()\d\s-]{7,30}$/.test(phone)) {
      return Response.json(
        { error: copy.phone },
        { status: 400 },
      );
    }

    if (!contactMethods.has(contactMethod)) {
      return Response.json(
        { error: copy.contactMethod },
        { status: 400 },
      );
    }

    if (zone && !canonicalZone) {
      return Response.json(
        { error: copy.service },
        { status: 400 },
      );
    }

    if (!consent) {
      return Response.json(
        { error: copy.consent },
        { status: 400 },
      );
    }

    if (
      preferredDate &&
      (!isRealIsoDate(preferredDate) || preferredDate < todayInTashkent())
    ) {
      return Response.json(
        { error: copy.date },
        { status: 400 },
      );
    }

    if (preferredTime && !isStudioTime(preferredTime)) {
      return Response.json(
        { error: copy.time },
        { status: 400 },
      );
    }

    const db = await getDb();
    await db.insert(bookings).values({
      name,
      phone,
      contactMethod,
      zone: canonicalZone,
      branch: contact.address,
      preferredDate,
      preferredTime,
      consentAt: new Date().toISOString(),
    });

    return Response.json(
      {
        ok: true,
        message: copy.success,
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return Response.json(
      {
        error: copy.failure,
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
