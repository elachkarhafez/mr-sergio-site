"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { business } from "@/lib/site-data";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/custom-suits", label: "Custom Suits" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-soft)] bg-[rgba(8,10,13,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.32em] text-[var(--paper)]">
            {business.name}
          </span>
          <span className="hidden h-[1px] w-10 bg-[var(--accent)] opacity-70 transition-all duration-300 group-hover:w-14 md:block" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.28em] transition-colors ${
                  active ? "text-[var(--paper)]" : "text-[var(--muted)] hover:text-[var(--paper)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/shop" className="button-ghost">
            Shop
          </Link>
          <Link href="/custom-suits" className="button-primary">
            Custom Inquiry
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="list-none rounded-full border border-[var(--line)] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[var(--paper)]">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 min-w-[220px] overflow-hidden rounded-xl border border-[var(--line-soft)] bg-[rgba(10,12,16,0.95)] p-3 shadow-2xl">
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-[var(--paper)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/custom-suits" className="button-primary mt-2 text-center">
                Custom Inquiry
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}


