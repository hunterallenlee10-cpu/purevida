"use client";

import { Minus, Plus } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { MAX_GUESTS, type PlannerState } from "./state";

type Props = { s: PlannerState; set: (p: Partial<PlannerState>) => void; H: "h2" | "h3" };

function Stepper({
  label, hint, value, min, canAdd, onChange,
}: { label: string; hint: string; value: number; min: number; canAdd: boolean; onChange: (v: number) => void }) {
  const { t } = useLang();
  const btn = "inline-flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ink/25";
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-[1.0625rem] font-semibold">{label}</p>
        <p className="text-[0.875rem] text-muted">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`${t.planner.who.remove}: ${label}`}>
          <Minus aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>
        <output aria-live="polite" aria-label={label} className="w-6 text-center font-display text-[1.5rem] tabular-nums">{value}</output>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={!canAdd} aria-label={`${t.planner.who.add}: ${label}`}>
          <Plus aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

// A floor-plan style guide that fills in live: two dots per bed, king, then bunk, then queen, then sofa bed.
export function BedDiagram({ guests }: { guests: number }) {
  const { t } = useLang();
  const w = t.planner.who;
  const rooms = w.beds;
  return (
    <figure className="mt-2">
      <figcaption className="flex items-baseline justify-between text-[0.875rem]">
        <span className="font-semibold">{w.diagram}</span>
        <span className="text-muted">{w.guests(guests)}</span>
      </figcaption>
      <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border-2 border-ink/80 bg-ink/80" aria-hidden="true">
        {rooms.map((room, r) => {
          const kind = ["king", "bunk", "queen", "sofa"][r];
          return (
            <div key={room} className="flex min-h-[112px] flex-col justify-between bg-surface p-3">
              <span className="text-[0.75rem] font-semibold leading-tight text-muted">{room}</span>
              <div
                className={`mx-auto mt-2 flex items-center justify-center gap-2 border border-ink/40 ${
                  kind === "sofa" ? "h-7 w-[78%] rounded-md" : kind === "bunk" ? "h-11 w-[46%] flex-col gap-1 rounded-sm" : kind === "king" ? "h-11 w-[72%] rounded-md" : "h-11 w-[60%] rounded-md"
                }`}
              >
                {[0, 1].map((d) => {
                  const filled = r * 2 + d < guests;
                  return (
                    <span
                      key={d}
                      className={`block size-3 rounded-full transition-all duration-200 ${filled ? "scale-100 bg-accent" : "scale-75 border border-ink/30 bg-transparent"}`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[0.875rem] text-muted">{w.guide}</p>
      <p className="sr-only" aria-live="polite">{w.guests(guests)}</p>
    </figure>
  );
}

export function StepWho({ s, set, H }: Props) {
  const { t } = useLang();
  const w = t.planner.who;
  const total = s.adults + s.children;
  const full = total >= MAX_GUESTS;
  return (
    <div>
      <H className="font-display text-[1.75rem] leading-tight sm:text-[2rem]">{w.title}</H>
      <div className="mt-5 grid gap-8 md:grid-cols-[1fr_1fr]">
        <div>
          <div className="divide-y divide-line border-y border-line">
            <Stepper label={w.adults} hint={w.adultsHint} value={s.adults} min={1} canAdd={!full} onChange={(v) => set({ adults: v })} />
            <Stepper label={w.children} hint={w.childrenHint} value={s.children} min={0} canAdd={!full} onChange={(v) => set({ children: v })} />
          </div>
          {full && <p className="mt-3 text-[0.9375rem] text-muted" role="status">{w.cap}</p>}

          {/* DRAFT: confirm pet policy and any fee. */}
          <fieldset className="mt-6">
            <legend className="text-[1.0625rem] font-semibold">{w.pet}</legend>
            <div className="mt-3 flex gap-2">
              {([true, false] as const).map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  aria-pressed={s.pet === v}
                  onClick={() => set({ pet: v })}
                  className={`min-h-11 rounded-full border px-5 text-[0.9375rem] font-medium transition-colors ${
                    s.pet === v ? "border-ink bg-ink text-limestone" : "border-line bg-surface hover:border-ink/40"
                  }`}
                >
                  {v ? w.yes : w.no}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <BedDiagram guests={total} />
      </div>
    </div>
  );
}
