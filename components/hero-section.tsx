"use client";

import { useEffect, useState } from "react";
import VideoBackground from "@/components/video-background";
import EmailForm from "@/components/email-form";
import TextStream from "@/components/text-stream";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [para1Complete, setPara1Complete] = useState(false);
  const [para2Complete, setPara2Complete] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (para2Complete) {
      const t1 = setTimeout(() => setShowSignature(true), 200);
      const t2 = setTimeout(() => setShowForm(true), 500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [para2Complete]);

  const fade = "transition-opacity duration-500";

  const signature = (
    <div className={`flex ${isMobile ? "justify-center" : ""} items-center gap-3 mb-8 ${fade} ${showSignature ? "opacity-100" : "opacity-0"}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://avatars.githubusercontent.com/u/2366186?v=4" alt="Roy Quilor" />
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
      <span className="text-white/60 text-sm">
        Roy Quilor{" "}
        <a href="https://x.com/RoyQuilor" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">X ↗</a>
        {" · "}
        <a href="https://www.youtube.com/@404roy" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">YouTube ↗</a>
      </span>
    </div>
  );

  const form = (
    <div className={`${fade} ${showForm ? "opacity-100" : "opacity-0"}`}>
      <EmailForm />
    </div>
  );

  const desktopContent = (
    <>
      <div className="relative z-10 text-white text-sm px-6 py-6">⏎404</div>

      <div className="relative z-10 max-w-sm px-6 py-6">
        <h1 className="text-white text-sm font-mono mb-8 leading-tight">
          <TextStream
            text="Design inside the chaos."
            delay={60}
            mode="word"
            showCursor
            onComplete={() => setHeadlineComplete(true)}
          />
        </h1>

        <div className="text-white/90 text-sm mb-8 space-y-4 text-balance">
          <p className={`${fade} ${headlineComplete ? "opacity-100" : "opacity-0"}`}>
            {headlineComplete && (
              <TextStream
                text="Are you feeling drained from AI? You still love the craft but feel that your process is being smashed."
                delay={35}
                mode="word"
                showCursor
                onComplete={() => setPara1Complete(true)}
              />
            )}
          </p>
          <p className={`${fade} ${para1Complete ? "opacity-100" : "opacity-0"}`}>
            {para1Complete && (
              <TextStream
                text="Enter404 is where I document how designers navigate this new world."
                delay={35}
                mode="word"
                showCursor
                onComplete={() => setPara2Complete(true)}
              />
            )}
          </p>
        </div>

        {signature}
        {form}
      </div>
    </>
  );

  const mobileContent = (
    <>
      <div className="text-white text-sm mt-8 ml-8">⏎404</div>

      <div className="relative z-10 px-6 py-24 text-center">
        <h1 className="text-white text-sm font-mono mb-6 leading-tight">
          <TextStream
            text="Design inside the chaos."
            delay={60}
            mode="word"
            showCursor
            onComplete={() => setHeadlineComplete(true)}
          />
        </h1>

        <div className="text-white/90 text-sm mb-6 space-y-3">
          <p className={`${fade} ${headlineComplete ? "opacity-100" : "opacity-0"}`}>
            {headlineComplete && (
              <TextStream
                text="Are you feeling drained from all this AI? You still love the craft but feel that your process is being smashed."
                delay={35}
                mode="word"
                showCursor
                onComplete={() => setPara1Complete(true)}
              />
            )}
          </p>
          <p className={`${fade} ${para1Complete ? "opacity-100" : "opacity-0"}`}>
            {para1Complete && (
              <TextStream
                text="Enter404 is where I document how designers navigate this new world."
                delay={35}
                mode="word"
                showCursor
                onComplete={() => setPara2Complete(true)}
              />
            )}
          </p>
        </div>

        {signature}
        <div className="mb-8">{form}</div>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <VideoBackground
          videoUrl="/videos/glowing_softly_red.mp4"
          posterUrl="/images/door-fallback.jpg"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {isMobile ? mobileContent : desktopContent}
    </div>
  );
}
