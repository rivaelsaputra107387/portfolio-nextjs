"use client";

import { useRef, useCallback } from "react";

const categoryColors = {
  "Web System": { bg: "rgba(144, 19, 254,0.15)", border: "rgba(144, 19, 254,0.5)", text: "#B55CFB" },
  "E-Commerce": { bg: "rgba(29,158,117,0.15)", border: "rgba(29,158,117,0.5)", text: "#1D9E75" },
  "Internal Tool": { bg: "rgba(212,83,126,0.15)", border: "rgba(212,83,126,0.5)", text: "#D4537E" },
  "Landing Page": { bg: "rgba(217,175,60,0.15)", border: "rgba(217,175,60,0.5)", text: "#D9AF3C" },
};

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  }, []);

  const catColor = categoryColors[project.category] || categoryColors["Web System"];

  return (
    <div
      ref={cardRef}
      className="group overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(144, 19, 254,0.5)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(144, 19, 254,0.1)";
      }}
      onMouseOut={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* Image */}
      <div className="relative h-32 md:h-48 overflow-hidden" style={{ background: "#0a0a14" }}>
        <img
          src={project.image_url || "/images/projects/default.png"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/0a0a14/7F77DD?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(7,7,15,0.8), transparent)",
          }}
        />
        {/* Category Badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase"
          style={{
            background: catColor.bg,
            border: `1px solid ${catColor.border}`,
            borderRadius: "999px",
            color: catColor.text,
            letterSpacing: "0.5px",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-white mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[#9013FE]">
          {project.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          {project.description
            ? project.description
                .replace(/<[^>]*>/g, "")
                .replace(/&nbsp;/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
            : ""}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(project.tech_stack || []).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5"
              style={{
                border: "1px solid rgba(144, 19, 254,0.25)",
                borderRadius: "6px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {tech}
            </span>
          ))}
          {(project.tech_stack || []).length > 4 && (
            <span className="text-[10px] self-center ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 text-white font-semibold text-xs transition-all duration-300"
              style={{
                background: "#9013FE",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#6B0DBF";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(144, 19, 254,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#9013FE";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Live Demo →
            </a>
          )}
          <a
            href={`/karya/${project.slug}`}
            className="flex-1 text-center py-2.5 text-white text-xs transition-all duration-300"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(144, 19, 254,0.5)";
              e.currentTarget.style.background = "rgba(144, 19, 254,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Detail
          </a>
        </div>
      </div>
    </div>
  );
}
