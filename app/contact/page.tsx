import type { Metadata } from "next";
import Link from "next/link";

import { ProductInquiryForm } from "@/components/forms/product-inquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { business, weeklyHours } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit Mr. Sergio in Dearborn Heights, call, or send an inquiry for product and custom suit requests.",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    business.addressQuery,
  )}&output=embed`;

  return (
    <div className="space-y-14 pb-10">
      <section className="section-frame p-7 md:p-10">
        <SectionTitle
          eyebrow="Contact / Visit"
          title="Plan Your Visit Or Request A Callback"
          description="Use the inquiry form for product requests, event timelines, or styling help."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal className="section-frame p-6 md:p-8">
          <h2 className="font-display text-4xl text-[var(--paper)]">Store Information</h2>
          <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
            <p>{business.addressLine}</p>
            <p>
              Phone: <Link href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</Link>
            </p>
            <p>
              Instagram: {" "}
              <Link
                href={business.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--paper)] hover:text-[var(--accent)]"
              >
                {business.instagramHandle}
              </Link>
            </p>
          </div>

          <div className="mt-8 space-y-2 text-sm text-[var(--muted)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--paper)]">
              Hours
            </p>
            {weeklyHours.map((entry) => (
              <p key={entry.day} className="flex items-center justify-between gap-3">
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={140} className="section-frame overflow-hidden p-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--line-soft)]">
            <iframe
              title="Mr Sergio map"
              src={mapSrc}
              loading="lazy"
              className="h-full w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      <section className="seam-divider">
        <Reveal>
          <ProductInquiryForm title="General Inquiry / Appointment Request" compact />
        </Reveal>
      </section>
    </div>
  );
}


