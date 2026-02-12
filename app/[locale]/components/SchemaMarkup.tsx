import { restaurantInfo } from "@/data/restaurant-info";

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurantInfo.name,
    image: [
      `${restaurantInfo.seo.url}/images/frango-guia.jpg`,
      `${restaurantInfo.seo.url}/images/sala-interior.jpg`,
      `${restaurantInfo.seo.url}/images/esplanada.jpg`,
    ],
    url: restaurantInfo.seo.url,
    telephone: restaurantInfo.contact.phone,
    email: restaurantInfo.contact.email,
    servesCuisine: "Portuguese",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurantInfo.contact.address.street,
      addressLocality: restaurantInfo.contact.address.city,
      postalCode: restaurantInfo.contact.address.postalCode,
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurantInfo.contact.coordinates.lat,
      longitude: restaurantInfo.contact.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "12:30",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "19:30",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "12:30",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "12:30",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "19:30",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Especialidades",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Frango da Guia",
            description:
              "Frango marinado com a receita tradicional do Algarve, grelhado lentamente no carvão.",
            offers: {
              "@type": "Offer",
              price: "13.50",
              priceCurrency: "EUR",
            },
          },
        ],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
