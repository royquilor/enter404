"use client"

import { useState } from "react"
import { AnimationOptions, motion, useAnimate } from "motion/react"

interface TextProps {
  label: string
  reverse?: boolean
  transition?: AnimationOptions
  staggerDuration?: number
  className?: string
  onClick?: () => void
}

const RandomLetterSwapPingPong = ({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.8,
  },
  staggerDuration = 0.02,
  className,
  onClick,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate()
  const [blocked, setBlocked] = useState(false)

  // Tiny debounce helper to avoid pulling a dependency for one usage.
  const debounce = <T extends (...args: never[]) => void>(fn: T, wait: number) => {
    let t: ReturnType<typeof setTimeout> | undefined
    const debounced = (...args: Parameters<T>) => {
      if (t) clearTimeout(t)
      t = setTimeout(() => fn(...args), wait)
    }
    return debounced
  }

  const mergeTransition = (transition: AnimationOptions, i: number) => ({
    ...transition,
    delay: i * staggerDuration,
  })

  const hoverStart = debounce(
    () => {
      if (blocked) return
      setBlocked(true)

      for (let i = 0; i < label.length; i++) {
        const randomIndex = i
        animate(
          ".letter-" + randomIndex,
          {
            y: reverse ? "100%" : "-100%",
          },
          mergeTransition(transition, i)
        )

        animate(
          ".letter-secondary-" + randomIndex,
          {
            top: "0%",
          },
          mergeTransition(transition, i)
        )
      }
    },
    100,
    // Previously used lodash's leading/trailing behavior; for this use, a simple
    // debounce is enough to prevent spammy re-triggers.
  )

  const hoverEnd = debounce(
    () => {
      setBlocked(false)

      for (let i = 0; i < label.length; i++) {
        const randomIndex = i
        animate(
          ".letter-" + randomIndex,
          {
            y: 0,
          },
          mergeTransition(transition, i)
        )

        animate(
          ".letter-secondary-" + randomIndex,
          {
            top: reverse ? "-100%" : "100%",
          },
          mergeTransition(transition, i)
        )
      }
    },
    100
  )

  return (
    <motion.span
      className={`flex justify-center items-center relative overflow-hidden leading-none ${className} `}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split("").map((letter: string, i: number) => {
        return (
          <span
            className="whitespace-pre relative flex"
            key={i}
            aria-hidden={true}
          >
            <motion.span
              className={`relative letter-${i}`}
              style={{ top: 0 }}
            >
              {letter}
            </motion.span>
            <motion.span
              className={`absolute letter-secondary-${i}`}
              style={{ top: reverse ? "-100%" : "100%" }}
            >
              {letter}
            </motion.span>
          </span>
        )
      })}
    </motion.span>
  )
}

export default RandomLetterSwapPingPong
