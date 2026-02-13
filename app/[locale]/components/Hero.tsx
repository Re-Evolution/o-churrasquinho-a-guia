"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background image */}
      <Image
        src="/images/sala-interior.jpg"
        alt="O Churrasquinho À Guia - Sala Interior"
        fill
        className="object-cover brightness-100 contrast-110"
        priority
        quality={100}
        sizes="100vw"
      />
      {/* Gradient overlay - lighter, warmer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("#reservation")}
              className="px-8 py-4 btn-gradient text-white font-semibold rounded-xl text-lg shadow-lg"
            >
              {t("cta")}
            </button>
            <button
              onClick={() => scrollTo("#specialties")}
              className="px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-xl text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              {t("ctaSecondary")}
            </button>
          </div>
        </motion.div>

      </div>

      {/* Brick wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="brick-pattern"
              width="106"
              height="68"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="30" fill="var(--color-brand-warm-light)" />
              <rect x="53" y="34" width="100" height="30" fill="var(--color-brand-warm-light)" />
              <rect x="-53" y="34" width="100" height="30" fill="var(--color-brand-warm-light)" />
            </pattern>
          </defs>
          <path
            d="M0 60C240 20 480 0 720 40C960 80 1200 100 1440 60V120H0V60Z"
            fill="url(#brick-pattern)"
          />
          <rect y="96" width="1440" height="24" fill="var(--color-brand-warm-light)" />
        </svg>
      </div>
    </section>
  );
}
