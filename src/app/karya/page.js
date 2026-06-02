"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";

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

export default function KaryaPage() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState("Semua");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setProjects(data);
        }
      } catch (err) {
        // use fallback
      }
    }
    fetchProjects();
  }, []);

  const categories = ["Semua", ...new Set(projects.map((p) => p.category))];
  const filtered = activeFilter === "Semua" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            subtitle="Portfolio"
            title="Semua Karya"
            description="Kumpulan proyek yang sudah saya kerjakan untuk berbagai klien dan organisasi."
          />

          {/* Filter */}
          <div className="flex overflow-x-auto whitespace-nowrap md:flex-wrap md:justify-center gap-2 pb-3 mb-10 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex-shrink-0 ${
                  activeFilter === cat
                    ? "bg-accent text-surface"
                    : "bg-surface-card border border-surface-border text-muted hover:text-white hover:border-accent/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
