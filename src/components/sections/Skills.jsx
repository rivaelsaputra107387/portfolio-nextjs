"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { Globe, Database, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    icon: <Globe className="w-6 h-6 text-accent" />,
    description: "Membangun antarmuka web yang cepat, interaktif, responsif, dan ramah SEO — dari landing page hingga sistem multi-halaman."
  },
  "Database & System Architecture": {
    icon: <Database className="w-6 h-6 text-accent" />,
    description: "Merancang struktur penyimpanan data yang aman, terstruktur, dan skalabel untuk sistem kustom skala UMKM hingga enterprise."
  },
  "Automation & AI Integration": {
    icon: <Zap className="w-6 h-6 text-accent" />,
    description: "Mengotomatisasi alur kerja bisnis dan mengintegrasikan kecerdasan buatan — dari notifikasi otomatis hingga pemrosesan dokumen berbasis AI."
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

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 bg-[#0a0a0a] relative"
    >
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            subtitle="Keahlian"
            title="Tech Stack & Skills"
            description="Keahlian teknis yang terfokus pada pemberian nilai tambah bisnis secara nyata dan efisien."
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {Object.entries(categoriesConfig).map(([catName, config]) => {
            const list = groupedSkills[catName] || [];
            // Sort by display_order if present
            const sortedList = [...list].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

            return (
              <div
                key={catName}
                className="glass-card p-8 rounded-3xl border border-surface-border/50 hover:border-accent/40 transition-all duration-500 hover:shadow-[0_15px_30px_-10px_rgba(139,92,246,0.12)] relative group overflow-hidden flex flex-col h-full"
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/[0.02] rounded-full blur-2xl group-hover:bg-accent/[0.06] transition-all duration-500" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/[0.02] flex items-center justify-center border border-accent/20 shadow-[inset_0_0_12px_rgba(139,92,246,0.15)] group-hover:border-accent/40 group-hover:scale-110 transition-all duration-500">
                    {config.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {catName}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {config.description}
                </p>

                <div className="w-full h-px bg-surface-border/60 mb-6" />

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {sortedList.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/pill flex items-center px-2 py-0.5 bg-surface/40 hover:bg-surface-card/60 border border-surface-border/80 hover:border-accent/30 rounded-xl text-white/90 hover:text-white text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/70 group-hover/pill:bg-accent mr-2 transition-colors duration-300" />
                      {skill.name}
                    </div>
                  ))}
                  {sortedList.length === 0 && (
                    <span className="text-xs text-muted/65 italic">Belum ada skill ditambahkan</span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
