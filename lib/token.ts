import { createHmac } from "crypto";

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function generateConfirmToken(email: string, contactId: string): string {
  const secret = process.env.CONFIRM_SECRET!;
  const timestamp = Date.now();
  const emailB64 = Buffer.from(email).toString("base64url");
  const payload = `${emailB64}.${contactId}.${timestamp}`;
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyConfirmToken(
  token: string
): { email: string; contactId: string; valid: boolean } {
  try {
    const secret = process.env.CONFIRM_SECRET!;
    // token = emailB64.contactId.timestamp.sig
    // UUID has 4 hyphens so we split on "." giving: [emailB64, uuid-part, timestamp, sig]
    // but UUID itself has no dots so we can split on last 2 dots safely
    const lastDot = token.lastIndexOf(".");
    const sig = token.slice(lastDot + 1);
    const withoutSig = token.slice(0, lastDot);

    const secondLastDot = withoutSig.lastIndexOf(".");
    const timestamp = withoutSig.slice(secondLastDot + 1);
    const emailAndId = withoutSig.slice(0, secondLastDot);

    const firstDot = emailAndId.indexOf(".");
    const emailB64 = emailAndId.slice(0, firstDot);
    const contactId = emailAndId.slice(firstDot + 1);

    const payload = `${emailB64}.${contactId}.${timestamp}`;
    const expected = createHmac("sha256", secret).update(payload).digest("base64url");

    if (sig !== expected) return { email: "", contactId: "", valid: false };

    const age = Date.now() - parseInt(timestamp);
    if (age > TOKEN_EXPIRY_MS) return { email: "", contactId: "", valid: false };

    const email = Buffer.from(emailB64, "base64url").toString();
    return { email, contactId, valid: true };
  } catch {
    return { email: "", contactId: "", valid: false };
  }
}
