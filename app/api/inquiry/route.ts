import { NextResponse } from "next/server";

import { forwardToWebhook } from "@/lib/forward-webhook";
import {
  sanitize,
  type ProductInquiryPayload,
  validateProductInquiry,
} from "@/lib/forms";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductInquiryPayload;

    const payload: ProductInquiryPayload = {
      name: sanitize(body.name ?? ""),
      phone: sanitize(body.phone ?? ""),
      email: sanitize(body.email ?? ""),
      selectedProduct: sanitize(body.selectedProduct ?? ""),
      size: sanitize(body.size ?? ""),
      color: sanitize(body.color ?? ""),
      preferredContactMethod: body.preferredContactMethod ?? "phone",
      notes: sanitize(body.notes ?? ""),
    };

    const validation = validateProductInquiry(payload);

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
      type: "product_inquiry",
      receivedAt,
      payload,
    });

    console.info("Product inquiry received", {
      receivedAt,
      payload,
    });

    return NextResponse.json({
      ok: true,
      receivedAt,
      message: "Inquiry submitted.",
    });
  } catch {
    return NextResponse.json(
      {
        message: "Unable to process inquiry right now.",
      },
      { status: 500 },
    );
  }
}


