"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Instagram, MapPin, MessageCircle, type LucideIcon } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { Arch } from "@/components/ui/Arch";
import { StayPlanner } from "@/components/StayPlanner/StayPlanner";
import { business } from "@/lib/business";
import { messageHref } from "@/lib/contact";
import { photo, src } from "@/lib/gallery";

const tileIcon: Record<string, LucideIcon> = { message: MessageCircle, airbnb: ArrowUpRight, instagram: Instagram };
const tileHref: Record<string, string> = { message: messageHref, airbnb: business.links.airbnb, instagram: business.links.instagram };

export function ContactPage() {
  const { t, lang } = useLang();
  const c = t.contact;
  const front = photo("04");

  return (
    <>
      <section aria-labelledby="contact-title" className="pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="text-[0.875rem] text-muted">
            <ol className="flex gap-2">
              <li><Link href="/" className="link-underline inline-flex min-h-11 items-center">{c.breadcrumbHome}</Link></li>
              <li aria-hidden="true" className="inline-flex min-h-11 items-center">/</li>
              <li aria-current="page" className="inline-flex min-h-11 items-center">{c.breadcrumbContact}</li>
            </ol>
          </nav>
          <div className="mt-4 grid items-end gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
            <div>
              <h1 id="contact-title" className="font-normal">
                <span className="eyebrow block text-accent">{c.eyebrow}</span>
                <span className="mt-4 block font-display text-[clamp(2.5rem,1.6rem+3.8vw,4.5rem)] leading-[1.02] tracking-[-0.015em]">
                  {c.title}
                </span>
              </h1>
              <p className="lede mt-6">{c.sub}</p>
            </div>
            <Arch className="mx-auto w-full max-w-[360px]">
              <div className="relative aspect-[4/5]">
                <Image src={src(front)} alt={front.alt[lang]} fill priority sizes="360px" className="object-cover" />
              </div>
            </Arch>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-3">
            {c.tiles.map((tile) => {
              const Icon = tileIcon[tile.key];
              return (
                <li key={tile.key}>
                  <a href={tileHref[tile.key]} target="_blank" rel="noopener" className="card card-hover flex h-full items-start gap-4 p-6">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-limestone text-accent">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block font-display text-[1.375rem] leading-tight">{tile.title}</span>
                      <span className="mt-1 block text-[0.9375rem] text-muted">{tile.line}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="planner-title" className="pb-20 lg:pb-28">
        <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div className="card overflow-hidden p-0">
            <h2 id="planner-title" className="px-5 pt-6 font-display text-[1.375rem] sm:px-8">{c.plannerTitle}</h2>
            <StayPlanner inline />
          </div>

          <aside aria-labelledby="details-title" className="card h-fit p-6 sm:p-8">
            <h2 id="details-title" className="h3">{c.infoTitle}</h2>
            <ul className="mt-5 space-y-4 text-[1rem]">
              <li className="flex gap-3">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" strokeWidth={1.5} />
                {t.footer.times}
              </li>
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" strokeWidth={1.5} />
                <span>
                  <span className="block font-semibold">{business.name}</span>
                  {c.area}
                </span>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {business.location.nearby.map((place) => (
                <li key={place} className="rounded-full border border-line bg-limestone px-3.5 py-1.5 text-[0.875rem]">{place}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
