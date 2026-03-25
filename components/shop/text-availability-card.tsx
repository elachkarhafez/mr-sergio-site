"use client";

import { useMemo, useState } from "react";

import { business } from "@/lib/site-data";

type TextAvailabilityCardProps = {
  productName: string;
  defaultStyle: string;
  sizes: string[];
  colors: string[];
};

export function TextAvailabilityCard({
  productName,
  defaultStyle,
  sizes,
  colors,
}: TextAvailabilityCardProps) {
  const [style, setStyle] = useState(defaultStyle);
  const [size, setSize] = useState(sizes[0] ?? "Need fitting");
  const [color, setColor] = useState(colors[0] ?? "Open");

  const message = useMemo(() => {
    return [
      "Hi Mr. Sergio, I want to check availability for this item:",
      `Product: ${productName}`,
      `Style: ${style}`,
      `Size: ${size}`,
      `Color: ${color}`,
    ].join("\n");
  }, [color, productName, size, style]);

  const smsHref = `sms:${business.phoneHref}?body=${encodeURIComponent(message)}`;

  return (
    <div className="premium-surface space-y-5 rounded-2xl border border-[var(--line-soft)] p-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent)]">
          Text Availability
        </p>
        <h3 className="font-display text-3xl text-[var(--ink)]">No Online Checkout</h3>
        <p className="text-sm text-[var(--muted)]">
          Choose your style, size, and color. Tap one button to send a prefilled text.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="field-block">
          <span>Style</span>
          <input value={style} onChange={(event) => setStyle(event.target.value)} />
        </label>

        <label className="field-block">
          <span>Size</span>
          <select value={size} onChange={(event) => setSize(event.target.value)}>
            {sizes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="field-block">
          <span>Color</span>
          <select value={color} onChange={(event) => setColor(event.target.value)}>
            {colors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <a href={smsHref} className="button-primary">
        Text To Check Availability
      </a>
    </div>
  );
}
