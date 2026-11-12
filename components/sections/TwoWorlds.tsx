"use client";

import Image from "next/image";
import { CookingPot, Droplets, Dumbbell, Flame, Laptop, Puzzle, Tv, Waves, type LucideIcon } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { CheckDatesButton } from "@/components/ui/CheckDatesButton";
import { Arch } from "@/components/ui/Arch";
import { photo, src } from "@/lib/gallery";
import { coverSizes } from "@/lib/sizes";

const privateIcons: LucideIcon[] = [Waves, Flame, Tv, CookingPot];
const arenasIcons: LucideIcon[] = [Droplets, Dumbbell, Laptop, Puzzle];

function List({ items, icons }: { items: string[]; icons: LucideIcon[] }) {
  return (
    <ul className="mt-6 divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const Icon = icons[i];
        return (
          <li key={item} className="flex items-center gap-4 py-4 text-[1.0625rem]">
            <Icon aria-hidden="true" className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
            {item}
          </li>
        );
      })}
    </ul>
  );
}

// The differentiator: a private house and a whole resort, behind one gate.
export function TwoWorlds() {
  const { t, lang } = useLang();
  const deck = photo("02");
  const aerial = photo("24");

  return (
    <section aria-labelledby="two-worlds-title" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="two-worlds-title" className="h2 max-w-[14ch]">
            {t.split.title}
          </h2>
          <p className="lede md:max-w-[30ch]">{t.split.lede}</p>
        </div>

        <div className="mt-12 grid gap-16 md:grid-cols-2 md:gap-10 lg:mt-16 lg:gap-20">
          <div>
            <Arch className="mx-auto max-w-[400px] md:mx-0">
              <div className="relative aspect-[4/5]">
                <Image
                  src={src(deck)}
                  alt={deck.alt[lang]}
                  fill
                  sizes={coverSizes(deck, 4 / 5, ["(min-width: 768px) 400px", "90vw"])}
                  className="object-cover object-[45%_50%]"
                />
              </div>
            </Arch>
            <h3 className="h3 mt-8">{t.split.privateTitle}</h3>
            <List items={t.split.privateItems} icons={privateIcons} />
          </div>

          <div className="md:pt-28">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line">
              <Image
                src={src(aerial)}
                alt={aerial.alt[lang]}
                fill
                sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
            <h3 className="h3 mt-8">{t.split.arenasTitle}</h3>
            <List items={t.split.arenasItems} icons={arenasIcons} />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 text-center lg:mt-20">
          <p className="font-display text-[1.5rem] leading-tight md:text-[1.75rem]">{t.split.gated}</p>
          <CheckDatesButton trip="family" />
        </div>
      </div>
    </section>
  );
}
