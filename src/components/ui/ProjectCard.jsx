"use client";

import TechBadge from "./TechBadge";

export default function ProjectCard({ project }) {
  return (
    <div className="group glass-card rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
      {/* Image */}
      <div className="relative h-32 md:h-52 overflow-hidden bg-surface">
        <img
          src={project.image_url || "/images/projects/default.png"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/1A1A1A/8B5CF6?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-accent/90 text-surface px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-white mb-1.5 md:mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-1 md:line-clamp-2">
          {project.title}
        </h3>
        <p className="text-muted text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
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
        <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
          {(project.tech_stack || []).slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {(project.tech_stack || []).length > 4 && (
            <span className="text-[10px] md:text-xs text-muted self-center ml-1">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 md:gap-3">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 bg-accent hover:bg-accent-dark text-surface font-semibold text-xs md:text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Live Demo →
            </a>
          )}
          <a
            href={`/karya/${project.slug}`}
            className="flex-1 text-center py-2 border border-surface-border hover:border-accent/50 text-white text-xs md:text-sm rounded-xl transition-all duration-300 hover:bg-surface-hover"
          >
            Detail
          </a>
        </div>
      </div>
    </div>
  );
}
