import type { ReactNode } from "react";

// The arch frame from the bathroom mirror (photo 20): a tall rectangle with a fully rounded top
// and a 1px keyline 8px outside the image. Used in four places only.
export function Arch({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`arch ${className}`}>
      <div className="arch-inner">{children}</div>
    </div>
  );
}
