import Link from "next/link";
import EmailForm from "@/components/email-form";
import { AspectGifFigure } from "@/components/aspect-gif-figure";
import { HeroFloatMedia } from "@/components/hero-float-media";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { ExperimentsList } from "@/components/experiments-list";
import { SiteHeader } from "@/components/site-header";

export default function HeroSection() {
  const profileUrl = "https://x.com/RoyQuilor";

  const signature = (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-sm text-foreground/80 outline-offset-4 transition-[color,transform] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground active:scale-[0.98] motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
        aria-label="Roy Quilor on X (opens in new tab)"
      >
        <Avatar className="h-8 w-8 ring-1 ring-inset ring-border shadow-sm">
          <AvatarImage src="https://avatars.githubusercontent.com/u/2366186?v=4" alt="" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
        <span>Roy Quilor</span>
      </a>
      <span className="text-foreground/45 select-none" aria-hidden>
        ·
      </span>
      <span className="text-foreground/80">AI Product Designer</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center px-4 pb-16 pt-24 sm:px-6"
      >
        <div className="w-full max-w-[320px]">
          <HeroFloatMedia>
            <AspectGifFigure
              src="/images/The Shining GIF.gif"
              alt="A scene from The Shining."
              priority
              sizes="320px"
            />
          </HeroFloatMedia>
          <div className="mt-2 text-center text-[11px] text-muted-foreground">
            I have no idea what I&apos;m doing
          </div>
        </div>

        <TypographyH1 className="mt-10 mb-8 max-w-full font-display text-center text-4xl leading-[0.92] text-foreground sm:text-5xl">
          DESIGN INSIDE
          <br />
          THE CHAOS
        </TypographyH1>

        <TypographyP className="mt-8 w-full max-w-lg min-w-0 px-1 text-center text-sm leading-relaxed text-foreground/70 text-pretty sm:px-0 [&:not(:first-child)]:mt-0">
          Not anti-AI. Not fully AI-native. Just a designer trying to figure out what good work looks like now. A running record of figuring it out in the open.
        </TypographyP>

        <div className="mt-6">{signature}</div>

        <div className="mt-10 flex w-full min-w-0 max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 text-muted-foreground sm:gap-x-5">
          <span aria-hidden className="hidden tracking-[0.35em] sm:inline">
            ||||||||
          </span>
          <Link
            href="/experiments"
            className="font-display text-center text-xs text-foreground/55 transition-[color,transform] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground active:scale-[0.98] motion-reduce:active:scale-100 rounded-sm tracking-widest sm:text-sm sm:tracking-[1em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
          >
            EXPERIMENTS
          </Link>
          <span aria-hidden className="hidden tracking-[0.35em] sm:inline">
            ||||||||
          </span>
        </div>

        <div className="mt-10 w-full min-w-0 max-w-full sm:max-w-xl">
          <ExperimentsList limit={3} />
        </div>

        <div className="mt-14 flex w-full flex-col items-center gap-3">
          <TypographyP className="max-w-[320px] text-balance text-center text-sm text-foreground/70 [&:not(:first-child)]:mt-0">
            Get the write-ups — what broke, what worked, what I&apos;d do differently.
          </TypographyP>
          <EmailForm />
        </div>
      </main>
    </div>
  );
}
