import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

/* Violet Aperture design system: editorial Bodoni display type, restrained Manrope UI, and a photographic black-white-violet palette. */

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Shanzae Zia",
      jobTitle: "Wedding Photographer and Visual Storyteller",
      sameAs: ["https://www.instagram.com/shanzae.zia"],
    },
    {
      "@type": "ProfessionalService",
      name: "Shanzae Zia Photography",
      description: "Professional wedding photography, cinematic videography and visual storytelling.",
      areaServed: { "@type": "City", name: "Islamabad" },
      telephone: "+923095921582",
      sameAs: ["https://www.instagram.com/shanzae.zia"],
    },
  ],
};

export const metadata: Metadata = {
  title: "Shanzae Zia | Wedding Photographer & Cinematic Photography",
  description: "Shanzae Zia is a professional wedding photographer specializing in wedding photography, cinematic videography, portraits, travel, aerial photography and visual storytelling.",
  openGraph: {
    title: "Shanzae Zia | Wedding & Cinematic Photographer",
    description: "Professional wedding photography, cinematic videography and visual storytelling by Shanzae Zia.",
  },
  icons: { icon: "/images/shanzae/brand/still-frame-mark-64.png" },
};

export const viewport: Viewport = { themeColor: "#5A1BB7" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bodoni.variable} ${manrope.variable}`}>
      <body>
        <link
          rel="preload"
          as="image"
          href="/images/shanzae/responsive/still-frame-story-02-640w.avif"
          imageSrcSet="/images/shanzae/responsive/still-frame-story-02-320w.avif 320w, /images/shanzae/responsive/still-frame-story-02-480w.avif 480w, /images/shanzae/responsive/still-frame-story-02-640w.avif 640w, /images/shanzae/responsive/still-frame-story-02-768w.avif 768w, /images/shanzae/responsive/still-frame-story-02-900w.avif 900w, /images/shanzae/responsive/still-frame-story-02-1600w.avif 1600w"
          imageSizes="(min-width: 1280px) 1150px, (min-width: 768px) 88vw, 100vw"
          type="image/avif"
        />
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
