"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { CheckDatesButton } from "@/components/ui/CheckDatesButton";
import { dayStops, SUNSET_INDEX } from "@/lib/day";
import { photo, src } from "@/lib/gallery";

const STEP = 100; // the range runs 0..500 so dragging feels continuous, then snaps to one of six stops
const MAX = (dayStops.length - 1) * STEP;
const focal: Record<string, string> = { "09": "50% 62%", "03": "50% 55%", "25": "50% 60%", "05": "50% 50%", "02": "50% 55%", "14": "45% 55%" };

// "A Day at Casa Esmeralda": the show-stopper. A real range input, styled, with six snapping stops.
export function DayDial() {
  const { t, lang } = useLang();
  const [value, setValue] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [near, setNear] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timers = useRef<number[]>([]);
  const played = useRef(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const active = Math.round(value / STEP);
  const stop = dayStops[active];
  const dark = stop.dark;

  const cancelAuto = useCallback(() => {
    played.current = true;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const goTo = useCallback((i: number) => {
    cancelAuto();
    setValue(Math.max(0, Math.min(dayStops.length - 1, i)) * STEP);
  }, [cancelAuto]);

  // Load the six photos once the section is close, then auto-play Morning to Sunset once when it is in view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); nearObs.disconnect(); }
    }, { rootMargin: "600px 0px" });
    nearObs.observe(el);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const playObs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || played.current) return;
      played.current = true;
      playObs.disconnect();
      if (reduced) return;
      // 400ms travel + 600ms pause per stop: Sunset is reached at 4 seconds.
      for (let i = 1; i <= SUNSET_INDEX; i++) {
        timers.current.push(window.setTimeout(() => setValue(i * STEP), 600 + (i - 1) * 1000));
      }
    }, { threshold: 0.45 });
    playObs.observe(el);
    return () => {
      nearObs.disconnect();
      playObs.disconnect();
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const map: Record<string, number> = {
      ArrowRight: active + 1, ArrowUp: active + 1, PageUp: active + 1,
      ArrowLeft: active - 1, ArrowDown: active - 1, PageDown: active - 1,
      Home: 0, End: dayStops.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      goTo(map[e.key]);
    }
  };

  const snap = () => {
    setDragging(false);
    setValue((v) => Math.round(v / STEP) * STEP);
  };

  const onStageDown = (e: PointerEvent<HTMLDivElement>) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onStageUp = (e: PointerEvent<HTMLDivElement>) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) goTo(active + (dx < 0 ? 1 : -1));
  };

  const fg = dark ? "text-limestone" : "text-ink";
  const muted = dark ? "text-limestone/80" : "text-muted";
  const accentText = dark ? "text-accent-light" : "text-accent";
  const pct = value / MAX;

  return (
    <section
      id="a-day-here"
      ref={sectionRef}
      aria-labelledby="day-title"
      className={`section transition-colors duration-500 ${dark ? "on-dark" : ""} ${fg}`}
      style={{ backgroundColor: stop.tint }}
    >
      <div className="container-x">
        <div className="mx-auto max-w-[1080px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="day-title" className="h2 max-w-[16ch]">{t.day.title}</h2>
            <p className={`max-w-[34ch] text-[1.0625rem] ${muted}`}>{t.day.sub}</p>
          </div>

          {/* Stage: one real photo at a time, crossfading over 500ms. Swipe to move a stop. */}
          <div
            className="relative mt-10 aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-[20px] bg-jungle sm:aspect-[16/10] lg:mt-12"
            onPointerDown={onStageDown}
            onPointerUp={onStageUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            {dayStops.map((s, i) => {
              const p = photo(s.photo);
              const show = i === active;
              if (!near && i !== 0) return null;
              return (
                <Image
                  key={s.key}
                  src={src(p)}
                  alt={show ? p.alt[lang] : ""}
                  aria-hidden={show ? undefined : true}
                  fill
                  draggable={false}
                  sizes="(min-width: 1160px) 1080px, 100vw"
                  className={`object-cover transition-opacity duration-500 ease-out ${show ? "opacity-100" : "opacity-0"}`}
                  style={{ objectPosition: focal[s.photo] }}
                />
              );
            })}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(19,41,31,0.82)] via-[rgba(19,41,31,0.25)] via-45% to-transparent sm:bg-gradient-to-tr sm:via-[rgba(19,41,31,0.2)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-limestone sm:p-10">
              <p className="font-display leading-none">
                <span className="block text-[3.5rem] tracking-[-0.02em] sm:text-[5rem] [font-variation-settings:'opsz'_144]">{stop.time}</span>
                <span className="mt-2 block text-[1.5rem] sm:text-[2rem]">{stop.name[lang]}</span>
              </p>
              <p className="mt-3 max-w-[40ch] text-[1rem] leading-relaxed text-limestone/95 sm:text-[1.0625rem]">{stop.line[lang]}</p>
            </div>
          </div>

          {/* The dial: a thin track with a sun handle. It is a real range input underneath. */}
          <div className="mt-8">
            <div className="relative h-11">
              <div aria-hidden="true" className={`absolute inset-x-[22px] top-1/2 h-px -translate-y-1/2 ${dark ? "bg-limestone/35" : "bg-ink/25"}`} />
              <div
                aria-hidden="true"
                className={`absolute left-[22px] top-1/2 h-[2px] -translate-y-1/2 ${dark ? "bg-accent-light" : "bg-accent"} ${dragging ? "" : "transition-[width] duration-[400ms] ease-out"}`}
                style={{ width: `calc(${pct} * (100% - 44px))` }}
              />
              {dayStops.map((s, i) => (
                <span
                  key={s.key}
                  aria-hidden="true"
                  className={`absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${i <= active ? (dark ? "bg-accent-light" : "bg-accent") : dark ? "bg-limestone/45" : "bg-ink/30"}`}
                  style={{ left: `calc(22px + ${i / (dayStops.length - 1)} * (100% - 44px))` }}
                />
              ))}
              <input
                type="range"
                min={0}
                max={MAX}
                step={1}
                value={value}
                aria-label={t.day.dialLabel}
                aria-valuetext={`${stop.name[lang]}, ${stop.time}`}
                onChange={(e) => { cancelAuto(); setDragging(true); setValue(Number(e.target.value)); }}
                onPointerDown={cancelAuto}
                onPointerUp={snap}
                onTouchEnd={snap}
                onBlur={() => dragging && snap()}
                onKeyDown={onKey}
                className="day-range peer absolute inset-0 z-10 m-0 h-11 w-full cursor-grab opacity-0 active:cursor-grabbing"
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 inline-flex size-11 items-center justify-center rounded-full border shadow-[0_6px_18px_rgba(19,41,31,0.18)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ${
                  dark ? "border-limestone/30 bg-jungle text-accent-light peer-focus-visible:outline-accent-light" : "border-line bg-surface text-accent peer-focus-visible:outline-accent"
                } ${dragging ? "" : "transition-[left] duration-[400ms] ease-out"}`}
                style={{ left: `calc(${pct} * (100% - 44px))` }}
              >
                {dark ? <Moon className="size-5" strokeWidth={1.5} /> : <Sun className="size-5" strokeWidth={1.5} />}
              </span>
            </div>

            <ol className="relative mt-2 h-12 sm:h-14">
              {dayStops.map((s, i) => {
                const last = i === dayStops.length - 1;
                const pos = i === 0 ? { left: 0 } : last ? { right: 0 } : { left: `calc(22px + ${i / (dayStops.length - 1)} * (100% - 44px))` };
                return (
                  <li key={s.key} className={`absolute top-0 ${i > 0 && !last ? "-translate-x-1/2" : ""}`} style={pos}>
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => goTo(i)}
                      className={`flex min-h-11 flex-col whitespace-nowrap leading-tight ${i === 0 ? "items-start" : last ? "items-end" : "items-center"} ${i === active ? `${accentText} font-semibold` : muted}`}
                    >
                      <span className="text-[0.8125rem] tabular-nums">{s.time}</span>
                      <span className="sr-only sm:not-sr-only sm:text-[0.9375rem]">{s.name[lang]}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className={`mt-2 text-center text-[0.875rem] ${muted}`}>{t.day.hint}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <CheckDatesButton trip={stop.trip} label={t.day.bookDay} />
            <a href="#the-house" className={`link-underline inline-flex min-h-11 items-center font-semibold ${fg}`}>
              {t.day.seeRooms}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
