"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { usePhoto } from "@/components/providers/PhotoProvider";
import { Meteors } from "@/components/magicui/meteors";

const dynamicCategories = [
  "Jasa Web Sistem Kustom",
  "Landing Page Promosi UMKM",
  "Aplikasi E-Commerce Modern",
  "Sistem Informasi Organisasi",
];

export default function Hero() {
  const [profile, setProfile] = useState(null);
  const heroRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState(0);

  const isHeroInView = useInView(heroRef, { margin: "-40% 0px 0px 0px" });
  const { activePhotoSection, setActivePhotoSection } = usePhoto();

  useEffect(() => {
    if (isHeroInView) setActivePhotoSection("hero");
  }, [isHeroInView, setActivePhotoSection]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % dynamicCategories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Stars removed — replaced by Meteors component

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col pt-24 lg:pt-32 pb-0 lg:pb-16 overflow-hidden"
      style={{ backgroundColor: "#060612" }}
    >
      {/* Glow Layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 600px 500px at 0% 50%, rgba(144, 19, 254,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 400px 400px at 100% 50%, rgba(212,83,126,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Animated Meteors Background */}
      <Meteors number={15} angle={215} minDuration={3} maxDuration={10} />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full max-w-[100vw] grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center flex-1">
        
        {/* Left Column (Text & CTA) */}
        <div className="flex flex-col items-start text-left">
          
          {/* Dynamic Category (Typing effect / Fade) */}
          <div className="h-8 mb-6 flex items-center">
            <span
              className="inline-block w-2 h-2 rounded-full mr-3"
              style={{ background: "#9013FE", boxShadow: "0 0 10px #9013FE" }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm md:text-base font-bold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {dynamicCategories[currentCategory]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-white mb-6 leading-[1.2] break-words"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            Ubah Kerja Manual Jadi{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(to right, #9013FE, #FFD700)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline",
                filter: "drop-shadow(0 0 20px rgba(144, 19, 254, 0.4))",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              Sistem Digital yang Terotomatisasi
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl mb-10 max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Kami membantu UMKM dan pemilik bisnis membangun aplikasi web kustom sesuai kebutuhan. <strong className="text-white font-bold">Mulai dari integrasi sistem internal, otomatisasi laporan, hingga platform e-commerce dan landing page.</strong> Satu sistem terpadu untuk efisiensi operasional dan peningkatan omset Anda
          </motion.p>

          {/* 2 Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href={`https://wa.me/${(profile?.whatsapp || "6285794946920").replace(/\D/g, "")}?text=${encodeURIComponent("Halo, saya tertarik dengan jasa website profesional Anda.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-8 py-4 text-white font-bold text-sm md:text-base transition-all duration-300"
              style={{
                background: "#9013FE",
                borderRadius: "999px",
                boxShadow: "0 0 20px rgba(144, 19, 254, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#6B0DBF";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(144, 19, 254, 0.7)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#9013FE";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(144, 19, 254, 0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Buat Website Sekarang
            </a>
            <a
              href="#karya"
              onClick={(e) => handleScroll(e, "#karya")}
              className="inline-flex justify-center items-center px-8 py-4 text-white font-bold text-sm md:text-base transition-all duration-300"
              style={{
                background: "transparent",
                border: "2px solid #9013FE",
                borderRadius: "999px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(144, 19, 254, 0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Lihat Portofolio
            </a>
          </motion.div>
        </div>

        {/* Right Column (Photo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative block w-full mt-12 lg:mt-0"
        >
          {/* Decorative Glow Behind Image */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(144, 19, 254,0.15) 0%, transparent 60%)",
            }}
          />
          
          <div className="relative w-full aspect-[4/5] max-w-[450px] mx-auto lg:ml-auto lg:mr-0 transition-transform duration-500 hover:scale-[1.02]">
            {activePhotoSection === "hero" && (
              <motion.img
                layoutId="shared-profile-photo"
                src={profile?.hero_image_url || "https://placehold.co/800x1000/0c0c18/9013FE?text=Foto+Profil"}
                alt="Profil"
                className="w-full h-full object-contain object-bottom lg:object-right-bottom"
                style={{ filter: "drop-shadow(0 0 40px rgba(144, 19, 254, 0.4))" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
