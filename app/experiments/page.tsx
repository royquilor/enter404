import type { Metadata } from "next";
import NextImage from "next/image";
import EmailForm from "@/components/email-form";
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
        className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-24"
      >
        <div className="w-full max-w-[720px]">
          <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-sm bg-muted">
            <NextImage
              src="/images/This Is Fine GIF.gif"
              alt="This is fine dog sitting in a burning room."
              fill
              priority
              unoptimized
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="mt-2 text-center text-[11px] text-muted-foreground">
            Asking Claude to destroy my PRD
          </div>
        </div>

        <TypographyH1 className="mt-10 mb-10 font-display text-center text-5xl leading-[0.92] text-foreground">
          EXPERIMENTS
        </TypographyH1>

        <TypographyP className="mt-4 max-w-lg text-center text-sm leading-relaxed text-foreground/70 text-pretty [&:not(:first-child)]:mt-0">
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
