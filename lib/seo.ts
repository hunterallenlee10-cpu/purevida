import type { Metadata } from "next";

// Next merges metadata shallowly, so every page sets its full Open Graph and Twitter objects here.
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Casa Esmeralda Ridge, your own pool in Herradura, Costa Rica",
};

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Casa Esmeralda Ridge",
      locale: "en_US",
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
