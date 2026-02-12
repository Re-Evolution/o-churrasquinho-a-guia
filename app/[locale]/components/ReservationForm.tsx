"use client";

import { useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FaCheckCircle } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

const timeSlots = [
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

export default function ReservationForm() {
  const t = useTranslations("reservation");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const errs: Record<string, string> = {};
    if (!form.get("name")) errs.name = t("required");
    if (!form.get("email")) errs.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.get("email") as string))
      errs.email = t("invalidEmail");
    if (!form.get("phone")) errs.phone = t("required");
    else if (!/^[+\d][\d\s-]{7,}$/.test(form.get("phone") as string))
      errs.phone = t("invalidPhone");
    if (!form.get("date")) errs.date = t("required");
    if (!form.get("time")) errs.time = t("required");
    if (!form.get("guests")) errs.guests = t("required");
    if (!form.get("privacy")) errs.privacy = t("required");
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        date: formData.get("date"),
        time: formData.get("time"),
        guests: formData.get("guests"),
        notes: formData.get("notes"),
        locale,
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="reservation" className="py-20 lg:py-28 bg-brand-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <FaCheckCircle className="text-green-500 mx-auto mb-6" size={64} />
            <h2 className="text-2xl font-bold text-brand-black mb-4">
              {t("success")}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservation" className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black text-center mb-4">
            {t("title")}
          </h2>
          <p className="text-center text-brand-black/60 mb-12">
            {t("subtitle")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-brand-black mb-2"
              >
                {t("name")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 rounded-xl border border-brand-warm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-brand-cream/50"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email + Phone row */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brand-black mb-2"
                >
                  {t("email")} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-brand-warm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-brand-cream/50"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-brand-black mb-2"
                >
                  {t("phone")} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl border border-brand-warm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-brand-cream/50"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Date + Time + Guests row */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-brand-black mb-2"
                >
                  {t("date")} *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={today}
                  className="w-full px-4 py-3 rounded-xl border border-brand-warm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-brand-cream/50"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-brand-black mb-2"
                >
                  {t("time")} *
                </label>
                <select
                  id="time"
                  name="time"
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-brand-warm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-brand-cream/50"
                >
                  <option value="" disabled>
                    {t("selectTime")}
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-brand-black mb-2"
                >
                  {t("guests")} *
                </label>
                <select
                  id="guests"
                  name="guests"
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-brand-warm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-brand-cream/50"
                >
                  <option value="" disabled>
                    --
                  </option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {t("guestsSuffix")}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-brand-black mb-2"
              >
                {t("notes")}
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder={t("notesPlaceholder")}
                className="w-full px-4 py-3 rounded-xl border border-brand-warm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-brand-cream/50 resize-none"
              />
            </div>

            {/* Privacy */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy"
                  value="accepted"
                  className="mt-1 w-4 h-4 rounded border-brand-warm text-brand-red focus:ring-brand-red/20"
                />
                <span className="text-sm text-brand-black/70">
                  {t("privacy")}{" "}
                  <a
                    href={locale === "pt" ? "/pt/privacidade" : "/en/privacy"}
                    className="text-brand-red underline hover:text-brand-red-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    *
                  </a>
                </span>
              </label>
              {errors.privacy && (
                <p className="text-red-500 text-xs mt-1">{errors.privacy}</p>
              )}
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm bg-red-50 p-4 rounded-xl">
                {t("error")}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 btn-gradient text-white font-semibold rounded-xl text-lg disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {status === "sending" ? t("sending") : t("submit")}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
