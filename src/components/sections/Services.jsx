"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { LayoutGrid, Globe, Building2, Settings, ShoppingCart, Send, Check, Clock, Rocket, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Helper function to map technical tiers to business-oriented labels
function getTierLabel(tier) {
  if (!tier) return "Starter";
  const lower = tier.toLowerCase();
  if (lower.includes("tier 1") || lower.includes("starter")) return "Starter";
  if (lower.includes("tier 2") || lower.includes("growth")) return "Growth";
  if (lower.includes("tier 3") || lower.includes("ultimate")) return "Ultimate";
  if (lower.includes("tier 4") || lower.includes("enterprise")) return "Enterprise";
  return tier.split(" — ")[0];
}

const fallbackServices = [
  {
    title: "Landing Page (Starter)",
    icon: "🌐",
    price: "Rp 1.500.000 / proyek",
    description: "Promo produk, event, profil bisnis baru, dll.",
    features: [
      "1 halaman scroll panjang",
      "Responsif (Mobile Friendly)",
      "Basic SEO Setup",
      "Form Kontak / Integrasi Tombol WA",
      "Free SSL Certificate",
      "1x Revisi",
    ],
    duration: "⏱ 5–7 hari kerja",
    notes: null,
    tier: "Tier 1 — Starter",
    category: "Landing Page",
  },
  {
    title: "Company Profile (Starter)",
    icon: "🏢",
    price: "Rp 1.800.000 / proyek",
    description: "Kantor, studio, klinik, toko, komunitas, dll.",
    features: [
      "3 halaman utama (Home, About, Contact)",
      "Responsif (Mobile Friendly)",
      "Basic SEO Setup",
      "Form Kontak / Integrasi Tombol WA",
      "Free SSL Certificate",
      "1x Revisi",
    ],
    duration: "⏱ 7–10 hari kerja",
    notes: null,
    tier: "Tier 1 — Starter",
    category: "Company Profile",
  },
  {
    title: "Landing Page (Growth)",
    icon: "🚀",
    price: "Rp 2.500.000 / proyek",
    description: "Produk premium, jasa freelance, portofolio, dll.",
    features: [
      "Semua fitur paket Starter +",
      "Animasi scroll & interaksi interaktif",
      "SEO On-Page lebih mendalam",
      "Speed Optimization (Kecepatan Tinggi)",
      "3x Revisi",
    ],
    duration: "⏱ 7–10 hari kerja",
    notes: null,
    tier: "Tier 2 — Growth (⭐ Most Popular)",
    category: "Landing Page",
  },
  {
    title: "Company Profile (Growth)",
    icon: "🏢",
    price: "Rp 2.750.000 / proyek",
    description: "Organisasi, institusi pendidikan, bisnis menengah, dll.",
    features: [
      "5–7 halaman lengkap",
      "Panel Admin kustom (Kelola konten sendiri)",
      "Blog / CMS Sistem Artikel",
      "Hosting + Setup SSL penuh",
      "3x Revisi",
    ],
    duration: "⏱ 10–14 hari kerja",
    notes: null,
    tier: "Tier 2 — Growth (⭐ Most Popular)",
    category: "Company Profile",
  },
  {
    title: "Web Sistem (Growth)",
    icon: "⚙️",
    price: "Rp 3.500.000 / proyek",
    description: "Sistem absensi, manajemen anggota, inventaris sederhana, dll.",
    features: [
      "Sistem CRUD kustom + Database relasional",
      "Panel Admin Multi-Role (Akses Bertingkat)",
      "RESTful API dasar",
      "Dokumentasi Teknis penggunaan sistem",
      "Garansi / Support Teknis 14 hari",
    ],
    duration: "⏱ 14–21 hari kerja",
    notes: null,
    tier: "Tier 2 — Growth (⭐ Most Popular)",
    category: "Web Sistem",
  },
  {
    title: "Web Sistem Lanjut (Ultimate)",
    icon: "👑",
    price: "Mulai Rp 5.000.000",
    description: "Toko online, portal berita, sistem booking, sistem informasi organisasi, dll.",
    features: [
      "RBAC (Role-Based Access Control) & Workflow Kustom",
      "Integrasi Layanan Eksternal (Pihak Ketiga)",
      "Notifikasi Otomatis via Email / Webhook",
      "Dashboard Laporan & Analytics Grafik",
      "Garansi / Support Teknis 30 hari",
    ],
    duration: "⏱ 21–45 hari kerja",
    notes: null,
    tier: "Tier 3 — Ultimate",
    category: "E-Commerce",
  },
  {
    title: "Portal / Platform (Enterprise)",
    icon: "📡",
    price: "Rp 10.000.000+ / diskusi kustom",
    description: "Portal berita besar, platform komunitas, sistem multi-tenant, dll.",
    features: [
      "Arsitektur Multi-modul Terintegrasi",
      "Sistem Subscription & Membership User",
      "ETL / Mekanisme Migrasi Data Lama",
      "Arsitektur Skalabel + Dokumentasi Penuh",
      "Support & SLA (Service Level Agreement) disepakati bersama",
    ],
    duration: "⏱ Estimasi per milestone proyek",
    notes: "DP di awal, pembayaran termin per milestone. Cakupan scope dikunci ketat sebelum deal.",
    tier: "Tier 4 — Enterprise · Custom Scope",
    category: "Portal / Enterprise",
  },
  {
    title: "ERP / LMS (Enterprise)",
    icon: "📊",
    price: "Rp 15.000.000+ / diskusi kustom",
    description: "Sistem ERP perusahaan, LMS sekolah/kampus, platform e-learning korporat, dll.",
    features: [
      "Modul HR / akademik / operasional Kustom",
      "Sistem Reporting & Advanced Analytics",
      "Integrasi dengan Sistem / Infrastruktur yang sudah ada",
      "Arsitektur Skalabel Kinerja Tinggi",
      "Scope wajib didefinisikan secara sangat detail di awal",
    ],
    duration: "⏱ 2–6 bulan (Tergantung jumlah modul)",
    notes: "Harga bisa naik signifikan tergantung kebutuhan modul. Wajib konsultasi teknis dulu sebelum angka final ditentukan.",
    tier: "Tier 4 — Enterprise · Custom Scope",
    category: "Portal / Enterprise",
  },
];

const categoryTabs = [
  { id: "Semua", label: "Semua", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: "Landing Page", label: "Landing Page", icon: <Globe className="w-4 h-4" /> },
  { id: "Company Profile", label: "Company Profile", icon: <Building2 className="w-4 h-4" /> },
  { id: "Web Sistem", label: "Web Sistem", icon: <Settings className="w-4 h-4" /> },
  { id: "E-Commerce", label: "E-Commerce", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "Portal / Enterprise", label: "Portal / Enterprise", icon: <Send className="w-4 h-4" /> },
];

export default function Services() {
  const [services, setServices] = useState(fallbackServices);
  const [activeCategory, setActiveCategory] = useState("Landing Page");

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setServices(data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchServices();
  }, []);

  const activeServices = services.filter((s) => {
    if (activeCategory === "Semua") return true;
    const serviceCategory = s.category || "Landing Page";
    return serviceCategory === activeCategory;
  });

  // Determine grid columns dynamically based on item count
  const getGridClass = (count) => {
    if (count === 1) return "max-w-xl mx-auto grid-cols-1";
    if (count === 2) return "max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 gap-8";
    return "max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  };

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 bg-[#111118] relative"
    >
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            subtitle="Layanan"
            title="Paket Layanan & Jasa"
            description="Solusi digital terintegrasi untuk membantu bisnis Anda tumbuh dan beroperasi lebih efisien."
          />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                suppressHydrationWarning
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  isActive
                    ? "bg-accent border-accent text-surface shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                    : "bg-surface/50 border-surface-border text-muted-light hover:border-accent/40 hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Services Grid */}
        <div className={`grid ${getGridClass(activeServices.length)}`}>
          {activeServices.map((service, i) => {
            const isGrowthPopular = (service.tier || "").includes("Growth");
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                className={`group glass-card rounded-2xl p-6 md:p-8 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col justify-between h-full ${
                  isGrowthPopular ? "border-accent/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-accent/20 transition-colors duration-300">
                      {service.icon === "🌐" && <Globe className="w-6 h-6 text-accent" />}
                      {service.icon === "🏢" && <Building2 className="w-6 h-6 text-accent" />}
                      {service.icon === "🚀" && <Rocket className="w-6 h-6 text-accent" />}
                      {service.icon === "⚙️" && <Settings className="w-6 h-6 text-accent" />}
                      {service.icon === "👑" && <Zap className="w-6 h-6 text-accent" />}
                      {service.icon === "📡" && <Send className="w-6 h-6 text-accent" />}
                      {service.icon === "📊" && <LayoutGrid className="w-6 h-6 text-accent" />}
                      {!["🌐", "🏢", "🚀", "⚙️", "👑", "📡", "📊"].includes(service.icon) && (
                        <span className="text-gradient font-bold">{service.icon || "⚙️"}</span>
                      )}
                    </div>
                    {/* Tier Badge */}
                    <span className="text-[10px] px-2.5 py-1 bg-surface border border-surface-border text-accent font-semibold rounded-lg uppercase tracking-wider">
                      {getTierLabel(service.tier)}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-accent font-semibold text-sm mb-4">{service.price}</p>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed mb-5">{service.description}</p>

                  {/* Features */}
                  <div className="border-t border-surface-border/30 pt-4 mb-6">
                    <h4 className="text-[10px] text-white font-bold tracking-wider mb-3 uppercase">Fitur Termasuk:</h4>
                    <ul className="space-y-2.5">
                      {(service.features || []).map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-light">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Metadata (Duration & Notes) */}
                <div>
                  {service.duration && (
                    <div className="flex items-center gap-2 text-[11px] text-accent/80 font-medium pt-3 border-t border-surface-border/20">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>Durasi pengerjaan: {service.duration.replace("⏱ ", "")}</span>
                    </div>
                  )}

                  {service.notes && (
                    <p className="text-[10px] text-muted leading-relaxed italic mt-3 pt-3 border-t border-surface-border/20">
                      * {service.notes}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {activeServices.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto">
            <p className="text-muted text-sm">Belum ada layanan terdaftar untuk kategori ini.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
