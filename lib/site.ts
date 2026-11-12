// The launch switch. Everything about indexing is driven from here.
// demo (default): robots noindex, nofollow. No sitemap. Concept footer line shows.
// live: robots index, follow. Sitemap listed. Concept footer line hidden.

export type SiteMode = "demo" | "live";

export const siteMode: SiteMode = process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const isLive = siteMode === "live";

function resolveUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveUrl();

export const absolute = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

// Real last-modified dates for the sitemap. Update when a page changes.
export const lastModified = {
  home: "2026-11-12",
  contact: "2026-11-12",
};
