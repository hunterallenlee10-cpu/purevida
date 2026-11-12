"use client";

import { CalendarDays } from "lucide-react";
import { usePlanner } from "@/components/providers/PlannerProvider";
import { useLang } from "@/components/providers/LanguageProvider";
import type { TripType } from "@/lib/day";

// Every "Check My Dates" on the site is this button. It opens the Stay Planner (a button, never a link).
export function CheckDatesButton({
  trip,
  label,
  className = "btn btn-primary",
  icon = false,
  onOpen,
}: {
  trip?: TripType;
  label?: string;
  className?: string;
  icon?: boolean;
  onOpen?: () => void;
}) {
  const { openPlanner, preload } = usePlanner();
  const { t } = useLang();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onOpen?.();
        openPlanner({ trip });
      }}
      onPointerEnter={preload}
      onFocus={preload}
      aria-haspopup="dialog"
    >
      {icon && <CalendarDays aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />}
      {label ?? t.nav.checkDates}
    </button>
  );
}
