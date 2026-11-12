import Image from "next/image";

// "Casa Esmeralda" in Fraunces 600, "RIDGE" in Hanken Grotesk 600 small caps, beside the round sloth badge.
// The badge exists only as a 194px screenshot, so it is never shown larger than 64px.
export function Wordmark({ size = "nav", tone = "ink" }: { size?: "nav" | "footer"; tone?: "ink" | "light" }) {
  const badge = size === "nav" ? 40 : 56;
  const color = tone === "light" ? "text-limestone" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-3 ${color}`}>
      <Image
        src={badge === 40 ? "/brand/sloth-badge-80.webp" : "/brand/sloth-badge-112.webp"}
        unoptimized
        alt=""
        width={badge}
        height={badge}
        className="shrink-0 rounded-full ring-1 ring-line/60"
        priority={size === "nav"}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-semibold tracking-[0.015em] ${size === "nav" ? "text-[1.3125rem]" : "text-[1.625rem]"}`}>
          Casa Esmeralda
        </span>
        <span className={`mt-1 font-sans font-semibold uppercase tracking-[0.3em] ${size === "nav" ? "text-[0.6875rem]" : "text-[0.75rem]"}`}>
          Ridge
        </span>
      </span>
    </span>
  );
}
