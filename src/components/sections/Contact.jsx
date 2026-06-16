"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Ripple } from "@/components/magicui/ripple";
import { Meteors } from "@/components/magicui/meteors";
import { MagicCard } from "@/components/magicui/magic-card";

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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [profile, setProfile] = useState({
    whatsapp: "6285794946920",
    email: "riva.elsaputra2020@gmail.com",
    location: "Bandung, Indonesia",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (!form.name || !form.whatsapp || !form.message) {
      setErrorMsg("Nama, WhatsApp, dan pesan wajib diisi.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengirim pesan.");
      }

      setStatus("success");
      setForm({ name: "", email: "", whatsapp: "", message: "" });
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  // Stars removed - replaced by Meteors component

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "#fff",
    outline: "none",
  };

  const inputFocusHandler = (e) => {
    e.currentTarget.style.borderColor = "rgba(144, 19, 254,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(144, 19, 254,0.15)";
  };

  const inputBlurHandler = (e) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0a0518" }}
    >
      {/* Big glow from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 50% 120%, rgba(144, 19, 254,0.45) 0%, transparent 65%)",
        }}
      />

      {/* Animated Meteors */}
      <Meteors number={10} angle={215} minDuration={3} maxDuration={10} />

      {/* Ripple Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Ripple mainCircleSize={400} numCircles={5} mainCircleOpacity={0.1} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-semibold uppercase mb-4"
            style={{ color: "#9013FE", letterSpacing: "3px" }}
          >
            ● KONTAK
          </span>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800 }}
          >
            Mulai Project Bareng Saya
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }} className="max-w-2xl mx-auto">
            Ceritakan kebutuhan Anda dan saya akan menghubungi dalam 1x24 jam.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {status === "success" ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(29,158,117,0.2)" }}
                >
                  <svg className="w-8 h-8" style={{ color: "#1D9E75" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pesan Terkirim! 🎉</h3>
                <p className="mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Terima kasih! Saya akan menghubungi Anda dalam 1x24 jam.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 text-white font-semibold text-sm transition-all duration-300"
                  style={{
                    background: "#9013FE",
                    borderRadius: "999px",
                  }}
                >
                  Kirim Pesan Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-white mb-2">
                    Nama Lengkap <span style={{ color: "#D4537E" }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    suppressHydrationWarning
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Nama Anda"
                    className="w-full px-4 py-3 text-sm"
                    style={{
                      ...inputStyle,
                      "::placeholder": { color: "rgba(255,255,255,0.3)" },
                    }}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-white mb-2">
                    Email <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>(opsional)</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    suppressHydrationWarning
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-3 text-sm"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>

                <div>
                  <label htmlFor="contact-whatsapp" className="block text-sm font-medium text-white mb-2">
                    Nomor WhatsApp <span style={{ color: "#D4537E" }}>*</span>
                  </label>
                  <input
                    id="contact-whatsapp"
                    name="whatsapp"
                    type="text"
                    suppressHydrationWarning
                    value={form.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="08xx atau 62xx"
                    className="w-full px-4 py-3 text-sm"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-white mb-2">
                    Kebutuhan / Pesan <span style={{ color: "#D4537E" }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Ceritakan kebutuhan project Anda..."
                    className="w-full px-4 py-3 text-sm resize-none"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>

                {status === "error" && (
                  <div
                    className="p-3 text-sm"
                    style={{
                      background: "rgba(212,83,126,0.1)",
                      border: "1px solid rgba(212,83,126,0.2)",
                      borderRadius: "10px",
                      color: "#D4537E",
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <motion.button
                  type="submit"
                  suppressHydrationWarning
                  disabled={status === "loading"}
                  className="w-full py-4 text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "#9013FE",
                    borderRadius: "999px",
                    border: "none",
                    animation: status !== "loading" ? "submitGlow 3s ease-in-out infinite" : "none",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(144, 19, 254,0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Mengirim...
                    </span>
                  ) : (
                    "Kirim Pesan →"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Email Card */}
            <MagicCard
              gradientColor="rgba(144, 19, 254, 0.15)"
              className="p-5 mb-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(144, 19, 254,0.15)",
                    borderRadius: "10px",
                  }}
                >
                  <Mail className="w-5 h-5" style={{ color: "#9013FE" }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm">Email</h4>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#9013FE")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </MagicCard>

            {/* WhatsApp Card */}
            <MagicCard
              gradientColor="rgba(144, 19, 254, 0.15)"
              className="p-5 mb-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(144, 19, 254,0.15)",
                    borderRadius: "10px",
                  }}
                >
                  <Phone className="w-5 h-5" style={{ color: "#9013FE" }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${(profile.whatsapp || "").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#9013FE")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {formatPhoneNumber(profile.whatsapp)}
                  </a>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Respon cepat di jam kerja
                  </p>
                </div>
              </div>
            </MagicCard>

            {/* Location Card */}
            <MagicCard
              gradientColor="rgba(144, 19, 254, 0.15)"
              className="p-5 mb-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(144, 19, 254,0.15)",
                    borderRadius: "10px",
                  }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "#9013FE" }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm">Lokasi</h4>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {profile.location}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Available for remote work 🌍
                  </p>
                </div>
              </div>
            </MagicCard>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${(profile.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent("Halo Riva, saya tertarik untuk diskusi project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 text-white font-semibold transition-all duration-300"
              style={{
                background: "#22C55E",
                borderRadius: "999px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#16A34A";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(34,197,94,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#22C55E";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat Langsung via WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
