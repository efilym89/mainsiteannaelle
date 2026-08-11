"use client";

import { FormEvent, useState } from "react";
import { bookingGroups } from "@/data/site";

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

export function BookingForm({ initialService = "" }: { initialService?: string }) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          contactMethod: data.get("contactMethod"),
          zone: data.get("zone"),
          preferredDate: data.get("preferredDate"),
          preferredTime: data.get("preferredTime"),
          company: data.get("company"),
          consent: data.get("consent") === "on",
        }),
      });

      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Не удалось отправить заявку.");
      }

      setSubmitState("success");
      setSubmitMessage(
        result.message ||
          "Спасибо! Администратор свяжется с вами для подтверждения.",
      );
      form.reset();
      setSelectedService("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте ещё раз.",
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
          <span>Ваше имя *</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Как к вам обращаться?"
            minLength={2}
            maxLength={80}
            required
          />
        </label>
        <label>
          <span>Номер телефона *</span>
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
          <span>Как удобнее связаться?</span>
          <select name="contactMethod" defaultValue="call">
            <option value="call">Позвонить</option>
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label>
          <span>Что вас интересует?</span>
          <select
            name="zone"
            value={selectedService}
            onChange={(event) => setSelectedService(event.target.value)}
          >
            <option value="">Помогите выбрать</option>
            {bookingGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((item) => (
                  <option key={item.id} value={item.value}>
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
          <span>Предпочтительная дата</span>
          <input
            name="preferredDate"
            type="date"
            min={todayInTashkent()}
          />
        </label>
        <label>
          <span>Удобное время</span>
          <input
            name="preferredTime"
            type="time"
            min="09:00"
            max="21:00"
          />
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        Компания
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          Я соглашаюсь с обработкой персональных данных для связи по заявке.
        </span>
      </label>

      <button
        className="button submit-button"
        type="submit"
        disabled={submitState === "sending"}
      >
        {submitState === "sending" ? "Отправляем..." : "Записаться онлайн"}
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
