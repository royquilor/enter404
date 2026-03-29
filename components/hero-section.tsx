"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CornerDownLeft } from "lucide-react";
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

  const fade = "transition-[opacity,transform] duration-300 ease-out";

  const signature = (
    <div className={`flex ${isMobile ? "justify-center" : ""} items-center gap-3 mb-8 ${fade} ${showSignature ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      <Avatar className="h-8 w-8 outline outline-1 outline-white/10">
        <AvatarImage src="https://avatars.githubusercontent.com/u/2366186?v=4" alt="Roy Quilor" />
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
      <span className="text-white/60 text-sm">
        Roy Quilor{" "}
        <a href="https://x.com/RoyQuilor" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors px-1 -mx-1">X ↗</a>
        {" · "}
        <a href="https://www.youtube.com/@404roy" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors px-1 -mx-1">YouTube ↗</a>
      </span>
    </div>
  );

  const form = (
    <div className={`${fade} ${showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      <p className="text-white/50 text-sm mb-3">
        Get the write-ups — what broke, what worked, what I&apos;d do differently.
      </p>
      <EmailForm />
    </div>
  );

  const desktopContent = (
    <>
      <div className="relative z-10 text-white/50 text-sm px-6 py-6 flex items-center gap-1"><CornerDownLeft size={12} />404</div>

      <div className="relative z-10 max-w-sm px-6 py-6">
        <h1 className="text-white text-sm font-mono font-medium tracking-wide mb-8 leading-tight">
          <TextStream
            text="Design inside the chaos."
            delay={60}
            mode="word"
            showCursor
            onComplete={() => setHeadlineComplete(true)}
          />
        </h1>

        <div className="text-white/90 text-sm leading-relaxed mb-8 space-y-4 text-balance text-pretty">
          <p className={`${fade} ${headlineComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <TextStream
              text="Not anti-AI. Not fully AI-native. Just a designer trying to figure out what good work looks like now."
              delay={35}
              mode="word"
              showCursor
              startAnimation={headlineComplete}
              onComplete={() => setPara1Complete(true)}
            />
          </p>
          <p className={`${fade} ${para1Complete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <TextStream
              text="A running record of figuring it out in the open."
              delay={35}
              mode="word"
              showCursor
              startAnimation={para1Complete}
              onComplete={() => setPara2Complete(true)}
            />
          </p>
          <p className={`${fade} ${para2Complete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            See a list of{" "}
            <Link href="/experiments" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
              experiments
            </Link>
            .
          </p>
        </div>

        {signature}
        {form}
      </div>
    </>
  );

  const mobileContent = (
    <>
      <div className="text-white/50 text-sm mt-8 ml-8 flex items-center gap-1"><CornerDownLeft size={12} />404</div>

      <div className="relative z-10 px-6 py-24 text-center">
        <h1 className="text-white text-sm font-mono font-medium tracking-wide mb-6 leading-tight">
          <TextStream
            text="Design inside the chaos."
            delay={60}
            mode="word"
            showCursor
            onComplete={() => setHeadlineComplete(true)}
          />
        </h1>

        <div className="text-white/90 text-sm leading-relaxed mb-6 space-y-3 text-pretty">
          <p className={`${fade} ${headlineComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <TextStream
              text="Not anti-AI. Not fully AI-native. Just a designer trying to figure out what good work looks like now."
              delay={35}
              mode="word"
              showCursor
              startAnimation={headlineComplete}
              onComplete={() => setPara1Complete(true)}
            />
          </p>
          <p className={`${fade} ${para1Complete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <TextStream
              text="A running record of figuring it out in the open."
              delay={35}
              mode="word"
              showCursor
              startAnimation={para1Complete}
              onComplete={() => setPara2Complete(true)}
            />
          </p>
          <p className={`${fade} ${para2Complete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            See a list of{" "}
            <Link href="/experiments" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">
              experiments
            </Link>
            .
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
