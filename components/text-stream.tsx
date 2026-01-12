"use client";

import { useTextStream } from "@/hooks/use-text-stream";

interface TextStreamProps {
  /**
   * The text to stream
   */
  text: string;
  /**
   * Delay in milliseconds between each character
   */
  delay?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Callback when streaming is complete
   */
  onComplete?: () => void;
}

/**
 * Component that streams text character by character
 */
export default function TextStream({
  text,
  delay = 30,
  className,
  onComplete,
}: TextStreamProps) {
  const displayedText = useTextStream(text, { delay, onComplete });

  return <span className={className}>{displayedText}</span>;
}

