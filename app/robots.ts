import type { MetadataRoute } from "next";
import { isLive, siteUrl } from "@/lib/site";

// Crawling is always allowed so the robots meta can be read. Demo pages carry noindex, nofollow; live lists the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(isLive ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
