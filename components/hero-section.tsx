"use client";

import { useEffect, useState } from "react";
import VideoBackground from "@/components/video-background";
import TextStream from "@/components/text-stream";
import EmailForm from "@/components/email-form";

/**
 * Main hero section component
 * Contains video background, streaming text, and email form
 */
export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  // Desktop streaming states
  const [headlineLine1Complete, setHeadlineLine1Complete] = useState(false);
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [bodyCanStart, setBodyCanStart] = useState(false);
  // Mobile streaming states
  const [mobileHeadlineComplete, setMobileHeadlineComplete] = useState(false);
  const [mobileBodyCanStart, setMobileBodyCanStart] = useState(false);

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

      {/* Main content - left aligned */}
      <div className="relative z-10 max-w-sm px-6 py-6">
        {/* Headline - streams at 50ms per char */}
        <h1 className="text-white text-sm font-mono mb-8 leading-tight">
          <TextStream
            text="You're not lost."
            delay={50}
            onComplete={() => {
              // Start second line after first completes
              setTimeout(() => setHeadlineLine1Complete(true), 200);
            }}
          />
          <br />
          {headlineLine1Complete && (
            <TextStream
              text="You're early."
              delay={50}
              onComplete={() => {
                // Body text can start after headline is complete
                setTimeout(() => {
                  setHeadlineComplete(true);
                  setBodyCanStart(true);
                }, 300);
              }}
            />
          )}
        </h1>

        {/* Body intro - streams at 30ms per char, starts after headline */}
        {bodyCanStart && (
          <div className="text-white/90 text-sm mb-8 space-y-4">
            <p>
              <TextStream text="Most ideas don't start clear." delay={30} />
              <br />
              <TextStream
                text="They start unfinished, uncertain, and slightly wrong."
                delay={30}
              />
            </p>
            <p>
              <TextStream
                text="Enter404 is a place for that phase —"
                delay={30}
              />
              <br />
              <TextStream
                text="before the roadmap, before the polish,"
                delay={30}
              />
              <br />
              <TextStream text="before it all makes sense." delay={30} />
            </p>
          </div>
        )}

        {/* Bullet list - appears instantly */}
        <div className="text-white/90 text-sm mb-8">
          <p className="mb-4">If you&apos;re interested in:</p>
          <ul className="list-none space-y-2 mb-4">
            <li>• unfinished ideas</li>
            <li>• naming systems</li>
            <li>• early concepts</li>
            <li>• tools before they&apos;re tools</li>
          </ul>
          <p className="mb-6">Leave your email.</p>
        </div>

        {/* Email form */}
        <EmailForm />

        {/* Footer */}
        <div className="mt-12 text-white/60 text-sm">
          Built in the 404 phase.
        </div>
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

      {/* Main content - centered overlay */}
      <div className="relative z-10 px-6 py-24 text-center">
        {/* Headline - streams at 20ms per char on mobile */}
        <h1 className="text-white text-sm font-mono mb-6 leading-tight">
          <TextStream
            text="You're not lost. You're early."
            delay={20}
            onComplete={() => {
              setTimeout(() => {
                setMobileHeadlineComplete(true);
                setMobileBodyCanStart(true);
              }, 300);
            }}
          />
        </h1>

        {/* Body intro - condensed, starts after headline */}
        {mobileBodyCanStart && (
          <div className="text-white/90 text-sm mb-6 space-y-3">
            <p>
              <TextStream
                text="Enter404 is a place for unfinished ideas —"
                delay={20}
              />
              <br />
              <TextStream
                text="before the roadmap, before the polish."
                delay={20}
              />
            </p>
          </div>
        )}

        {/* Bullet list - condensed, appears after body */}
        {mobileHeadlineComplete && (
          <div className="text-white/90 text-sm mb-6">
            <p>
              <TextStream
                text="If you're interested in early concepts"
                delay={20}
              />
              <br />
              <TextStream text="and tools before they're tools:" delay={20} />
              <br />
              <TextStream text="Leave your email." delay={20} />
            </p>
          </div>
        )}

        {/* Email form */}
        <div className="mb-8">
          <EmailForm />
        </div>

        {/* Footer */}
        <div className="text-white/60 text-sm">
          Built in the 404 phase.
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

