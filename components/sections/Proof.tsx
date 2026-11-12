"use client";

import Image from "next/image";
import { Clock, KeyRound, Languages, Users, type LucideIcon } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { CheckDatesButton } from "@/components/ui/CheckDatesButton";
import { Arch } from "@/components/ui/Arch";
import { Placeholder } from "@/components/ui/Placeholder";
import { photo, src } from "@/lib/gallery";

const icons: LucideIcon[] = [Users, Languages, Clock, KeyRound];

// Who you are booking with. The front porch at dusk is the trust photo.
export function Proof() {
  const { t, lang } = useLang();
  const front = photo("04");
  return (
    <section aria-labelledby="proof-title" className="section">
      <div className="container-x grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <Arch className="mx-auto w-full max-w-[460px]">
          <div className="relative aspect-[4/5]">
            <Image
              src={src(front)}
              alt={front.alt[lang]}
              fill
              sizes="(min-width: 768px) 460px, 92vw"
              className="object-cover object-[50%_50%]"
            />
          </div>
        </Arch>

        <div>
          <h2 id="proof-title" className="h2 max-w-[14ch]">{t.proof.title}</h2>
          <ul className="mt-8 space-y-5">
            {t.proof.lines.map((line, i) => {
              const Icon = icons[i];
              return (
                <li key={line} className="flex gap-4 text-[1.0625rem] leading-relaxed">
                  <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" strokeWidth={1.5} />
                  {line}
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-[0.875rem] text-muted">{t.proof.source}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
            <CheckDatesButton />
            <span className="inline-flex items-center gap-3 text-[0.9375rem] font-medium">
              <Image src="/brand/sloth-badge-112.webp" unoptimized alt="" width={44} height={44} className="rounded-full ring-1 ring-line" />
              Pura Vida Sloth Escapes
            </span>
          </div>

          {/* DRAFT: replace with a real photo of Melina and the team. */}
          <Placeholder label={t.proof.placeholder} className="mt-10 max-w-[420px] py-6" />
        </div>
      </div>
    </section>
  );
}
