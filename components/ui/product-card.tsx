import Image from "next/image";
import Link from "next/link";

import { formatUsd, hasFreeShipping, type Product } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  const freeShipping = hasFreeShipping(product);

  return (
    <article className="product-card group overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-2)]/80 backdrop-blur">
      <div className="product-wood-frame product-wood-frame-thick p-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="product-card-sheen" />
          <div className="product-card-threadline" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,14,0.0)_48%,rgba(9,11,14,0.72)_100%)]" />
          {freeShipping ? (
            <div className="absolute left-4 top-4 rounded-full border border-[var(--accent)] bg-[rgba(199,154,71,0.16)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]">
              Free Shipping
            </div>
          ) : null}
          <div className="absolute right-4 top-4 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--ink)]">
            {formatUsd(product.price)}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
              {product.styleType} / {product.category.replace("-", " ")}
            </p>
            <h3 className="mt-2 font-display text-2xl text-white">
              {product.name}
            </h3>
          </div>
        </div>
      </div>
      <div className="premium-surface space-y-4 px-5 py-5">
        <p className="text-sm leading-relaxed text-[var(--muted)]">{product.summary}</p>
        <div className="h-px w-20 bg-[linear-gradient(90deg,var(--accent),transparent)]" />
        <Link
          href={`/shop/${product.slug}`}
          className="luxury-inline-link inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-colors hover:text-[var(--accent)]"
        >
          Explore details <span aria-hidden>-&gt;</span>
        </Link>
      </div>
    </article>
  );
}


