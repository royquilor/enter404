/**
 * Validates an email address using a basic regex pattern
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  // Check length (RFC 5321: max 254 characters for email address)
  if (!email || email.length > 254) {
    return false;
  }
  
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Trims and normalizes an email address
 * @param email - The email address to normalize
 * @returns The normalized email address
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

