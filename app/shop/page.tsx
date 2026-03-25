import type { Metadata } from "next";
import Link from "next/link";

import { MerchandiseBrowser } from "@/components/shop/merchandise-browser";
import { SectionTitle } from "@/components/ui/section-title";
import {
  categoryDetails,
  type MerchStyleType,
  type ProductCategory,
  products,
} from "@/lib/site-data";

type ShopPageProps = {
  searchParams: Promise<{ style?: string; category?: string }>;
};

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Mr. Sergio merchandise by style type, then filter by category.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const initialStyle: MerchStyleType = params.style === "casual" ? "casual" : "dressy";
  const initialCategory: "all" | ProductCategory =
    params.category && params.category in categoryDetails
      ? (params.category as ProductCategory)
      : "all";

  return (
    <div className="space-y-12 pb-10">
      <section className="section-frame p-7 md:p-10">
        <SectionTitle
          eyebrow="Shop Merchandise"
          title="Choose Casual Or Dressy, Then Filter By Category"
          description="Simple browsing flow: pick a style lane first, then narrow by category. Every item over $100 is marked Free Shipping."
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/shop?style=casual"
            className={initialStyle === "casual" ? "button-primary" : "button-ghost"}
          >
            Shop Casual
          </Link>
          <Link
            href="/shop?style=dressy"
            className={initialStyle === "dressy" ? "button-primary" : "button-ghost"}
          >
            Shop Dressy
          </Link>
        </div>
      </section>

      <MerchandiseBrowser
        key={`${initialStyle}-${initialCategory}`}
        items={products}
        initialStyle={initialStyle}
        initialCategory={initialCategory}
      />
    </div>
  );
}
