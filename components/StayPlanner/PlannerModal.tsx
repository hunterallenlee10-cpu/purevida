"use client";

import type { TripType } from "@/lib/day";

// Temporary stub (Phase 1). Replaced in Phase 5.
export default function PlannerModal({ onClose }: { initialTrip?: TripType; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Stay Planner" className="fixed inset-0 z-50 grid place-items-center bg-ink/40">
      <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
    </div>
  );
}
