"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";

const fallbackClients = [
  { name: "PT Trimas Sarana Garment Indonesia (SGI)", url: "https://trimas-sgi.com/", logo_url: "TSG" },
  { name: "KNPI Kabupaten Bandung", url: "https://knpikabbdg.com/", logo_url: "KNPI" },
  { name: "STMIK Mardira Indonesia", url: "https://stmik-mi.ac.id/", logo_url: "STMIK" },
  { name: "SMK As-Solehhiyah Bandung", url: "https://smk-assolehhiyah.ac.id/", logo_url: "SMK" },
  { name: "Pondok Pesantren As-Solehhiyah", url: "#", logo_url: "PP" },
];

export default function Clients() {
  const [clients, setClients] = useState(fallbackClients);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setClients(data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchClients();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Duplicate clients array to ensure a seamless infinite scroll loop
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section id="clients" ref={sectionRef} className="py-16 md:py-20 bg-[#0a0a0a] border-y border-surface-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="Dipercaya Oleh"
          title="Klien & Partner"
          description="Beberapa organisasi dan perusahaan yang telah mempercayakan proyek digitalnya kepada saya."
        />

        {/* Marquee Auto-Scroll Strip */}
        <div className="relative w-full overflow-hidden py-6 mask-gradient">
          <div className="flex gap-6 md:gap-10 animate-marquee flex-nowrap">
            {duplicatedClients.map((client, i) => (
              <a
                key={`${client.name}-${i}`}
                href={client.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex-shrink-0 flex items-center justify-center w-28 h-12 md:w-36 md:h-16 bg-[#111111]/80 border border-surface-border/50 hover:border-accent/40 rounded-xl transition-all duration-300 hover:scale-105 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 overflow-hidden shadow-inner ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${(i % clients.length) * 50}ms` }}
              >
                {client.logo_url && (client.logo_url.startsWith("http") || client.logo_url.startsWith("/")) ? (
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="w-full h-full object-contain p-2 md:p-3"
                  />
                ) : (
                  <span className="text-gradient text-xs md:text-sm font-extrabold uppercase tracking-widest">
                    {client.logo_url || client.name.substring(0, 3)}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
