"use client";

import { useEffect, useState } from "react";
import VideoBackground from "@/components/video-background";
import EmailForm from "@/components/email-form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
          Design inside the chaos.
        </h1>

        <div className="text-white/90 text-sm mb-8 space-y-4 text-balance">
          <p>
            AI is rewriting how products are built. Designers are expected to move faster, code more, and collaborate with machines.
          </p>
          <p className="text-balance">
            Enter404 is where I document how designers navigate this new world.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/2366186?v=4" alt="Roy" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <span className="text-white/60 text-sm">
            Roy Quilor{" "}
            <a href="https://x.com/RoyQuilor" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">X ↗</a>
            {" · "}
            <a href="https://www.youtube.com/@404roy" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">YouTube ↗</a>
          </span>
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
          Design inside the chaos.
        </h1>

        <div className="text-white/90 text-sm mb-6 space-y-3">
          <p>
            AI is rewriting how products are built.
            <br />
            Designers are expected to move faster, code more,
            <br />
            and collaborate with machines.
          </p>
          <p>
            Enter404 is where I document how designers
            <br />
            navigate this new world.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/2366186?v=4" alt="Roy" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <span className="text-white/60 text-sm">
            Roy Quilor{" "}
            <a href="https://x.com/RoyQuilor" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">X ↗</a>
            {" · "}
            <a href="https://www.youtube.com/@404roy" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">YouTube ↗</a>
          </span>
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

