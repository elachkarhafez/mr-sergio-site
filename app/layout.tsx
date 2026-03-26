import type { Metadata } from "next";
import { Bodoni_Moda, Sora } from "next/font/google";

import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { baseMetadata, getLocalBusinessSchema } from "@/lib/metadata";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getLocalBusinessSchema();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="ambient-glow" aria-hidden />
        <div className="royal-wave-field" aria-hidden />
        <div className="royal-crest-flow" aria-hidden />
        <div className="gold-vine-flow" aria-hidden />

        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 pt-10 lg:px-8">{children}</main>
        <SiteFooter />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}


