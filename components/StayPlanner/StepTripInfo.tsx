"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import type { TripType } from "@/lib/day";
import type { PlannerState } from "./state";

type Props = { s: PlannerState; set: (p: Partial<PlannerState>) => void; H: "h2" | "h3" };

const field = "mt-1.5 h-12 w-full rounded-xl border bg-surface px-4 text-[1rem] placeholder:text-muted/70";

export function StepTrip({ s, set, H }: Props) {
  const { t } = useLang();
  const tr = t.planner.trip;
  const types = Object.keys(tr.types) as TripType[];
  return (
    <div>
      <H className="font-display text-[1.75rem] leading-tight sm:text-[2rem]">{tr.title}</H>
      <div role="group" aria-label={tr.title} className="mt-5 flex flex-wrap gap-2">
        {types.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={s.trip === k}
            onClick={() => set({ trip: s.trip === k ? undefined : k })}
            className={`min-h-12 rounded-full border px-5 text-[1rem] font-medium transition-colors ${
              s.trip === k ? "border-accent bg-accent text-white" : "border-line bg-surface hover:border-ink/40"
            }`}
          >
            {tr.types[k]}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <label htmlFor="trip-note" className="text-[1rem] font-semibold">{tr.note}</label>
        <textarea
          id="trip-note"
          rows={4}
          value={s.note}
          onChange={(e) => set({ note: e.target.value })}
          placeholder={tr.notePlaceholder}
          className="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-[1rem] placeholder:text-muted/70"
        />
      </div>
    </div>
  );
}

export function StepInfo({ s, set, H, errors }: Props & { errors: Record<string, string> }) {
  const { t } = useLang();
  const i = t.planner.info;
  const border = (k: string) => (errors[k] ? "border-accent" : "border-line");
  return (
    <div>
      <H className="font-display text-[1.75rem] leading-tight sm:text-[2rem]">{i.title}</H>
      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="p-name" className="text-[1rem] font-semibold">{i.name}</label>
          <input
            id="p-name" type="text" autoComplete="name" required value={s.name}
            onChange={(e) => set({ name: e.target.value })}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "p-name-err" : undefined}
            className={`${field} ${border("name")}`}
          />
          {errors.name && <p id="p-name-err" className="mt-1.5 text-[0.9375rem] font-medium text-accent">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="p-phone" className="text-[1rem] font-semibold">{i.phone}</label>
          <input
            id="p-phone" type="tel" inputMode="tel" autoComplete="tel" required value={s.phone}
            onChange={(e) => set({ phone: e.target.value })}
            aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "p-phone-err" : "p-phone-hint"}
            className={`${field} ${border("phone")}`}
          />
          {errors.phone ? (
            <p id="p-phone-err" className="mt-1.5 text-[0.9375rem] font-medium text-accent">{errors.phone}</p>
          ) : (
            <p id="p-phone-hint" className="mt-1.5 text-[0.875rem] text-muted">{i.phoneHint}</p>
          )}
        </div>
        <div>
          <label htmlFor="p-email" className="text-[1rem] font-semibold">{i.email}</label>
          <input
            id="p-email" type="email" autoComplete="email" value={s.email}
            onChange={(e) => set({ email: e.target.value })}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "p-email-err" : undefined}
            className={`${field} ${border("email")}`}
          />
          {errors.email && <p id="p-email-err" className="mt-1.5 text-[0.9375rem] font-medium text-accent">{errors.email}</p>}
        </div>
      </div>
    </div>
  );
}
