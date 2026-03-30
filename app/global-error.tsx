"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main
          id="main-content"
          tabIndex={-1}
          className="min-h-screen mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-6 py-16 text-center"
        >
          <h1 className="font-display font-normal text-5xl leading-[0.92]">
            FATAL ERROR
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-foreground/70 text-pretty">
            The app hit an unrecoverable error. You can retry, or head home.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="rounded-sm px-2 py-1 text-sm text-foreground/70 hover:text-foreground transition-[color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50"
            >
              Retry
            </button>
            <Link
              href="/"
              className="rounded-sm px-2 py-1 text-sm text-foreground/50 hover:text-foreground transition-[color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50"
            >
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

