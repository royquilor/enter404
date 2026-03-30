import type { Metadata } from "next";
import EmailForm from "@/components/email-form";
import { AspectGifFigure } from "@/components/aspect-gif-figure";
import { ExperimentsList } from "@/components/experiments-list";
import { SiteHeader } from "@/components/site-header";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Experiments — Enter404",
  description:
    "A running list of apps, tools, and workflows I've shipped while figuring out what good design looks like in the age of AI.",
  alternates: { canonical: "/experiments" },
  openGraph: {
    title: "Experiments — Enter404",
    description:
      "A running list of apps, tools, and workflows I've shipped while figuring out what good design looks like in the age of AI.",
    url: "https://enter404.com/experiments",
  },
};

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex min-w-0 max-w-3xl flex-col items-center px-4 pb-16 pt-24 sm:px-6"
      >
        <div className="w-full max-w-[720px]">
          <AspectGifFigure
            src="/images/This Is Fine GIF.gif"
            alt="This is fine dog sitting in a burning room."
            priority
          />
          <div className="mt-2 text-center text-[11px] text-muted-foreground">
            Asking Claude to destroy my PRD
          </div>
        </div>

        <TypographyH1 className="mt-10 mb-10 max-w-full font-display text-center text-4xl leading-[0.92] text-foreground sm:text-5xl">
          EXPERIMENTS
        </TypographyH1>

        <TypographyP className="mt-4 w-full max-w-lg min-w-0 text-center text-sm leading-relaxed text-foreground/70 text-pretty [&:not(:first-child)]:mt-0">
          Apps, tools, and workflows I&apos;ve shipped while figuring it out in the open. Subscribe for the honest write-up behind each one.
        </TypographyP>

        <div className="mt-8 w-full max-w-sm">
          <EmailForm />
        </div>

        <div className="mt-14 w-full">
          <ExperimentsList />
        </div>
      </main>
    </div>
  );
}
