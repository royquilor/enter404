import { cn } from "@/lib/utils";

/**
 * Two-column landing row: Departure Mono label on the left, content on the right.
 * Stacks on narrow viewports to preserve readability.
 */
export function LandingSection({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5", className)}
    >
      <p className="font-display w-full shrink-0 text-sm uppercase leading-5 text-muted-foreground sm:w-[212px]">
        {label}
      </p>
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function LandingEntry({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const titleClass =
    "text-base font-medium leading-5 text-foreground transition-[color] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground/80";

  const external = href ? isExternalHref(href) : false;

  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      {href ? (
        <a
          href={href}
          {...(external
            ? {
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": `${title} (opens in new tab)`,
              }
            : {})}
          className={cn(
            titleClass,
            "w-fit rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
          )}
        >
          {title}
        </a>
      ) : (
        <p className={titleClass}>{title}</p>
      )}
      <p className="text-base leading-5 text-muted-foreground">{description}</p>
    </div>
  );
}
