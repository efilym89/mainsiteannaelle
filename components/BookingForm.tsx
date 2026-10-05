"use client";

import { FormEvent, useState } from "react";
import { getBookingGroups } from "@/data/site-i18n";
import { getCopy, type Locale } from "@/lib/i18n";

const formCopy = {
  ru: {
    sendError: "Не удалось отправить заявку.",
    success: "Спасибо! Администратор свяжется с вами для подтверждения.",
    retry: "Не удалось отправить заявку. Попробуйте ещё раз.",
    name: "Ваше имя *",
    namePlaceholder: "Как к вам обращаться?",
    phone: "Номер телефона *",
    contactMethod: "Как удобнее связаться?",
    call: "Позвонить",
    service: "Что вас интересует?",
    helpChoose: "Помогите выбрать",
    date: "Предпочтительная дата",
    time: "Удобное время",
    company: "Компания",
    consent: "Я соглашаюсь с обработкой персональных данных для связи по заявке.",
    sending: "Отправляем...",
    submit: "Записаться онлайн",
  },
  uz: {
    sendError: "So‘rovni yuborib bo‘lmadi.",
    success: "Rahmat! Administrator tasdiqlash uchun siz bilan bog‘lanadi.",
    retry: "So‘rov yuborilmadi. Iltimos, yana urinib ko‘ring.",
    name: "Ismingiz *",
    namePlaceholder: "Sizga qanday murojaat qilaylik?",
    phone: "Telefon raqamingiz *",
    contactMethod: "Qanday bog‘lanish qulay?",
    call: "Qo‘ng‘iroq",
    service: "Sizni nima qiziqtiradi?",
    helpChoose: "Tanlashga yordam bering",
    date: "Ma’qul sana",
    time: "Qulay vaqt",
    company: "Kompaniya",
    consent: "So‘rov bo‘yicha bog‘lanish uchun shaxsiy ma’lumotlarim qayta ishlanishiga roziman.",
    sending: "Yuborilmoqda...",
    submit: "Onlayn yozilish",
  },
  en: {
    sendError: "We could not send your request.",
    success: "Thank you! An administrator will contact you to confirm.",
    retry: "We could not send your request. Please try again.",
    name: "Your name *",
    namePlaceholder: "How should we address you?",
    phone: "Phone number *",
    contactMethod: "How should we contact you?",
    call: "Phone call",
    service: "What are you interested in?",
    helpChoose: "Help me choose",
    date: "Preferred date",
    time: "Preferred time",
    company: "Company",
    consent: "I consent to the processing of my personal data so you can contact me about this request.",
    sending: "Sending...",
    submit: "Book online",
  },
} as const;

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

export function BookingForm({
  initialService = "",
  locale = "ru",
}: {
  initialService?: string;
  locale?: Locale;
}) {
  const copy = getCopy(locale, formCopy);
  const bookingGroups = getBookingGroups(locale);
  const [selectedService, setSelectedService] = useState(initialService);
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitState("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Annaelle-Locale": locale,
        },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          contactMethod: data.get("contactMethod"),
          zone: data.get("zone"),
          preferredDate: data.get("preferredDate"),
          preferredTime: data.get("preferredTime"),
          company: data.get("company"),
          consent: data.get("consent") === "on",
          locale,
        }),
      });

      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || copy.sendError);
      }

      setSubmitState("success");
      setSubmitMessage(
        result.message ||
          copy.success,
      );
      form.reset();
      setSelectedService("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : copy.retry,
      );
    }
  }

  return (
    <form
      className="booking-form"
      id="booking-form"
      onSubmit={submitBooking}
    >
      <div className="form-row">
        <label>
          <span>{copy.name}</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            minLength={2}
            maxLength={80}
            required
          />
        </label>
        <label>
          <span>{copy.phone}</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+998 __ ___ __ __"
            pattern="[+()\d\s-]{7,30}"
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>{copy.contactMethod}</span>
          <select name="contactMethod" defaultValue="call">
            <option value="call">{copy.call}</option>
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label>
          <span>{copy.service}</span>
          <select
            name="zone"
            value={selectedService}
            onChange={(event) => setSelectedService(event.target.value)}
          >
            <option value="">{copy.helpChoose}</option>
            {bookingGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>{copy.date}</span>
          <input
            name="preferredDate"
            type="date"
            min={todayInTashkent()}
          />
        </label>
        <label>
          <span>{copy.time}</span>
          <input
            name="preferredTime"
            type="time"
            min="09:00"
            max="21:00"
          />
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        {copy.company}
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          {copy.consent}
        </span>
      </label>

      <button
        className="button submit-button"
        type="submit"
        disabled={submitState === "sending"}
      >
        {submitState === "sending" ? copy.sending : copy.submit}
        <span aria-hidden="true">↗</span>
      </button>

      {submitMessage && (
        <p
          className={`form-status ${submitState}`}
          role={submitState === "error" ? "alert" : "status"}
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
}
