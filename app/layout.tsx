import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { PlannerProvider } from "@/components/providers/PlannerProvider";
import { isLive, siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Casa Esmeralda Ridge",
  authors: [{ name: "Pura Vida Sloth Escapes" }],
  // The launch switch: demo serves noindex, nofollow. Live serves index, follow.
  robots: isLive
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    siteName: "Casa Esmeralda Ridge",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Casa Esmeralda Ridge, your own pool in Herradura, Costa Rica" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#1E3B2F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <LanguageProvider>
          <PlannerProvider>{children}</PlannerProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
