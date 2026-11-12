"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { Placeholder } from "@/components/ui/Placeholder";
import { business } from "@/lib/business";
import { photo, src } from "@/lib/gallery";

// Out the gate. No distances other than the host's own "5 minutes".
export function Nearby() {
  const { t, lang } = useLang();
  return (
    <section aria-labelledby="nearby-title" className="section bg-surface">
      <div className="container-x">
        <h2 id="nearby-title" className="h2">{t.nearby.title}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-12 lg:grid-cols-4">
          {t.nearby.cards.map((c) => {
            const p = photo(c.photo);
            return (
              <li key={c.title}>
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
                    <Image
                      src={src(p)}
                      alt={p.alt[lang]}
                      fill
                      sizes="(min-width: 1024px) 300px, 48vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <span className="block font-display text-[1.375rem] leading-tight sm:text-[1.5rem]">{c.title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted sm:text-[1rem]">{c.line}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="eyebrow text-[0.75rem] text-muted">{t.nearby.chipsLabel}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {business.location.nearby.map((place) => (
                <li key={place} className="inline-flex items-center gap-2 rounded-full border border-line bg-limestone px-4 py-2 text-[0.9375rem]">
                  <MapPin aria-hidden="true" className="size-4 text-accent" strokeWidth={1.5} />
                  {place}
                </li>
              ))}
            </ul>
          </div>
          {/* DRAFT: no real sloth photo from the property yet. */}
          <Placeholder label={t.nearby.slothPlaceholder} className="max-w-[440px] py-5" />
        </div>
      </div>
    </section>
  );
}
