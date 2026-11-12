"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  AlarmSmoke, ChevronLeft, ChevronRight, DoorOpen, KeyRound, Laptop, PlugZap, SquareParking, Tv, WashingMachine, Wifi,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { Arch } from "@/components/ui/Arch";
import { Placeholder } from "@/components/ui/Placeholder";
import { photo, src } from "@/lib/gallery";

const amenityIcons: LucideIcon[] = [Wifi, Laptop, Tv, WashingMachine, SquareParking, PlugZap, KeyRound, DoorOpen, AlarmSmoke];

// The rooms tour: a native horizontal scroll-snap row of arched cards. No scroll hijacking.
export function House() {
  const { t, lang } = useLang();
  const row = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step * 2, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="the-house" aria-labelledby="house-title" className="section overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="house-title" className="h2 max-w-[17ch]">{t.house.title}</h2>
            <p className="lede mt-4">{t.house.sub}</p>
          </div>
          <div className="hidden gap-3 md:flex">
            <button type="button" onClick={() => scrollBy(-1)} aria-label={t.house.prev} aria-controls="rooms-row" className="inline-flex size-12 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-surface">
              <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label={t.house.next} aria-controls="rooms-row" className="inline-flex size-12 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-surface">
              <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-14">
        <ul
          id="rooms-row"
          ref={row}
          className="bleed-row no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {t.house.rooms.map((room) => {
            const p = room.photo ? photo(room.photo) : null;
            return (
              <li key={room.name} className="w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-[300px]">
                <figure>
                  <Arch className="bg-limestone">
                    <div className="relative aspect-[3/4.2]">
                      {p ? (
                        <Image
                          src={src(p)}
                          alt={p.alt[lang]}
                          fill
                          sizes="(min-width: 640px) 300px, 78vw"
                          className="object-cover"
                        />
                      ) : (
                        <Placeholder label={t.house.workspacePlaceholder} className="absolute inset-0 rounded-none border-0 px-8 pt-16" />
                      )}
                    </div>
                  </Arch>
                  <figcaption className="mt-5 px-1">
                    <span className="block font-display text-[1.5rem] leading-tight">{room.name}</span>
                    <span className="mt-1 block text-[1rem] text-muted">{room.caption}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-x mt-16 lg:mt-20">
        <div className="card p-6 sm:p-10">
          <h3 className="h3">{t.house.amenitiesTitle}</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.house.amenities.map((a, i) => {
              const Icon = amenityIcons[i];
              return (
                <li key={a} className="flex items-center gap-3 text-[1.0625rem]">
                  <Icon aria-hidden="true" className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
                  {a}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-[0.9375rem] text-muted">{t.house.washerNote}</p>
        </div>
      </div>
    </section>
  );
}
