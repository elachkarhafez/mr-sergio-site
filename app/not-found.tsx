import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-frame my-20 p-10 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Not Found</p>
      <h1 className="mt-3 font-display text-5xl text-[var(--paper)]">Look Not Available</h1>
      <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--muted)]">
        The requested page could not be found. Explore current looks or send an inquiry for a similar style.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/shop" className="button-primary">
          Browse Shop
        </Link>
        <Link href="/contact" className="button-ghost">
          Contact Store
        </Link>
      </div>
    </div>
  );
}


