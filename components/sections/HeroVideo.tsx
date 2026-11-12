"use client";

import { useEffect, useRef, useState } from "react";

// AI-generated visual (Higgsfield), approved by Hunter. Swap for real footage when the owner supplies it.
// The loop is only mounted on screens 768px and wider, without Save-Data and without reduced motion.
// Everyone else keeps the poster still that is already on screen, so the video is never fetched on phones.
export function HeroVideo() {
  const [mount, setMount] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || reduced || nav.connection?.saveData) return;
    // Let the page settle (and the poster paint) before asking for the clip.
    const w = window as Window & { requestIdleCallback?: (c: () => void, o?: { timeout: number }) => number };
    const idle = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 1500 }) : window.setTimeout(cb, 600));
    idle(() => setMount(true));
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p) p.catch(() => {/* autoplay refused: the poster stays */});
  }, [mount]);

  if (!mount) return null;
  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/media/generated/gen-03-hero-poster.webp"
      width={1600}
      height={1200}
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover object-[80%_55%] transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
    >
      <source src="/media/generated/gen-02-hero-pool-waterfall-loop-webm.webm" type="video/webm" />
      <source src="/media/generated/gen-01-hero-pool-waterfall-loop.mp4" type="video/mp4" />
    </video>
  );
}
