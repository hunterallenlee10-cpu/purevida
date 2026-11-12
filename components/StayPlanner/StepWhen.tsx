"use client";

import { DayPicker, type DateRange } from "react-day-picker";
import { es as esLocale } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { business } from "@/lib/business";
import { fmtDate, nightsBetween, type PlannerState } from "./state";

type Props = { s: PlannerState; set: (p: Partial<PlannerState>) => void; error?: string; H: "h2" | "h3" };

export function StepWhen({ s, set, error, H }: Props) {
  const { t, lang } = useLang();
  const w = t.planner.when;
  const nights = nightsBetween(s.from, s.to);
  const [months, setMonths] = useState(2);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    // Two months side by side when there is room; stacked months are too tall for small phones, so show one with arrows.
    const mq = window.matchMedia("(min-width: 700px)");
    const update = () => setMonths(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div>
      <H className="font-display text-[1.75rem] leading-tight sm:text-[2rem]">{w.title}</H>

      <dl className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-limestone p-3 text-[0.9375rem] sm:p-4">
        <div>
          <dt className="text-[0.8125rem] font-semibold text-muted">{w.checkIn}</dt>
          <dd className="mt-0.5">{s.from ? fmtDate(s.from, lang) : <span className="text-muted">{w.pick}</span>}</dd>
        </div>
        <div>
          <dt className="text-[0.8125rem] font-semibold text-muted">{w.checkOut}</dt>
          <dd className="mt-0.5">{s.to ? fmtDate(s.to, lang) : <span className="text-muted">{w.pick}</span>}</dd>
        </div>
        <div className="text-right">
          <dt className="sr-only">{t.planner.done.nights}</dt>
          <dd className="font-display text-[1.375rem] leading-tight text-accent" aria-live="polite">
            {nights > 0 ? w.nights(nights) : ""}
          </dd>
        </div>
      </dl>

      <div className="planner-calendar mt-4 flex justify-center">
        <DayPicker
          mode="range"
          numberOfMonths={months}
          pagedNavigation
          locale={lang === "es" ? esLocale : undefined}
          selected={{ from: s.from, to: s.to } as DateRange}
          onSelect={(r) => set({ from: r?.from, to: r?.to && r.from && r.to.getTime() !== r.from.getTime() ? r.to : undefined })}
          disabled={{ before: today }}
          startMonth={today}
          defaultMonth={s.from ?? today}
          excludeDisabled
        />
      </div>

      {nights > business.stay.longStayNights && (
        <p className="mt-3 rounded-xl bg-limestone px-4 py-3 text-[0.9375rem] text-muted">{w.longStay}</p>
      )}

      <div className="mt-5 border-t border-line pt-5">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[1rem] font-medium">
          <input
            type="checkbox"
            checked={s.flexible}
            onChange={(e) => set({ flexible: e.target.checked })}
            className="size-5 accent-[#B5472F]"
          />
          {w.flexible}
        </label>
        {s.flexible && (
          <div className="mt-2">
            <label htmlFor="flex-text" className="text-[0.9375rem] text-muted">{w.flexibleLabel}</label>
            <input
              id="flex-text"
              type="text"
              value={s.flexibleText}
              onChange={(e) => set({ flexibleText: e.target.value })}
              placeholder={w.flexiblePlaceholder}
              className="mt-1 h-12 w-full rounded-xl border border-line bg-surface px-4 text-[1rem] placeholder:text-muted/70 focus:border-accent"
            />
          </div>
        )}
      </div>
      {error && <p role="alert" className="mt-3 text-[0.9375rem] font-medium text-accent">{error}</p>}
    </div>
  );
}
