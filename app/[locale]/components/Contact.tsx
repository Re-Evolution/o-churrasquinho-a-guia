"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";
import OpenStatusBadge from "./OpenStatusBadge";
import { restaurantInfo } from "@/data/restaurant-info";

const dayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const formatTime = (time: string) => {
    if (locale === "en") {
      const [h, m] = time.split(":").map(Number);
      const period = h >= 12 ? "pm" : "am";
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      return `${hour12}:${m.toString().padStart(2, "0")}${period}`;
    }
    return time;
  };

  const getScheduleText = (dayIndex: number) => {
    const schedule = restaurantInfo.hours[dayIndex];
    if (!schedule.lunch && !schedule.dinner) {
      return t("closedDay");
    }
    const parts: string[] = [];
    if (schedule.lunch) {
      parts.push(
        `${formatTime(schedule.lunch.open)}-${formatTime(schedule.lunch.close)}`
      );
    }
    if (schedule.dinner) {
      parts.push(
        `${formatTime(schedule.dinner.open)}-${formatTime(schedule.dinner.close)}`
      );
    } else if (schedule.lunch) {
      parts.push(`${t("dinner")}: ${t("closed")}`);
    }
    return parts.join(" | ");
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-brand-warm-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black text-center mb-16">
            {t("title")}
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <AnimatedSection direction="left">
            <div className="rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-full min-h-[400px] bg-brand-warm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.9!2d-9.2399!3d38.7223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQzJzIwLjMiTiA5wrAxNCwyMy42Ilc!5e0!3m2!1spt-PT!2spt!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="O Churrasquinho À Guia - Mapa"
              />
            </div>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
              <OpenStatusBadge />

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-black text-sm mb-1">
                    {t("address")}
                  </p>
                  <p className="text-brand-black/70 text-sm">
                    {restaurantInfo.contact.address.full}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <FaPhone size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-black text-sm mb-1">
                    {t("phone")}
                  </p>
                  <a
                    href={`tel:${restaurantInfo.contact.phoneRaw}`}
                    className="text-brand-red hover:underline text-sm"
                  >
                    {restaurantInfo.contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-whatsapp/10 flex items-center justify-center text-whatsapp">
                  <FaWhatsapp size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-black text-sm mb-1">
                    {t("whatsapp")}
                  </p>
                  <a
                    href={
                      locale === "pt"
                        ? restaurantInfo.contact.whatsappLink
                        : restaurantInfo.contact.whatsappLinkEn
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-whatsapp hover:underline text-sm"
                  >
                    {restaurantInfo.contact.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-black text-sm mb-1">
                    {t("email")}
                  </p>
                  <a
                    href={`mailto:${restaurantInfo.contact.email}`}
                    className="text-brand-red hover:underline text-sm"
                  >
                    {restaurantInfo.contact.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="border-t border-brand-warm pt-6">
                <h3 className="font-bold text-brand-black mb-4">{t("hours")}</h3>
                <div className="space-y-2">
                  {dayKeys.map((day, i) => (
                    <div
                      key={day}
                      className="flex justify-between text-sm py-1"
                    >
                      <span className="font-medium text-brand-black/80">
                        {t(day)}
                      </span>
                      <span
                        className={
                          restaurantInfo.hours[i].lunch === null &&
                          restaurantInfo.hours[i].dinner === null
                            ? "text-brand-red"
                            : "text-brand-black/60"
                        }
                      >
                        {getScheduleText(i)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps button */}
              <a
                href={restaurantInfo.contact.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-black text-white rounded-xl font-medium hover:bg-brand-black/90 transition-colors text-sm"
              >
                {t("openInMaps")}
                <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
