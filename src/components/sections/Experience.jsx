"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Ripple } from "@/components/magicui/ripple";
import { MagicCard } from "@/components/magicui/magic-card";

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
    <section
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0e0a1a" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 400px 600px at 15% 50%, rgba(144, 19, 254,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Ripple Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Ripple mainCircleSize={300} numCircles={8} mainCircleOpacity={0.15} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-semibold uppercase mb-4"
            style={{ color: "#9013FE", letterSpacing: "3px" }}
          >
            ● PENGALAMAN
          </span>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700 }}
          >
            Perjalanan Karir
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }} className="max-w-2xl mx-auto">
            Timeline pengalaman profesional saya di dunia pengembangan web.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Mobile Timeline Line */}
          <div
            className="absolute top-0 bottom-0 w-px md:hidden"
            style={{
              left: "24px",
              background:
                "linear-gradient(to bottom, transparent, rgba(144, 19, 254,0.7) 20%, rgba(144, 19, 254,0.7) 80%, transparent)",
            }}
          />
          {/* Desktop: center line */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px -translate-x-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(144, 19, 254,0.7) 20%, rgba(144, 19, 254,0.7) 80%, transparent)",
            }}
          />

          {experiences.map((exp, i) => {
            const isEven = i % 2 === 0;
            const { mainText, bullets } = parseDescription(exp.description);
            const isExpanded = !!expandedItems[i];
            const filteredTech = (exp.tech || []).filter(
              (t) => t !== "N8N" && t !== "HuggingfaceAPI" && t !== "Hugging Face"
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Mobile Layout */}
                <div className="md:hidden pl-14 relative">
                  {/* Dot */}
                  <div
                    className="absolute left-3 top-2 w-3 h-3 rounded-full z-10"
                    style={{
                      background: "#9013FE",
                      boxShadow:
                        "0 0 0 4px rgba(144, 19, 254,0.2), 0 0 16px rgba(144, 19, 254,0.5)",
                      animation: "timelineDotPulse 3s ease-in-out infinite",
                    }}
                  />

                  {/* Card */}
                  <MagicCard
                    gradientColor="rgba(144, 19, 254, 0.15)"
                    className="p-5"
                  >
                    {/* Date pill */}
                    <span
                      className="inline-block px-3 py-1 text-xs font-semibold mb-3"
                      style={{
                        background: "rgba(144, 19, 254,0.15)",
                        color: "#9013FE",
                        borderRadius: "999px",
                      }}
                    >
                      {exp.period}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1">
                      {exp.role || exp.position}
                    </h3>
                    <p className="text-sm font-medium mb-3" style={{ color: "#9013FE" }}>
                      {exp.company}
                    </p>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {mainText}
                    </p>

                    {bullets.length > 0 && isExpanded && (
                      <ul className="list-disc list-inside space-y-1 text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {bullets.map((b, idx) => (
                          <li key={idx} className="leading-relaxed">{b}</li>
                        ))}
                      </ul>
                    )}

                    {bullets.length > 0 && (
                      <button
                        onClick={() => toggleExpand(i)}
                        suppressHydrationWarning
                        className="inline-flex items-center gap-1 text-[11px] font-bold mb-3 transition-colors"
                        style={{ color: "#9013FE" }}
                      >
                        {isExpanded ? (
                          <>Sembunyikan <ChevronUp className="w-3.5 h-3.5" /></>
                        ) : (
                          <>Lihat Detail <ChevronDown className="w-3.5 h-3.5" /></>
                        )}
                      </button>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {filteredTech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5"
                          style={{
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "6px",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </MagicCard>
                </div>

                {/* Desktop Layout — alternating */}
                <div className={`hidden md:flex items-start gap-8 ${isEven ? "flex-row-reverse" : ""}`}>
                  {/* Dot (centered) */}
                  <div
                    className="absolute left-1/2 top-2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                    style={{
                      background: "#9013FE",
                      boxShadow:
                        "0 0 0 4px rgba(144, 19, 254,0.2), 0 0 16px rgba(144, 19, 254,0.5)",
                      animation: "timelineDotPulse 3s ease-in-out infinite",
                    }}
                  />

                  {/* Date side */}
                  <div className={`w-1/2 ${isEven ? "text-left pl-8" : "text-right pr-8"}`}>
                    <span
                      className="inline-block px-3 py-1 text-xs font-semibold"
                      style={{
                        background: "rgba(144, 19, 254,0.15)",
                        color: "#9013FE",
                        borderRadius: "999px",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Card side */}
                  <div className={`w-1/2 ${isEven ? "pr-8" : "pl-8"}`}>
                    <MagicCard
                      gradientColor="rgba(144, 19, 254, 0.15)"
                      className="p-6"
                    >
                      <h3 className="text-base font-bold text-white mb-1">
                        {exp.role || exp.position}
                      </h3>
                      <p className="text-sm font-medium mb-3" style={{ color: "#9013FE" }}>
                        {exp.company}
                      </p>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {mainText}
                      </p>

                      {bullets.length > 0 && isExpanded && (
                        <ul className="list-disc list-inside space-y-1 text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {bullets.map((b, idx) => (
                            <li key={idx} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      )}

                      {bullets.length > 0 && (
                        <button
                          onClick={() => toggleExpand(i)}
                          suppressHydrationWarning
                          className="inline-flex items-center gap-1 text-[11px] font-bold mb-3 transition-colors"
                          style={{ color: "#9013FE" }}
                        >
                          {isExpanded ? (
                            <>Sembunyikan <ChevronUp className="w-3.5 h-3.5" /></>
                          ) : (
                            <>Lihat Detail <ChevronDown className="w-3.5 h-3.5" /></>
                          )}
                        </button>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {filteredTech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5"
                            style={{
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "6px",
                              color: "rgba(255,255,255,0.5)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </MagicCard>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
