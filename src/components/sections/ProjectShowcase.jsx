"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import { motion } from "framer-motion";

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
    <motion.section
      id="karya"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 relative"
    >
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-accent/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            subtitle="Portfolio"
            title="Karya Terbaru"
            description="Beberapa proyek yang sudah saya kerjakan untuk berbagai klien dan organisasi."
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex overflow-x-auto whitespace-nowrap md:flex-wrap md:justify-center gap-2 pb-3 mb-10 scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              suppressHydrationWarning
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex-shrink-0 ${
                activeFilter === cat
                  ? "bg-accent text-surface shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "bg-surface-card border border-surface-border text-muted hover:text-white hover:border-accent/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.1 }}
              className={i >= 3 ? "hidden md:block" : ""}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="/karya"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-surface-border hover:border-accent/50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-accent/5"
          >
            Lihat Semua Karya
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
