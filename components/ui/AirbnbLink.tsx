"use client";

import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/business";
import { useLang } from "@/components/providers/LanguageProvider";

// The real booking link. Always the second path next to "Check My Dates".
export function AirbnbLink({ className = "btn btn-outline", label }: { className?: string; label?: string }) {
  const { t } = useLang();
  return (
    <a href={business.links.airbnb} target="_blank" rel="noopener" className={className}>
      {label ?? t.nav.bookAirbnb}
      <ArrowUpRight aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
    </a>
  );
}
