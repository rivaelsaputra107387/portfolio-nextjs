import React from "react";
import { cn } from "@/lib/utils";

/**
 * Ripple — concentric circles that pulse outward.
 * Pure CSS animation, very lightweight.
 */
export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
      style={{
        maskImage: "linear-gradient(to bottom, white, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, white, transparent)",
      }}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;

        return (
          <div
            key={i}
            className="animate-ripple absolute rounded-full border"
            style={{
              "--i": i,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "rgba(144, 19, 254, 0.25)",
              background: "rgba(144, 19, 254, 0.03)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
              boxShadow: "0 0 20px rgba(144, 19, 254, 0.05)",
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
