"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { LangToggle } from "@/components/ui/LangToggle";
import { CheckDatesButton } from "@/components/ui/CheckDatesButton";
import { useLang } from "@/components/providers/LanguageProvider";
import { business } from "@/lib/business";

// Sticky, slim. Transparent with light text over the hero, limestone with blur after 80px of scroll.
// On pages without a dark hero (`solid`), it is limestone from the start.
export function Nav({ solid = false, onHome = true }: { solid?: boolean; onHome?: boolean }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheetRef.current) {
        const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>("a, button"));
        const a = items[0], z = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      burgerRef.current?.focus();
    };
  }, [open]);

  const light = !solid && !scrolled;
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          light
            ? "border-b border-transparent bg-transparent"
            : "border-b border-line/80 bg-limestone/85 backdrop-blur-md supports-[backdrop-filter]:bg-limestone/80"
        }`}
      >
        <nav aria-label="Main" className="container-x flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
          <Link href="/" aria-label={t.nav.home} className="shrink-0 rounded-full">
            <Wordmark tone={light ? "light" : "ink"} />
          </Link>

          <ul className={`hidden items-center gap-7 xl:flex ${light ? "text-limestone" : "text-ink"}`}>
            {t.nav.links.map((l) => (
              <li key={l.id}>
                <a href={href(l.id)} className="link-underline py-3 text-[0.9375rem] font-medium no-underline hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden min-[400px]:block">
              <LangToggle tone={light ? "light" : "ink"} />
            </div>
            <a
              href={business.links.airbnb}
              target="_blank"
              rel="noopener"
              className={`hidden min-h-11 items-center gap-1 text-[0.9375rem] font-medium lg:inline-flex ${light ? "text-limestone" : "text-ink"} link-underline`}
            >
              {t.nav.bookAirbnb}
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </a>
            <CheckDatesButton className="btn btn-primary btn-sm hidden md:inline-flex" />
            <button
              ref={burgerRef}
              type="button"
              className={`inline-flex size-11 items-center justify-center rounded-full xl:hidden ${light ? "text-limestone" : "text-ink"}`}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.openMenu}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-limestone"
        >
          <div className="container-x flex h-[68px] items-center justify-between">
            <Link href="/" aria-label={t.nav.home} onClick={() => setOpen(false)}>
              <Wordmark />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink"
              aria-label={t.nav.closeMenu}
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </button>
          </div>
          <div className="container-x flex flex-1 flex-col pb-10 pt-6">
            <ul className="flex flex-col border-t border-line">
              {t.nav.links.map((l) => (
                <li key={l.id} className="border-b border-line">
                  <a
                    href={href(l.id)}
                    onClick={() => setOpen(false)}
                    className="flex min-h-16 items-center font-display text-[2rem] leading-none"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <Link href="/contact" onClick={() => setOpen(false)} className="flex min-h-16 items-center font-display text-[2rem] leading-none">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <CheckDatesButton className="btn btn-primary w-full" onOpen={() => setOpen(false)} />
              <a href={business.links.airbnb} target="_blank" rel="noopener" className="btn btn-outline w-full">
                {t.nav.bookAirbnb}
                <ArrowUpRight aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
              </a>
            </div>
            <LangToggle className="mt-8 self-start" />
          </div>
        </div>
      )}
    </>
  );
}
