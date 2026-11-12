"use client";

import Link from "next/link";
import { useLang } from "@/components/providers/LanguageProvider";

export function NotFoundCopy() {
  const { t } = useLang();
  return (
    <div>
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,1.6rem+3.8vw,4.5rem)] leading-[1.02]">{t.notFound.title}</h1>
      <p className="lede mt-5">{t.notFound.sub}</p>
      <Link href="/" className="btn btn-primary mt-8">{t.notFound.home}</Link>
    </div>
  );
}
