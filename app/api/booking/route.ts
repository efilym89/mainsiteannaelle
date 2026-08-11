import { getDb } from "../../../db";
import { bookings } from "../../../db/schema";
import { bookingServices, contact } from "../../../data/site";

const contactMethods = new Set(["telegram", "whatsapp", "call"]);
const allowedServices = new Set(bookingServices.map((service) => service.value));
const maxRequestSize = 12_000;

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
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return Response.json(
        { error: "Неверный формат запроса." },
        { status: 415 },
      );
    }

    const declaredSize = Number(request.headers.get("content-length") || 0);
    if (declaredSize > maxRequestSize) {
      return Response.json(
        { error: "Запрос слишком большой." },
        { status: 413 },
      );
    }

    const body = await request.text();
    if (body.length > maxRequestSize) {
      return Response.json(
        { error: "Запрос слишком большой." },
        { status: 413 },
      );
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(body) as Record<string, unknown>;
    } catch {
      return Response.json(
        { error: "Не удалось прочитать данные формы." },
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
    const preferredDate = clean(payload.preferredDate, 10);
    const preferredTime = clean(payload.preferredTime, 5);
    const consent = payload.consent === true;

    if (name.length < 2) {
      return Response.json(
        { error: "Укажите имя — минимум 2 символа." },
        { status: 400 },
      );
    }

    if (!/^[+()\d\s-]{7,30}$/.test(phone)) {
      return Response.json(
        { error: "Проверьте номер телефона." },
        { status: 400 },
      );
    }

    if (!contactMethods.has(contactMethod)) {
      return Response.json(
        { error: "Выберите удобный способ связи." },
        { status: 400 },
      );
    }

    if (zone && !allowedServices.has(zone)) {
      return Response.json(
        { error: "Выберите услугу из списка." },
        { status: 400 },
      );
    }

    if (!consent) {
      return Response.json(
        { error: "Нужно согласие на обработку данных." },
        { status: 400 },
      );
    }

    if (
      preferredDate &&
      (!isRealIsoDate(preferredDate) || preferredDate < todayInTashkent())
    ) {
      return Response.json(
        { error: "Выберите корректную дату — сегодня или позже." },
        { status: 400 },
      );
    }

    if (preferredTime && !isStudioTime(preferredTime)) {
      return Response.json(
        { error: "Выберите время с 09:00 до 21:00." },
        { status: 400 },
      );
    }

    const db = await getDb();
    await db.insert(bookings).values({
      name,
      phone,
      contactMethod,
      zone,
      branch: contact.address,
      preferredDate,
      preferredTime,
      consentAt: new Date().toISOString(),
    });

    return Response.json(
      {
        ok: true,
        message:
          "Спасибо! Заявка отправлена. Администратор свяжется с вами, чтобы подтвердить услугу и время.",
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return Response.json(
      {
        error:
          "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь со студией по телефону.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
