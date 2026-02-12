"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { restaurantInfo } from "@/data/restaurant-info";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const items = restaurantInfo.testimonials;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-brand-warm-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black text-center mb-16">
            {t("title")}
          </h2>
        </AnimatedSection>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial card */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-lg">
                    {items[current].author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-brand-black">
                      {items[current].author}
                    </p>
                    <p className="text-xs text-brand-black/50">
                      {t(`testimonial${items[current].id}Date` as "testimonial1Date")}
                    </p>
                  </div>
                  <FcGoogle size={24} className="ml-auto" />
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(items[current].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" size={16} />
                  ))}
                </div>

                <p className="text-brand-black/80 leading-relaxed text-base sm:text-lg">
                  &ldquo;{t(`testimonial${items[current].id}` as "testimonial1")}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow text-brand-black/60 hover:text-brand-red"
              aria-label="Previous"
            >
              <FaChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-brand-red" : "bg-brand-black/20"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow text-brand-black/60 hover:text-brand-red"
              aria-label="Next"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
