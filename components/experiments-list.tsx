import Link from "next/link";

import { experiments } from "@/lib/experiments";
import {
  Item,
  ItemActions,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

function formatDateShort(date: string) {
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ExperimentsList({
  limit,
}: {
  limit?: number;
}) {
  const items = typeof limit === "number" ? experiments.slice(0, limit) : experiments;

  return (
    <ItemGroup className="mx-auto w-full min-w-0 max-w-lg gap-6 sm:gap-8">
      {items.map((experiment) => (
        <Item
          key={experiment.slug}
          role="listitem"
          variant="default"
          size="sm"
          className="-mx-2 flex-col items-stretch gap-2 rounded-md border-0 bg-transparent px-2 py-2 shadow-none transition-[background-color] duration-150 ease-[var(--ease-out-strong)] [&_[data-slot=item-title]_a]:hover:bg-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted/55 dark:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted/25"
        >
          <ItemHeader className="flex-col items-stretch justify-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <ItemTitle className="min-w-0 w-full flex-1 font-medium leading-snug text-foreground sm:w-auto">
              <Link
                href={`/experiments/${experiment.slug}`}
                className="rounded-sm text-foreground transition-[color,transform] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground/70 active:scale-[0.99] motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
              >
                {experiment.title}
              </Link>
            </ItemTitle>
            <ItemActions className="flex shrink-0 flex-row flex-wrap items-center gap-x-3 gap-y-2 self-stretch sm:self-auto sm:justify-end">
              <span className="text-xs tabular-nums text-muted-foreground">
                {formatDateShort(experiment.date)}
              </span>
              {experiment.url && (
                <a
                  href={experiment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-foreground font-display text-xs leading-none text-background transition-[background-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:bg-foreground/80 active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
                  aria-label={`Open ${experiment.title} live site (opens in new tab)`}
                >
                  live ↗
                </a>
              )}
            </ItemActions>
          </ItemHeader>
          <ItemDescription className="line-clamp-2 text-left leading-relaxed">
            {experiment.description}
          </ItemDescription>
        </Item>
      ))}
    </ItemGroup>
  );
}
