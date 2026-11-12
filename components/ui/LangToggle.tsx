"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import type { Lang } from "@/lib/copy";

// EN | ES as a two-option button group.
export function LangToggle({ tone = "ink", className = "" }: { tone?: "ink" | "light"; className?: string }) {
  const { lang, setLang, t } = useLang();
  const base = tone === "light" ? "text-limestone" : "text-ink";
  const opts: { l: Lang; label: string; name: string }[] = [
    { l: "en", label: "EN", name: "English" },
    { l: "es", label: "ES", name: "Español" },
  ];
  return (
    <div role="group" aria-label={t.meta.langLabel} className={`inline-flex items-center ${base} ${className}`}>
      {opts.map((o, i) => (
        <span key={o.l} className="inline-flex items-center">
          {i > 0 && <span aria-hidden="true" className="opacity-50">|</span>}
          <button
            type="button"
            lang={o.l}
            aria-pressed={lang === o.l}
            aria-label={o.name}
            onClick={() => setLang(o.l)}
            className={`min-h-11 min-w-11 px-1.5 text-[0.8125rem] font-semibold tracking-[0.12em] transition-opacity ${
              lang === o.l ? "opacity-100 underline decoration-2 underline-offset-[6px]" : "opacity-65 hover:opacity-100"
            }`}
          >
            {o.label}
          </button>
        </span>
      ))}
    </div>
  );
}
