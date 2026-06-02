"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { Calendar, Users, Rocket, Building, Mail, Phone, MapPin, Download } from "lucide-react";
import { motion } from "framer-motion";

const defaultProfile = {
  name: "Rivael Saputra",
  title: "Fullstack Developer",
  about_bio: `Halo, saya "Rivael" — seorang Fullstack Developer dengan pengalaman lebih dari tiga tahun dalam membangun solusi web yang efisien, fungsional, dan mudah digunakan.

Saya telah mengerjakan berbagai proyek di ranah perusahaan, organisasi, dan akademik — mulai dari landing page UMKM, portal bisnis lokal, sistem booking, sistem informasi organisasi, hingga aplikasi internal perusahaan.

Saya percaya solusi digital terbaik lahir dari kolaborasi: mendengarkan kebutuhan stakeholder, merancang solusi yang praktis, lalu mengeksekusi sampai hasil nyata.`,
  cv_url: "#",
  whatsapp: "085794946920",
  email: "riva.elsaputra2020@gmail.com",
  location: "Bandung, Indonesia",
  github_url: "https://github.com/rivaelsaputra",
  linkedin_url: "https://linkedin.com/in/rivaelsaputra",
  instagram_url: "https://instagram.com/rievaelss"
};

const defaultStats = [
  { icon: <Calendar className="w-6 h-6 text-accent mx-auto" />, value: "3+", label: "Tahun Pengalaman" },
  { icon: <Users className="w-6 h-6 text-accent mx-auto" />, value: "5+", label: "Klien Puas" },
  { icon: <Rocket className="w-6 h-6 text-accent mx-auto" />, value: "10+", label: "Proyek Selesai" },
  { icon: <Building className="w-6 h-6 text-accent mx-auto" />, value: "3+", label: "Perusahaan/Organisasi" },
];

// Helper function to format phone number beautifully (+62 8XX-XXXX-XXXX)
function formatPhoneNumber(num) {
  if (!num) return "";
  let cleanNum = num.replace(/\D/g, "");
  if (cleanNum.startsWith("0")) {
    cleanNum = "62" + cleanNum.substring(1);
  }
  if (cleanNum.startsWith("62") && cleanNum.length >= 10) {
    const country = "+62";
    const part1 = cleanNum.substring(2, 5);
    const part2 = cleanNum.substring(5, 9);
    const part3 = cleanNum.substring(9);
    return `${country} ${part1}-${part2}-${part3}`;
  }
  return num;
}

// Helper to get sanitized WhatsApp link
function getWhatsAppLink(num) {
  if (!num) return "#";
  let cleanNum = num.replace(/\D/g, "");
  if (cleanNum.startsWith("0")) {
    cleanNum = "62" + cleanNum.substring(1);
  }
  return `https://wa.me/${cleanNum}`;
}

export default function About() {
  const [profile, setProfile] = useState(defaultProfile);
  const [stats, setStats] = useState(defaultStats);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setProfile(data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchStats() {
      try {
        const [projRes, clientRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/clients"),
        ]);
        const projects = projRes.ok ? await projRes.json() : [];
        const clients = clientRes.ok ? await clientRes.json() : [];

        setStats([
          { icon: <Calendar className="w-6 h-6 text-accent mx-auto" />, value: "3+", label: "Tahun Pengalaman" },
          { icon: <Users className="w-6 h-6 text-accent mx-auto" />, value: clients.length > 0 ? `${clients.length}+` : "5+", label: "Klien Puas" },
          { icon: <Rocket className="w-6 h-6 text-accent mx-auto" />, value: projects.length > 0 ? `${projects.length}+` : "10+", label: "Proyek Selesai" },
          { icon: <Building className="w-6 h-6 text-accent mx-auto" />, value: "3+", label: "Perusahaan/Organisasi" },
        ]);
      } catch (err) {
        // Fallback
      }
    }

    fetchProfile();
    fetchStats();
  }, []);

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 relative bg-[#111118]"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            subtitle="Tentang Saya"
            title="Siapa RIVA?"
            description="Kenali lebih dekat developer di balik setiap baris kode."
          />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Left — Identity Card with Photo & Contacts */}
          <motion.div
            className="lg:col-span-5 xl:col-span-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative h-full">
              <div className="glass-card rounded-3xl border border-surface-border/60 relative group overflow-hidden h-full min-h-[480px] md:min-h-0">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/[0.02] rounded-full blur-2xl group-hover:bg-accent/[0.05] transition-all duration-500 z-10" />

                {/* --- DESKTOP VIEW LAYOUT (hidden md:block) --- */}
                {/* Background Photo */}
                <div className="absolute inset-0 w-full h-full hidden md:block z-0 overflow-hidden">
                  <img
                    src={profile.hero_image_url || "https://placehold.co/400x600/1A1A1A/8B5CF6?text=Rivael"}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark gradient overlay covering the bottom of the card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10" />
                </div>

                {/* Desktop Info Overlay (positioned absolutely at the bottom) */}
                <div className="absolute bottom-0 inset-x-0 p-8 z-20 hidden md:block">
                  <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-accent mb-2 bg-accent/10 px-2.5 py-1 rounded">
                    {profile.title}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                    {profile.name}
                  </h3>
                  
                  {/* Contact Links */}
                  <div className="space-y-3.5 border-t border-white/10 pt-4">
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-3.5 text-sm text-muted-light hover:text-white transition-colors group/item">
                      <Mail className="w-4 h-4 text-accent group-hover/item:scale-110 transition-transform" />
                      <span className="font-semibold">{profile.email}</span>
                    </a>
                    <a
                      href={getWhatsAppLink(profile.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 text-sm text-muted-light hover:text-white transition-colors group/item"
                    >
                      <Phone className="w-4 h-4 text-accent group-hover/item:scale-110 transition-transform" />
                      <span className="font-semibold">{formatPhoneNumber(profile.whatsapp)}</span>
                    </a>
                    <div className="flex items-center gap-3.5 text-sm text-muted-light">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-semibold">{profile.location}</span>
                    </div>
                  </div>
                </div>

                {/* --- MOBILE VIEW LAYOUT (block md:hidden) --- */}
                <div className="md:hidden p-6 flex flex-col justify-between h-full relative z-20">
                  {/* Compact top header with avatar circle and name/title side-by-side */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/20 flex-shrink-0">
                      <img
                        src={profile.hero_image_url || "https://placehold.co/150x150/1A1A1A/8B5CF6?text=Rivael"}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent mb-1 bg-accent/10 px-2 py-0.5 rounded">
                        {profile.title}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {profile.name}
                      </h3>
                    </div>
                  </div>

                  {/* Compact contact grid below */}
                  <div className="space-y-3.5 border-t border-surface-border/50 pt-4">
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-3.5 p-3.5 bg-surface/50 border border-surface-border/30 rounded-xl hover:bg-surface/80 transition-all group/item">
                      <Mail className="w-4 h-4 text-accent group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium truncate">{profile.email}</span>
                    </a>
                    <a
                      href={getWhatsAppLink(profile.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 p-3.5 bg-surface/50 border border-surface-border/30 rounded-xl hover:bg-surface/80 transition-all group/item"
                    >
                      <Phone className="w-4 h-4 text-accent group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium">{formatPhoneNumber(profile.whatsapp)}</span>
                    </a>
                    <div className="flex items-center gap-3.5 p-3.5 bg-surface/50 border border-surface-border/30 rounded-xl hover:bg-surface/80 transition-all">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-medium">{profile.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background decorative shadows */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent/15 rounded-3xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/5 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Right — Bio paragraphs, tags, and CV download */}
          <motion.div
            className="lg:col-span-7 xl:col-span-8 lg:pl-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-8 border border-surface-border/60 relative overflow-hidden h-full flex flex-col justify-between">
              <div className="space-y-6">
                {(profile.about_bio || "").split("\n").map((p, idx) => {
                  if (!p.trim()) return null;
                  return (
                    <p key={idx} className="text-muted-light text-base md:text-lg leading-relaxed">
                      {p}
                    </p>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-surface-border/50">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-display">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Laravel", "Next.js", "React", "PHP", "MySQL", "PostgreSQL", "Tailwind CSS", "Git & GitHub"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-2 bg-surface border border-surface-border hover:border-accent/30 text-xs font-semibold text-muted-light rounded-xl hover:text-white transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={profile.cv_url && profile.cv_url !== "#" ? profile.cv_url : `https://wa.me/${profile.whatsapp}?text=Halo%20Riva,%20saya%20tertarik%20dengan%20CV%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-accent hover:bg-accent-dark text-surface font-extrabold text-sm md:text-base rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  {profile.cv_url && profile.cv_url !== "#" ? "Download CV Saya" : "Request CV via WhatsApp"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center hover:border-accent/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
