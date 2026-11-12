"use client";

import { Plus } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";

// Native <details> accordion: accessible, works before hydration. Answers come only from the listing facts.
export function Faq() {
  const { t } = useLang();
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <h2 id="faq-title" className="h2 lg:sticky lg:top-28 lg:self-start">{t.faq.title}</h2>
        <div className="border-t border-line">
          {t.faq.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-[1.25rem] leading-snug sm:text-[1.375rem] [&::-webkit-details-marker]:hidden">
                <h3 className="font-display">{item.q}</h3>
                <Plus aria-hidden="true" className="size-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <p className="max-w-[60ch] pb-6 pr-10 text-[1.0625rem] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
