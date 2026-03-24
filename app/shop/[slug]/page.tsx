import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductInquiryForm } from "@/components/forms/product-inquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { getProductBySlug, products } from "@/lib/site-data";

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

  return (
    <div className="space-y-12 pb-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="section-frame p-4 md:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[var(--line-soft)] md:col-span-2">
              <Image
                src={product.images[0]}
                alt={`${product.name} primary image`}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,14,0.2)_30%,rgba(9,11,14,0.62)_100%)]" />
            </div>
            {product.images.slice(1).map((image, idx) => (
              <div
                key={image}
                className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--line-soft)]"
              >
                <Image
                  src={image}
                  alt={`${product.name} gallery image ${idx + 2}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={120} className="section-frame p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="mt-3 font-display text-4xl text-[var(--paper)] md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)]">
            {product.summary}
          </p>

          <div className="mt-7 grid gap-5 text-sm text-[var(--muted)] md:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-[var(--line-soft)] bg-[rgba(9,11,14,0.42)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--paper)]">Style Details</p>
              <ul className="space-y-2 leading-relaxed">
                {product.details.map((detail) => (
                  <li key={detail}>• {detail}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 rounded-xl border border-[var(--line-soft)] bg-[rgba(9,11,14,0.42)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--paper)]">Availability</p>
              <p>{product.availability}</p>
              <p className="pt-2 text-xs uppercase tracking-[0.18em] text-[var(--paper)]">Sizes</p>
              <p>{product.sizes.join(", ")}</p>
              <p className="pt-2 text-xs uppercase tracking-[0.18em] text-[var(--paper)]">Colors</p>
              <p>{product.colors.join(", ")}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[var(--line-soft)] bg-[rgba(9,11,14,0.42)] p-4 text-sm text-[var(--muted)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--paper)]">Fabric / Build Notes</p>
            <p className="mt-2 leading-relaxed">{product.fabricNotes}</p>
          </div>
        </Reveal>
      </section>

      <section className="seam-divider">
        <Reveal>
          <ProductInquiryForm
            defaultProduct={product.name}
            title="Reserve This Look Or Request Similar"
            compact
          />
        </Reveal>
      </section>
    </div>
  );
}


