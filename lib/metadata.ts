import type { Metadata } from "next";

import { business, weeklyHours } from "@/lib/site-data";

const defaultUrl = "https://mr-sergio-site.vercel.app";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : defaultUrl;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Dearborn Heights Menswear`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${business.name} | Dearborn Heights Menswear`,
    description: business.description,
    url: siteUrl,
    siteName: business.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/media/instagram/images/look-01.jpg",
        width: 1200,
        height: 1600,
        alt: `${business.name} editorial showcase`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Dearborn Heights Menswear`,
    description: business.description,
    images: ["/media/instagram/images/look-01.jpg"],
  },
};

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: business.name,
    description: business.description,
    telephone: business.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "22732 Ford Rd",
      addressLocality: "Dearborn Heights",
      addressRegion: "MI",
      postalCode: "48127",
      addressCountry: "US",
    },
    sameAs: [business.instagramUrl],
    openingHoursSpecification: weeklyHours.map((entry) => {
      const [open, close] = entry.hours.split(" - ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.day,
        opens: open,
        closes: close,
      };
    }),
  };
}


