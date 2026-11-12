import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { PlannerProvider } from "@/components/providers/PlannerProvider";
import { isLive, siteUrl } from "@/lib/site";
import "./globals.css";

// Fraunces (Google Fonts, OFL), self-hosted at its display optical size: 55 KB instead of 149 KB for the full family.
const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces144-Variable.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/Fraunces144-400-Italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

// Vercel Web Analytics only exists on Vercel deployments; elsewhere its script would 404.
const onVercel = process.env.VERCEL === "1";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Casa Esmeralda Ridge",
  authors: [{ name: "Pura Vida Sloth Escapes" }],
  // The launch switch: demo serves noindex, nofollow. Live serves index, follow.
  robots: isLive
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
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
        {onVercel && <Analytics />}
      </body>
    </html>
  );
}
