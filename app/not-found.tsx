import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { NotFoundCopy } from "@/components/sections/NotFoundCopy";
import { isLive } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | Casa Esmeralda",
  description: "This page does not exist. Head back to Casa Esmeralda Ridge, a vacation rental with a private pool in Herradura, Costa Rica.",
  robots: { index: false, follow: true },
};

// A real 404 (Next returns the 404 status for not-found).
export default function NotFound() {
  return (
    <>
      <Nav solid onHome={false} />
      <main id="main" className="relative flex min-h-[80svh] items-center overflow-hidden pb-20 pt-32">
        <div className="container-x grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <NotFoundCopy />
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-[20px]">
            <Image src="/images/38-area-rainforest-tram-gondola.webp" alt="Open green gondola car in the rainforest canopy" fill sizes="340px" className="object-cover" />
          </div>
        </div>
      </main>
      <Footer showConcept={!isLive} onHome={false} />
    </>
  );
}
