import NextImage from "next/image";
import Link from "next/link";
import EmailForm from "@/components/email-form";
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
        className="flex items-center gap-3 rounded-sm text-foreground/80 outline-offset-4 transition-[color] duration-150 ease-out hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground/40"
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
        className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 pb-16 pt-24"
      >
        <div className="w-full max-w-[720px]">
          <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-sm bg-muted">
            <NextImage
              src="/images/The Shining GIF.gif"
              alt="A scene from The Shining."
              fill
              priority
              unoptimized
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="mt-2 text-center text-[11px] text-muted-foreground">
            I have no idea what I&apos;m doing
          </div>
        </div>

        <TypographyH1 className="mt-10 mb-8 font-display text-center text-5xl leading-[0.92] text-foreground">
          DESIGN INSIDE
          <br />
          THE CHAOS
        </TypographyH1>

        <TypographyP className="mt-8 max-w-lg text-center text-sm leading-relaxed text-foreground/70 text-pretty [&:not(:first-child)]:mt-0">
          Not anti-AI. Not fully AI-native. Just a designer trying to figure out what good work looks like now. A running record of figuring it out in the open.
        </TypographyP>

        <div className="mt-6">{signature}</div>

        <div className="mt-10 flex items-center gap-5 text-muted-foreground">
          <span aria-hidden className="tracking-[0.35em]">||||||||</span>
          <Link
            href="/experiments"
            className="font-display text-sm text-foreground/55 transition-[color] duration-150 ease-out hover:text-foreground rounded-sm tracking-[1em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
          >
            EXPERIMENTS
          </Link>
          <span aria-hidden className="tracking-[0.35em]">||||||||</span>
        </div>

        <div className="mt-10 w-full max-w-xl">
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
