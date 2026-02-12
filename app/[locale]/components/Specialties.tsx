"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";
import DailyMenu from "./DailyMenu";

export default function Specialties() {
  const t = useTranslations("specialties");

  return (
    <section id="specialties" className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black text-center mb-16">
            {t("title")}
          </h2>
        </AnimatedSection>

        {/* Signature dish - Frango da Guia */}
        <AnimatedSection direction="up" className="max-w-2xl mx-auto mb-16">
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <Image
                src="/images/frango-guia.jpg"
                alt="Frango da Guia"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 672px"
              />
              <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <FaStar size={10} />
                {t("frangoGuiaBadge")}
              </div>
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-brand-black mb-3 inline-flex items-center gap-2">
                {t("frangoGuia")} <FaStar className="text-yellow-400" size={20} />
              </h3>
              <p className="text-brand-black/70 leading-relaxed mb-4">
                {t("frangoGuiaDesc")}
              </p>
              <p className="text-2xl font-bold text-brand-red">
                {t("frangoGuiaPrice")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Daily Menu */}
        <AnimatedSection delay={0.2}>
          <h3 className="text-2xl sm:text-3xl font-bold text-brand-black text-center mb-8">
            {t("menuTitle")}
          </h3>
          <DailyMenu />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="text-center text-brand-black/60 mt-12 text-sm italic max-w-xl mx-auto">
            {t("note")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
