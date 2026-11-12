// Photo map. Every image on the site is a real photo from the home's own Airbnb listing.
// Alt text and captions are written from the photo map's "What it shows" column.
// DRAFT: confirm permission to reuse Arenas community photos (23 to 36). They appear on the listing but may belong to the Arenas developer.
import dims from "./photo-dims.json";

export type Category = "inside" | "outdoor" | "arenas" | "nearby";
type L = { en: string; es: string };

export type Photo = {
  id: string;
  file: string;
  width: number;
  height: number;
  category: Category;
  alt: L;
  inGallery: boolean;
};

const raw: [string, Category, string, string, boolean?][] = [
  ["01-private-pool-waterfall-sunset-BEST", "outdoor", "The private pool at dusk, a stone waterfall spilling into lit turquoise water in front of a green living wall", "La piscina privada al atardecer, con una cascada de piedra sobre el agua turquesa iluminada frente a un muro verde"],
  ["02-pool-deck-grill-dusk", "outdoor", "Pool deck at dusk with the gas grill, the waterfall and the lit green wall behind", "La terraza de la piscina al atardecer con la parrilla de gas, la cascada y el muro verde iluminado"],
  ["03-poolside-dining-table-day", "outdoor", "Glass outdoor table for six with potted palms beside the pool in daylight", "Mesa exterior de vidrio para seis con palmas en maceta junto a la piscina de día"],
  ["04-FRONT-of-house-covered-porch-dusk", "outdoor", "Front of Casa Esmeralda at dusk, a covered porch with a wood ceiling, stone column and warm wall lights", "El frente de Casa Esmeralda al atardecer, un porche techado con cielo de madera, columna de piedra y luces cálidas"],
  ["05-dining-room-looking-out-to-pool", "inside", "Dining table for six with glass sliders open onto the pool and green wall at dusk", "Comedor para seis con puertas de vidrio abiertas hacia la piscina y el muro verde al atardecer"],
  ["06-kitchen-island-through-to-pool", "inside", "Long view from the kitchen island with green stools through to the pool doors", "Vista desde la isla de la cocina con bancos verdes hasta las puertas de la piscina"],
  ["07-kitchen-island-full", "inside", "Kitchen island with three green stools and a stainless fridge", "Isla de cocina con tres bancos verdes y refrigeradora de acero"],
  ["08-kitchen-sink-dishwasher", "inside", "Quartz counter with a double sink, dishwasher and wood cabinets", "Encimera de cuarzo con fregadero doble, lavaplatos y gabinetes de madera"],
  ["09-kitchen-counter-coffee-airfryer", "inside", "Corner counter with a coffee maker and air fryer against white subway tile", "Esquina de la cocina con cafetera y freidora de aire sobre azulejo blanco"],
  ["10-kitchen-range-oven", "inside", "Stainless range and oven with a hood and a fruit bowl", "Cocina y horno de acero con campana y frutero"],
  ["11-living-room-sectional-macaw-art", "inside", "Cream sectional with green pillows, a round coffee table and a framed scarlet macaw painting", "Sofá seccional crema con cojines verdes, mesa de centro redonda y un cuadro de lapa roja"],
  ["12-living-room-tv-wall", "inside", "Living area with the wall-mounted TV and a view to the dining room and hall", "Sala con el televisor en la pared y vista al comedor y al pasillo"],
  ["13-bedroom-1-king", "inside", "Bedroom 1 with a king bed, rattan pendants, a ceiling fan and a wall AC unit", "Dormitorio 1 con cama king, lámparas de ratán, abanico de techo y aire acondicionado"],
  ["14-bedroom-1-king-pool-view", "inside", "King bed with sliding doors out to the grill and pool", "Cama king con puertas corredizas hacia la parrilla y la piscina"],
  ["15-bedroom-2-bunk-reading-chair", "inside", "Bedroom 2 with a wood bunk bed, a cream reading chair and a floor lamp", "Dormitorio 2 con camarote de madera, sillón de lectura crema y lámpara de pie"],
  ["16-bedroom-2-bunk-bed", "inside", "The bunk bed straight on, with a ceiling fan and wall AC unit", "El camarote de frente, con abanico de techo y aire acondicionado"],
  ["17-bedroom-2-reading-corner", "inside", "Reading chair with a lamp and a green throw", "Sillón de lectura con lámpara y manta verde"],
  ["18-bedroom-3-queen", "inside", "Bedroom 3 with a queen bed, sage throw and wood wardrobe", "Dormitorio 3 con cama queen, manta verde salvia y ropero de madera"],
  ["19-bedroom-3-queen-art", "inside", "Queen bed with framed tropical art above", "Cama queen con un cuadro tropical encima"],
  ["20-bathroom-walk-in-shower-arch-mirror", "inside", "Bathroom with a walk-in glass shower, vessel sink, arched mirror and wood vanity", "Baño con ducha de vidrio, lavamanos de sobreponer, espejo en arco y mueble de madera"],
  ["21-bathroom-2-hanging-plant", "inside", "Second bathroom with a grey tile shower, round vessel sink and a hanging plant", "Segundo baño con ducha de azulejo gris, lavamanos redondo y una planta colgante"],
  ["22-laundry-washer-dryer", "inside", "Stacked washer and dryer in a closet", "Lavadora y secadora apiladas en un clóset"],
  ["23-ARENAS-entrance-sign-mountains", "arenas", "The Arenas condominium entrance sign under green mountains", "El rótulo de entrada del condominio Arenas bajo montañas verdes"],
  ["24-arenas-aerial-pools-tennis", "arenas", "Drone view of Arenas with two free-form shared pools, a tennis court and gazebos", "Vista aérea de Arenas con dos piscinas compartidas, cancha de tenis y ranchos"],
  ["25-arenas-shared-pool-loungers", "arenas", "Arenas shared pool with loungers and jungle hills", "Piscina compartida de Arenas con camastros y cerros de selva"],
  ["26-arenas-shared-pool-wide", "arenas", "Wide view of the free-form shared pool and homes in Arenas", "Vista amplia de la piscina compartida y las casas de Arenas"],
  ["27-arenas-pool-umbrellas", "arenas", "Shared pool with big umbrellas and lawn", "Piscina compartida con sombrillas grandes y zacate"],
  ["28-arenas-coworking-building", "arenas", "Glass coworking clubhouse with BIENVENIDOS and COWORKING on the windows", "Edificio de coworking de vidrio con BIENVENIDOS y COWORKING en las ventanas"],
  ["29-arenas-coworking-interior", "arenas", "Coworking desks facing floor-to-ceiling windows", "Escritorios de coworking frente a ventanales de piso a techo"],
  ["30-arenas-gym-windows", "arenas", "Community gym with treadmills and ellipticals facing the lawn", "Gimnasio del condominio con caminadoras y elípticas frente al zacate"],
  ["31-arenas-gym-cardio", "arenas", "Cardio machines in front of a window wall", "Máquinas de cardio frente a un ventanal"],
  ["32-arenas-gym-weights", "arenas", "Weight machine and dumbbells in the gym", "Máquina de pesas y mancuernas en el gimnasio"],
  ["33-arenas-playground", "arenas", "Children's playground with slides", "Play infantil con toboganes"],
  ["34-arenas-basketball-court-hills", "arenas", "Basketball court with the tennis court and jungle hills behind", "Cancha de baloncesto con la de tenis y cerros de selva detrás"],
  ["35-arenas-tennis-court", "arenas", "Tennis court bordered by hedges", "Cancha de tenis rodeada de setos"],
  ["36-arenas-mini-golf-green", "arenas", "Landscaped green with a putting area", "Área verde con zona de putting"],
  ["37-area-scarlet-macaw-in-trees", "nearby", "A scarlet macaw in the treetops", "Una lapa roja en las copas de los árboles"],
  ["38-area-rainforest-tram-gondola", "nearby", "Open green gondola car in the rainforest canopy", "Góndola verde abierta en el dosel del bosque"],
  ["39-area-beach-palm-shade", "nearby", "Beach under a palm frond with surf", "Playa bajo una hoja de palma con olas"],
  ["40-area-pacific-sunset-beach", "nearby", "Pacific sunset on a dark sand beach", "Atardecer en el Pacífico sobre una playa de arena oscura"],
  // Do not use as content: mostly empty sky.
  ["41-area-blue-sky-paraglider", "nearby", "Blue sky with a distant paraglider", "Cielo azul con un parapentista a lo lejos", false],
];

const dimMap = dims as Record<string, { w: number; h: number }>;

export const photos: Photo[] = raw.map(([file, category, en, es, inGallery = true]) => ({
  id: file.slice(0, 2),
  file,
  width: dimMap[file].w,
  height: dimMap[file].h,
  category,
  alt: { en, es },
  inGallery,
}));

const byId = new Map(photos.map((p) => [p.id, p]));

/** Look up a photo by its two-digit number, e.g. photo("05"). */
export function photo(id: string): Photo {
  const p = byId.get(id);
  if (!p) throw new Error(`Unknown photo ${id}`);
  return p;
}

export const src = (p: Photo) => `/images/${p.file}.webp`;

export const galleryPhotos = photos.filter((p) => p.inGallery);

export const filters: { key: "all" | Category; en: string; es: string }[] = [
  { key: "all", en: "All", es: "Todo" },
  { key: "inside", en: "Inside", es: "Adentro" },
  { key: "outdoor", en: "Pool and outdoor", es: "Piscina y exterior" },
  { key: "arenas", en: "Arenas", es: "Arenas" },
  { key: "nearby", en: "Nearby", es: "Alrededores" },
];
