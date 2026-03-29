import type { Metadata } from "next";
import Link from "next/link";
import { CornerDownLeft } from "lucide-react";
import { experiments, type ExperimentStatus } from "@/lib/experiments";

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

const statusLabel: Record<ExperimentStatus, string> = {
  shipped: "shipped",
  ongoing: "ongoing",
  abandoned: "abandoned",
};

const statusColor: Record<ExperimentStatus, string> = {
  shipped: "text-emerald-400",
  ongoing: "text-amber-400",
  abandoned: "text-white/30",
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
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-10 font-mono">
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
              <Link
                href={`/experiments/${experiment.slug}`}
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <span className="text-white text-sm font-medium group-hover:text-white/80 transition-colors">
                    {experiment.title}
                  </span>
                  <span className="text-white/30 text-xs shrink-0">
                    {formatDate(experiment.date)}
                  </span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-3">
                  {experiment.description}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs ${statusColor[experiment.status]}`}>
                    ● {statusLabel[experiment.status]}
                  </span>
                  {experiment.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-white/25 text-xs border border-white/10 px-2 py-0.5 rounded-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}
