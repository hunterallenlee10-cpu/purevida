"use client";

import Link from "next/link";
import { ArrowUpRight, House, Instagram, MessageCircle } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { BioLine } from "@/components/ui/BioLine";
import { useLang } from "@/components/providers/LanguageProvider";
import { business } from "@/lib/business";
import { messageHref } from "@/lib/contact";

export function Footer({ showConcept, onHome = true }: { showConcept: boolean; onHome?: boolean }) {
  const { t } = useLang();
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  return (
    <footer className="on-dark bg-jungle pb-28 pt-20 text-limestone md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={t.nav.home} className="inline-block rounded-full">
              <Wordmark size="footer" tone="light" />
            </Link>
            <p className="mt-3 text-[0.9375rem] text-limestone/85">{t.footer.by}</p>
            <BioLine dark className="mt-6 text-[0.9375rem] font-medium" />
            <p className="mt-6 max-w-[36ch] text-[0.9375rem] leading-relaxed text-limestone/85">{t.footer.address}</p>
            <p className="mt-2 text-[0.9375rem] text-limestone/85">{t.footer.times}</p>
          </div>

          <nav aria-label={t.footer.explore}>
            <h2 className="eyebrow text-[0.75rem] text-limestone/85">{t.footer.explore}</h2>
            <ul className="mt-4 space-y-1">
              {t.nav.links.map((l) => (
                <li key={l.id}>
                  <a href={href(l.id)} className="link-underline inline-flex min-h-11 items-center no-underline hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact" className="link-underline inline-flex min-h-11 items-center no-underline hover:underline">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-[0.75rem] text-limestone/85">{t.footer.reach}</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={messageHref} target="_blank" rel="noopener" className="link-underline inline-flex min-h-11 items-center gap-2 no-underline hover:underline">
                  <MessageCircle aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
                  {t.footer.message}
                </a>
              </li>
              <li>
                <a href={business.links.airbnb} target="_blank" rel="noopener" className="link-underline inline-flex min-h-11 items-center gap-2 no-underline hover:underline">
                  <ArrowUpRight aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
                  {t.nav.bookAirbnb}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href={business.links.instagram}
                target="_blank"
                rel="noopener"
                aria-label={t.footer.instagramLabel}
                className="inline-flex size-11 items-center justify-center rounded-full border border-limestone/30 transition-colors hover:bg-limestone/10"
              >
                <Instagram aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </a>
              <a
                href={business.links.airbnb}
                target="_blank"
                rel="noopener"
                aria-label={t.footer.airbnbLabel}
                className="inline-flex size-11 items-center justify-center rounded-full border border-limestone/30 transition-colors hover:bg-limestone/10"
              >
                <House aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-limestone/15 pt-6 text-[0.875rem] text-limestone/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          {showConcept && <p>{t.footer.concept}</p>}
        </div>
      </div>
    </footer>
  );
}
