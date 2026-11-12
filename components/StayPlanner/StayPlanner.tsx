"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import type { TripType } from "@/lib/day";
import { initialState, stepError, type PlannerState } from "./state";
import { StepWhen } from "./StepWhen";
import { StepWho } from "./StepWho";
import { StepInfo, StepTrip } from "./StepTripInfo";
import { Success } from "./Success";

const STEPS = 4;

// The conversion engine: When, Who, Your trip, Your info. Used in the modal and inline on /contact.
export function StayPlanner({ initialTrip, inline = false }: { initialTrip?: TripType; inline?: boolean }) {
  const { t } = useLang();
  const [s, setS] = useState<PlannerState>(() => initialState(initialTrip));
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const H = inline ? "h3" : "h2";

  const set = (p: Partial<PlannerState>) => {
    setS((prev) => ({ ...prev, ...p }));
    if (Object.keys(errors).length) setErrors({});
  };

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = bodyRef.current;
    el?.scrollTo?.({ top: 0 });
    const h = el?.querySelector<HTMLElement>("h2, h3");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }, [step, done]);

  const next = () => {
    const e = stepError(step, s, t);
    setErrors(e);
    if (Object.keys(e).length) {
      bodyRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    if (step === STEPS - 1) { setDone(true); return; }
    setDir("fwd");
    setStep(step + 1);
  };
  const back = () => { setErrors({}); setDir("back"); setStep(Math.max(0, step - 1)); };

  const restart = () => { setS(initialState(initialTrip)); setStep(0); setDone(false); setErrors({}); };

  const progress = done ? 1 : (step + 1) / STEPS;

  return (
    <div className={`flex min-h-0 flex-col ${inline ? "" : "h-full"}`}>
      <div className="shrink-0">
        <div className="h-[3px] w-full bg-line" aria-hidden="true">
          <div className="h-full bg-accent transition-[width] duration-300 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
        {!done && (
          <div className="flex items-center justify-between px-5 pt-4 text-[0.875rem] sm:px-8">
            <p className="font-semibold text-muted">
              {t.planner.step} {step + 1} {t.planner.of} {STEPS}
              <span className="sr-only">: {t.planner.steps[step]}</span>
            </p>
            <ol className="hidden gap-4 text-muted sm:flex" aria-hidden="true">
              {t.planner.steps.map((label, i) => (
                <li key={label} className={i === step ? "font-semibold text-ink" : ""}>{label}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div ref={bodyRef} className={`min-h-0 flex-1 px-5 pb-6 pt-4 sm:px-8 ${inline ? "" : "overflow-y-auto overscroll-contain"}`}>
        {done ? (
          <Success s={s} H={H} onRestart={restart} />
        ) : (
          <div key={step} className={dir === "fwd" ? "step-fwd" : "step-back"} onKeyDown={(e) => {
            if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT" && (e.target as HTMLInputElement).type !== "checkbox") { e.preventDefault(); next(); }
          }}>
            {step === 0 && <StepWhen s={s} set={set} error={errors.dates} H={H} />}
            {step === 1 && <StepWho s={s} set={set} H={H} />}
            {step === 2 && <StepTrip s={s} set={set} H={H} />}
            {step === 3 && <StepInfo s={s} set={set} H={H} errors={errors} />}
          </div>
        )}
      </div>

      {!done && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="btn btn-sm px-3 text-ink disabled:invisible"
          >
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
            {t.planner.back}
          </button>
          <button type="button" onClick={next} className="btn btn-primary">
            {step === STEPS - 1 ? t.planner.submit : t.planner.next}
            {step < STEPS - 1 && <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />}
          </button>
        </div>
      )}
    </div>
  );
}
