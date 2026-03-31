"use client";

import * as React from "react";

import RandomLetterSwapPingPong from "@/components/fancy/text/random-letter-swap-pingpong-anim";

export function LiveLabel({ className }: { className?: string }) {
  return (
    <span className={className}>
      {/* Only animate on devices that actually have hover + fine pointer. */}
      <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline-flex motion-reduce:hidden">
        <RandomLetterSwapPingPong
          label="live"
          className="leading-none"
          // Faster + less floaty than the default for a micro-hover.
          transition={{ type: "spring", duration: 0.35 }}
          staggerDuration={0.015}
        />
      </span>

      {/* Fallback: touch/coarse pointers + reduced motion. */}
      <span className="inline-flex [@media(hover:hover)_and_(pointer:fine)]:hidden motion-reduce:inline-flex">
        live
      </span>
    </span>
  );
}

