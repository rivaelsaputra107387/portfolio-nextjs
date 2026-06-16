"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MagicCard — card with spotlight gradient that follows mouse cursor.
 * Adapted from Magic UI, hardcoded to dark mode (no next-themes dependency).
 */
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "rgba(144, 19, 254, 0.15)",
  gradientFrom = "#9013FE",
  gradientTo = "#D4537E",
  gradientOpacity = 0.8,
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const gradientSizeRef = useRef(gradientSize);

  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(() => {
    const off = -gradientSizeRef.current;
    mouseX.set(off);
    mouseY.set(off);
  }, [mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  // Border gradient: rainbow border that follows cursor
  const borderBackground = useMotionTemplate`
    linear-gradient(#0c0c18 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      rgba(255,255,255,0.07) 100%
    ) border-box
  `;

  // Inner spotlight gradient
  const spotlightBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{
        background: borderBackground,
        border: "1px solid transparent",
        borderRadius: "16px",
      }}
    >
      {/* Dark fill behind content */}
      <div
        className="absolute inset-px z-20"
        style={{
          background: "#0c0c18",
          borderRadius: "15px",
        }}
      />

      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-px z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: spotlightBackground,
          opacity: gradientOpacity,
          borderRadius: "15px",
        }}
      />

      {/* Content */}
      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
