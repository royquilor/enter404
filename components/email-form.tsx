"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail, normalizeEmail } from "@/lib/validation";
import { submitEmail } from "@/app/actions";

/**
 * Email capture form: client validation, server action, accessible errors and loading state.
 * Follows AGENTS.md: 16px+ inputs on mobile, autocomplete, no paste blocking, spinner + label, submit disabled only while pending.
 */
export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [utmSource, setUtmSource] = useState<string | undefined>(undefined);
  const emailInputRef = useRef<HTMLInputElement>(null);

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

    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      setError("Please enter a valid email address");
      emailInputRef.current?.focus();
      return;
    }

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
          requestAnimationFrame(() => setSuccessVisible(true));
        } else {
          setError(result.error || "Something went wrong. Please try again.");
          emailInputRef.current?.focus();
        }
      } catch {
        setError("Something went wrong. Please try again.");
        emailInputRef.current?.focus();
      }
    });
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`text-white/90 text-sm transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          successVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        ✓ Check your email to confirm your subscription. If you don&apos;t see it, check your junk or spam folder.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      {/* Honeypot — hidden from users; tabIndex -1 keeps it out of tab order (AGENTS: focus order). */}
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

      <div className="flex-1 min-w-0">
        <Input
          ref={emailInputRef}
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          maxLength={254}
          className="bg-transparent border-white/30 text-white text-base min-h-11 sm:min-h-9 sm:text-sm placeholder:text-white/50 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "email-error" : undefined}
        />
        {error && (
          <p id="email-error" className="text-red-300 text-sm mt-1" role="alert">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-white/10 text-white border border-white/30 hover:bg-white/20 active:scale-[0.97] transition-transform disabled:opacity-50 min-h-11 min-w-[44px] sm:min-h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        aria-label={
          isPending ? "Submitting, please wait" : "Submit your email to subscribe"
        }
      >
        {isPending ? (
          <>
            <Loader2
              className="mr-2 h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none opacity-90"
              aria-hidden={true}
            />
            <span>Enter</span>
          </>
        ) : (
          "Enter"
        )}
      </Button>
    </form>
  );
}
