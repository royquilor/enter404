import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AspectGifFigure } from "@/components/aspect-gif-figure";
import { experiments, getExperiment } from "@/lib/experiments";
import EmailForm from "@/components/email-form";
import { SiteHeader } from "@/components/site-header";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return {};

  return {
    title: `${experiment.title} — Enter404`,
    description: experiment.description,
    alternates: { canonical: `/experiments/${slug}` },
    openGraph: {
      title: `${experiment.title} — Enter404`,
      description: experiment.description,
      url: `https://enter404.com/experiments/${slug}`,
    },
  };
}

function formatDate(date: string) {
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params;
  const experiment = getExperiment(slug);

  if (!experiment) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex min-w-0 max-w-3xl flex-col items-center px-4 pb-16 pt-24 sm:px-6"
      >
        <div className="w-full max-w-[320px]">
          <AspectGifFigure
            src="/images/Cartoon Network GIF.gif"
            alt="A cartoon character on a rainbow background."
            priority
            sizes="320px"
          />
          <div className="mt-2 text-center text-[11px] text-muted-foreground">
            Markdown + AI
          </div>
        </div>

        <TypographyH1 className="mt-10 max-w-full px-1 font-display text-center text-4xl leading-[0.92] text-foreground sm:px-0 sm:text-5xl">
          {experiment.title.toUpperCase()}
        </TypographyH1>

        <div className="mt-4 flex items-center gap-4 flex-wrap justify-center mb-8">
          <span className="text-xs tabular-nums text-muted-foreground">
            {formatDate(experiment.date)}
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
        </div>

        <TypographyP className="mt-10 w-full max-w-lg text-left text-sm leading-relaxed text-foreground/70 text-pretty [&:not(:first-child)]:mt-0">
          {experiment.description}
        </TypographyP>

        <div className="mt-10 flex w-full flex-col items-center gap-3">
          <TypographyP className="max-w-[320px] text-balance text-center text-sm text-foreground/70 [&:not(:first-child)]:mt-0">
            Get the write-ups — what broke, what worked, what I&apos;d do differently.
          </TypographyP>
          <EmailForm />
        </div>
      </main>
    </div>
  );
}
