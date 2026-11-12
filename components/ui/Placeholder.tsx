import { ImageOff } from "lucide-react";

// A clean, labelled stand-in for a photo the host has not supplied yet. DRAFT: replace with the real photo.
export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`placeholder ${className}`} role="img" aria-label={label}>
      <ImageOff aria-hidden="true" className="size-5 text-muted" strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}
