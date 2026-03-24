export type ProductInquiryPayload = {
  name: string;
  phone: string;
  email: string;
  selectedProduct: string;
  size: string;
  color: string;
  preferredContactMethod: "phone" | "email" | "text";
  notes: string;
};

export type CustomSuitPayload = {
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
  inspirationImageName?: string;
  inspirationImageType?: string;
  inspirationImageSize?: number;
};

const phonePattern = /^[+()\-\s\d]{7,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function isValidPhone(phone: string) {
  return phonePattern.test(phone);
}

export function isValidEmail(email: string) {
  return emailPattern.test(email);
}

export function validateProductInquiry(payload: ProductInquiryPayload) {
  const errors: string[] = [];

  if (!payload.name) errors.push("Name is required.");
  if (!payload.phone || !isValidPhone(payload.phone)) {
    errors.push("A valid phone number is required.");
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    errors.push("A valid email is required.");
  }
  if (!payload.selectedProduct) errors.push("Please select a product.");
  if (!payload.size) errors.push("Please provide a size.");
  if (!payload.color) errors.push("Please provide a color preference.");

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateCustomSuit(payload: CustomSuitPayload) {
  const errors: string[] = [];

  if (!payload.fullName) errors.push("Full name is required.");
  if (!payload.phone || !isValidPhone(payload.phone)) {
    errors.push("A valid phone number is required.");
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    errors.push("A valid email is required.");
  }
  if (!payload.eventType) errors.push("Event type is required.");
  if (!payload.preferredAppointmentDate) {
    errors.push("Preferred appointment date is required.");
  }
  if (!payload.preferredStyle) errors.push("Preferred style is required.");
  if (!payload.preferredColor) errors.push("Preferred color is required.");
  if (!payload.approximateSize) errors.push("Approximate size is required.");
  if (!payload.budgetRange) errors.push("Budget range is required.");
  if (!payload.timelineNeeded) errors.push("Timeline is required.");

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function parseDateLabel(value: string) {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


