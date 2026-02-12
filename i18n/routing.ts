import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  pathnames: {
    "/": "/",
    "/privacidade": {
      pt: "/privacidade",
      en: "/privacy",
    },
    "/termos": {
      pt: "/termos",
      en: "/terms",
    },
  },
});
