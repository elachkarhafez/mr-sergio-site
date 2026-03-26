"use client";

import { FormEvent, useState } from "react";

import { parseDateLabel } from "@/lib/forms";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  preferredAppointmentDate: string;
  preferredStyle: string;
  preferredColor: string;
  approximateSize: string;
  budgetRange: string;
  timelineNeeded: string;
  notes: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  eventType: "",
  preferredAppointmentDate: "",
  preferredStyle: "",
  preferredColor: "",
  approximateSize: "",
  budgetRange: "",
  timelineNeeded: "",
  notes: "",
};

export function CustomSuitForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (file) {
      payload.append("inspirationImage", file);
    }

    try {
      const response = await fetch("/api/custom-suit", {
        method: "POST",
        body: payload,
      });

      const data = (await response.json()) as { message?: string; receivedAt?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to submit custom suit inquiry.");
      }

      setStatus("success");
      setMessage(
        `Inquiry received${data.receivedAt ? ` on ${parseDateLabel(data.receivedAt)}` : ""}. A stylist will contact you to confirm details.`,
      );
      setForm(initialState);
      setFile(null);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit custom suit inquiry.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="premium-surface space-y-5 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-2)] p-6"
      encType="multipart/form-data"
      noValidate
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Custom Program</p>
        <h3 className="font-display text-3xl text-[var(--paper)]">Begin Custom Suit Inquiry</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="field-block">
          <span>Full Name</span>
          <input
            required
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
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
          />
        </label>

        <label className="field-block">
          <span>Event Type</span>
          <input
            required
            value={form.eventType}
            onChange={(event) => setForm({ ...form, eventType: event.target.value })}
            placeholder="Wedding, prom, gala, business, etc."
          />
        </label>

        <label className="field-block">
          <span>Preferred Appointment Date</span>
          <input
            required
            type="date"
            value={form.preferredAppointmentDate}
            onChange={(event) =>
              setForm({ ...form, preferredAppointmentDate: event.target.value })
            }
          />
        </label>

        <label className="field-block">
          <span>Preferred Style</span>
          <input
            required
            value={form.preferredStyle}
            onChange={(event) =>
              setForm({ ...form, preferredStyle: event.target.value })
            }
            placeholder="Classic, modern slim, double-breasted, etc."
          />
        </label>

        <label className="field-block">
          <span>Preferred Color</span>
          <input
            required
            value={form.preferredColor}
            onChange={(event) => setForm({ ...form, preferredColor: event.target.value })}
            placeholder="Black, navy, ivory, charcoal..."
          />
        </label>

        <label className="field-block">
          <span>Approximate Size / Measurements</span>
          <input
            required
            value={form.approximateSize}
            onChange={(event) =>
              setForm({ ...form, approximateSize: event.target.value })
            }
            placeholder="Example: 42R, waist 34"
          />
        </label>

        <label className="field-block">
          <span>Budget Range</span>
          <input
            required
            value={form.budgetRange}
            onChange={(event) => setForm({ ...form, budgetRange: event.target.value })}
            placeholder="Example: $400-$700"
          />
        </label>

        <label className="field-block">
          <span>Timeline / Date Needed</span>
          <input
            required
            value={form.timelineNeeded}
            onChange={(event) => setForm({ ...form, timelineNeeded: event.target.value })}
            placeholder="When do you need it ready?"
          />
        </label>
      </div>

      <label className="field-block">
        <span>Notes</span>
        <textarea
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          rows={4}
          placeholder="Fit preferences, venue, inspiration, or extra requests"
        />
      </label>

      <label className="field-block">
        <span>Optional Inspiration Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
        <small className="text-xs text-[var(--muted)]">
          File metadata is captured in this starter setup. Connect a storage provider later for full file persistence.
        </small>
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button className="button-primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Custom Inquiry"}
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


