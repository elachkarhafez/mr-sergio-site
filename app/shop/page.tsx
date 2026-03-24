import type { Metadata } from "next";

import { ProductInquiryForm } from "@/components/forms/product-inquiry-form";
import { ProductCard } from "@/components/ui/product-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { categoryDetails, products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Mr. Sergio categories: suits, blazers, dress shirts, shoes, accessories, tuxedos, and wedding/formal looks.",
};

export default function ShopPage() {
  const categories = Object.entries(categoryDetails);

  return (
    <div className="space-y-16 pb-10">
      <section className="section-frame p-7 md:p-10">
        <SectionTitle
          eyebrow="Shop"
          title="Curated Menswear Categories"
          description="Explore category-led styling options and submit a reserve request for any look. Inventory is represented as a polished catalog framework ready for future ecommerce expansion."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([key, item], index) => (
            <Reveal key={key} delayMs={index * 60}>
              <div className="rounded-xl border border-[var(--line-soft)] bg-[rgba(10,12,16,0.55)] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.intro}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="seam-divider space-y-8">
        <SectionTitle
          eyebrow="Collection"
          title="Current Direction"
          description="Use these style entries to request availability, reserve items, or align your event timeline with the closest in-store options."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.slug} delayMs={index * 55}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="seam-divider">
        <Reveal>
          <ProductInquiryForm title="Need Help Choosing The Right Look?" compact />
        </Reveal>
      </section>
    </div>
  );
}


