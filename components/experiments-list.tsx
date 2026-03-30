import Link from "next/link"

import { experiments } from "@/lib/experiments"
import { TypographyP } from "@/components/ui/typography"

function formatDateShort(date: string) {
  const [year, month] = date.split("-")
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function ExperimentsList({
  limit,
}: {
  limit?: number
}) {
  const items = typeof limit === "number" ? experiments.slice(0, limit) : experiments

  return (
    <ul className="flex flex-col gap-8">
      {items.map((experiment) => (
        <li key={experiment.slug}>
          <div className="mx-auto flex w-full max-w-xl items-start justify-between gap-6">
            <div className="min-w-0">
              <Link
                href={`/experiments/${experiment.slug}`}
                className="block text-sm font-medium text-foreground hover:text-foreground/70 transition-[color] duration-150 ease-out rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
              >
                {experiment.title}
              </Link>
              <TypographyP className="w-full text-sm leading-relaxed text-muted-foreground text-pretty [&:not(:first-child)]:mt-2">
                {experiment.description}
              </TypographyP>
            </div>

            <div className="shrink-0 flex items-baseline gap-3">
              <span className="text-xs tabular-nums text-muted-foreground">
                {formatDateShort(experiment.date)}
              </span>
              {experiment.url && (
                <a
                  href={experiment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-foreground font-display text-xs leading-none text-background hover:bg-foreground/80 transition-[background-color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
                  aria-label={`Open ${experiment.title} live site (opens in new tab)`}
                >
                  live ↗
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

