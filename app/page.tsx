import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { TwoWorlds } from "@/components/sections/TwoWorlds";
import { DayDial } from "@/components/DayDial/DayDial";
import { House } from "@/components/sections/House";
import { Gallery } from "@/components/sections/Gallery";
import { Arenas } from "@/components/sections/Arenas";
import { Proof } from "@/components/sections/Proof";
import { Nearby } from "@/components/sections/Nearby";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, vacationRentalSchema } from "@/lib/schema";
import { isLive } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vacation Rental in Herradura, Costa Rica | Casa Esmeralda",
  description:
    "Brand-new 3-bedroom vacation home with a private waterfall pool in gated Arenas, Herradura, Costa Rica. 5 minutes from the beach. Check your dates.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Vacation Rental in Herradura, Costa Rica | Casa Esmeralda",
    description:
      "Brand-new 3-bedroom vacation home with a private waterfall pool in gated Arenas, Herradura, Costa Rica. 5 minutes from the beach. Check your dates.",
  },
  twitter: {
    title: "Vacation Rental in Herradura, Costa Rica | Casa Esmeralda",
    description:
      "Brand-new 3-bedroom vacation home with a private waterfall pool in gated Arenas, Herradura, Costa Rica. 5 minutes from the beach. Check your dates.",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={vacationRentalSchema()} />
      <JsonLd data={faqSchema()} />
      <a href="#main" className="sr-only z-50 rounded-full bg-accent px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <span id="top" tabIndex={-1} className="sr-only" />
      <Nav />
      <main id="main">
        <Hero />
        <TwoWorlds />
        <DayDial />
        <House />
        <Gallery />
        <Arenas />
        <Proof />
        <Nearby />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer showConcept={!isLive} />
      <MobileBar />
      <BackToTop />
    </>
  );
}
