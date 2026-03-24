import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Mr. Sergio, a Dearborn Heights menswear boutique focused on premium suits and formalwear styling.",
};

export default function AboutPage() {
  return (
    <div className="space-y-14 pb-10">
      <section className="section-frame p-7 md:p-11">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <Reveal className="space-y-5">
            <SectionTitle
              eyebrow="About"
              title="A Local Boutique With A Formalwear-First Point Of View"
              description="Mr. Sergio serves Dearborn Heights with style-driven menswear focused on suits, occasion dressing, and confidence-building presentation."
            />
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              The brand&apos;s public presence and customer feedback highlight quality, personalized help, and strong event-focused outfit options. This site is designed to reflect that experience digitally with a luxury editorial tone and practical inquiry flow.
            </p>
          </Reveal>

          <Reveal delayMs={140} className="mx-auto w-full max-w-xs">
            <div className="section-frame p-6 text-center">
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-[var(--line)] bg-white/95">
                <Image
                  src="/media/brand/mr-sergio-crest.jpg"
                  alt="Mr. Sergio crest mark"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                Signature Crest
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Grayscale emblem and formal portrait styling reinforce the boutique&apos;s premium menswear identity.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="seam-divider grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Service Lens",
            body: "Fit, event timing, and outfit cohesion are treated as part of the same decision, not separate purchases.",
          },
          {
            title: "Style Lens",
            body: "Tailored silhouettes, eveningwear confidence, and modern masculine polish shape the visual language.",
          },
          {
            title: "Local Lens",
            body: `${business.name} is rooted in Dearborn Heights with in-store guidance for wedding parties, prom season, and formal occasions.`,
          },
        ].map((item, index) => (
          <Reveal key={item.title} delayMs={index * 80}>
            <article className="section-frame h-full p-6">
              <h3 className="font-display text-3xl text-[var(--paper)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}


