"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem, MenuCategory, MenuData } from "@/types/menu";

const CATEGORIES: { key: MenuCategory; labelKey: string }[] = [
  { key: "carnes", labelKey: "carnes" },
  { key: "peixes", labelKey: "peixes" },
  { key: "sobremesas", labelKey: "sobremesas" },
];

function getLocalizedField(
  item: MenuItem,
  field: "name" | "description",
  locale: string
): string {
  if (locale === "en") {
    if (field === "name" && item.nameEn) return item.nameEn;
    if (field === "description" && item.descriptionEn) return item.descriptionEn;
  }
  return item[field];
}

export default function DailyMenu() {
  const t = useTranslations("menu");
  const locale = useLocale();
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("carnes");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data: MenuData) => {
        setMenuData(data);
        if (data.items.length > 0) {
          const firstAvailable = CATEGORIES.find((cat) =>
            data.items.some((item) => item.category === cat.key)
          );
          if (firstAvailable) setActiveCategory(firstAvailable.key);
        }
      })
      .catch(() => {
        setMenuData({ items: [], updatedAt: "" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] bg-brand-warm" />
            <div className="p-6 space-y-3">
              <div className="h-5 bg-brand-warm rounded w-3/4" />
              <div className="h-4 bg-brand-warm rounded w-full" />
              <div className="h-4 bg-brand-warm rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!menuData || menuData.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-black/50 italic">{t("empty")}</p>
      </div>
    );
  }

  const filteredItems = menuData.items.filter(
    (item) => item.category === activeCategory
  );

  const availableCategories = CATEGORIES.filter((cat) =>
    menuData.items.some((item) => item.category === cat.key)
  );

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {availableCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              activeCategory === cat.key
                ? "bg-brand-red text-white shadow-md scale-105"
                : "bg-brand-warm text-brand-black/70 hover:bg-brand-warm/80"
            }`}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={`${item.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
            >
              {item.image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={getLocalizedField(item, "name", locale)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-bold text-brand-black">
                    {getLocalizedField(item, "name", locale)}
                  </h4>
                  <span className="text-brand-red font-bold text-lg whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-brand-black/60 mt-2 leading-relaxed">
                  {getLocalizedField(item, "description", locale)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Last updated */}
      {menuData.updatedAt && (
        <p className="text-center text-brand-black/40 text-xs mt-10 italic">
          {t("lastUpdated")}:{" "}
          {new Date(menuData.updatedAt).toLocaleDateString(
            locale === "pt" ? "pt-PT" : "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </p>
      )}
    </div>
  );
}
