"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * BorderBeam — animated beam of light traveling along the border.
 * Uses CSS offset-path for smooth animation.
 */
export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#9013FE",
  colorTo = "#D4537E",
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        borderRadius: "inherit",
        border: `${borderWidth}px solid transparent`,
        mask: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        maskClip: "padding-box, border-box",
        WebkitMaskClip: "padding-box, border-box",
      }}
    >
      <motion.div
        className={cn("absolute", className)}
        style={{
          width: size,
          aspectRatio: "1",
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          ...style,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  );
}
