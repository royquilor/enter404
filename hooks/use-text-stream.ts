"use client";

import { useState, useEffect, useRef } from "react";

interface UseTextStreamOptions {
  /**
   * Delay in milliseconds between each character
   */
  delay?: number;
  /**
   * Whether to respect prefers-reduced-motion
   */
  respectReducedMotion?: boolean;
  /**
   * Callback when streaming is complete
   */
  onComplete?: () => void;
}

/**
 * Custom hook for streaming text character by character
 * @param text - The text to stream
 * @param options - Configuration options
 * @returns The currently displayed text
 */
export function useTextStream(
  text: string,
  options: UseTextStreamOptions = {}
): string {
  const { delay = 30, respectReducedMotion = true, onComplete } = options;
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const hasCalledCompleteRef = useRef(false);

  useEffect(() => {
    // Update onComplete ref when it changes
    onCompleteRef.current = onComplete;
    // Reset completion flag when text changes
    hasCalledCompleteRef.current = false;

    // Check for reduced motion preference
    if (respectReducedMotion) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setDisplayedText(text);
        setIsComplete(true);
        if (onCompleteRef.current && !hasCalledCompleteRef.current) {
          hasCalledCompleteRef.current = true;
          onCompleteRef.current();
        }
        return;
      }
    }

    // Reset state when text changes
    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;

    const stream = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutRef.current = setTimeout(stream, delay);
      } else {
        setIsComplete(true);
        // Call onComplete callback when streaming finishes (only once)
        if (onCompleteRef.current && !hasCalledCompleteRef.current) {
          hasCalledCompleteRef.current = true;
          onCompleteRef.current();
        }
      }
    };

    // Start streaming after a brief delay
    const startTimeout = setTimeout(stream, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      clearTimeout(startTimeout);
    };
  }, [text, delay, respectReducedMotion]);

  return displayedText;
}

