import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

/* Black + Beige editorial design system: Bodoni display, restrained Manrope UI, cinematic black, warm beige, and cream reading surfaces. */

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
	  sameAs: ["https://www.instagram.com/shanzae.zia", "https://web.facebook.com/profile.php?id=100093684345361&mibextid=wwXIfr&rdid=jvVymqPxal1qmv77&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1BhxBYzeFS%2F%3Fmibextid%3DwwXIfr%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26_rdc%3D1%26_rdr%23", "https://www.tiktok.com/@shanzu.photoworks?_r=1&_t=ZS-92NKUYwFHYW&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaebZ80SnLFRBT8u-HePBECmJxPPPVVTDqjpbdc1sNIkVzXAXEHsbVeDoeBhjA_aem_ltcUyFn-XgVUlN1bX0HpTA"],
	},
    {
      "@type": "ProfessionalService",
      name: "Shanzae Zia Photography",
	  description: "Professional wedding photography, cinematic videography and visual storytelling.",
	  areaServed: { "@type": "City", name: "Islamabad" },
	  telephone: "+923095921582",
	  sameAs: ["https://www.instagram.com/shanzae.zia", "https://web.facebook.com/profile.php?id=100093684345361&mibextid=wwXIfr&rdid=jvVymqPxal1qmv77&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1BhxBYzeFS%2F%3Fmibextid%3DwwXIfr%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26_rdc%3D1%26_rdr%23", "https://www.tiktok.com/@shanzu.photoworks?_r=1&_t=ZS-92NKUYwFHYW&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaebZ80SnLFRBT8u-HePBECmJxPPPVVTDqjpbdc1sNIkVzXAXEHsbVeDoeBhjA_aem_ltcUyFn-XgVUlN1bX0HpTA"],
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
  icons: { icon: "/manus-storage/shanzae-supplied-logo_84810e5d.png" },
};

export const viewport: Viewport = { themeColor: "#0B0B0A" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bodoni.variable} ${manrope.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
