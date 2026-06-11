import Link from "next/link";
import EmailForm from "@/components/email-form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { ExperimentsList } from "@/components/experiments-list";
import { SiteHeader } from "@/components/site-header";

export default function HeroSection() {
  const profileUrl = "https://x.com/RoyQuilor";

  const signature = (
    <div className="flex flex-col items-start gap-1 text-base">
      <Avatar className="h-8 w-8 mb-1 ring-1 ring-inset ring-border shadow-sm">
        <AvatarImage src="https://avatars.githubusercontent.com/u/2366186?v=4" alt="" />
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
      <span className="font-medium text-foreground/80">Roy Quilor</span>
      <span className="text-foreground/60">Designer for 10+ years. Not sure I&apos;ll survive AI.</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full min-w-0 max-w-lg flex-col items-start px-6 pb-16 pt-24 sm:px-8"
      >
        <div className="mt-4">{signature}</div>

        <TypographyH1 className="mt-8 mb-2 max-w-full font-semibold text-left text-base leading-snug text-foreground">
          Built 2 products. Zero users.
        </TypographyH1>

        <TypographyP className="w-full min-w-0 text-left text-base leading-relaxed text-foreground/70 text-pretty [&:not(:first-child)]:mt-0">
          Now building distribution tools to find out why — and sharing everything. One validated idea report per week: real pain, real search demand, real Reddit signal.
        </TypographyP>

        <div className="mt-8 flex w-full flex-col gap-2">
          <TypographyP className="text-left text-base text-foreground/70 [&:not(:first-child)]:mt-0">
            Get the weekly report — one validated idea, real Reddit signal, real search demand.
          </TypographyP>
          <EmailForm />
        </div>

        <div className="mt-20 flex w-full min-w-0 items-center">
          <Link
            href="/experiments"
            className="font-display text-xs text-foreground/55 transition-[color,transform] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground active:scale-[0.98] motion-reduce:active:scale-100 rounded-sm tracking-widest sm:text-sm sm:tracking-[1em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
          >
            EXPERIMENTS
          </Link>
        </div>

        <div className="mt-4 w-full min-w-0">
          <ExperimentsList limit={3} />
        </div>

        <div className="mt-20 w-full min-w-0">
          <p className="font-display text-xs text-foreground/55 tracking-widest sm:text-sm sm:tracking-[1em] mb-4">SOCIAL</p>
          <div className="flex flex-col gap-1 text-base">
            <a
              href="https://x.com/royquilor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 transition-[color] duration-150 hover:text-foreground rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
              aria-label="Roy Quilor on X (opens in new tab)"
            >
              X — @royquilor
            </a>
            <a
              href="https://www.youtube.com/@404roy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 transition-[color] duration-150 hover:text-foreground rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
              aria-label="YouTube channel (opens in new tab)"
            >
              YouTube — @404roy
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
