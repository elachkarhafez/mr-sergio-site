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
          description="A curated edit of real visuals imported from the Mr. Sergio Instagram catalog and styled into a premium lookbook flow."
        />
      </section>

      <section className="seam-divider space-y-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lookbookFrames.map((frame, index) => (
            <Reveal key={frame.src} delayMs={index * 70}>
              <LookFrame src={frame.src} label={frame.label} href={frame.href} />
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
            Imported files are stored in <code>/public/media/instagram</code> and can be refreshed by rerunning <code>scripts/collect_instagram_media.mjs</code>.
          </p>
          <Link href="/contact" className="button-ghost mt-2">
            Request Style Appointment
          </Link>
        </Reveal>
      </section>
    </div>
  );
}


