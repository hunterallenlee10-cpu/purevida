"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { src, type Photo } from "@/lib/gallery";

// Keyboard arrows, Esc, swipe and a counter. Focus is trapped inside and returned on close.
export default function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const swipe = useRef<number | null>(null);
  const p = photos[index];
  const go = (d: number) => onIndex((index + d + photos.length) % photos.length);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && ref.current) {
        const items = Array.from(ref.current.querySelectorAll<HTMLElement>("button"));
        const a = items[0], z = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  // Preload neighbours so arrowing feels instant.
  const neighbours = [photos[(index + 1) % photos.length], photos[(index - 1 + photos.length) % photos.length]];

  const onDown = (e: PointerEvent) => { swipe.current = e.clientX; };
  const onUp = (e: PointerEvent) => {
    if (swipe.current === null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const navBtn = "inline-flex size-12 items-center justify-center rounded-full border border-limestone/30 text-limestone transition-colors hover:bg-limestone/10";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialog}
      className="on-dark fixed inset-0 z-50 flex flex-col bg-[rgba(19,41,31,0.96)] text-limestone"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-[0.9375rem] tabular-nums" aria-live="polite">
          {index + 1} {t.gallery.of} {photos.length}
        </p>
        <button type="button" onClick={onClose} aria-label={t.gallery.close} className={navBtn} data-autofocus>
          <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex-1 touch-pan-y select-none" onPointerDown={onDown} onPointerUp={onUp}>
        <Image
          key={p.file}
          src={src(p)}
          alt={p.alt[lang]}
          fill
          sizes="100vw"
          quality={80}
          className="object-contain px-2 sm:px-20"
          draggable={false}
        />
        {neighbours.map((n) => (
          <Image key={`pre-${n.file}`} src={src(n)} alt="" fill sizes="100vw" quality={80} className="invisible" aria-hidden="true" />
        ))}
        <button type="button" onClick={() => go(-1)} aria-label={t.gallery.prev} className={`${navBtn} absolute left-3 top-1/2 hidden -translate-y-1/2 sm:inline-flex`}>
          <ChevronLeft aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label={t.gallery.next} className={`${navBtn} absolute right-3 top-1/2 hidden -translate-y-1/2 sm:inline-flex`}>
          <ChevronRight aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:justify-center sm:px-6">
        <button type="button" onClick={() => go(-1)} aria-label={t.gallery.prev} className={`${navBtn} sm:hidden`}>
          <ChevronLeft aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </button>
        <p className="text-center text-[0.9375rem] text-limestone/90">{p.alt[lang]}</p>
        <button type="button" onClick={() => go(1)} aria-label={t.gallery.next} className={`${navBtn} sm:hidden`}>
          <ChevronRight aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
