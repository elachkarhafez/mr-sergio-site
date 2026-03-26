import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type OakFrameVariant = "panel" | "card" | "pill";

type OakFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  contentClassName?: string;
  variant?: OakFrameVariant;
};

export function OakFrame({
  children,
  className,
  contentClassName,
  variant = "panel",
  ...props
}: OakFrameProps) {
  return (
    <div className={cn("oak-frame", `oak-frame--${variant}`, className)} {...props}>
      <div className={cn("oak-frame__content", `oak-frame__content--${variant}`, contentClassName)}>
        {children}
      </div>
    </div>
  );
}
