import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { restaurant } from "@/lib/restaurant";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"]
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

const SEO_TITLE = `${restaurant.name} | Kneipe im ${restaurant.address.city}er Lindenhof`;
const SEO_DESCRIPTION = `${restaurant.name} in ${restaurant.address.city}, ${restaurant.address.street}. Traditionelle Kneipe im Lindenhof mit Tresen, Getränken und Musik. Öffnungszeiten und Kontakt auf einen Blick.`;

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: [
    restaurant.name,
    `${restaurant.name} ${restaurant.address.city}`,
    `Kneipe ${restaurant.address.city}`,
    `Kneipe Lindenhof`,
    `Bar ${restaurant.address.city}`,
    `Eckkneipe ${restaurant.address.city}`,
  ],
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    locale: restaurant.seo.locale,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="grain overflow-x-hidden bg-bone text-ink">
        {children}
      </body>
    </html>
  );
}
