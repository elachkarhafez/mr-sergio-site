import Image from "next/image";
import Link from "next/link";

import { OakFrame } from "@/components/ui/oak-frame";
import { ProductCard } from "@/components/ui/product-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { business, categoryDetails, products, whyChoose } from "@/lib/site-data";

const featured = products.slice(0, 6);
const heroImage = products[0]?.images[0] ?? "/media/brand/mr-sergio-crest.jpg";

const casualCategories = Array.from(
  new Set(products.filter((item) => item.styleType === "casual").map((item) => item.category)),
);
const dressyCategories = Array.from(
  new Set(products.filter((item) => item.styleType === "dressy").map((item) => item.category)),
);

export default function HomePage() {
  return (
    <div className="space-y-20 pb-12 md:space-y-24">
      <section className="section-frame hero-atmosphere overflow-hidden p-7 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Reveal className="space-y-6">
            <OakFrame variant="pill" className="inline-flex">
              <span className="px-4 py-1 text-[10px] uppercase tracking-[0.26em] text-[var(--accent-deep)]">
                Royal Service Direction
              </span>
            </OakFrame>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">
              Dearborn Heights Menswear
            </p>
            <h1 className="hero-headline text-[var(--ink)]">
              Premium Looks, Signature Presence.
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Browse merchandise in two clean lanes: Casual or Dressy. Pick a category, view
              details, then text your style, size, and color for fast availability.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/shop?style=casual" className="button-ghost">
                Shop Casual
              </Link>
              <Link href="/shop?style=dressy" className="button-primary">
                Shop Dressy
              </Link>
              <Link href="/custom-suits" className="button-ghost">
                Custom Suits
              </Link>
            </div>

            <div className="grid gap-4 text-sm text-[var(--muted)] sm:grid-cols-3">
              <OakFrame variant="card" className="hero-stat-card">
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.26em]">Followers</p>
                  <p className="mt-2 font-display text-2xl text-[var(--ink)]">
                    {business.profileSnapshot.followersLabel}
                  </p>
                  <p className="text-xs">Instagram</p>
                </div>
              </OakFrame>
              <OakFrame variant="card" className="hero-stat-card">
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.26em]">Merchandise</p>
                  <p className="mt-2 font-display text-2xl text-[var(--ink)]">{products.length}</p>
                  <p className="text-xs">Current styles</p>
                </div>
              </OakFrame>
              <OakFrame variant="card" className="hero-stat-card">
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.26em]">Shipping</p>
                  <p className="mt-2 font-display text-2xl text-[var(--ink)]">Free</p>
                  <p className="text-xs">On items over $100</p>
                </div>
              </OakFrame>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="wood-frame relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={heroImage}
                alt="Mr. Sergio featured style"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_40%,rgba(44,29,10,0.48)_100%)]" />
              <div className="tailor-spotlight" aria-hidden />
              <div className="premium-floating-panel absolute bottom-5 left-5 right-5 rounded-xl border border-[rgba(255,255,255,0.34)] p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
                  Fast Flow
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Choose lane, choose category, text availability.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="seam-divider space-y-8">
        <SectionTitle
          eyebrow="Shop Lanes"
          title="Choose Your Style Lane First"
          description="A clear split keeps browsing simple for customers and directs them straight to the right merchandise."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="section-frame premium-lane p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Casual</p>
            <h3 className="mt-2 font-display text-3xl text-[var(--ink)]">Everyday Polish</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {casualCategories.map((category) => (
                <Link
                  key={category}
                  href={`/shop?style=casual&category=${category}`}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--ink)]"
                >
                  {categoryDetails[category].label}
                </Link>
              ))}
            </div>
            <Link href="/shop?style=casual" className="button-ghost mt-6">
              Open Casual Lane
            </Link>
          </Reveal>

          <Reveal className="section-frame premium-lane p-6" delayMs={100}>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Dressy</p>
            <h3 className="mt-2 font-display text-3xl text-[var(--ink)]">Formal Precision</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {dressyCategories.map((category) => (
                <Link
                  key={category}
                  href={`/shop?style=dressy&category=${category}`}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--ink)]"
                >
                  {categoryDetails[category].label}
                </Link>
              ))}
            </div>
            <Link href="/shop?style=dressy" className="button-primary mt-6">
              Open Dressy Lane
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="seam-divider space-y-10">
        <SectionTitle
          eyebrow="Featured Merchandise"
          title="Current Looks In Store"
          description="Products are shown for browsing only. Open any item to text style, size, and color for availability."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.slug} delayMs={index * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="seam-divider grid gap-6 lg:grid-cols-3">
        {whyChoose.slice(0, 3).map((item, index) => (
          <Reveal key={item.title} delayMs={index * 90}>
            <article className="section-frame premium-note h-full p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Why Mr. Sergio</p>
              <h3 className="mt-2 font-display text-3xl text-[var(--ink)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <OakFrame variant="panel" className="premium-cta">
        <section className="p-7 text-center md:p-12">
          <Reveal className="mx-auto max-w-3xl space-y-5">
            <p className="text-xs uppercase tracking-[0.33em] text-[var(--accent)]">Visit Or Text</p>
            <h2 className="font-display text-balance text-4xl text-[var(--ink)] md:text-6xl">
              Need Help Picking A Look?
            </h2>
            <p className="text-pretty text-base text-[var(--muted)] md:text-lg">
              Visit the store or send a quick text with your style direction. The team will help you
              lock in fit, color, and event-ready details.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-3">
              <Link href="/shop" className="button-primary">
                Browse Merchandise
              </Link>
              <Link href="/contact" className="button-ghost">
                Contact Store
              </Link>
            </div>
          </Reveal>
        </section>
      </OakFrame>
    </div>
  );
}
