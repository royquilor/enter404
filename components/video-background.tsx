"use client";

import { useSyncExternalStore } from "react";

interface VideoBackgroundProps {
  /**
   * Cloudinary video URL
   */
  videoUrl?: string;
  /**
   * Fallback poster image URL
   */
  posterUrl?: string;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Video background component with fallback to static image
 * Respects prefers-reduced-motion
 */
export default function VideoBackground({
  videoUrl,
  posterUrl = "/images/door-fallback.jpg",
}: VideoBackgroundProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Show static image if reduced motion or no video URL
  if (prefersReducedMotion || !videoUrl) {
    return (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${posterUrl})`,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={posterUrl}
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    >
      <source src={videoUrl} type="video/mp4" />
      {/* Fallback to image if video fails to load */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${posterUrl})`,
        }}
      />
    </video>
  );
}

