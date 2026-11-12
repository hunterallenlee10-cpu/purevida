// Structured data. Only true things: no aggregateRating or review markup (the reviews belong to Airbnb),
// no prices, no telephone until the WhatsApp number is confirmed, no geo or street address yet.
import { business } from "./business";
import { copy } from "./copy";
import { photo, src } from "./gallery";
import { absolute, siteUrl } from "./site";

const amenity = (name: string) => ({ "@type": "LocationFeatureSpecification", name, value: true });

export function vacationRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${siteUrl}/#rental`,
    identifier: "casa-esmeralda-ridge",
    name: business.name,
    url: absolute("/"),
    description:
      "Brand-new three-bedroom vacation home with a private waterfall pool inside the gated Arenas community in Herradura, Costa Rica. About 5 minutes from the beach, near Jacó and Los Sueños. Sleeps 6.",
    image: ["01", "04", "05", "13"].map((id) => absolute(src(photo(id)))),
    brand: { "@type": "Organization", name: business.brand, sameAs: [business.links.instagram] },
    address: {
      "@type": "PostalAddress",
      addressLocality: business.location.town,
      addressRegion: business.location.province,
      addressCountry: business.location.countryCode,
    },
    checkinTime: business.stay.checkInTime24,
    checkoutTime: business.stay.checkOutTime24,
    knowsLanguage: [...business.host.languageCodes],
    containsPlace: {
      "@type": "Accommodation",
      additionalType: "EntirePlace",
      numberOfBedrooms: business.home.bedrooms,
      numberOfBathroomsTotal: business.home.bathrooms,
      occupancy: { "@type": "QuantitativeValue", maxValue: business.home.guests },
      bed: [
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "King" },
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Bunk bed" },
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Queen" },
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Sofa bed" },
      ],
      amenityFeature: [
        amenity("pool"),
        amenity("outdoorGrill"),
        amenity("kitchen"),
        amenity("ovenStove"),
        amenity("wifi"),
        amenity("tv"),
        amenity("washerDryer"),
        amenity("freeParking"),
        amenity("evCharger"),
        amenity("selfCheckinCheckout"),
        amenity("gymFitnessEquipment"),
        // DRAFT: wall AC units are visible in the bedroom photos. Confirm AC in every bedroom.
        amenity("ac"),
        amenity("Dedicated workspace"),
        amenity("Smoke alarm"),
        amenity("Carbon monoxide alarm"),
      ],
    },
    sameAs: [business.links.airbnb, business.links.instagram],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.en.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: "Contact", item: absolute("/contact") },
    ],
  };
}
