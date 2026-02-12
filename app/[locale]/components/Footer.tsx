"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTripadvisor,
  FaGoogle,
} from "react-icons/fa";
import { restaurantInfo } from "@/data/restaurant-info";

const navItems = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "specialties", href: "#specialties" },
  { key: "reservation", href: "#reservation" },
  { key: "contact", href: "#contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: restaurantInfo.social.facebook, label: "Facebook" },
  { icon: FaInstagram, href: restaurantInfo.social.instagram, label: "Instagram" },
  {
    icon: FaTripadvisor,
    href: restaurantInfo.social.tripadvisor,
    label: "TripAdvisor",
  },
  {
    icon: FaGoogle,
    href: restaurantInfo.social.googleMaps,
    label: "Google Maps",
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-black-rich text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/images/logo-bw.png"
            alt="O Churrasquinho À Guia"
            width={180}
            height={65}
            className="h-14 w-auto"
          />
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-10">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.href)}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              {tNav(item.key)}
            </button>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-brand-red hover:text-white transition-all"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 text-center space-y-4">
          {/* Legal links */}
          <div className="flex justify-center gap-6 text-xs text-white/40">
            <a
              href={locale === "pt" ? "/pt/privacidade" : "/en/privacy"}
              className="hover:text-white/70 transition-colors"
            >
              {t("privacy")}
            </a>
            <a
              href={locale === "pt" ? "/pt/termos" : "/en/terms"}
              className="hover:text-white/70 transition-colors"
            >
              {t("terms")}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {restaurantInfo.name}.{" "}
            {t("rights")}
          </p>

          {/* Credit */}
          <p className="text-xs text-white/30">
            {t("madeWith")} ❤️ {t("by")}{" "}
            <a
              href="https://re-evolution.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/70 transition-colors"
            >
              Re-Evolution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
