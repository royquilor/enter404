"use client";

import { useState, useEffect } from "react";
import { useTextStream } from "@/hooks/use-text-stream";

interface SequentialTextStreamProps {
  /**
   * Array of text segments to stream sequentially
   */
  segments: Array<{ text: string; delay?: number }>;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Callback when all segments are complete
   */
  onComplete?: () => void;
}

/**
 * Component that streams multiple text segments sequentially
 * Each segment waits for the previous one to complete
 */
export default function SequentialTextStream({
  segments,
  className,
  onComplete,
}: SequentialTextStreamProps) {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [completedSegments, setCompletedSegments] = useState<string[]>([]);

  const currentSegment = segments[currentSegmentIndex];
  const { displayedText, isComplete } = useTextStream(
    currentSegment?.text || "",
    { delay: currentSegment?.delay || 30 }
  );

  useEffect(() => {
    // Check if current segment is complete
    if (
      currentSegment &&
      isComplete &&
      !completedSegments.includes(currentSegment.text)
    ) {
      // Mark segment as complete
      setCompletedSegments((prev) => [...prev, currentSegment.text]);

      // Move to next segment after a brief pause
      if (currentSegmentIndex < segments.length - 1) {
        setTimeout(() => {
          setCurrentSegmentIndex((prev) => prev + 1);
        }, 200); // Brief pause between segments
      } else {
        // All segments complete
        if (onComplete) {
          setTimeout(onComplete, 200);
        }
      }
    }
  }, [displayedText, isComplete, currentSegment, currentSegmentIndex, segments, completedSegments, onComplete]);

  // Build the display: show completed segments + current streaming segment
  const displayText = [
    ...completedSegments,
    displayedText,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={className}>{displayText}</span>;
}

