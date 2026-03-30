"use client";

import Link from "next/link";
import { useEffect } from "react";

import { SiteHeader } from "@/components/site-header";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface errors during development without breaking production UX.
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 pb-16 pt-24 text-center"
      >
        <TypographyH1 className="mt-10 font-display text-5xl leading-[0.92]">
          SOMETHING BROKE
        </TypographyH1>
        <TypographyP className="mt-6 max-w-lg text-sm leading-relaxed text-foreground/70 text-pretty [&:not(:first-child)]:mt-0">
          Try again. If it keeps happening, go back to the list.
        </TypographyP>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-sm px-2 py-1 text-sm text-foreground/70 hover:text-foreground transition-[color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50"
          >
            Retry
          </button>
          <Link
            href="/experiments"
            className="rounded-sm px-2 py-1 text-sm text-foreground/50 hover:text-foreground transition-[color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50"
          >
            View experiments
          </Link>
        </div>
      </main>
    </div>
  );
}

