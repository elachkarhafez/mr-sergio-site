export async function forwardToWebhook(payload: unknown) {
  const webhookUrl = process.env.FORMS_WEBHOOK_URL;

  if (!webhookUrl) {
    return { forwarded: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return {
      forwarded: response.ok,
      status: response.status,
    };
  } catch {
    return {
      forwarded: false,
    };
  }
}


