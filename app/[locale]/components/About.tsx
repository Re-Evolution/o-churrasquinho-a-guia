"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaCalendarAlt, FaUsers, FaFire } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { icon: FaCalendarAlt, title: t("stat1"), desc: t("stat1desc") },
    { icon: FaUsers, title: t("stat2"), desc: t("stat2desc") },
    { icon: FaFire, title: t("stat3"), desc: t("stat3desc") },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-brand-warm-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text - 60% */}
          <AnimatedSection className="lg:col-span-3" direction="left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-8">
              {t("title")}
            </h2>
            <p className="text-lg text-brand-black/80 leading-relaxed mb-6">
              {t("text1")}
            </p>
            <p className="text-lg text-brand-black/80 leading-relaxed">
              {t("text2")}
            </p>
          </AnimatedSection>

          {/* Image - 40% */}
          <AnimatedSection className="lg:col-span-2" direction="right" delay={0.2}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/frango-guia.jpg"
                alt="Frango da Guia grelhado no carvão"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-red/10 text-brand-red mb-4">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-1">
                  {stat.title}
                </h3>
                <p className="text-brand-black/60 text-sm">{stat.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
