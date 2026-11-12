"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";

// Appears only after 1.5 screens of scrolling. Sits above the mobile sticky bar.
export function BackToTop() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        document.getElementById("top")?.focus({ preventScroll: true });
      }}
      aria-label={t.footer.backToTop}
      className="fixed bottom-[92px] right-3 z-30 inline-flex size-11 md:size-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-[0_12px_32px_rgba(19,41,31,0.12)] transition-colors hover:bg-limestone md:bottom-8 md:right-8"
    >
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.5} />
    </button>
  );
}
