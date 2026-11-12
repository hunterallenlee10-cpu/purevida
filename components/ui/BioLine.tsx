import { business } from "@/lib/business";

// The host's Instagram bio, "Pool • Nature • Sloths • Adventure", with the bullets as small accent dots.
export function BioLine({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const dot = dark ? "bg-accent-light" : "bg-accent";
  return (
    <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 ${className}`}>
      {business.bioLine.map((w, i) => (
        <span key={w} className="inline-flex items-center gap-2.5 whitespace-nowrap">
          <span>{w}</span>
          {i < business.bioLine.length - 1 && <span aria-hidden="true" className={`inline-block size-1.5 rounded-full ${dot}`} />}
        </span>
      ))}
    </p>
  );
}
