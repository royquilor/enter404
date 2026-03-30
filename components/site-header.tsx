import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex w-full items-center justify-between px-6 pt-4">
        <Link
          href="/"
          className="font-display text-[12px] tracking-[0.22em] text-foreground/70 hover:text-foreground transition-[color] duration-150 ease-out rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50"
          aria-label="Go to Enter404 home"
        >
          ↵404
        </Link>

        <ThemeToggle />
      </div>
    </header>
  )
}

