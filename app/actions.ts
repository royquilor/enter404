"use server";

import { Resend } from "resend";
import { validateEmail, normalizeEmail } from "@/lib/validation";
import { headers } from "next/headers";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting store
// In production, consider using Redis or a database
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_MAX = 3; // Max 3 submissions
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

interface SubmitEmailResult {
  success: boolean;
  error?: string;
}

/**
 * Check rate limit for an IP address
 * Returns true if within limit, false if exceeded
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (record) {
    // Reset if window has passed
    if (now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      return true;
    }

    // Check if limit exceeded
    if (record.count >= RATE_LIMIT_MAX) {
      return false;
    }

    // Increment count
    record.count++;
  } else {
    // First request from this IP
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  return true;
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

    if (!checkRateLimit(ip)) {
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

    // Validate email
    const normalizedEmail = normalizeEmail(formData.email);
    if (!validateEmail(normalizedEmail)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        error: "Email service is not configured. Please contact support.",
      };
    }

    // Get internal email from environment
    const internalEmail = process.env.INTERNAL_EMAIL || "team@enter404.com";

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Enter404 <noreply@enter404.com>",
      to: internalEmail,
      subject: "New Enter404 Signup",
      text: `New email signup: ${normalizedEmail}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Failed to submit email. Please try again later.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Email submission error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

