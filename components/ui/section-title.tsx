import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      {eyebrow ? (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.36em] text-[var(--muted)]">
            {eyebrow}
          </p>
          <span className="section-title-mark" aria-hidden />
        </div>
      ) : null}
      <h2 className="font-display text-balance text-3xl leading-tight text-[var(--ink-soft)] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-[var(--muted)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}


