import type { Metadata } from "next";
import Link from "next/link";
import { CornerDownLeft } from "lucide-react";
import { experiments } from "@/lib/experiments";

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

function formatDate(date: string) {
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ExperimentsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#0a0a0a] px-6 py-10 font-sans"
      tabIndex={-1}
    >
      <div className="max-w-xl mx-auto">

        {/* Nav */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-white/35 text-sm hover:text-white/70 transition-colors flex items-center gap-1"
          >
            <CornerDownLeft size={12} />
            404
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-white text-sm font-medium tracking-wide mb-3">
            Experiments
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Apps, tools, and workflows I&apos;ve shipped while figuring it out
            in the open. Subscribe for the honest write-up behind each one.
          </p>
        </div>

        {/* List */}
        <ul className="space-y-8">
          {experiments.map((experiment) => (
            <li key={experiment.slug}>
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <Link
                    href={`/experiments/${experiment.slug}`}
                    className="text-white text-sm font-medium hover:text-white/80 transition-colors"
                  >
                    {experiment.title}
                  </Link>
                  <div className="flex items-baseline gap-3 shrink-0">
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
                    <span className="text-white/30 text-xs">
                      {formatDate(experiment.date)}
                    </span>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed">
                  {experiment.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}
