import Link from "next/link";

import { business, weeklyHours } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer luxury-footer-shell relative mt-24 border-t border-[var(--line-soft)] bg-[var(--surface-2)]">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">
            {business.name}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Premium menswear direction for weddings, formal nights, and elevated daily style.
          </p>
          <Link
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[var(--ink)] hover:text-[var(--accent)]"
          >
            {business.instagramHandle} <span aria-hidden>-&gt;</span>
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.28em] text-[var(--ink)]">Visit</h3>
          <p className="text-sm text-[var(--muted)]">{business.addressLine}</p>
          <Link href={`tel:${business.phoneHref}`} className="text-sm text-[var(--ink)]">
            {business.phoneDisplay}
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.28em] text-[var(--ink)]">Hours</h3>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            {weeklyHours.map((entry) => (
              <li key={entry.day} className="flex items-center justify-between gap-4">
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--muted)]/80">
            Hours shown from public listing data. Confirm seasonally.
          </p>
        </div>
      </div>
    </footer>
  );
}


