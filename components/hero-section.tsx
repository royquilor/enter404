"use client";

import { useEffect, useState } from "react";
import VideoBackground from "@/components/video-background";
import EmailForm from "@/components/email-form";

/**
 * Main hero section component
 * Contains video background, static text, and email form
 * (Streaming effect removed - all text displays at once)
 */
export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop content
  const desktopContent = (
    <>
      {/* Logo */}
      <div className="relative z-10 text-white text-sm px-6 py-6">
        ⏎404
      </div>

      <div className="relative z-10 max-w-sm px-6 py-6">
        <h1 className="text-white text-sm font-mono mb-8 leading-tight">
          You&apos;re not lost.
          <br />
          You&apos;re early.
        </h1>

        <div className="text-white/90 text-sm mb-8 space-y-4">
          <p>
            Most ideas don&apos;t start clear.
            <br />
            They start unfinished, uncertain, and slightly wrong.
          </p>
          <p>
            Enter404 is a place for that phase —
            <br />
            before the roadmap, before the polish,
            <br />
            before it all makes sense.
          </p>
        </div>

        <div className="text-white/90 text-sm mb-8">
          <p className="mb-4">If you&apos;re interested in:</p>
          <ul className="list-none mb-4">
            <li>• unfinished ideas</li>
            <li>• naming systems</li>
            <li>• early concepts</li>
            <li>• tools before they&apos;re tools</li>
          </ul>
          <p className="mb-6">Leave your email.</p>
        </div>

        <EmailForm />
      </div>
    </>
  );

  // Mobile content - condensed
  const mobileContent = (
    <>
      {/* Logo */}
      <div className="text-white text-sm mt-8 ml-8">
        ⏎404
      </div>

      <div className="relative z-10 px-6 py-24 text-center">
        <h1 className="text-white text-sm font-mono mb-6 leading-tight">
          You&apos;re not lost. You&apos;re early.
        </h1>

        <div className="text-white/90 text-sm mb-6 space-y-3">
          <p>
            Enter404 is a place for unfinished ideas —
            <br />
            before the roadmap, before the polish.
          </p>
        </div>

        <div className="text-white/90 text-sm mb-6">
          <p>
            If you&apos;re interested in early concepts
            <br />
            and tools before they&apos;re tools:
            <br />
            Leave your email.
          </p>
        </div>

        <div className="mb-8">
          <EmailForm />
        </div>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video background with gradient overlay */}
      <div className="absolute inset-0">
        <VideoBackground
          videoUrl="/videos/glowing_softly_red.mp4"
          posterUrl="/images/door-fallback.jpg"
        />
        {/* Gradient overlay - darker on left, lighter on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Content */}
      {isMobile ? mobileContent : desktopContent}
    </div>
  );
}

