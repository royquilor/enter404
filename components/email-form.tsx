"use client";

import { useState, useTransition, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail, normalizeEmail } from "@/lib/validation";
import { submitEmail } from "@/app/actions";
import { cn } from "@/lib/utils";

function getUtmSourceFromLocation(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const source = new URLSearchParams(window.location.search).get("utm_source");
  if (!source) return undefined;
  return source.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 100);
}

/**
 * Email capture form: client validation, server action, accessible errors and loading state.
 * Follows AGENTS.md: 16px+ inputs on mobile, autocomplete, no paste blocking, spinner + label, submit disabled only while pending.
 */
export default function EmailForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

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
    const utmSource = getUtmSourceFromLocation();

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
        className={cn(
          "w-full text-sm leading-5 text-foreground text-pretty transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] motion-reduce:transition-none",
          successVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          className
        )}
      >
        ✓ Check your email to confirm your subscription. If you don&apos;t see it, check your junk or spam folder.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full flex-col gap-2", className)}>
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

      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start">
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
          className="h-11 min-h-11 flex-1 border-input bg-background px-3 py-2 text-base shadow-sm sm:h-9 sm:min-h-9 sm:text-sm"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "email-error" : undefined}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 min-h-11 shrink-0 px-4 py-2 text-base sm:h-9 sm:min-h-9 sm:text-sm"
          aria-label={isPending ? "Submitting, please wait" : "Subscribe to the weekly idea"}
        >
          {isPending ? (
            <>
              <Loader2
                className="h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none opacity-90"
                aria-hidden={true}
              />
              <span className="sr-only">Subscribing…</span>
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      {error && (
        <p id="email-error" className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
