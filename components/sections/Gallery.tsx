"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { filters, galleryPhotos, src, type Category } from "@/lib/gallery";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

const INITIAL = 12;

// 2 columns on phones, 3 on tablets, 4 on desktop.
function useColumnCount() {
  const [n, setN] = useState(2);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setN(lg.matches ? 4 : md.matches ? 3 : 2);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);
  return n;
}

// Masonry of the real listing photos (41 is left out: empty sky). No generated visuals here, ever.
export function Gallery() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const list = useMemo(
    () => (filter === "all" ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter)),
    [filter]
  );
  const visible = filter === "all" && !expanded ? list.slice(0, INITIAL) : list;
  const cols = useColumnCount();
  // Balanced masonry: each photo goes into the currently shortest column, so the columns end level.
  const columns = useMemo(() => {
    const out: { p: (typeof visible)[number]; i: number }[][] = Array.from({ length: cols }, () => []);
    const heights = new Array(cols).fill(0);
    visible.forEach((p, i) => {
      const c = heights.indexOf(Math.min(...heights));
      out[c].push({ p, i });
      heights[c] += p.height / p.width;
    });
    return out;
  }, [visible, cols]);
  const more = lang === "es" ? `Ver las ${list.length} fotos` : `Show all ${list.length} photos`;

  return (
    <section aria-labelledby="gallery-title" className="section bg-surface">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="gallery-title" className="h2">{t.gallery.title}</h2>
          <div role="group" aria-label={t.gallery.filtersLabel} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                  filter === f.key ? "border-ink bg-ink text-limestone" : "border-line bg-limestone text-ink hover:border-ink/40"
                }`}
              >
                {f[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-start gap-3 sm:gap-4 lg:mt-12">
          {columns.map((col, c) => (
            <ul key={c} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
              {col.map(({ p, i }) => (
                <li key={p.file}>
                  <button
                    type="button"
                    onClick={(e) => {
                      opener.current = e.currentTarget;
                      setOpen(i);
                    }}
                    className="group block w-full overflow-hidden rounded-2xl"
                  >
                    <span className="sr-only">{t.gallery.open}: </span>
                    <Image
                      src={src(p)}
                      alt={p.alt[lang]}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 1024px) 300px, (min-width: 768px) 32vw, 48vw"
                      className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {filter === "all" && !expanded && list.length > INITIAL && (
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setExpanded(true)} className="btn btn-outline">
              {more}
            </button>
          </div>
        )}
      </div>

      {open !== null && (
        <Lightbox
          photos={list}
          index={open}
          onIndex={setOpen}
          onClose={() => {
            setOpen(null);
            requestAnimationFrame(() => opener.current?.focus());
          }}
        />
      )}
    </section>
  );
}
