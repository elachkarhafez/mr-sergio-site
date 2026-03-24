import Image from "next/image";
import Link from "next/link";

import { LookFrame } from "@/components/ui/look-frame";
import { ProductCard } from "@/components/ui/product-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import {
  business,
  instagramCinematic,
  lookbookFrames,
  products,
  reviewHighlights,
  whyChoose,
} from "@/lib/site-data";

const featured = products.filter((item) => item.featured).slice(0, 3);

export default function HomePage() {
  return (
    <div className="space-y-24 pb-12 md:space-y-32">
      <section className="section-frame overflow-hidden p-7 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">
                Dearborn Heights Menswear
              </p>
              <h1 className="hero-headline text-[var(--paper)]">
                Dress Like The Room Was Waiting For You.
              </h1>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)] md:text-lg">
                Mr. Sergio delivers premium formalwear, sharp suits, and complete event styling with boutique-level attention. Wedding, prom, and occasion looks are built to feel tailored, polished, and unmistakably confident.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="button-primary">
                Shop Looks
              </Link>
              <Link href="/custom-suits" className="button-ghost">
                Custom Suit Inquiry
              </Link>
            </div>

            <div className="grid gap-4 text-sm text-[var(--muted)] sm:grid-cols-3">
              <div className="rounded-xl border border-[var(--line-soft)] bg-[rgba(8,10,13,0.36)] p-4">
                <p className="text-[10px] uppercase tracking-[0.26em]">Instagram</p>
                <p className="mt-2 font-display text-2xl text-[var(--paper)]">
                  {business.profileSnapshot.followersLabel}
                </p>
                <p className="text-xs">Followers</p>
              </div>
              <div className="rounded-xl border border-[var(--line-soft)] bg-[rgba(8,10,13,0.36)] p-4">
                <p className="text-[10px] uppercase tracking-[0.26em]">Catalog</p>
                <p className="mt-2 font-display text-2xl text-[var(--paper)]">
                  {products.length}
                </p>
                <p className="text-xs">Style directions</p>
              </div>
              <div className="rounded-xl border border-[var(--line-soft)] bg-[rgba(8,10,13,0.36)] p-4">
                <p className="text-[10px] uppercase tracking-[0.26em]">Profile</p>
                <p className="mt-2 font-display text-2xl text-[var(--paper)]">{business.profileSnapshot.postsLabel}</p>
                <p className="text-xs">Public posts</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="relative" delayMs={140}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[radial-gradient(circle_at_70%_15%,rgba(255,255,255,0.22),transparent_30%),linear-gradient(145deg,#1a2029,#0f141b_60%,#1b1f25)] p-6">
              <div className="absolute -right-24 top-8 h-40 w-40 rotate-12 border border-[var(--line)]" />
              <div className="absolute -left-20 bottom-12 h-48 w-48 -rotate-6 border border-[var(--line-soft)]" />
              <div className="relative h-full rounded-2xl border border-[var(--line-soft)] bg-[rgba(7,9,13,0.64)] p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Brand Crest
                </p>
                <div className="relative mt-6 aspect-square w-28 overflow-hidden rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.92)] p-2">
                  <Image
                    src="/media/brand/mr-sergio-crest.jpg"
                    alt="Mr. Sergio crest"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-8 space-y-3 text-sm text-[var(--muted)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                    Signature Direction
                  </p>
                  <p>Monochrome luxury palette, formalwear focus, and editorial tailoring cues inspired by the brand&apos;s public identity.</p>
                  <p className="text-xs text-[var(--muted)]/80">
                    Source snapshot: {business.profileSnapshot.sourceDate}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="seam-divider space-y-8">
        <SectionTitle
          eyebrow="Cinematic Feed"
          title="Instagram Motion, Styled As Editorial Film"
          description="Live account embed from @mr.sergiostore presented in a cinematic frame treatment while preserving the core Mr. Sergio design direction."
        />
        <Reveal className="cinematic-shell p-5 md:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                Live From Instagram
              </p>
              <h3 className="font-display text-balance text-3xl text-[var(--paper)] md:text-5xl">
                Runway Energy, Directly From The Account.
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">
                This cinematic module uses the account&apos;s public Instagram embed source so visitors can move from visual inspiration straight into inquiry.
              </p>
              <p className="text-xs leading-relaxed text-[var(--muted)]/80">
                {instagramCinematic.note}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={instagramCinematic.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-ghost"
                >
                  Open Instagram
                </Link>
                <Link href="/custom-suits" className="button-primary">
                  Start Custom Fit
                </Link>
              </div>
            </div>

            <div className="cinematic-rail min-h-[560px]">
              <iframe
                title="Mr Sergio Instagram cinematic embed"
                src={instagramCinematic.profileEmbedUrl}
                loading="lazy"
                className="cinematic-iframe"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="space-y-10 seam-divider">
        <SectionTitle
          eyebrow="Featured Looks"
          title="Built For Weddings, Prom, And Statement Evenings"
          description="A curated selection from Mr. Sergio's style direction. Inventory evolves in-store, and inquiries can reserve the closest available match."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.slug} delayMs={index * 100}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="section-frame p-7 md:p-10">
          <SectionTitle
            eyebrow="Brand Story"
            title="Local Boutique Service, Elevated Presentation"
            description="Mr. Sergio is positioned as a modern menswear destination where complete looks are styled with intent, from sharp daily dressing to black-tie events."
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Public customer feedback consistently highlights quality, helpful service, and strong formalwear options. The site direction mirrors that: confident typography, refined movement, and a styling-first shopping flow.
          </p>
        </Reveal>

        <div className="grid gap-4">
          {whyChoose.map((item, index) => (
            <Reveal
              key={item.title}
              delayMs={80 * index}
              className="section-frame p-6"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                Why Mr. Sergio
              </p>
              <h3 className="mt-3 font-display text-2xl text-[var(--paper)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="space-y-10 seam-divider">
        <SectionTitle
          eyebrow="Social Proof"
          title="What Customers Notice First"
          description="Public review excerpts indicate quality styling, broad formalwear options, and friendly in-store help."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {reviewHighlights.map((review, index) => (
            <Reveal key={review.quote} delayMs={index * 120}>
              <blockquote className="section-frame h-full p-6">
                <p className="text-sm leading-relaxed text-[var(--paper)]">“{review.quote}”</p>
                <footer className="mt-5 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  {review.author} • {review.date}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="space-y-10 seam-divider">
        <SectionTitle
          eyebrow="Gallery Highlights"
          title="Editorial Preview"
          description="Placeholders are styled to match the art direction now and can be replaced with approved business-owned campaign imagery at any time."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lookbookFrames.slice(0, 6).map((frame, index) => (
            <Reveal key={frame.src} delayMs={index * 80}>
              <LookFrame src={frame.src} label={frame.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-frame p-7 text-center md:p-12">
        <Reveal className="mx-auto max-w-3xl space-y-5">
          <p className="text-xs uppercase tracking-[0.33em] text-[var(--accent)]">Ready To Style Your Fit</p>
          <h2 className="font-display text-balance text-4xl text-[var(--paper)] md:text-6xl">
            Reserve A Look Or Start A Custom Suit Conversation
          </h2>
          <p className="text-pretty text-base text-[var(--muted)] md:text-lg">
            Share your event date, preferred silhouette, and color direction. The team can guide complete outfit decisions fast.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <Link href="/shop" className="button-primary">
              Browse Shop
            </Link>
            <Link href="/custom-suits" className="button-ghost">
              Start Custom Inquiry
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}


