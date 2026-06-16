"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fallbackTestimonials = [
  {
    id: 1,
    name: "Tantan",
    role: "Ketua Karang Taruna Mandiri Jaya",
    content: "Landing page organisasi yang dibuat Rivael sangat responsif, modern, dan mudah diakses. Pihak pemuda dan masyarakat sangat terbantu dengan informasi publikasi kegiatan kami yang sekarang tertata rapi.",
    avatar_url: null,
  },
  {
    id: 2,
    name: "Rifki Fauzi",
    role: "Ketua DPD KNPI Kab. Bandung",
    content: "Rivael berhasil mendigitalisasi sistem informasi KNPI Kabupaten Bandung dengan sangat baik. Panel admin yang dibuat memudahkan pengurus untuk memperbarui berita kegiatan kepemudaan secara berkala.",
    avatar_url: null,
  },
  {
    id: 3,
    name: "Km Syarif., M.Kom",
    role: "Dosen STMIK Mardira Indonesia",
    content: "Modul Manajemen Stok SITT yang dikembangkan Rivael berjalan sangat cepat dan akurat. Integrasi backend CodeIgniter 4 dan Next.js sangat rapi, memudahkan pelacakan inventory alat pemotong secara real-time.",
    avatar_url: null,
  },
  {
    id: 4,
    name: "Wildan",
    role: "Pemilik UMKM MAMAKU",
    content: "Sistem e-commerce yang dibangun Rivael membantu UMKM kami naik kelas. Pelanggan bisa memesan sayur dan buah segar secara online dengan mudah, dan manajemen pesanan di dashboard kami jadi sangat terstruktur.",
    avatar_url: null,
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Map the API data to match the avatar_url format if necessary, keeping hardcoded fallback
            const mapped = data.map((d, index) => ({
              ...fallbackTestimonials[index % fallbackTestimonials.length],
              ...d
            }));
            setTestimonials(mapped);
          }
        }
      } catch (err) {
        // Safe to use fallback
      }
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, testimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Slide Animation Variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 120 : -120,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.35 }
      }
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            subtitle="Testimoni"
            title="Apa Kata Mereka?"
            description="Pendapat jujur dari para klien dan dosen pembimbing atas hasil karya saya."
          />
        </motion.div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative max-w-4xl mx-auto mt-6 px-4 py-6 flex flex-col items-center justify-center min-h-[260px]"
        >
          {/* Decorative Giant Quote Mark */}
          <div className="absolute top-2 left-4 md:left-10 text-accent/[0.05] text-7xl md:text-8xl font-serif select-none pointer-events-none leading-none">
            “
          </div>

          <div className="w-full relative overflow-hidden flex items-center justify-center min-h-[120px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full text-center flex flex-col items-center justify-center"
              >
                {/* Quote Text */}
                <p className="text-white text-base md:text-xl italic leading-relaxed text-center px-4 md:px-6 max-w-[650px] mb-5 font-sans font-medium">
                  "{currentTestimonial.content}"
                </p>

                {/* Profile Card */}
                <div className="flex items-center gap-3 text-left">
                  <div className="w-11 h-11 bg-accent/10 border border-accent/25 rounded-full flex items-center justify-center text-accent font-extrabold text-base shadow-[0_0_12px_rgba(139,92,246,0.15)] overflow-hidden flex-shrink-0">
                    {currentTestimonial.avatar_url && !imageError ? (
                      <img
                        src={currentTestimonial.avatar_url}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <span>{currentTestimonial.name ? currentTestimonial.name.charAt(0) : "T"}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base tracking-tight">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-accent text-xs font-semibold mt-0.5">
                      {currentTestimonial.role || currentTestimonial.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons (←  →) */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              suppressHydrationWarning
              className="w-11 h-11 rounded-full border border-surface-border text-muted-light hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.15)] focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              suppressHydrationWarning
              className="w-11 h-11 rounded-full border border-surface-border text-muted-light hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.15)] focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                suppressHydrationWarning
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  currentIndex === idx
                    ? "bg-accent scale-110 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                    : "bg-surface-border hover:bg-muted-light"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
