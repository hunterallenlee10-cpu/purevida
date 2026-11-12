import type { Copy, Lang } from "@/lib/copy";
import type { TripType } from "@/lib/day";
import { business } from "@/lib/business";

export type PlannerState = {
  from?: Date;
  to?: Date;
  flexible: boolean;
  flexibleText: string;
  adults: number;
  children: number;
  // DRAFT: pet policy and any fee to be confirmed by Melina.
  pet: boolean | null;
  trip?: TripType;
  note: string;
  name: string;
  phone: string;
  email: string;
};

export const MAX_GUESTS = business.home.guests;

export const initialState = (trip?: TripType): PlannerState => ({
  flexible: false,
  flexibleText: "",
  adults: 2,
  children: 0,
  pet: null,
  trip,
  note: "",
  name: "",
  phone: "+506 ",
  email: "",
});

export const nightsBetween = (from?: Date, to?: Date) =>
  from && to ? Math.max(0, Math.round((to.getTime() - from.getTime()) / 86_400_000)) : 0;

export const fmtDate = (d: Date, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "es" ? "es-CR" : "en-US", { weekday: "short", month: "short", day: "numeric" }).format(d);

export function datesLabel(s: PlannerState, lang: Lang, t: Copy) {
  if (s.from && s.to) {
    const sep = lang === "es" ? " al " : " to ";
    return `${fmtDate(s.from, lang)}${sep}${fmtDate(s.to, lang)}`;
  }
  return s.flexibleText.trim() ? `${t.planner.done.flexible}: ${s.flexibleText.trim()}` : t.planner.done.flexible;
}

export const phoneDigits = (p: string) => p.replace(/\D/g, "");

export function stepError(step: number, s: PlannerState, t: Copy): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 0) {
    const n = nightsBetween(s.from, s.to);
    if (!s.flexible && n < 1) e.dates = t.planner.when.needDates;
  }
  if (step === 3) {
    if (!s.name.trim()) e.name = t.planner.info.nameError;
    const d = phoneDigits(s.phone);
    // A real number has at least 8 digits after the country code (Costa Rica: +506 and 8 digits).
    if (d.length < 8 || d.length > 15 || (d.startsWith("506") && d.length !== 11 && d.length !== 8)) e.phone = t.planner.info.phoneError;
    if (s.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) e.email = t.planner.info.emailError;
  }
  return e;
}

/** The message Melina receives, in the language the site is set to. */
export function buildMessage(s: PlannerState, lang: Lang, t: Copy) {
  const m = t.planner.message;
  const n = nightsBetween(s.from, s.to);
  const lines = [m.hello, ""];
  if (s.from && s.to) lines.push(`${m.dates}: ${datesLabel(s, lang, t)} (${t.planner.when.nights(n)})`);
  else lines.push(`${m.dates}: ${m.flexible}${s.flexibleText.trim() ? `, ${s.flexibleText.trim()}` : ""}`);
  const kids = s.children ? `, ${s.children} ${m.children}` : "";
  lines.push(`${m.guests}: ${s.adults} ${m.adults}${kids}`);
  if (s.pet) lines.push(m.pet);
  if (s.trip) lines.push(`${m.trip}: ${t.planner.trip.types[s.trip]}`);
  if (s.note.trim()) lines.push(`${m.note}: ${s.note.trim()}`);
  lines.push("", `${m.name}: ${s.name.trim()}`, `${m.phone}: ${s.phone.trim()}`);
  if (s.email.trim()) lines.push(`${m.email}: ${s.email.trim()}`);
  lines.push("", m.thanks);
  return lines.join("\n");
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
