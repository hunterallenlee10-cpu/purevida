"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { CheckDatesButton } from "@/components/ui/CheckDatesButton";
import { business } from "@/lib/business";
import { messageHref } from "@/lib/contact";

// Mobile only: [Message] [Airbnb] [Check dates]. "Message" opens WhatsApp when the number exists, otherwise Airbnb.
export function MobileBar() {
  const { t } = useLang();
  const item = "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[0.8125rem] font-semibold";
  return (
    <nav
      aria-label={t.mobileBar.label}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-limestone/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:hidden"
    >
      <div className="flex items-stretch gap-2">
        <a href={messageHref} target="_blank" rel="noopener" className={`${item} text-ink`}>
          <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.5} />
          {t.mobileBar.message}
        </a>
        <a href={business.links.airbnb} target="_blank" rel="noopener" className={`${item} text-ink`}>
          <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
          {t.mobileBar.airbnb}
        </a>
        <CheckDatesButton
          className="btn btn-primary min-h-12 flex-[1.4] rounded-xl px-3 text-[0.9375rem]"
          label={t.mobileBar.check}
        />
      </div>
    </nav>
  );
}
