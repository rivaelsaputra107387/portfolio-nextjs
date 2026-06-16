"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";
import { Meteors } from "@/components/magicui/meteors";

const fallbackProjects = [
  {
    id: 1,
    title: "Sistem Informasi Organisasi — KNPI Kabupaten Bandung",
    slug: "sistem-informasi-organisasi-knpi-kab-bandung",
    description: "Website profil publik DPD KNPI Kabupaten Bandung sebagai media digital resmi dengan panel admin untuk manajemen konten berita, struktur kepengurusan, dan program kerja pemuda.",
    category: "Web System",
    image_url: "/images/projects/knpi.png",
    demo_url: "https://knpikabbdg.com/",
    tech_stack: ["Laravel", "Blade", "MySQL", "Bootstrap", "JavaScript"],
  },
  {
    id: 2,
    title: "Sistem Toko Online — UMKM Mamaku",
    slug: "sistem-toko-online-umkm-mamaku",
    description: "Platform e-commerce untuk UMKM sayur dan buah segar dengan integrasi Midtrans, fitur pre-order, dashboard admin real-time, dan laporan transaksi PDF.",
    category: "E-Commerce",
    image_url: "/images/projects/mamaku.png",
    demo_url: "https://www.instagram.com/rievaelss/",
    tech_stack: ["Laravel", "MySQL", "Midtrans", "Bootstrap", "JavaScript"],
  },
  {
    id: 3,
    title: "SITT — Modul Manajemen Stok (PT Trimas Sarana Garmen)",
    slug: "sitt-pengelolaan-stok-pt-trimas",
    description: "Modul inventory alat pemotong terintegrasi ke dalam Sistem Informasi Trimas Terpadu (SITT) menggunakan CodeIgniter 4 backend dan Next.js frontend dengan koneksi SQL Server.",
    category: "Internal Tool",
    image_url: "/images/projects/sitt.png",
    demo_url: null,
    tech_stack: ["CodeIgniter 4", "Next.js", "SQL Server", "RESTful API", "Postman"],
  },
  {
    id: 4,
    title: "Sistem Manajemen Dokumen dengan Auto-Tagging AI",
    slug: "manajemen-dokumen-digital-autotagging",
    description: "Sistem arsip digital berbasis Laravel dengan integrasi Hugging Face (zero-shot & NER) untuk auto-tagging dokumen, pencarian full-text, RBAC, activity log, dan backup terjadwal.",
    category: "Web System",
    image_url: "/images/projects/dokumen-ai.png",
    demo_url: "https://knpikabbdg.com/",
    tech_stack: ["Laravel", "PHP", "Hugging Face", "NLP", "RBAC", "MySQL"],
  },
  {
    id: 5,
    title: "Karang Taruna Mandiri Jaya — Landing Page",
    slug: "karang-taruna-mandiri-jaya-landing",
    description: "Landing page responsif organisasi pemuda dengan hero komunikatif, galeri kegiatan, struktur organisasi, dan form kontak terintegrasi. Mobile-first design.",
    category: "Landing Page",
    image_url: "/images/projects/karang-taruna.png",
    demo_url: "https://karang-taruna-mandiri-jaya.vercel.app/",
    tech_stack: ["HTML", "CSS", "JavaScript", "UI/UX", "Vercel"],
  },
];



export default function ProjectShowcase() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        // Use fallback data
      }
      setIsLoaded(true);
    }
    fetchProjects();
  }, []);

  const categories = ["Semua", ...new Set(projects.map((p) => p.category))];
  const filtered = activeFilter === "Semua" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="karya"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#07070f" }}
    >
      {/* Pink glow top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 300px at 50% 0%, rgba(212,83,126,0.15) 0%, transparent 60%)",
        }}
      />
      
      {/* Slow Meteors Background */}
      <Meteors number={8} angle={190} minDuration={5} maxDuration={15} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-semibold uppercase mb-4"
            style={{ color: "#9013FE", letterSpacing: "3px" }}
          >
            ● PORTFOLIO
          </span>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700 }}
          >
            Karya Terbaru
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }} className="max-w-2xl mx-auto">
            Beberapa proyek yang sudah saya kerjakan untuk berbagai klien dan organisasi.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div
            className="inline-flex items-center gap-1 p-1 overflow-x-auto"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                suppressHydrationWarning
                onClick={() => setActiveFilter(cat)}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 flex-shrink-0"
                style={{
                  borderRadius: "999px",
                  color: activeFilter === cat ? "#fff" : "rgba(255,255,255,0.5)",
                  background: "transparent",
                  zIndex: 1,
                }}
              >
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0"
                    style={{
                      background: "#9013FE",
                      borderRadius: "999px",
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id || project.slug || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="/karya"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm transition-all duration-300"
            style={{
              border: "1px solid rgba(144, 19, 254,0.3)",
              borderRadius: "999px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(144, 19, 254,0.6)";
              e.currentTarget.style.background = "rgba(144, 19, 254,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(144, 19, 254,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Lihat Semua Karya
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
