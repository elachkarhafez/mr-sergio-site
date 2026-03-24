import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card group overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-2)]/80 backdrop-blur">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="product-card-sheen" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,14,0.0)_48%,rgba(9,11,14,0.72)_100%)]" />
        <div className="absolute right-4 top-4 rounded-full border border-[var(--line)] bg-[rgba(10,12,16,0.72)] px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[var(--paper)]">
          {product.priceRange}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="mt-2 font-display text-2xl text-[var(--paper)]">
            {product.name}
          </h3>
        </div>
      </div>
      <div className="space-y-4 px-5 py-5">
        <p className="text-sm leading-relaxed text-[var(--muted)]">{product.summary}</p>
        <Link
          href={`/shop/${product.slug}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--paper)] transition-colors hover:text-[var(--accent)]"
        >
          View details <span aria-hidden>?</span>
        </Link>
      </div>
    </article>
  );
}


