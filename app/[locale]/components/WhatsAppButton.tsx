"use client";

import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { restaurantInfo } from "@/data/restaurant-info";

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const locale = useLocale();

  return (
    <motion.a
      href={
        locale === "pt"
          ? restaurantInfo.contact.whatsappLink
          : restaurantInfo.contact.whatsappLinkEn
      }
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-whatsapp text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      aria-label={`WhatsApp - ${t("label")}`}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
      >
        <FaWhatsapp size={24} />
      </motion.div>
      <span className="font-semibold text-sm hidden sm:inline">
        {t("label")}
      </span>
    </motion.a>
  );
}
