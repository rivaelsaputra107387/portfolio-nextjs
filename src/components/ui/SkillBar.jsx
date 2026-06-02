"use client";

import { useEffect, useRef, useState } from "react";

export default function SkillBar({ name, percentage }) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300">
          {name}
        </span>
        <span className="text-sm font-semibold text-accent">
          {isVisible ? `${percentage}%` : "0%"}
        </span>
      </div>
      <div className="w-full h-2.5 bg-surface-card rounded-full overflow-hidden border border-surface-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-dark to-accent relative transition-all duration-300"
          style={{
            width: isVisible ? `${percentage}%` : "0%",
            "--skill-width": `${percentage}%`,
            animation: isVisible ? "skillFill 1.2s ease forwards" : "none",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}
