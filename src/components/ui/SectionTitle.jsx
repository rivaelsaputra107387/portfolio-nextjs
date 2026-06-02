"use client";

export default function SectionTitle({ subtitle, title, description, align = "center" }) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16`}>
      {subtitle && (
        <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3">
          ● {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
        {title}
      </h2>
      <div className="w-16 h-1 bg-accent rounded-full mb-4" />
      {description && (
        <p className="text-muted-light text-base md:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
