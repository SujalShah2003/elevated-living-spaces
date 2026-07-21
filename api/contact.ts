import { contactFormSchema } from "../src/lib/contact-schema";
import { buildContactEmailHtml, buildContactEmailText } from "./contact-email-template";

const jsonResponse = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

function getProviderError(status: number, details: string) {
  let providerMessage = "";
  try {
    providerMessage = (JSON.parse(details) as { message?: string }).message ?? "";
  } catch {
    // Non-JSON provider responses are logged on the server but never exposed.
  }

  const normalized = providerMessage.toLowerCase();
  if (normalized.includes("only send testing emails")) {
    return {
      code: "RESEND_TEST_RECIPIENT_RESTRICTED",
      message:
        "Resend test mode can only email the address registered to your Resend account. Update CONTACT_TO_EMAIL or verify a sending domain.",
    };
  }
  if (status === 401 || normalized.includes("api key is invalid")) {
    return {
      code: "RESEND_INVALID_API_KEY",
      message: "Resend rejected the API key. Create a new key and update RESEND_API_KEY.",
    };
  }
  if (status === 403) {
    return {
      code: "RESEND_SENDER_NOT_AUTHORIZED",
      message: "Resend rejected the sender. Verify the domain used by CONTACT_FROM_EMAIL.",
    };
  }
  if (status === 429) {
    return {
      code: "RESEND_RATE_LIMITED",
      message: "The email service is temporarily rate limited. Please try again shortly.",
    };
  }
  return {
    code: "RESEND_SEND_FAILED",
    message: "We could not send your request. Please try again.",
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ message: "Invalid JSON request." }, 400);
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse(
      {
        message: "Please check the form and try again.",
        errors: parsed.error.flatten().fieldErrors,
      },
      400,
    );
  }

  // Silently accept honeypot submissions so bots cannot tune around it.
  if (parsed.data.company) return jsonResponse({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@maisonrive.ca";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Maison Rive <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return jsonResponse({ message: "Email service is not configured yet." }, 503);
  }

  const { name, email, date, message } = parsed.data;
  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "MaisonRive/1.0",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Tour request from ${name}`,
        text: buildContactEmailText({ name, email, date, message }),
        html: buildContactEmailHtml({ name, email, date, message }),
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error(`Resend error (${resendResponse.status}): ${details}`);
      return jsonResponse(getProviderError(resendResponse.status, details), 502);
    }
  } catch (error) {
    console.error("Unable to reach Resend:", error);
    return jsonResponse(
      { code: "RESEND_UNREACHABLE", message: "We could not reach the email service." },
      502,
    );
  }

  return jsonResponse({ ok: true });
}
