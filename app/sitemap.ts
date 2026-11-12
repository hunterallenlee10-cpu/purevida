import type { MetadataRoute } from "next";
import { absolute, isLive, lastModified } from "@/lib/site";

// Demo mode: an empty sitemap. Live mode: every page with its real last-modified date.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLive) return [];
  return [
    { url: absolute("/"), lastModified: lastModified.home, changeFrequency: "monthly", priority: 1 },
    { url: absolute("/contact"), lastModified: lastModified.contact, changeFrequency: "yearly", priority: 0.6 },
  ];
}
