"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";

const fallbackPricingTiers = [
  {
    name: "STARTER",
    subtitle: "Landing Page",
    price: "Rp 1.500.000",
    badge: "Paling Populer untuk UMKM",
    recommended: false,
    features: [
      "Domain .com atau .my.id (1 tahun)",
      "Responsive Design (Mobile-first)",
      "Form Kontak / WhatsApp Button",
      "Google Maps Integration",
      "Basic SEO Setup",
      "Delivery 5–7 hari kerja",
    ],
    cta: "Mulai Sekarang",
  },
  {
    name: "GROWTH",
    subtitle: "Company Profile / Custom System",
    price: "Rp 2.750.000",
    badge: "Best Value ⭐",
    recommended: true,
    features: [
      "Semua fitur Starter",
      "Panel Admin (Kelola konten sendiri)",
      "Advanced UI/UX Design",
      "Blog / CMS sederhana",
      "Multi-halaman",
      "Hosting Setup + SSL",
      "Delivery 10–14 hari kerja",
    ],
    cta: "Pilih Paket Ini",
  },
  {
    name: "ULTIMATE",
    subtitle: "E-Commerce / Enterprise System",
    price: "Mulai Rp 4.500.000",
    badge: "Full Custom",
    recommended: false,
    features: [
      "Semua fitur Growth",
      "Sistem e-commerce / payment gateway (Midtrans)",
      "Database architecture kustom",
      "Integrasi API pihak ketiga",
      "Role-based access control",
      "Laporan & dashboard analytics",
      "Premium support 30 hari",
    ],
    cta: "Diskusi Kebutuhan",
  },
];

export default function Pricing() {
  const [pricingTiers, setPricingTiers] = useState(fallbackPricingTiers);
  const [isVisible, setIsVisible] = useState(false);
  const [profile, setProfile] = useState({ whatsapp: "6285794946920" });
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch("/api/pricing");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((d) => ({
              ...d,
              recommended: d.is_recommended !== undefined ? d.is_recommended : d.recommended,
            }));
            setPricingTiers(mapped);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data && data.whatsapp) setProfile(data);
        }
      } catch (err) {}
    }

    fetchPricing();
    fetchProfile();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          subtitle="Harga"
          title="Paket Layanan"
          description="Pilih paket yang sesuai dengan kebutuhan dan budget bisnis Anda. Semua harga sudah termasuk konsultasi awal gratis."
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative glass-card rounded-2xl p-6 md:p-8 transition-all duration-700 hover:-translate-y-2 ${
                tier.recommended
                  ? "border-accent/50 shadow-[0_0_40px_rgba(139,92,246,0.2)] scale-[1.02] md:scale-105"
                  : "hover:border-accent/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Badge */}
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-surface text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-accent/20">
                  {tier.badge}
                </div>
              )}
              {!tier.recommended && tier.badge && (
                <span className="inline-block bg-surface border border-surface-border text-muted-light text-xs px-3 py-1 rounded-full mb-4">
                  {tier.badge}
                </span>
              )}

              {/* Header */}
              <div className={`${tier.recommended ? "mt-4" : ""}`}>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="text-muted text-sm mb-4">{tier.subtitle}</p>
                <div className="mb-6">
                  <span className={`text-3xl md:text-4xl font-display font-extrabold ${tier.recommended ? "text-accent" : "text-white"}`}>
                    {tier.price}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-light">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(`Halo Riva, saya tertarik dengan paket ${tier.name} (${tier.subtitle}). Bisa diskusi lebih lanjut?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3.5 font-semibold text-sm rounded-xl transition-all duration-300 ${
                  tier.recommended
                    ? "bg-accent hover:bg-accent-dark text-surface hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
                    : "border-2 border-surface-border hover:border-accent/50 text-white hover:bg-accent/5"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted text-sm mt-8">
          💬 Butuh solusi kustom? <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Hubungi saya</a> untuk diskusi gratis.
        </p>
      </div>
    </section>
  );
}
