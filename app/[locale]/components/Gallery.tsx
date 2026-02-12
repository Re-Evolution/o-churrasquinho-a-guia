"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import AnimatedSection from "./AnimatedSection";
import { restaurantInfo } from "@/data/restaurant-info";

const galleryMeta = [
  { titleKey: "interior" as const, descKey: "interiorDesc" as const },
  { titleKey: "esplanada" as const, descKey: "esplanadaDesc" as const },
  { titleKey: "frango" as const, descKey: "frangoDesc" as const },
];

export default function Gallery() {
  const t = useTranslations("gallery");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = restaurantInfo.gallery;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black text-center mb-16">
            {t("title")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={item.id} delay={0.1 * i}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-full"
              >
                <Image
                  src={item.src}
                  alt={t(galleryMeta[i].titleKey)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-bold text-lg">
                    {t(galleryMeta[i].titleKey)}
                  </p>
                  <p className="text-white/80 text-sm">
                    {t(galleryMeta[i].descKey)}
                  </p>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[85vh] aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[lightbox].src}
                alt={t(galleryMeta[lightbox].titleKey)}
                fill
                className="object-contain rounded-xl"
                sizes="90vw"
                quality={90}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <p className="text-white font-bold text-xl">
                  {t(galleryMeta[lightbox].titleKey)}
                </p>
                <p className="text-white/80">
                  {t(galleryMeta[lightbox].descKey)}
                </p>
              </div>
            </motion.div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 rounded-full p-3 transition-colors"
              aria-label={t("close")}
            >
              <HiX size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
