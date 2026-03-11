"use client";

import { useState, useTransition, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail, normalizeEmail } from "@/lib/validation";
import { submitEmail } from "@/app/actions";

/**
 * Email capture form component
 * Handles client-side validation and submission
 */
export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [utmSource, setUtmSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    if (source) {
      setUtmSource(source.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 100));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Get honeypot value (hidden field)
    const formData = new FormData(e.currentTarget);
    const website = formData.get("website") as string;

    startTransition(async () => {
      try {
        const result = await submitEmail({
          email: normalizedEmail,
          website: website || "",
          utmSource,
        });

        if (result.success) {
          setIsSuccess(true);
          setEmail("");
        } else {
          setError(result.error || "Something went wrong. Please try again.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="text-white/90 text-sm">
        ✓ Check your email to confirm your subscription. If you don&apos;t see it, check your junk or spam folder.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        id="website"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div className="flex-1">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          maxLength={254}
          className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus-visible:ring-white/50"
          aria-label="Email address"
          required
        />
        {error && (
          <p className="text-red-300 text-sm mt-1" role="alert">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending || !email.trim()}
        className="bg-white/10 text-white border-white/30 hover:bg-white/20 disabled:opacity-50"
        aria-label="Submit email"
      >
        {isPending ? "Joining..." : "Join the explorers"}
      </Button>
    </form>
  );
}

