import type { Metadata } from "next";
import Image from "next/image";

import { CustomSuitForm } from "@/components/forms/custom-suit-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { customSuitJourney } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Custom Suits",
  description:
    "Start a custom suit consultation with Mr. Sergio for weddings, prom, and formal events.",
};

export default function CustomSuitsPage() {
  return (
    <div className="space-y-14 pb-10">
      <section className="section-frame p-7 md:p-11">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal className="space-y-5">
            <SectionTitle
              eyebrow="Custom Suits"
              title="Personalized Formalwear, Guided Start To Finish"
              description="From event consultation to fit profile and final styling, custom inquiries are handled with a boutique process built around confidence and precision."
            />
            <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              Best for grooms, prom nights, milestone celebrations, and clients who want a complete style direction rather than a single item.
            </p>
          </Reveal>
          <Reveal delayMs={130}>
            <div className="product-wood-frame mx-auto w-full max-w-sm p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/media/instagram/images/look-10.jpg"
                  alt="Custom suit concept"
                  fill
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="seam-divider space-y-8">
        <SectionTitle
          eyebrow="Experience"
          title="How The Custom Process Works"
          description="Each step is tailored to your event timeline, style preferences, and fit priorities."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {customSuitJourney.map((phase, index) => (
            <Reveal key={phase.step} delayMs={index * 90}>
              <article className="section-frame p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                  Step {phase.step}
                </p>
                <h3 className="mt-2 font-display text-3xl text-[var(--paper)]">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{phase.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="seam-divider">
        <Reveal>
          <CustomSuitForm />
        </Reveal>
      </section>
    </div>
  );
}


