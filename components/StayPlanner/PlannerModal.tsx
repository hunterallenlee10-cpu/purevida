"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { Wordmark } from "@/components/ui/Wordmark";
import type { TripType } from "@/lib/day";
import { StayPlanner } from "./StayPlanner";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

// Modal on desktop, full-screen sheet on phones. Esc closes, focus is trapped, body scroll is locked,
// and focus returns to the button that opened it (handled by PlannerProvider).
export default function PlannerModal({ initialTrip, onClose }: { initialTrip?: TripType; onClose: () => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab" || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const a = items[0], z = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === a || !ref.current.contains(document.activeElement))) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-center sm:items-center sm:p-6">
      <div aria-hidden="true" className="absolute inset-0 bg-[rgba(19,41,31,0.55)] backdrop-blur-[2px]" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={t.planner.dialog}
        className="relative flex h-[100dvh] w-full flex-col bg-surface sm:h-[min(92dvh,860px)] sm:max-w-[760px] sm:overflow-hidden sm:rounded-[24px] sm:border sm:border-line sm:shadow-[0_24px_64px_rgba(19,41,31,0.25)]"
      >
        <div className="flex shrink-0 items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
          <Wordmark />
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label={t.planner.close}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-limestone"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <StayPlanner initialTrip={initialTrip} />
        </div>
      </div>
    </div>
  );
}
