// Every business fact on the site comes from here. Source: the Airbnb listing and the host's Instagram, November 2026.
// Nothing here may be invented. Anything assumed carries a DRAFT comment.

export const business = {
  name: "Casa Esmeralda Ridge",
  shortName: "Casa Esmeralda",
  brand: "Pura Vida Sloth Escapes",
  bioLine: ["Pool", "Nature", "Sloths", "Adventure"],

  host: {
    name: "Melina",
    coHosts: ["Kattia", "Jason", "Marlon"],
    languages: ["English", "Spanish", "Portuguese"],
    languageCodes: ["en", "es", "pt"],
    responseRate: "100%",
    responseTime: "within an hour",
  },

  location: {
    community: "Arenas",
    town: "Herradura",
    beach: "Playa Herradura",
    canton: "Garabito",
    province: "Puntarenas",
    country: "Costa Rica",
    countryCode: "CR",
    nearby: ["Herradura", "Parque de Herradura", "Los Sueños", "Jacó"],
    beachMinutes: 5,
    // DRAFT: airport drive times are not stated by the host. Do not publish until confirmed.
    airportDriveTime: "",
  },

  home: {
    guests: 6,
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    bedLayout: [
      { room: "Bedroom 1", bed: "King bed", key: "king" },
      { room: "Bedroom 2", bed: "Bunk bed", key: "bunk" },
      { room: "Bedroom 3", bed: "Queen bed", key: "queen" },
      { room: "Living room", bed: "Sofa bed", key: "sofa" },
    ],
    // DRAFT: wall AC units are visible in the bedroom photos. Confirm AC in every bedroom.
    acInBedrooms: true,
  },

  stay: {
    checkIn: "12:00 PM",
    checkOut: "12:00 PM",
    checkInTime24: "12:00",
    checkOutTime24: "12:00",
    selfCheckIn: "smart lock",
    longStayNights: 6,
    meterDeposit: "$200",
    electricity: "about 90 colones per kWh for the first 200 kWh and 143 colones after",
    // DRAFT: a guest review says "pets are allowed". Confirm pet policy and any fee.
    petsAllowed: null as boolean | null,
  },

  rating: {
    score: "5.0",
    reviews: 7,
    asOf: "November 2026",
    badges: ["Guest favorite", "Top 10% of homes"],
    categories: {
      cleanliness: "5.0",
      accuracy: "5.0",
      checkIn: "4.9",
      communication: "5.0",
      location: "5.0",
      value: "5.0",
    },
  },

  links: {
    airbnb: "https://www.airbnb.com/h/casaesmeraldaridge",
    instagram: "https://www.instagram.com/puravidaslothescapes/",
    instagramHandle: "@puravidaslothescapes",
  },

  // DRAFT: get Melina's WhatsApp number. Store digits only, with or without the 506 country code.
  // While this is empty, every "Message" action opens the Airbnb listing instead.
  whatsapp: "",
} as const;

export type Business = typeof business;
