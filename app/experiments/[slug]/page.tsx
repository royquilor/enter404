import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CornerDownLeft } from "lucide-react";
import { experiments, getExperiment } from "@/lib/experiments";
import EmailForm from "@/components/email-form";

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
    <main
      id="main-content"
      className="min-h-screen bg-[#0a0a0a] px-6 py-10 font-sans"
      tabIndex={-1}
    >
      <div className="max-w-xl mx-auto">

        {/* Nav */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/"
            className="text-white/35 text-sm hover:text-white/70 transition-colors flex items-center gap-1"
          >
            <CornerDownLeft size={12} />
            404
          </Link>
          <span className="text-white/15 text-sm">/</span>
          <Link
            href="/experiments"
            className="text-white/35 text-sm hover:text-white/70 transition-colors"
          >
            experiments
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-sm font-medium tracking-wide mb-4">
            {experiment.title}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-white/30 text-xs">
              {formatDate(experiment.date)}
            </span>
            {experiment.url && (
              <a
                href={experiment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 text-xs hover:text-white/70 transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                aria-label={`Open ${experiment.title} live site (opens in new tab)`}
              >
                live ↗
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-8">
          {experiment.description}
        </p>

        {/* Teaser */}
        <div className="border-l border-white/10 pl-4 mb-10">
          <p className="text-white/50 text-sm leading-relaxed">
            {experiment.teaser}
          </p>
        </div>

        {/* Gated CTA */}
        <div className="border border-white/10 rounded-sm p-5">
          <p className="text-white/60 text-sm mb-4">
            The full write-up — what broke, what surprised me, and what I&apos;d
            do differently — is in the Enter404 newsletter.
          </p>
          <EmailForm />
        </div>

      </div>
    </main>
  );
}
