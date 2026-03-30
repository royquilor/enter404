export type ExperimentStatus = "shipped" | "ongoing" | "abandoned";

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  tools: string[];
  status: ExperimentStatus;
  date: string; // YYYY-MM
  url?: string;
  sourceUrl?: string;
  teaser: string; // public preview — full write-up is in the newsletter
}

export const experiments: Experiment[] = [
  {
    slug: "presentation-system",
    title: "Presentation System",
    description:
      "A keyboard-navigable presentation builder where all content lives in one TypeScript file. Slides auto-generate from a fixed narrative structure — title, context, problem, proposal, risks, next steps.",
    tools: ["Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    status: "shipped",
    date: "2026-03",
    url: "https://presentation.enter404.com",
    teaser:
      "I was tired of rebuilding the same slide deck structure for every project. New Figma file, drag the same boxes, rewrite the same sections. So I built a system where the structure is fixed and the content is just data — one TypeScript file, and the whole deck generates itself.",
  },
];

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((e) => e.slug === slug);
}
