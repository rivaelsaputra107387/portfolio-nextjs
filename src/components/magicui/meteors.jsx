"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Meteors — animated meteor shower effect.
 * Pure CSS @keyframes, very lightweight.
 */
export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}) {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200))}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={cn(
            "animate-meteor pointer-events-none absolute rounded-full",
            className
          )}
        >
          {/* Meteor Tail */}
          <div
            className="pointer-events-none absolute top-1/2 -z-10 -translate-y-1/2"
            style={{
              height: "1px",
              width: "50px",
              background: "linear-gradient(to right, currentColor, transparent)",
            }}
          />
        </span>
      ))}
    </>
  );
}
