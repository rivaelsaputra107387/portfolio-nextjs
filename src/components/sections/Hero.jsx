"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, Rocket, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [profile, setProfile] = useState(null);
  const heroRef = useRef(null);

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

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      id="hero"
      ref={heroRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden radial-glow-hero"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[150px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-20 w-full text-center flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          {/* Floating Badges + Headline (Animate immediately) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* Floating Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold rounded-full animate-bounce-subtle"
              >
                <Briefcase className="w-3.5 h-3.5 text-accent" /> 3+ Years Experience
              </span>
            </div>

            {/* Headline Wrapper */}
            <div className="w-full overflow-hidden">
              <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight mb-6 max-w-3xl mx-auto">
                Bangun Website yang{" "}
                <span className="text-gradient">Bukan Cuma Kelihatan Bagus</span>
                <br />
                <span className="text-muted-light text-lg md:text-3xl lg:text-4xl font-display font-bold block mt-2">
                  — Tapi Memberikan Hasil Nyata
                </span>
              </h1>
            </div>
          </motion.div>

          {/* Subheadline & CTAs (Staggered Delay 0.2s) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full flex flex-col items-center"
          >
            {/* Subheadline */}
            <p className="text-muted-light text-sm md:text-lg leading-relaxed mb-10 max-w-2xl">
              Saya <span className="text-white font-semibold">{profile?.name ? profile.name.split(" ")[0] : "Rivael"}</span> — {profile?.title || "Fullstack Developer"}{" "}
              yang siap membantu UMKM, organisasi, dan perusahaan membangun sistem digital yang fungsional, cepat, dan siap menghasilkan leads.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="inline-flex items-center px-6 py-3.5 md:px-8 md:py-4 bg-accent hover:bg-accent-dark text-surface font-extrabold text-sm md:text-base rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
              >
                Mulai Project Bareng Saya →
              </a>
              <a
                href="#karya"
                onClick={(e) => handleScroll(e, "#karya")}
                className="inline-flex items-center px-6 py-3.5 md:px-8 md:py-4 border-2 border-surface-border hover:border-accent/50 text-white font-extrabold text-sm md:text-base rounded-xl transition-all duration-300 hover:bg-accent/5 hover:-translate-y-0.5"
              >
                Lihat Karya Saya
              </a>
            </div>
          </motion.div>

          {/* Stats Row (Staggered Delay 0.4s) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="w-full flex flex-col items-center"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 md:gap-16 border-t border-surface-border/50 pt-8 w-full max-w-3xl">
              {[
                { value: "10+", label: "Projects Delivered" },
                { value: "5+", label: "Happy Clients" },
                { value: "3+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-1">
                  <div className="text-2xl md:text-4xl font-display font-extrabold text-accent">
                    {stat.value}
                  </div>
                  <div className="text-[9px] md:text-xs text-muted uppercase tracking-wider mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </motion.section>
  );
}
