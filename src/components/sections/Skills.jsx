"use client";

import { useEffect, useState } from "react";
import { Globe, Database, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { MagicCard } from "@/components/magicui/magic-card";

const fallbackSkills = [
  // Modern Web Development
  { name: 'Laravel', category: 'Modern Web Development' },
  { name: 'Next.js', category: 'Modern Web Development' },
  { name: 'React', category: 'Modern Web Development' },
  { name: 'Tailwind CSS', category: 'Modern Web Development' },
  { name: 'PHP', category: 'Modern Web Development' },
  { name: 'CodeIgniter 4', category: 'Modern Web Development' },
  { name: 'Bootstrap', category: 'Modern Web Development' },
  { name: 'JavaScript (ES6+)', category: 'Modern Web Development' },

  // Database & System Architecture
  { name: 'MySQL', category: 'Database & System Architecture' },
  { name: 'PostgreSQL', category: 'Database & System Architecture' },
  { name: 'Supabase', category: 'Database & System Architecture' },
  { name: 'SQL Server', category: 'Database & System Architecture' },
  { name: 'MongoDB', category: 'Database & System Architecture' },
  { name: 'RESTful API', category: 'Database & System Architecture' },
  { name: 'Git & GitHub', category: 'Database & System Architecture' },
  { name: 'Postman', category: 'Database & System Architecture' },

  // Automation & AI Integration
  { name: 'Webhook Integration', category: 'Automation & AI Integration' },
  { name: 'Hugging Face API', category: 'Automation & AI Integration' },
  { name: 'Workflow Automation', category: 'Automation & AI Integration' },
  { name: 'Payment Gateway', category: 'Automation & AI Integration' },
  { name: 'Email Service (Resend)', category: 'Automation & AI Integration' },
  { name: 'ETL & Data Migration', category: 'Automation & AI Integration' }
];

const categoriesConfig = {
  "Modern Web Development": {
    icon: <Globe className="w-6 h-6" style={{ color: "#9013FE" }} />,
    description: "Membangun antarmuka web yang cepat, interaktif, responsif, dan ramah SEO — dari landing page hingga sistem multi-halaman.",
    badgeColor: { bg: "rgba(144, 19, 254,0.12)", border: "rgba(144, 19, 254,0.35)" },
  },
  "Database & System Architecture": {
    icon: <Database className="w-6 h-6" style={{ color: "#9013FE" }} />,
    description: "Merancang struktur penyimpanan data yang aman, terstruktur, dan skalabel untuk sistem kustom skala UMKM hingga enterprise.",
    badgeColor: { bg: "rgba(29,158,117,0.12)", border: "rgba(29,158,117,0.35)" },
  },
  "Automation & AI Integration": {
    icon: <Zap className="w-6 h-6" style={{ color: "#9013FE" }} />,
    description: "Mengotomatisasi alur kerja bisnis dan mengintegrasikan kecerdasan buatan — dari notifikasi otomatis hingga pemrosesan dokumen berbasis AI.",
    badgeColor: { bg: "rgba(212,83,126,0.12)", border: "rgba(212,83,126,0.35)" },
  }
};

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("/api/skills");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSkills(data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSkills();
  }, []);

  // Robust grouping algorithm to map database elements cleanly
  const groupedSkills = {
    "Modern Web Development": [],
    "Database & System Architecture": [],
    "Automation & AI Integration": []
  };

  skills.forEach(skill => {
    const cat = skill.category;
    if (groupedSkills[cat]) {
      groupedSkills[cat].push(skill);
    } else {
      // Dynamic fallback mapping in case categories are formatted slightly differently in db
      if (cat && cat.toLowerCase().includes("web")) {
        groupedSkills["Modern Web Development"].push(skill);
      } else if (cat && (cat.toLowerCase().includes("database") || cat.toLowerCase().includes("architecture") || cat.toLowerCase().includes("system"))) {
        groupedSkills["Database & System Architecture"].push(skill);
      } else if (cat && (cat.toLowerCase().includes("automation") || cat.toLowerCase().includes("ai"))) {
        groupedSkills["Automation & AI Integration"].push(skill);
      } else {
        // Match by skill name heuristics as safety
        const name = skill.name.toLowerCase();
        if (["laravel", "next.js", "react", "tailwind", "php", "codeigniter", "bootstrap", "javascript", "css", "html"].some(k => name.includes(k))) {
          groupedSkills["Modern Web Development"].push(skill);
        } else if (["mysql", "postgre", "supabase", "sql server", "mongodb", "api", "git", "postman"].some(k => name.includes(k))) {
          groupedSkills["Database & System Architecture"].push(skill);
        } else {
          groupedSkills["Automation & AI Integration"].push(skill);
        }
      }
    }
  });

  // Flatten all skills for badge row
  const allBadges = Object.entries(categoriesConfig).flatMap(([catName, config]) => {
    const list = groupedSkills[catName] || [];
    const sorted = [...list].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    return sorted.map((skill) => ({
      ...skill,
      badgeColor: config.badgeColor,
    }));
  });

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#080810" }}
    >
      {/* Teal glow bottom-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 500px 400px at 100% 100%, rgba(29,158,117,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0">
        <GridPattern
          width={40}
          height={40}
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [12, 5],
            [2, 7],
            [15, 3],
          ]}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-semibold uppercase mb-4"
            style={{ color: "#9013FE", letterSpacing: "3px" }}
          >
            ● KEAHLIAN
          </span>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700 }}
          >
            Tech Stack & Skills
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }} className="max-w-2xl mx-auto">
            Keahlian teknis yang terfokus pada pemberian nilai tambah bisnis secara nyata dan efisien.
          </p>
        </motion.div>

        {/* Row 1 — 3 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(categoriesConfig).map(([catName, config], index) => {
            const list = groupedSkills[catName] || [];

            return (
              <MagicCard
                key={catName}
                gradientColor="rgba(144, 19, 254, 0.15)"
                className="p-7"
              >
                {/* Icon Box */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(144, 19, 254,0.15)",
                    border: "1px solid rgba(144, 19, 254,0.3)",
                    borderRadius: "12px",
                  }}
                >
                  {config.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold text-white mb-2"
                >
                  {catName}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {config.description}
                </p>

                {/* Count */}
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {list.length} teknologi
                  </span>
                </div>
              </MagicCard>
            );
          })}
        </div>

        {/* Row 2 — All Tech Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {allBadges.map((badge, i) => (
            <motion.span
              key={badge.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.03 }}
              whileHover={{ scale: 1.05 }}
              className="px-3.5 py-2 text-xs font-medium cursor-default transition-colors duration-300"
              style={{
                background: badge.badgeColor.bg,
                border: `1px solid ${badge.badgeColor.border}`,
                borderRadius: "8px",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {badge.name}
            </motion.span>
          ))}
          {allBadges.length === 0 && (
            <span className="text-xs italic" style={{ color: "rgba(255,255,255,0.4)" }}>
              Belum ada skill ditambahkan
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
