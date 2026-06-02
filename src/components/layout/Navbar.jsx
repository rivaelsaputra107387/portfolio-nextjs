"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#karya", label: "Karya" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [profile, setProfile] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {}
    }
    fetchProfile();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname === "/") {
        const sections = navLinks.map((l) => l.href.replace("#", ""));
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e, href) => {
    setIsMobileOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href) => {
    if (pathname === "/") {
      return href;
    }
    return `/${href}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-surface-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href={getLinkHref("#hero")}
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group"
          >
            {profile?.logo_url ? (
              <img
                src={profile.logo_url}
                alt="Logo"
                className="h-8 md:h-9 w-auto object-contain"
              />
            ) : (
              <>
                <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center font-bold text-surface text-lg group-hover:animate-pulse-glow transition-all duration-300">
                  {profile?.name ? profile.name[0] : "R"}
                </div>
                <span className="text-xl font-bold text-white">
                  {profile?.name ? profile.name.split(" ")[0].toUpperCase() : "RIVA"}<span className="text-accent">.</span>
                </span>
              </>
            )}
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={getLinkHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  pathname === "/" && activeSection === link.href.replace("#", "")
                    ? "text-accent bg-accent/10"
                    : "text-muted-light hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={getLinkHref("#contact")}
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-accent hover:bg-accent-dark text-surface font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Hubungi Saya
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-white hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-surface/95 backdrop-blur-xl border-t border-surface-border px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getLinkHref(link.href)}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === "/" && activeSection === link.href.replace("#", "")
                  ? "text-accent bg-accent/10"
                  : "text-muted-light hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={getLinkHref("#contact")}
            onClick={(e) => handleNavClick(e, "#contact")}
            className="block text-center mt-3 px-5 py-3 bg-accent hover:bg-accent-dark text-surface font-semibold text-sm rounded-xl transition-all duration-300"
          >
            Hubungi Saya
          </a>
        </div>
      </div>
    </nav>
  );
}

