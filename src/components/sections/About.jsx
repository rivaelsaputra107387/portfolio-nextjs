"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { usePhoto } from "@/components/providers/PhotoProvider";
import { DotPattern } from "@/components/magicui/dot-pattern";

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

// Highlight keywords in bio
function highlightBio(text) {
  const keywords = ["3+ tahun", "tiga tahun", "live di production", "hasil nyata", "kolaborasi", "UMKM", "perusahaan"];
  let result = text;
  keywords.forEach((kw) => {
    const regex = new RegExp(`(${kw})`, "gi");
    result = result.replace(regex, `|||$1|||`);
  });
  const parts = result.split("|||");
  return parts.map((part, i) => {
    const isKeyword = keywords.some((kw) => kw.toLowerCase() === part.toLowerCase());
    if (isKeyword) {
      return (
        <span key={i} style={{ color: "#9013FE", fontWeight: 600 }}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function About() {
  const [profile, setProfile] = useState(defaultProfile);
  const sectionRef = useRef(null);

  const isAboutInView = useInView(sectionRef, { margin: "-40% 0px 0px 0px" });
  const { activePhotoSection, setActivePhotoSection } = usePhoto();

  useEffect(() => {
    if (isAboutInView) setActivePhotoSection("about");
  }, [isAboutInView, setActivePhotoSection]);

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
    fetchProfile();
  }, []);

  const techTags = ["Laravel", "Next.js", "React", "PHP", "MySQL", "PostgreSQL", "Tailwind CSS", "Git & GitHub"];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#0c0c18" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 400px 300px at 5% 10%, rgba(83,74,183,0.15) 0%, transparent 60%)",
        }}
      />
      
      {/* Animated Dot Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <DotPattern glow={true} width={20} height={20} cr={1.5} cx={1} cy={1} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column — Photo & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Available Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold"
                style={{
                  background: "rgba(29,158,117,0.15)",
                  border: "1px solid rgba(29,158,117,0.35)",
                  borderRadius: "999px",
                  color: "#1D9E75",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#1D9E75",
                    animation: "dotPulse 2s ease-in-out infinite",
                  }}
                />
                Available for Work
              </div>

              {/* Photo */}
              <div className="relative w-full aspect-[4/5] max-w-[400px] mb-6">
                {activePhotoSection === "about" && (
                  <motion.img
                    layoutId="shared-profile-photo"
                    src={profile?.hero_image_url || "https://placehold.co/800x1000/0c0c18/9013FE?text=Foto+Profil"}
                    alt={profile.name}
                    className="w-full h-auto object-contain"
                    style={{ filter: "drop-shadow(0 0 40px rgba(144, 19, 254, 0.4))" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                )}
              </div>


            </div>
          </motion.div>

          {/* Right Column — Bio & Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <span
              className="inline-block text-xs font-semibold uppercase mb-4"
              style={{
                color: "#9013FE",
                letterSpacing: "3px",
              }}
            >
              ● TENTANG SAYA
            </span>

            {/* Heading */}
            <h2
              className="font-display text-white mb-6"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Siapa <span style={{ color: "#9013FE" }}>RIVA</span>?
            </h2>

            {/* Bio */}
            <div className="space-y-4 mb-8">
              {(profile.about_bio || "").split("\n").map((p, idx) => {
                if (!p.trim()) return null;
                return (
                  <p
                    key={idx}
                    className="text-base leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {highlightBio(p)}
                  </p>
                );
              })}
            </div>

            {/* Contact Info Card (Moved here for balance) */}
            <div
              className="p-5 space-y-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
              }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm transition-colors duration-300 group"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#9013FE" }} />
                <span className="font-medium">{profile.email}</span>
              </a>
              <a
                href={getWhatsAppLink(profile.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#9013FE" }} />
                <span className="font-medium">{formatPhoneNumber(profile.whatsapp)}</span>
              </a>
              <div
                className="flex items-center gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#9013FE" }} />
                <span className="font-medium">{profile.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
