"use client";

import Image from "next/image";
import { useLang } from "@/components/providers/LanguageProvider";
import { CheckDatesButton } from "@/components/ui/CheckDatesButton";
import { AirbnbLink } from "@/components/ui/AirbnbLink";
import { BioLine } from "@/components/ui/BioLine";
import { Arch } from "@/components/ui/Arch";
import { HeroVideo } from "./HeroVideo";
import { photo, src } from "@/lib/gallery";

export function Hero() {
  const { t, lang } = useLang();
  const side = photo("05");

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex h-[100svh] min-h-[640px] max-h-[920px] flex-col overflow-hidden bg-jungle text-limestone"
    >
      {/* AI-generated visual (Higgsfield), approved by Hunter. Swap for real footage when the owner supplies it.
          Poster and reduced-motion still: the 4K upscale of the home's own pool photo 01. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/media/generated/gen-03-hero-pool-waterfall-upscaled.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          className="hero-still object-cover object-[60%_55%]"
        />
        <HeroVideo />
        {/* Readability: top fade for the nav, bottom 55% for the headline, a soft left fade on wide screens. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(19,41,31,0.55)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[rgba(19,41,31,0.82)] via-[rgba(19,41,31,0.5)] to-transparent sm:h-[55%] sm:from-[rgba(19,41,31,0.75)]" />
        <div className="absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-[rgba(19,41,31,0.5)] to-transparent md:block" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-end pb-[104px] pt-[96px] md:pb-20 lg:pb-24">
        <div className="max-w-[46rem]">
          <h1 id="hero-title" className="font-normal">
            <span className="eyebrow block text-[0.75rem] leading-relaxed text-limestone sm:text-[0.8125rem]">{t.hero.eyebrow}</span>
            <span aria-hidden="true" className="mt-2 block font-sans text-[0.8125rem] font-medium tracking-[0.06em] text-limestone/90">
              <BioLine dark />
            </span>
            <span className="relative mt-5 block font-display text-[clamp(2.75rem,1.6rem+5.2vw,6rem)] leading-[1.0] tracking-[-0.012em] text-limestone [font-variation-settings:'opsz'_144]">
              <span className="waterline-track" aria-hidden="true" key={`wl-${lang}`} />
              <span className="surface-line" data-line="1">{t.hero.line1}</span>
              <span className="surface-line" data-line="2">
                {t.hero.line2a}
                <em className="italic">{t.hero.line2b}</em>
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-limestone/95 sm:text-lg">
            {t.hero.sub1} <span className="hidden sm:inline">{t.hero.sub2}</span>
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CheckDatesButton />
            <AirbnbLink className="btn btn-ghost-light hidden sm:inline-flex" />
          </div>

          <ul className="mt-7 grid max-w-[34rem] grid-cols-3 text-[0.8125rem] font-medium leading-snug text-limestone/95 sm:flex sm:max-w-none sm:items-center sm:text-[0.9375rem]">
            {t.hero.facts.map((f, i) => (
              <li
                key={f}
                className={`pr-3 sm:pr-4 ${i > 0 ? "border-l border-limestone/40 pl-3 sm:pl-4" : ""}`}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop only: the dining room opening onto the pool, in the arch. */}
        <figure className="absolute bottom-24 right-10 hidden w-[220px] lg:block xl:right-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
          <Arch className="border-limestone/40 bg-[rgba(19,41,31,0.25)] backdrop-blur-[2px]">
            <div className="relative aspect-[3/4]">
              <Image
                src={src(side)}
                alt={side.alt[lang]}
                fill
                sizes="220px"
                quality={75}
                className="object-cover object-[55%_50%]"
              />
            </div>
          </Arch>
          <figcaption className="mt-3 text-center text-[0.875rem] leading-snug text-limestone/95">{t.hero.sideCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
