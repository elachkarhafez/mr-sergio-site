"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ui/product-card";
import { Reveal } from "@/components/ui/reveal";
import {
  type MerchStyleType,
  type Product,
  type ProductCategory,
  categoryDetails,
} from "@/lib/site-data";

type MerchandiseBrowserProps = {
  items: Product[];
  initialStyle?: MerchStyleType;
  initialCategory?: "all" | ProductCategory;
};

const styleOptions: Array<{ value: MerchStyleType; label: string }> = [
  { value: "casual", label: "Casual" },
  { value: "dressy", label: "Dressy" },
];

export function MerchandiseBrowser({
  items,
  initialStyle = "dressy",
  initialCategory = "all",
}: MerchandiseBrowserProps) {
  const [activeStyle, setActiveStyle] = useState<MerchStyleType>(initialStyle);
  const [activeCategory, setActiveCategory] = useState<"all" | ProductCategory>(
    initialCategory,
  );

  const styleFiltered = useMemo(
    () => items.filter((item) => item.styleType === activeStyle),
    [items, activeStyle],
  );

  const categoriesForStyle = useMemo(() => {
    return Array.from(new Set(styleFiltered.map((item) => item.category)));
  }, [styleFiltered]);

  const safeActiveCategory =
    activeCategory !== "all" && !categoriesForStyle.includes(activeCategory)
      ? "all"
      : activeCategory;

  const categoryFiltered =
    safeActiveCategory === "all"
      ? styleFiltered
      : styleFiltered.filter((item) => item.category === safeActiveCategory);

  return (
    <section className="space-y-7">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Start Here
        </p>
        <div className="flex flex-wrap gap-2">
          {styleOptions.map((option) => {
            const active = option.value === activeStyle;
            return (
              <button
                key={option.value}
                type="button"
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  active
                    ? "border-[var(--accent)] bg-[rgba(199,154,71,0.14)] text-[var(--ink)]"
                    : "border-[var(--line-soft)] bg-white text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--ink)]"
                }`}
                onClick={() => {
                  setActiveStyle(option.value);
                  setActiveCategory("all");
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
              safeActiveCategory === "all"
                ? "border-[var(--accent)] bg-[rgba(199,154,71,0.12)] text-[var(--ink)]"
                : "border-[var(--line-soft)] bg-white text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--ink)]"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categoriesForStyle.map((category) => {
            const active = safeActiveCategory === category;
            return (
              <button
                key={category}
                type="button"
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-[var(--accent)] bg-[rgba(199,154,71,0.12)] text-[var(--ink)]"
                    : "border-[var(--line-soft)] bg-white text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--ink)]"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {categoryDetails[category].label}
              </button>
            );
          })}
        </div>
      </div>

      {categoryFiltered.length === 0 ? (
        <div className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 text-sm text-[var(--muted)]">
          No products in this filter yet. Switch style or category.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryFiltered.map((product, index) => (
            <Reveal key={product.slug} delayMs={index * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
