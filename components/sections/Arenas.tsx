"use client";

import Image from "next/image";
import { useLang } from "@/components/providers/LanguageProvider";
import { photo, src } from "@/lib/gallery";

// Arenas community photos come from the listing. DRAFT: confirm permission to reuse Arenas community photos.
function Tile({ id, label, className, sizes, pos }: { id: string; label: string; className: string; sizes: string; pos?: string }) {
  const { lang } = useLang();
  const p = photo(id);
  return (
    <figure className={`group relative min-h-[220px] overflow-hidden rounded-[20px] ${className}`}>
      <Image
        src={src(p)}
        alt={p.alt[lang]}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={pos ? { objectPosition: pos } : undefined}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(19,41,31,0.85)] via-[rgba(19,41,31,0.15)] via-55% to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 font-display text-[1.375rem] leading-tight text-limestone sm:p-6 sm:text-[1.5rem]">
        {label}
      </figcaption>
    </figure>
  );
}

export function Arenas() {
  const { t, lang } = useLang();
  const sign = photo("23");
  return (
    <section id="arenas" aria-labelledby="arenas-title" className="on-dark section bg-jungle text-limestone">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="arenas-title" className="h2 max-w-[17ch]">{t.arenas.title}</h2>
          <p className="max-w-[40ch] text-[1.0625rem] leading-relaxed text-limestone/85">{t.arenas.sub}</p>
        </div>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[20px] sm:aspect-[3/1] lg:mt-12">
          <Image
            src={src(sign)}
            alt={sign.alt[lang]}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-[50%_72%]"
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[240px_240px_auto] [grid-template-areas:'pool''gym''courts''cowork''kids''rest'] sm:[grid-template-areas:'pool_pool''gym_courts''cowork_courts''kids_kids''rest_rest'] lg:[grid-template-areas:'pool_pool_gym_courts''pool_pool_cowork_courts''kids_kids_rest_rest']">
          <Tile id="26" label={t.arenas.tiles.pool} className="[grid-area:pool] min-h-[280px] sm:min-h-[340px]" sizes="(min-width: 1024px) 620px, 100vw" pos="50% 60%" />
          <Tile id="30" label={t.arenas.tiles.gym} className="[grid-area:gym]" sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
          <Tile id="34" label={t.arenas.tiles.courts} className="[grid-area:courts]" sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" pos="50% 70%" />
          <Tile id="28" label={t.arenas.tiles.cowork} className="[grid-area:cowork]" sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
          <Tile id="33" label={t.arenas.tiles.kids} className="[grid-area:kids] min-h-[260px]" sizes="(min-width: 1024px) 620px, 100vw" pos="40% 55%" />
          <div className="flex flex-col justify-center rounded-[20px] border border-limestone/20 p-6 [grid-area:rest] sm:p-8">
            <h3 className="eyebrow text-[0.75rem] text-accent-light">{t.arenas.restTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.arenas.rest.map((r) => (
                <li key={r} className="rounded-full border border-limestone/25 px-4 py-2 text-[0.9375rem]">{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
