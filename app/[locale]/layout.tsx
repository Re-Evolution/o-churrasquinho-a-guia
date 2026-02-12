import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import SchemaMarkup from "./components/SchemaMarkup";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://franguinhoaguia.pt"),
  title: "O Churrasquinho À Guia | Frango da Guia Autêntico em Carnaxide desde 1999",
  description:
    "Restaurante tradicional português em Carnaxide. Especialistas em Frango da Guia grelhado no carvão há 25 anos. Preços honestos, sabor autêntico. Reserve já!",
  keywords: [
    "frango da guia carnaxide",
    "restaurante carnaxide",
    "grelhados carnaxide",
    "frango da guia lisboa",
    "restaurante oeiras",
    "melhor frango carnaxide",
    "restaurante tradicional português",
  ],
  openGraph: {
    title: "O Churrasquinho À Guia | Frango da Guia Autêntico em Carnaxide",
    description:
      "Desde 1999 em Carnaxide. O autêntico Frango da Guia grelhado no carvão. Preços honestos, sabor que conquista.",
    url: "https://franguinhoaguia.pt",
    siteName: "O Churrasquinho À Guia",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/images/frango-guia.jpg",
        width: 1200,
        height: 630,
        alt: "Frango da Guia grelhado no carvão - O Churrasquinho À Guia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O Churrasquinho À Guia | Frango da Guia em Carnaxide",
    description:
      "O autêntico Frango da Guia grelhado no carvão há 25 anos. Carnaxide, Grande Lisboa.",
    images: ["/images/frango-guia.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/logo-bw.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://franguinhoaguia.pt",
    languages: {
      "pt-PT": "https://franguinhoaguia.pt/pt",
      "en": "https://franguinhoaguia.pt/en",
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <SchemaMarkup />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
