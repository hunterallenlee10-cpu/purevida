import type { Photo } from "./gallery";

/**
 * `sizes` for an object-fit: cover image. When the frame's shape differs from the photo's,
 * cover crops the photo and the browser needs a wider file than the frame's width.
 * `frameAspect` is the frame's width / height; `slots` are normal sizes entries ("(min-width: 640px) 300px", "78vw").
 * Each width is multiplied by how much the crop enlarges the photo, rounded up.
 */
export function coverSizes(p: Pick<Photo, "width" | "height">, frameAspect: number, slots: string[]): string {
  const factor = Math.max(1, p.width / p.height / frameAspect);
  return slots
    .map((slot) =>
      slot.replace(/(\d+(?:\.\d+)?)(px|vw|vh)\s*$/, (_, n: string, unit: string) => `${Math.ceil(Number(n) * factor)}${unit}`)
    )
    .join(", ");
}
