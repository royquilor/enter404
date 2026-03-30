"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Theme toggle glyphs (Departure Mono v1.422+): ✦ U+2726 when dark, ✧ U+2727 when light. */
const GLYPH_DARK = "\u2726"
const GLYPH_LIGHT = "\u2727"

type Theme = "light" | "dark"

function setTheme(next: Theme) {
  const root = document.documentElement
  if (next === "dark") root.classList.add("dark")
  else root.classList.remove("dark")
  try {
    window.localStorage.setItem("theme", next)
  } catch {
    // Ignore storage failures (private mode / blocked storage).
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        // Ghost control: no border/fill; 44×44 touch target on small screens (AGENTS.md), 40×40 from sm up.
        "h-11 w-11 shrink-0 rounded-full p-0 text-foreground/70 hover:text-foreground sm:h-10 sm:w-10",
        className
      )}
      onClick={() => {
        const next: Theme = (document.documentElement.classList.contains("dark")
          ? "light"
          : "dark") satisfies Theme
        setTheme(next)
        setIsDark(next === "dark")
      }}
      aria-label={mounted && isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={mounted && isDark ? "Switch to light" : "Switch to dark"}
    >
      {/* Departure Mono: use 11px steps for crisp pixels; 22px fits the 40px hit target. */}
      <span
        className={cn(
          "font-mono text-[22px] leading-none select-none",
          !mounted && "text-transparent"
        )}
        aria-hidden
      >
        {mounted ? (isDark ? GLYPH_DARK : GLYPH_LIGHT) : GLYPH_LIGHT}
      </span>
    </Button>
  )
}

