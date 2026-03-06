"use server";

import { Resend } from "resend";
import { validateEmail, normalizeEmail } from "@/lib/validation";
import { generateConfirmToken, verifyConfirmToken } from "@/lib/token";
import { headers } from "next/headers";
import { Redis } from "@upstash/redis";

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Resend client is created only when RESEND_API_KEY is set (avoids crash on load when key is missing)

// Rate limit configuration
const RATE_LIMIT_MAX = 3; // Max 3 submissions
const RATE_LIMIT_WINDOW = 60 * 60; // 1 hour in seconds (for KV TTL)

interface SubmitEmailResult {
  success: boolean;
  error?: string;
}

function looksLikeDuplicateContactError(error: unknown): boolean {
  const message = String((error as any)?.message ?? error ?? "").toLowerCase();
  const code = (error as any)?.code ?? (error as any)?.statusCode ?? (error as any)?.status;

  return (
    code === 409 ||
    message.includes("already exists") ||
    message.includes("already added") ||
    message.includes("duplicate")
  );
}

/**
 * Check rate limit for an IP address using Vercel KV
 * Returns true if within limit, false if exceeded
 * Falls back to allowing request if KV is not configured (for local development)
 */
async function checkRateLimit(ip: string): Promise<boolean> {
  // Skip rate limiting if KV is not configured (local development)
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Vercel KV not configured - rate limiting disabled");
    }
    return true; // Allow request in development
  }

  try {
    const key = `rate_limit:${ip}`;
    
    // Get current count from KV
    const currentCount = await kv.get<number>(key);

    if (currentCount === null) {
      // First request from this IP - set count to 1 with TTL
      await kv.set(key, 1, { ex: RATE_LIMIT_WINDOW });
      return true;
    }

    if (currentCount >= RATE_LIMIT_MAX) {
      // Rate limit exceeded
      return false;
    }

    // Increment count
    await kv.incr(key);
    return true;
  } catch (error) {
    // If KV fails, log error but allow request (fail open)
    // In production, you might want to fail closed instead
    if (process.env.NODE_ENV === "development") {
      console.error("Rate limit check failed:", error);
    }
    return true; // Fail open - allow request if KV is unavailable
  }
}

/**
 * Server Action to handle email submission
 * Validates email, checks honeypot, and sends notification via Resend
 */
export async function submitEmail(
  formData: { email: string; website?: string }
): Promise<SubmitEmailResult> {
  try {
    // Rate limiting check
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      "unknown";

    // Check rate limit (async)
    const withinLimit = await checkRateLimit(ip);
    if (!withinLimit) {
      return {
        success: false,
        error: "Rate limit exceeded. Please try again later.",
      };
    }

    // Honeypot check - if website field is filled, it's likely spam
    if (formData.website && formData.website.trim() !== "") {
      // Silently reject but return success to user
      return { success: true };
    }

    // Validate email length (prevent extremely long inputs)
    if (formData.email.length > 254) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Validate email
    const normalizedEmail = normalizeEmail(formData.email);
    if (!validateEmail(normalizedEmail)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Check if Resend API key is configured (must be set for email to work)
    if (!process.env.RESEND_API_KEY) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "RESEND_API_KEY is not set - add it to .env.local (see RESEND_SETUP.md)"
        );
      }
      return {
        success: false,
        error: "Unable to process request. Please try again later.",
      };
    }

    // Create Resend client only when key is present (avoids crash when key is missing at module load)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Store the email in Resend Contacts under an Audience.
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      if (process.env.NODE_ENV === "development") {
        console.warn("RESEND_AUDIENCE_ID is not set - add it to .env.local");
      }
      return {
        success: false,
        error: "Unable to process request. Please try again later.",
      };
    }

    const { data: contactData, error: createContactError } = await resend.contacts.create({
      email: normalizedEmail,
      unsubscribed: true, // stays unsubscribed until they confirm
      audienceId,
    });

    if (createContactError) {
      if (looksLikeDuplicateContactError(createContactError)) {
        // Already signed up — tell them to check their inbox
        return { success: true };
      }
      if (process.env.NODE_ENV === "development") {
        console.error("Resend contact create error:", createContactError);
      }
      return {
        success: false,
        error: "Failed to submit email. Please try again later.",
      };
    }

    const contactId = contactData?.id;
    if (!contactId) {
      return { success: false, error: "Failed to submit email. Please try again later." };
    }

    // Generate signed confirmation token
    const token = generateConfirmToken(normalizedEmail, contactId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const confirmUrl = `${baseUrl}/confirm?token=${token}`;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@enter404.com";

    const { error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: normalizedEmail,
      subject: "Confirm your subscription to enter404",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="background:#0a0a0a;color:#fff;font-family:sans-serif;padding:40px;margin:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="480" cellpadding="0" cellspacing="0" style="background:#111;border-radius:8px;padding:40px;">
                    <tr>
                      <td>
                        <p style="color:#fff;font-size:13px;margin:0 0 24px;"><a href="https://enter404.com" style="color:#999;text-decoration:none;">enter404.com</a></p>
                        <h1 style="font-size:24px;font-weight:600;margin:0 0 16px;color:#fff;">Confirm your email</h1>
                        <p style="color:#fff;font-size:15px;line-height:1.6;margin:0 0 32px;">
                          Click the button below to confirm your subscription and get notified when we launch.
                        </p>
                        <a href="${confirmUrl}" style="display:inline-block;background:#fff;color:#000;font-size:15px;font-weight:600;padding:14px 28px;border-radius:6px;text-decoration:none;">
                          Confirm my email
                        </a>
                        <p style="color:#fff;font-size:12px;margin:32px 0 0;">
                          This link expires in 24 hours. If you didn't sign up, you can ignore this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (emailError && process.env.NODE_ENV === "development") {
      console.error("Confirmation email error:", emailError);
    }

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Email submission error:", error);
    }
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function confirmEmail(token: string): Promise<SubmitEmailResult> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      "unknown";

    const withinLimit = await checkRateLimit(ip);
    if (!withinLimit) {
      return { success: false, error: "Too many attempts. Please try again later." };
    }

    const { valid, email, contactId } = verifyConfirmToken(token);

    if (!valid) {
      return { success: false, error: "This confirmation link is invalid or has expired." };
    }

    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: "Unable to process request. Please try again later." };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const audienceId = process.env.RESEND_AUDIENCE_ID!;

    const { error } = await resend.contacts.update({
      id: contactId,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Resend contact update error:", error);
      }
      return { success: false, error: "Failed to confirm subscription. Please try again." };
    }

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Confirm email error:", error);
    }
    return { success: false, error: "An unexpected error occurred. Please try again later." };
  }
}

