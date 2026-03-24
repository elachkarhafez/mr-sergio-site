import Image from "next/image";
import Link from "next/link";

type LookFrameProps = {
  src: string;
  label: string;
  href?: string;
};

export function LookFrame({ src, label, href }: LookFrameProps) {
  const content = (
    <figure className="group relative overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-2)]/70">
      <div className="relative aspect-[3/4]">
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,14,0.1)_20%,rgba(9,11,14,0.78)_100%)]" />
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-60" />
        <figcaption className="absolute bottom-4 left-4 text-sm uppercase tracking-[0.24em] text-[var(--paper)]">
          {label}
        </figcaption>
      </div>
    </figure>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} target="_blank" rel="noreferrer">
      {content}
    </Link>
  );
}


