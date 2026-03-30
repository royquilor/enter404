"use client";

import dynamic from "next/dynamic";

const Agentation = dynamic(
  () => import("agentation").then((m) => m.Agentation),
  { ssr: false, loading: () => null },
);

export function AgentationDev() {
  // Keep Agentation out of production bundles and server rendering paths.
  if (process.env.NODE_ENV !== "development") return null;
  return <Agentation />;
}

