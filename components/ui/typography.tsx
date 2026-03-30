import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Typography helpers inspired by shadcn/ui's "Typography" example.
 *
 * Notes:
 * - These are *style primitives* (not Radix components). They intentionally ship as
 *   simple wrapper components around semantic HTML tags.
 * - `className` is supported for composition/overrides at the call site.
 */

export type TypographyH1Props = React.HTMLAttributes<HTMLHeadingElement>
export function TypographyH1({ className, ...props }: TypographyH1Props) {
  return (
    <h1
      className={cn(
        // Normal weight, no letter-spacing — display pages override size (e.g. text-5xl).
        "scroll-m-20 text-center text-4xl font-normal text-balance",
        className
      )}
      {...props}
    />
  )
}

export type TypographyH2Props = React.HTMLAttributes<HTMLHeadingElement>
export function TypographyH2({ className, ...props }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  )
}

export type TypographyH3Props = React.HTMLAttributes<HTMLHeadingElement>
export function TypographyH3({ className, ...props }: TypographyH3Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export type TypographyH4Props = React.HTMLAttributes<HTMLHeadingElement>
export function TypographyH4({ className, ...props }: TypographyH4Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export type TypographyPProps = React.HTMLAttributes<HTMLParagraphElement>
export function TypographyP({ className, ...props }: TypographyPProps) {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  )
}

export type TypographyBlockquoteProps =
  React.HTMLAttributes<HTMLQuoteElement>
export function TypographyBlockquote({
  className,
  ...props
}: TypographyBlockquoteProps) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  )
}

export type TypographyTableProps = React.HTMLAttributes<HTMLDivElement>
export function TypographyTable({ className, ...props }: TypographyTableProps) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto", className)} {...props} />
  )
}

export type TypographyListProps = React.HTMLAttributes<HTMLUListElement>
export function TypographyList({
  className,
  ...props
}: TypographyListProps) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  )
}

export type TypographyInlineCodeProps = React.HTMLAttributes<HTMLElement>
export function TypographyInlineCode({
  className,
  ...props
}: TypographyInlineCodeProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
}

export type TypographyLeadProps = React.HTMLAttributes<HTMLParagraphElement>
export function TypographyLead({ className, ...props }: TypographyLeadProps) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  )
}

export type TypographyLargeProps = React.HTMLAttributes<HTMLDivElement>
export function TypographyLarge({ className, ...props }: TypographyLargeProps) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props} />
  )
}

export type TypographySmallProps = React.HTMLAttributes<HTMLElement>
export function TypographySmall({ className, ...props }: TypographySmallProps) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  )
}

export type TypographyMutedProps = React.HTMLAttributes<HTMLParagraphElement>
export function TypographyMuted({ className, ...props }: TypographyMutedProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

