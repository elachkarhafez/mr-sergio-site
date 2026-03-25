import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { TextAvailabilityCard } from "@/components/shop/text-availability-card";
import { Reveal } from "@/components/ui/reveal";
import {
  formatUsd,
  getProductBySlug,
  hasFreeShipping,
  products,
} from "@/lib/site-data";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const freeShipping = hasFreeShipping(product);

  return (
    <div className="space-y-12 pb-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="section-frame p-4 md:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="product-wood-frame product-wood-frame-thick p-3 md:col-span-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={product.images[0]}
                  alt={`${product.name} primary image`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.0)_42%,rgba(35,24,10,0.35)_100%)]" />
              </div>
            </div>
            {product.images.slice(1).map((image, idx) => (
              <div key={image} className="product-wood-frame p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image
                    src={image}
                    alt={`${product.name} gallery image ${idx + 2}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={120} className="section-frame p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
            {product.styleType} / {product.category.replace("-", " ")}
          </p>
          <h1 className="mt-3 font-display text-4xl text-[var(--ink)] md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)]">
            {product.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em]">
            <span className="premium-surface rounded-full border border-[var(--line)] px-4 py-2 text-[var(--ink)]">
              {formatUsd(product.price)}
            </span>
            {freeShipping ? (
              <span className="premium-surface rounded-full border border-[var(--accent)] bg-[rgba(199,154,71,0.14)] px-4 py-2 text-[var(--ink)]">
                Free Shipping
              </span>
            ) : null}
          </div>

          <div className="mt-7 grid gap-5 text-sm text-[var(--muted)] md:grid-cols-2">
            <div className="premium-surface space-y-2 rounded-xl border border-[var(--line-soft)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink)]">Style Details</p>
              <ul className="space-y-2 leading-relaxed">
                {product.details.map((detail) => (
                  <li key={detail}>- {detail}</li>
                ))}
              </ul>
            </div>

            <div className="premium-surface space-y-2 rounded-xl border border-[var(--line-soft)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink)]">Availability</p>
              <p>{product.availability}</p>
              <p className="pt-2 text-xs uppercase tracking-[0.18em] text-[var(--ink)]">Sizes</p>
              <p>{product.sizes.join(", ")}</p>
              <p className="pt-2 text-xs uppercase tracking-[0.18em] text-[var(--ink)]">Colors</p>
              <p>{product.colors.join(", ")}</p>
            </div>
          </div>

          <div className="premium-surface mt-6 rounded-xl border border-[var(--line-soft)] p-4 text-sm text-[var(--muted)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink)]">Fabric / Build Notes</p>
            <p className="mt-2 leading-relaxed">{product.fabricNotes}</p>
          </div>
        </Reveal>
      </section>

      <section className="seam-divider">
        <Reveal>
          <TextAvailabilityCard
            productName={product.name}
            defaultStyle={product.name}
            sizes={product.sizes}
            colors={product.colors}
          />
        </Reveal>
      </section>
    </div>
  );
}
