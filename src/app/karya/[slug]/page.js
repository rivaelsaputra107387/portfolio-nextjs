"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechBadge from "@/components/ui/TechBadge";

const fallbackProjects = {
  "sistem-informasi-organisasi-knpi-kab-bandung": {
    title: "Sistem Informasi Organisasi — KNPI Kabupaten Bandung",
    category: "Web System",
    description: "Website profil publik DPD KNPI Kabupaten Bandung sebagai media digital resmi dengan panel admin untuk manajemen konten berita, struktur kepengurusan, dan program kerja pemuda.",
    image_url: "/images/projects/knpi.png",
    demo_url: "https://knpikabbdg.com/",
    tech_stack: ["Laravel", "Blade", "MySQL", "Bootstrap", "JavaScript"],
  },
  "sistem-toko-online-umkm-mamaku": {
    title: "Sistem Toko Online — UMKM Mamaku",
    category: "E-Commerce",
    description: "Platform e-commerce untuk UMKM sayur dan buah segar dengan integrasi Midtrans, fitur pre-order, dashboard admin real-time, dan laporan transaksi PDF.",
    image_url: "/images/projects/mamaku.png",
    demo_url: "https://www.instagram.com/rievaelss/",
    tech_stack: ["Laravel", "MySQL", "Midtrans", "Bootstrap", "JavaScript"],
  },
  "sitt-pengelolaan-stok-pt-trimas": {
    title: "SITT — Modul Manajemen Stok (PT Trimas Sarana Garmen)",
    category: "Internal Tool",
    description: "Modul inventory alat pemotong terintegrasi ke dalam Sistem Informasi Trimas Terpadu (SITT) menggunakan CodeIgniter 4 backend dan Next.js frontend dengan koneksi SQL Server.",
    image_url: "/images/projects/sitt.png",
    demo_url: null,
    tech_stack: ["CodeIgniter 4", "Next.js", "SQL Server", "RESTful API", "Postman"],
  },
  "manajemen-dokumen-digital-autotagging": {
    title: "Sistem Manajemen Dokumen dengan Auto-Tagging AI",
    category: "Web System",
    description: "Sistem arsip digital berbasis Laravel dengan integrasi Hugging Face (zero-shot & NER) untuk auto-tagging dokumen, pencarian full-text, RBAC, activity log, dan backup terjadwal.",
    image_url: "/images/projects/dokumen-ai.png",
    demo_url: "https://knpikabbdg.com/",
    tech_stack: ["Laravel", "PHP", "Hugging Face", "NLP", "RBAC", "MySQL"],
  },
  "karang-taruna-mandiri-jaya-landing": {
    title: "Karang Taruna Mandiri Jaya — Landing Page",
    category: "Landing Page",
    description: "Landing page responsif organisasi pemuda dengan hero komunikatif, galeri kegiatan, struktur organisasi, dan form kontak terintegrasi. Mobile-first design.",
    image_url: "/images/projects/karang-taruna.png",
    demo_url: "https://karang-taruna-mandiri-jaya.vercel.app/",
    tech_stack: ["HTML", "CSS", "JavaScript", "UI/UX", "Vercel"],
  },
};

export default function KaryaDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          const found = data.find((p) => p.slug === params.slug);
          if (found) {
            setProject(found);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // fallback
      }

      if (fallbackProjects[params.slug]) {
        setProject(fallbackProjects[params.slug]);
      }
      setLoading(false);
    }
    fetchProject();
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        </main>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-white mb-4">404</h1>
            <p className="text-muted mb-6">Proyek tidak ditemukan.</p>
            <a href="/karya" className="px-6 py-3 bg-accent text-surface font-semibold rounded-xl">
              Kembali ke Karya
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = [project.image_url, ...(project.gallery_urls || [])].filter(Boolean);
  const uniqueImages = Array.from(new Set(images));

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <a
            href="/karya"
            className="inline-flex items-center gap-2 text-muted hover:text-accent font-medium transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Kembali ke Karya
          </a>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white leading-tight mb-4">
              {project.title}
            </h1>
          </div>

          {/* Gallery Carousel */}
          <div className="mb-8">
            {/* Main Image View */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden glass-card group">
              <img
                src={uniqueImages[activeImageIndex] || "https://placehold.co/1200x600/1A1A1A/8B5CF6?text=No+Image"}
                alt={`${project.title} - Image ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.target.src = `https://placehold.co/1200x600/1A1A1A/8B5CF6?text=${encodeURIComponent(project.title)}`;
                }}
              />
              
              {uniqueImages.length > 1 && (
                <>
                  {/* Prev Button */}
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? uniqueImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 border border-surface-border text-white flex items-center justify-center hover:bg-accent hover:text-surface transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === uniqueImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 border border-surface-border text-white flex items-center justify-center hover:bg-accent hover:text-surface transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image Counter Badge */}
                  <div className="absolute bottom-4 right-4 bg-surface/85 border border-surface-border px-3 py-1 rounded-full text-xs font-medium text-white">
                    {activeImageIndex + 1} / {uniqueImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails Row */}
            {uniqueImages.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-surface-border">
                {uniqueImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                      activeImageIndex === idx
                        ? "border-accent shadow-[0_0_10px_rgba(139,92,246,0.3)] scale-95"
                        : "border-surface-border hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/150x100/1A1A1A/8B5CF6?text=Image+${idx + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Tentang Proyek</h2>
            <div className="text-muted-light leading-relaxed space-y-4">
              {/<[a-z]/i.test(project.description) ? (
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.description }} />
              ) : (
                project.description.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("- ") || paragraph.match(/^\d+\./)) {
                    const items = paragraph.split("\n");
                    const isOrdered = paragraph.match(/^\d+\./);
                    const Tag = isOrdered ? "ol" : "ul";
                    return (
                      <Tag key={i} className={`pl-5 space-y-1.5 ${isOrdered ? "list-decimal" : "list-disc"}`}>
                        {items.map((item, j) => (
                          <li key={j} dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^[-\d.]+\s*/, "")
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em class="text-muted-light italic">$1</em>')
                              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline font-semibold">$1</a>')
                          }} />
                        ))}
                      </Tag>
                    );
                  }
                  return (
                    <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="text-muted-light italic">$1</em>')
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline font-semibold">$1</a>')
                    }} />
                  );
                })
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {(project.tech_stack || []).map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-surface font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            <a
              href={`https://wa.me/6285794946920?text=${encodeURIComponent(`Halo Riva, saya tertarik dengan proyek "${project.title}". Bisa buat yang serupa?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-surface-border hover:border-accent/50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-accent/5"
            >
              Diskusi Proyek Serupa
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
