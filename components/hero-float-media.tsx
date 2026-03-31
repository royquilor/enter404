"use client";

import * as React from "react";
import { motion } from "motion/react";

import Float from "@/components/fancy/blocks/float";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return true;
}

export function HeroFloatMedia({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.15, ease: "easeOut" }}
    >
      <Float
        // Keep the motion subtle to avoid feeling "floaty for the sake of it".
        speed={0.35}
        amplitude={[6, 10, 0]}
        rotationRange={[2, 2, 1]}
      >
        {children}
      </Float>
    </motion.div>
  );
}

