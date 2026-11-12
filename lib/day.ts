// "A Day at Casa Esmeralda": six stops, every photo the real house (stop 3 is the Arenas shared pool).
// Tints stay in the limestone family so the accent keeps at least 4.5:1 on every light stop. Night flips to jungle.
export type TripType = "family" | "friends" | "couple" | "remote";

export type DayStop = {
  key: string;
  time: string;
  photo: string;
  tint: string;
  dark: boolean;
  trip: TripType;
  name: { en: string; es: string };
  line: { en: string; es: string };
};

export const dayStops: DayStop[] = [
  {
    key: "morning",
    time: "7:00",
    photo: "09",
    tint: "#FBF8F1",
    dark: false,
    trip: "family",
    name: { en: "Morning", es: "Mañana" },
    line: {
      en: "Coffee on, birds already loud. Wake up to the sounds of tropical birds.",
      es: "El café listo y los pájaros ya cantando. Despierten con el sonido de las aves tropicales.",
    },
  },
  {
    key: "midday",
    time: "12:00",
    photo: "03",
    tint: "#F8F2E6",
    dark: false,
    trip: "family",
    name: { en: "Midday", es: "Mediodía" },
    line: {
      en: "Lunch by your own pool. Where every meal comes with a view.",
      es: "Almuerzo junto a su propia piscina. Donde cada comida viene con vista.",
    },
  },
  {
    key: "afternoon",
    time: "15:00",
    photo: "25",
    tint: "#F5EFE4",
    dark: false,
    trip: "family",
    name: { en: "Afternoon", es: "Tarde" },
    line: {
      en: "Kids at the big pool, parents on the loungers. That's Arenas.",
      es: "Los chiquitos en la piscina grande, los papás en los camastros. Eso es Arenas.",
    },
  },
  {
    key: "golden",
    time: "17:30",
    photo: "05",
    tint: "#F5EDDF",
    dark: false,
    trip: "friends",
    name: { en: "Golden hour", es: "Hora dorada" },
    line: {
      en: "Doors open, the house turns into one big room.",
      es: "Puertas abiertas, y la casa se vuelve un solo espacio grande.",
    },
  },
  {
    key: "sunset",
    time: "18:00",
    photo: "02",
    tint: "#F4EBDC",
    dark: false,
    trip: "friends",
    name: { en: "Sunset", es: "Atardecer" },
    line: {
      en: "Grill lit, waterfall on. Cook. Gather. Relax.",
      es: "La parrilla encendida y la cascada corriendo. Cocinen. Compartan. Relájense.",
    },
  },
  {
    key: "night",
    time: "21:00",
    photo: "14",
    tint: "#1E3B2F",
    dark: true,
    trip: "couple",
    name: { en: "Night", es: "Noche" },
    line: {
      en: "Fall asleep looking at the pool.",
      es: "Duérmanse viendo la piscina.",
    },
  },
];

export const SUNSET_INDEX = 4;
