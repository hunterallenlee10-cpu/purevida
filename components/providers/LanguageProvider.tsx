"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Copy, type Lang } from "@/lib/copy";

type Ctx = { lang: Lang; t: Copy; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx>({ lang: "en", t: copy.en, setLang: () => {} });

const KEY = "ce-lang";

// The server always renders English (one language for search, no hreflang).
// The toggle swaps copy on the client and updates <html lang>.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "es") setLangState("es");
    } catch {
      /* storage unavailable: stay in English */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: copy[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
