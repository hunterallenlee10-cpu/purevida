"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import type { TripType } from "@/lib/day";

// The modal (and its calendar) loads only when someone asks for it.
const PlannerModal = dynamic(() => import("@/components/StayPlanner/PlannerModal"), { ssr: false });

type OpenOptions = { trip?: TripType };
type Ctx = { openPlanner: (opts?: OpenOptions) => void; preload: () => void };

const PlannerContext = createContext<Ctx>({ openPlanner: () => {}, preload: () => {} });

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; trip?: TripType; key: number }>({ open: false, key: 0 });
  const opener = useRef<HTMLElement | null>(null);

  const openPlanner = useCallback((opts?: OpenOptions) => {
    opener.current = (document.activeElement as HTMLElement) ?? null;
    setState((s) => ({ open: true, trip: opts?.trip, key: s.key + 1 }));
  }, []);

  const preload = useCallback(() => {
    void import("@/components/StayPlanner/PlannerModal");
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    const el = opener.current;
    if (el && typeof el.focus === "function") requestAnimationFrame(() => el.focus());
  }, []);

  return (
    <PlannerContext.Provider value={{ openPlanner, preload }}>
      {children}
      {state.open && <PlannerModal key={state.key} initialTrip={state.trip} onClose={close} />}
    </PlannerContext.Provider>
  );
}

export const usePlanner = () => useContext(PlannerContext);
