import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { Hero } from "@/components/sections/Hero";
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
};

export default function HomePage() {
  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-full bg-accent px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <span id="top" tabIndex={-1} className="sr-only" />
      <Nav />
      <main id="main">
        <Hero />
        <div className="h-[60vh]" />
      </main>
      <Footer showConcept={!isLive} />
      <MobileBar />
      <BackToTop />
    </>
  );
}
