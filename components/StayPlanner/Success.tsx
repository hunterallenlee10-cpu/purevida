"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, MessageCircle, MessageSquareText } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { business } from "@/lib/business";
import { hasWhatsapp, smsLink, whatsappLink } from "@/lib/contact";
import { buildMessage, copyText, datesLabel, nightsBetween, type PlannerState } from "./state";

// Front-end only: nothing is sent anywhere. The guest carries the message to Melina themselves.
export function Success({ s, H, onRestart }: { s: PlannerState; H: "h2" | "h3"; onRestart: () => void }) {
  const { t, lang } = useLang();
  const d = t.planner.done;
  const [copied, setCopied] = useState(false);
  const msg = buildMessage(s, lang, t);
  const nights = nightsBetween(s.from, s.to);
  const guests = `${s.adults} ${t.planner.message.adults}${s.children ? `, ${s.children} ${t.planner.message.children}` : ""}`;

  const rows: [string, string][] = [
    [d.dates, datesLabel(s, lang, t)],
    ...(nights ? ([[d.nights, String(nights)]] as [string, string][]) : []),
    [d.guests, guests],
    ...(s.pet ? ([[d.pet, t.planner.who.yes]] as [string, string][]) : []),
    ...(s.trip ? ([[d.trip, t.planner.trip.types[s.trip]]] as [string, string][]) : []),
    ...(s.note.trim() ? ([[d.note, s.note.trim()]] as [string, string][]) : []),
  ];

  const big = "btn w-full min-h-14 whitespace-normal py-3 text-center text-[1.0625rem] leading-snug";

  return (
    <div className="step-fwd">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-white">
        <Check aria-hidden="true" className="size-7" strokeWidth={2} />
      </span>
      {/* DRAFT: confirm reply method and timing with Melina. */}
      <H className="mt-5 max-w-[22ch] font-display text-[1.75rem] leading-tight sm:text-[2rem]" tabIndex={-1} data-autofocus>
        {d.title}
      </H>

      <div className="mt-6 rounded-2xl border border-line bg-limestone p-5">
        <p className="eyebrow text-[0.75rem] text-muted">{d.summary}</p>
        <dl className="mt-3 divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-2.5 text-[0.9375rem]">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 grid gap-3">
        {hasWhatsapp ? (
          <>
            <a href={whatsappLink(msg)} target="_blank" rel="noopener" className={`${big} btn-primary`}>
              <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.5} />
              {d.whatsapp}
            </a>
            <a href={smsLink(msg)} className={`${big} btn-outline`}>
              <MessageSquareText aria-hidden="true" className="size-5" strokeWidth={1.5} />
              {d.sms}
            </a>
          </>
        ) : (
          // While the WhatsApp number is empty: copy the message, then open the listing so it can be pasted to Melina there.
          <a
            href={business.links.airbnb}
            target="_blank"
            rel="noopener"
            className={`${big} btn-primary`}
            onClick={() => {
              void copyText(msg).then((ok) => setCopied(ok));
            }}
          >
            {copied ? <Check aria-hidden="true" className="size-5" strokeWidth={2} /> : <Copy aria-hidden="true" className="size-5" strokeWidth={1.5} />}
            {d.copyOpen}
          </a>
        )}
        <a href={business.links.airbnb} target="_blank" rel="noopener" className={`${big} btn-outline`}>
          {d.airbnb}
          <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </a>
      </div>

      <p className="mt-4 text-[0.9375rem] text-muted" role="status" aria-live="polite">
        {copied ? d.copied : hasWhatsapp ? "" : d.fallbackNote}
      </p>

      <button type="button" onClick={onRestart} className="link-underline mt-4 min-h-11 text-[0.9375rem] font-semibold">
        {d.again}
      </button>
    </div>
  );
}
