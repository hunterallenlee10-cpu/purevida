"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { business } from "@/lib/business";

// Real Airbnb reviews, quoted word for word as Airbnb translated them. They stay in the language they were written in.
const quotes = [
  {
    name: "Alejandro",
    city: "San José",
    trip: "kids" as const,
    text: "The hosts are very attentive and willing to make the stay the best it can be. The house was perfectly clean, with a private pool that's perfect for sharing with the family, and the condo facilities were very nice. I would definitely come back.",
  },
  {
    name: "Samantha",
    city: "San Pedro",
    trip: "group" as const,
    text: "An excellent house for vacations with family or friends!! The owners' service was excellent! Very nice house. Everything was in order and clean. Great, super-central location and close to many restaurants and supermarkets!!",
  },
  {
    name: "Andres",
    city: "",
    trip: "group" as const,
    text: "Thanks to Melina and her team, we had a great time. They were always attentive to our questions and everything was very clear upon arrival. The house was impeccable and everything was super new. We felt better than at home.",
  },
];

const igQuote = "El lugar es impecable y completamente equipado con todo lo que se necesita tanto en la cocina como en el resto de habitaciones.";
// DRAFT: our translation
const igQuoteEn = "The place is spotless and fully equipped with everything you need in the kitchen and every other room.";

export function Reviews() {
  const { t } = useLang();
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="on-dark section bg-jungle text-limestone">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div>
            <h2 id="reviews-title" className="eyebrow text-[0.8125rem] text-limestone/85">{t.reviews.title}</h2>
            <p className="mt-3 font-display text-[6rem] leading-[0.9] tracking-[-0.03em] text-accent-light sm:text-[8.5rem] [font-variation-settings:'opsz'_144]">
              {business.rating.score}
            </p>
          </div>
          <p className="max-w-[40ch] text-[1.0625rem] leading-relaxed text-limestone/90 lg:pb-4">{t.reviews.meta}</p>
        </div>

        <ul className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3">
          {quotes.map((q) => (
            <li key={q.name} className="flex flex-col rounded-[20px] border border-limestone/15 bg-limestone/[0.05] p-6 sm:p-8">
              <blockquote lang="en" className="flex-1 font-display text-[1.1875rem] font-[450] leading-[1.5] sm:text-[1.25rem]">
                <p>&ldquo;{q.text}&rdquo;</p>
              </blockquote>
              <div className="mt-6 border-t border-limestone/15 pt-5">
                <p className="font-semibold">
                  {q.name}
                  {q.city && <span className="font-normal text-limestone/85">, {q.city}</span>}
                </p>
                <p className="text-[0.9375rem] text-limestone/85">{t.reviews.trips[q.trip]}</p>
                <p className="mt-2 text-[0.8125rem] text-limestone/70">{t.reviews.translated}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <figure className="rounded-[20px] border border-limestone/15 p-6 sm:p-8">
            <blockquote lang="es" className="font-display text-[1.125rem] italic leading-[1.5] sm:text-[1.1875rem]">
              <p>&ldquo;{igQuote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-3 text-[0.9375rem] text-limestone/85">
              <span lang="en">{igQuoteEn}</span>
              <span className="mt-1 block text-[0.8125rem] text-limestone/70">{t.reviews.igNote}</span>
            </figcaption>
          </figure>
          <div className="flex items-center rounded-[20px] p-2 lg:justify-center">
            <a href={business.links.airbnb} target="_blank" rel="noopener" className="link-underline inline-flex min-h-11 items-center gap-2 text-[1.0625rem] font-semibold">
              {t.reviews.readAll}
              <ArrowUpRight aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
