"use client";

import { useTextStream } from "@/hooks/use-text-stream";

interface TextStreamProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  mode?: "char" | "word";
  showCursor?: boolean;
}

export default function TextStream({
  text,
  delay = 30,
  className,
  onComplete,
  mode = "word",
  showCursor = false,
}: TextStreamProps) {
  const { displayedText, isComplete } = useTextStream(text, { delay, onComplete, mode });

  return (
    <span className={className} aria-live="polite" aria-label={text}>
      <span aria-hidden="true">{displayedText}</span>
      {showCursor && !isComplete && (
        <span className="cursor-blink" aria-hidden="true">▋</span>
      )}
    </span>
  );
}
