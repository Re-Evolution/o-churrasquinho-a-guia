"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "specialties", href: "#specialties" },
  { key: "testimonials", href: "#testimonials" },
  { key: "gallery", href: "#gallery" },
  { key: "contact", href: "#contact" },
  { key: "reservation", href: "#reservation" },
];

export default function Header() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black-rich/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button onClick={() => scrollTo("#hero")} className="flex-shrink-0">
          <Image
            src="/images/logo-bw.png"
            alt="O Churrasquinho À Guia"
            width={140}
            height={50}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.href)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.key === "reservation"
                  ? "btn-gradient text-white"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {t(item.key)}
            </button>
          ))}
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white p-2"
            aria-label="Menu"
          >
            {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-brand-black-rich/95 backdrop-blur-md border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.href)}
                className={`px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                  item.key === "reservation"
                    ? "btn-gradient text-white mt-2"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
