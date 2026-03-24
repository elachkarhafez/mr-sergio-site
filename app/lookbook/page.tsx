import type { Metadata } from "next";
import Link from "next/link";

import { LookFrame } from "@/components/ui/look-frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { lookbookFrames, mediaFallbackNotes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Editorial lookbook direction for Mr. Sergio formalwear, suiting, and event styling.",
};

export default function LookbookPage() {
  return (
    <div className="space-y-14 pb-10">
      <section className="section-frame p-7 md:p-10">
        <SectionTitle
          eyebrow="Lookbook"
          title="Editorial Frames For Modern Menswear"
          description="Built as a premium showcase now, with clean slots to replace with approved business-owned Instagram and in-store campaign media."
        />
      </section>

      <section className="seam-divider space-y-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lookbookFrames.map((frame, index) => (
            <Reveal key={frame.src} delayMs={index * 70}>
              <LookFrame src={frame.src} label={frame.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-frame p-7 md:p-10">
        <Reveal className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
            Media Handling Note
          </p>
          <h2 className="font-display text-4xl text-[var(--paper)]">{mediaFallbackNotes.title}</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {mediaFallbackNotes.body}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Add approved files in <code>/public/media/placeholders</code> or point catalog entries to your final image set.
          </p>
          <Link href="/contact" className="button-ghost mt-2">
            Request Upload Coordination
          </Link>
        </Reveal>
      </section>
    </div>
  );
}


