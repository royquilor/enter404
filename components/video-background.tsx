"use client";

import { useEffect, useState } from "react";

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

/**
 * Video background component with fallback to static image
 * Respects prefers-reduced-motion
 */
export default function VideoBackground({
  videoUrl,
  posterUrl = "/images/door-fallback.jpg",
}: VideoBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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

