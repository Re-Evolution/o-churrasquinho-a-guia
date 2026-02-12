export const restaurantInfo = {
  name: "O Churrasquinho À Guia",
  tagline: "Tradição Algarvia em Carnaxide desde 1999",
  foundedYear: 1999,
  yearsOpen: new Date().getFullYear() - 1999,

  contact: {
    address: {
      street: "Av. de Portugal, Lote 6 - Loja 4",
      postalCode: "2790-129",
      city: "Carnaxide",
      country: "Portugal",
      full: "Av. de Portugal, Lote 6 - Loja 4, 2790-129 Carnaxide, Portugal",
    },
    phone: "+351 214 173 513",
    phoneRaw: "+351214173513",
    whatsapp: "+351 969 063 633",
    whatsappRaw: "351969063633",
    whatsappLink:
      "https://wa.me/351969063633?text=Olá! Gostaria de reservar mesa.",
    whatsappLinkEn:
      "https://wa.me/351969063633?text=Hello! I would like to book a table.",
    email: "ochurrasquinhoaguia@gmail.com",
    googleMapsLink: "https://maps.app.goo.gl/aQAcdh5giZGcxeFr7",
    coordinates: {
      lat: 38.7223,
      lng: -9.2399,
    },
  },

  capacity: {
    interior: 80,
    esplanada: 30,
    total: 110,
  },

  hours: [
    {
      day: "monday",
      lunch: { open: "12:30", close: "15:00" },
      dinner: { open: "19:30", close: "22:00" },
    },
    {
      day: "tuesday",
      lunch: { open: "12:30", close: "15:00" },
      dinner: null,
    },
    {
      day: "wednesday",
      lunch: { open: "12:30", close: "15:00" },
      dinner: { open: "19:30", close: "22:00" },
    },
    {
      day: "thursday",
      lunch: { open: "12:30", close: "15:00" },
      dinner: { open: "19:30", close: "22:00" },
    },
    {
      day: "friday",
      lunch: { open: "12:30", close: "15:00" },
      dinner: { open: "19:30", close: "22:00" },
    },
    {
      day: "saturday",
      lunch: { open: "12:30", close: "15:00" },
      dinner: { open: "19:30", close: "22:00" },
    },
    {
      day: "sunday",
      lunch: null,
      dinner: null,
    },
  ],

  specialties: [
    {
      id: "frango-guia",
      price: "13,50 €",
      highlight: true,
      image: "/images/frango-guia.jpg",
    },
  ],

  testimonials: [
    {
      id: 1,
      author: "Miguel Rito",
      rating: 5,
      dateKey: "testimonial1Date",
    },
    {
      id: 2,
      author: "Bruno Silva",
      rating: 5,
      dateKey: "testimonial2Date",
    },
    {
      id: 3,
      author: "Fabricio Almeida",
      rating: 5,
      dateKey: "testimonial3Date",
    },
    {
      id: 4,
      author: "Aquiles Coelho",
      rating: 5,
      dateKey: "testimonial4Date",
    },
    {
      id: 5,
      author: "FCONAZA",
      rating: 5,
      dateKey: "testimonial5Date",
    },
  ],

  gallery: [
    {
      id: "sala-interior",
      src: "/images/sala-interior.jpg",
      captionKey: "galleryInterior",
    },
    {
      id: "esplanada",
      src: "/images/esplanada.jpg",
      captionKey: "galleryEsplanada",
    },
    {
      id: "frango-guia",
      src: "/images/frango-guia.jpg",
      captionKey: "galleryFrango",
    },
  ],

  social: {
    facebook: "https://facebook.com/ochurrasquinhoaguia",
    instagram: "https://instagram.com/ochurrasquinhoaguia",
    tripadvisor: "https://tripadvisor.com/ochurrasquinhoaguia",
    googleMaps: "https://maps.app.goo.gl/aQAcdh5giZGcxeFr7",
  },

  seo: {
    url: "https://franguinhoaguia.pt",
    ogImage: "/images/frango-guia.jpg",
  },
};

export function isOpenNow(): { isOpen: boolean; nextChange: string } {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayMap = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const currentDay = dayMap[dayIndex];
  const schedule = restaurantInfo.hours.find((h) => h.day === currentDay);

  if (!schedule) return { isOpen: false, nextChange: "" };

  const currentTime =
    now.getHours() * 60 + now.getMinutes();

  const parseTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  if (schedule.lunch) {
    const lunchOpen = parseTime(schedule.lunch.open);
    const lunchClose = parseTime(schedule.lunch.close);
    if (currentTime >= lunchOpen && currentTime < lunchClose) {
      return { isOpen: true, nextChange: schedule.lunch.close };
    }
  }

  if (schedule.dinner) {
    const dinnerOpen = parseTime(schedule.dinner.open);
    const dinnerClose = parseTime(schedule.dinner.close);
    if (currentTime >= dinnerOpen && currentTime < dinnerClose) {
      return { isOpen: true, nextChange: schedule.dinner.close };
    }
  }

  return { isOpen: false, nextChange: "" };
}
