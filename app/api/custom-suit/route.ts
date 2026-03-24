import { NextResponse } from "next/server";

import { forwardToWebhook } from "@/lib/forward-webhook";
import {
  sanitize,
  type CustomSuitPayload,
  validateCustomSuit,
} from "@/lib/forms";

const MAX_FILE_SIZE = 8 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const inspiration = formData.get("inspirationImage");

    const payload: CustomSuitPayload = {
      fullName: sanitize(String(formData.get("fullName") ?? "")),
      phone: sanitize(String(formData.get("phone") ?? "")),
      email: sanitize(String(formData.get("email") ?? "")),
      eventType: sanitize(String(formData.get("eventType") ?? "")),
      preferredAppointmentDate: sanitize(
        String(formData.get("preferredAppointmentDate") ?? ""),
      ),
      preferredStyle: sanitize(String(formData.get("preferredStyle") ?? "")),
      preferredColor: sanitize(String(formData.get("preferredColor") ?? "")),
      approximateSize: sanitize(String(formData.get("approximateSize") ?? "")),
      budgetRange: sanitize(String(formData.get("budgetRange") ?? "")),
      timelineNeeded: sanitize(String(formData.get("timelineNeeded") ?? "")),
      notes: sanitize(String(formData.get("notes") ?? "")),
    };

    if (inspiration instanceof File && inspiration.size > 0) {
      if (inspiration.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { message: "Image file must be 8MB or smaller." },
          { status: 400 },
        );
      }

      payload.inspirationImageName = inspiration.name;
      payload.inspirationImageType = inspiration.type;
      payload.inspirationImageSize = inspiration.size;
    }

    const validation = validateCustomSuit(payload);

    if (!validation.valid) {
      return NextResponse.json(
        {
          message: validation.errors[0],
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    const receivedAt = new Date().toISOString();

    await forwardToWebhook({
      type: "custom_suit_inquiry",
      receivedAt,
      payload,
    });

    console.info("Custom suit inquiry received", {
      receivedAt,
      payload,
    });

    return NextResponse.json({
      ok: true,
      receivedAt,
      message: "Custom suit inquiry submitted.",
    });
  } catch {
    return NextResponse.json(
      {
        message: "Unable to process custom suit inquiry right now.",
      },
      { status: 500 },
    );
  }
}


