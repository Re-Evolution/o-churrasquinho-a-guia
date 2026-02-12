"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { isOpenNow } from "@/data/restaurant-info";

export default function OpenStatusBadge() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<{ isOpen: boolean; nextChange: string }>({
    isOpen: false,
    nextChange: "",
  });

  useEffect(() => {
    setStatus(isOpenNow());
    const interval = setInterval(() => setStatus(isOpenNow()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
        status.isOpen
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          status.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />
      {status.isOpen ? t("openNow") : t("closedNow")}
    </div>
  );
}
