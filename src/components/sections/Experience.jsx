"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

// Helper function to format descriptions into intro and bullet points safely
function parseDescription(desc) {
  if (!desc) return { mainText: "", bullets: [] };
  
  let descStr = "";
  if (typeof desc === "string") {
    descStr = desc;
  } else if (Array.isArray(desc)) {
    descStr = desc.join(" ");
  } else {
    descStr = String(desc);
  }

  const sentences = descStr.split(/(?<=[.!?])\s+/);
  if (sentences.length > 2) {
    const mainText = sentences.slice(0, 2).join(" ");
    const bullets = sentences.slice(2);
    return { mainText, bullets };
  }
  return { mainText: descStr, bullets: [] };
}

const fallbackExperiences = [
  {
    role: "Fullstack Developer Intern",
    company: "PT Trimas Sarana Garment",
    period: "Nov 2024 – Feb 2025",
    description:
      "Mengembangkan modul SITT menggunakan CodeIgniter 4 & Next.js. Mendesain RESTful API, mengelola SQL Server, dan menyusun dokumentasi teknis handover.",
    tech: ["CodeIgniter 4", "Next.js", "SQL Server", "RESTful API"],
  },
  {
    role: "Fullstack Web Developer",
    company: "KNPI Kabupaten Bandung",
    period: "Jun 2024 – Sekarang",
    description:
      "Merancang arsitektur dan database sistem informasi organisasi. Membangun modul manajemen pengurus, CMS berita, dan deployment ke hosting.",
    tech: ["Laravel", "MySQL", "Deployment"],
  },
  {
    role: "Freelance Web Developer",
    company: "Mandiri",
    period: "2022 – Sekarang",
    description:
      "Membangun website untuk UMKM, organisasi, dan usaha lokal. Stack: Laravel, Next.js, MySQL. Termasuk integrasi Midtrans, deployment, dan handover documentation.",
    tech: ["Laravel", "Next.js", "MySQL", "Midtrans"],
  },
  {
    role: "Teaching Assistant — Web Development II (Laravel)",
    company: "STMIK Mardira Indonesia",
    period: "Feb 2024 – Sekarang",
    description:
      "Mendampingi praktikum Laravel, membimbing mahasiswa dalam debugging, review kode, best practice MVC/OOP, dan evaluasi tugas akhir.",
    tech: ["Laravel", "PHP", "MVC"],
  },
  {
    role: "Penasehat & Inisiator",
    company: "HIMA IF D3 STMIK Mardira Indonesia",
    period: "Jan 2025 – Sekarang",
    description:
      "Memberikan arahan strategis, mentoring kepengurusan, penyusunan SOP administrasi, dan fasilitasi kolaborasi antar-komite.",
    tech: ["Leadership", "Mentoring"],
  },
];

export default function Experience() {
  const [experiences, setExperiences] = useState(fallbackExperiences);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (idx) => {
    setExpandedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch("/api/experiences");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setExperiences(data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchExperiences();
  }, []);

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 relative bg-[#111118]"
    >
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            subtitle="Pengalaman"
            title="Perjalanan Karir"
            description="Timeline pengalaman profesional saya di dunia pengembangan web."
          />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-surface-border md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <div
                className={`md:flex md:items-start md:gap-8 pl-14 md:pl-0 ${
                  i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-2 w-5 h-5 bg-surface border-[3px] border-accent rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(139,92,246,0.3)]" />

                {/* Period label */}
                <div className="md:w-1/2 mb-2 md:mb-0">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {exp.period}
                  </span>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2">
                  <div className="glass-card rounded-xl p-5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 text-left">
                    <h3 className="text-base font-bold text-white mb-1">{exp.role || exp.position}</h3>
                    <p className="text-accent text-sm font-medium mb-3">{exp.company}</p>
                    
                    {(() => {
                      const { mainText, bullets } = parseDescription(exp.description);
                      const isExpanded = !!expandedItems[i];
                      const filteredTech = (exp.tech || []).filter(
                        (t) => t !== "N8N" && t !== "HuggingfaceAPI" && t !== "Hugging Face"
                      );

                      return (
                        <>
                          <p className="text-muted-light text-xs md:text-sm leading-relaxed mb-3">
                            {mainText}
                          </p>

                          {bullets.length > 0 && isExpanded && (
                            <ul className="list-disc list-inside space-y-1 text-xs text-muted-light mb-3">
                              {bullets.map((b, idx) => (
                                <li key={idx} className="leading-relaxed">{b}</li>
                              ))}
                            </ul>
                          )}

                          {bullets.length > 0 && (
                            <button
                              onClick={() => toggleExpand(i)}
                              suppressHydrationWarning
                              className="inline-flex items-center gap-1 text-[11px] text-accent hover:text-accent-light font-bold mb-3 transition-colors"
                            >
                              {isExpanded ? (
                                <>Sembunyikan <ChevronUp className="w-3.5 h-3.5" /></>
                              ) : (
                                <>Lihat Detail <ChevronDown className="w-3.5 h-3.5" /></>
                              )}
                            </button>
                          )}

                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {filteredTech.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] px-2 py-0.5 bg-surface border border-surface-border text-muted-light rounded-md"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
