"use client";

import RandomLetterSwapPingPong from "@/components/fancy/text/random-letter-swap-pingpong-anim";

export function LogoLabel({ className }: { className?: string }) {
  return (
    <span className={className}>
      {/* Only animate on devices that actually have hover + fine pointer. */}
      <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline-flex motion-reduce:hidden">
        <RandomLetterSwapPingPong
          label="↵404"
          className="leading-none"
          transition={{ type: "spring", duration: 0.35 }}
          staggerDuration={0.015}
        />
      </span>

      {/* Fallback: touch/coarse pointers + reduced motion. */}
      <span className="inline-flex [@media(hover:hover)_and_(pointer:fine)]:hidden motion-reduce:inline-flex">
        ↵404
      </span>
    </span>
  );
}

