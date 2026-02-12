"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "pt" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
      <button
        onClick={() => switchLocale("pt")}
        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
          locale === "pt"
            ? "bg-white text-brand-black"
            : "text-white/70 hover:text-white"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
          locale === "en"
            ? "bg-white text-brand-black"
            : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
