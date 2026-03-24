"use client";

import { FormEvent, useState } from "react";

import { parseDateLabel } from "@/lib/forms";
import { products } from "@/lib/site-data";

type ProductInquiryFormProps = {
  defaultProduct?: string;
  title?: string;
  compact?: boolean;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  selectedProduct: string;
  size: string;
  color: string;
  preferredContactMethod: "phone" | "email" | "text";
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  selectedProduct: "",
  size: "",
  color: "",
  preferredContactMethod: "phone",
  notes: "",
};

export function ProductInquiryForm({
  defaultProduct,
  title = "Product Inquiry",
  compact = false,
}: ProductInquiryFormProps) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    selectedProduct: defaultProduct ?? "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string; receivedAt?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to submit request.");
      }

      setStatus("success");
      setMessage(
        `Request received${payload.receivedAt ? ` on ${parseDateLabel(payload.receivedAt)}` : ""}. A stylist will follow up shortly.`,
      );
      setForm({ ...initialState, selectedProduct: defaultProduct ?? "" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit request.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-2)] p-6"
      noValidate
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Order / Reserve</p>
        <h3 className="font-display text-3xl text-[var(--paper)]">{title}</h3>
      </div>

      <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : ""}`}>
        <label className="field-block">
          <span>Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Your full name"
          />
        </label>

        <label className="field-block">
          <span>Phone</span>
          <input
            required
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="(313) 555-0000"
            inputMode="tel"
          />
        </label>

        <label className="field-block">
          <span>Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="you@example.com"
            inputMode="email"
          />
        </label>

        <label className="field-block">
          <span>Selected Product</span>
          <select
            required
            value={form.selectedProduct}
            onChange={(event) => setForm({ ...form, selectedProduct: event.target.value })}
          >
            <option value="">Choose a product</option>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field-block">
          <span>Size</span>
          <input
            required
            value={form.size}
            onChange={(event) => setForm({ ...form, size: event.target.value })}
            placeholder='Example: 42R or "Need fitting"'
          />
        </label>

        <label className="field-block">
          <span>Color</span>
          <input
            required
            value={form.color}
            onChange={(event) => setForm({ ...form, color: event.target.value })}
            placeholder="Preferred color"
          />
        </label>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Preferred contact method
        </legend>
        <div className="flex flex-wrap gap-2">
          {([
            { label: "Phone", value: "phone" },
            { label: "Email", value: "email" },
            { label: "Text", value: "text" },
          ] as const).map((method) => (
            <button
              key={method.value}
              type="button"
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                form.preferredContactMethod === method.value
                  ? "border-[var(--accent)] bg-[rgba(184,157,121,0.16)] text-[var(--paper)]"
                  : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--paper)]"
              }`}
              onClick={() =>
                setForm({ ...form, preferredContactMethod: method.value })
              }
            >
              {method.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="field-block">
        <span>Notes</span>
        <textarea
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          placeholder="Event date, fit notes, or style references"
          rows={4}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="button-primary" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Inquiry"}
        </button>
        <p
          className={`text-sm ${
            status === "error" ? "text-rose-300" : "text-[var(--muted)]"
          }`}
          role="status"
        >
          {message}
        </p>
      </div>
    </form>
  );
}


