import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { ContactPage } from "@/components/sections/ContactPage";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { isLive } from "@/lib/site";

const title = "Contact Casa Esmeralda | Vacation Rental in Herradura";
const description =
  "Plan your stay at Casa Esmeralda Ridge in Herradura, Costa Rica. Send your dates and group size to Melina, or book instantly on Airbnb.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title, description },
  twitter: { title, description },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbSchema()} />
      <a href="#main" className="sr-only z-50 rounded-full bg-accent px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <span id="top" tabIndex={-1} className="sr-only" />
      <Nav solid onHome={false} />
      <main id="main">
        <ContactPage />
        <FinalCta />
      </main>
      <Footer showConcept={!isLive} onHome={false} />
      <MobileBar />
      <BackToTop />
    </>
  );
}
