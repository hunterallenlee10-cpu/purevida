"use client";

import Image from "next/image";
import { useLang } from "@/components/providers/LanguageProvider";
import { CheckDatesButton } from "@/components/ui/CheckDatesButton";
import { AirbnbLink } from "@/components/ui/AirbnbLink";
import { photo, src } from "@/lib/gallery";

// Real photo 01, contained in a wide arch (max 1200px, never stretched past its 1448px width), darkened 35%.
export function FinalCta() {
  const { t, lang } = useLang();
  const pool = photo("01");
  return (
    <section aria-labelledby="final-title" className="pb-20 pt-4 lg:pb-28">
      <div className="container-x">
        <div className="arch mx-auto max-w-[1200px]">
          <div className="arch-inner">
            <div className="relative flex min-h-[520px] items-end justify-center sm:aspect-[16/9] sm:min-h-0 sm:items-center">
              <Image
                src={src(pool)}
                alt={pool.alt[lang]}
                fill
                sizes="(min-width: 1280px) 1184px, 100vw"
                className="object-cover object-[60%_60%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[rgba(19,41,31,0.35)]" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(19,41,31,0.6)] to-transparent sm:hidden" />
              <div className="on-dark relative px-6 pb-12 pt-40 text-center text-limestone sm:pb-0 sm:pt-24">
                <h2 id="final-title" className="mx-auto max-w-[16ch] font-display text-[clamp(2.25rem,1.4rem+3.4vw,4.25rem)] leading-[1.02] tracking-[-0.015em]">
                  {t.final.title}
                </h2>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <CheckDatesButton />
                  <AirbnbLink className="btn btn-ghost-light" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
