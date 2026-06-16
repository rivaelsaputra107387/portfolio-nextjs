"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#karya", label: "Karya" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#about", label: "About" },
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? "rgba(6, 6, 18, 0.7)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(144, 19, 254, 0.1)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href={getLinkHref("#home")}
            onClick={(e) => handleNavClick(e, "#home")}
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
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-lg transition-all duration-300"
                  style={{
                    background: "#9013FE",
                    boxShadow: "0 0 12px rgba(144, 19, 254, 0.4)",
                  }}
                >
                  {profile?.name ? profile.name[0] : "R"}
                </div>
                <span className="text-xl font-bold text-white">
                  {profile?.name ? profile.name.split(" ")[0].toUpperCase() : "RIVA"}<span style={{ color: "#9013FE" }}>.</span>
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
                className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300"
                style={{
                  color:
                    pathname === "/" && activeSection === link.href.replace("#", "")
                      ? "#9013FE"
                      : "rgba(255,255,255,0.6)",
                  background:
                    pathname === "/" && activeSection === link.href.replace("#", "")
                      ? "rgba(144, 19, 254, 0.1)"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!(pathname === "/" && activeSection === link.href.replace("#", ""))) {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(pathname === "/" && activeSection === link.href.replace("#", ""))) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
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
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-white font-semibold text-sm transition-all duration-300"
              style={{
                background: "#9013FE",
                borderRadius: "999px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#6B0DBF";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(144, 19, 254, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#9013FE";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Hubungi Saya
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.8)" }}
              aria-label="Toggle menu"
              suppressHydrationWarning
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
        <div
          className="px-4 py-4 space-y-1"
          style={{
            background: "rgba(6, 6, 18, 0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(144, 19, 254, 0.1)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getLinkHref(link.href)}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                color:
                  pathname === "/" && activeSection === link.href.replace("#", "")
                    ? "#9013FE"
                    : "rgba(255,255,255,0.6)",
                background:
                  pathname === "/" && activeSection === link.href.replace("#", "")
                    ? "rgba(144, 19, 254, 0.1)"
                    : "transparent",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={getLinkHref("#contact")}
            onClick={(e) => handleNavClick(e, "#contact")}
            className="block text-center mt-3 px-5 py-3 text-white font-semibold text-sm transition-all duration-300"
            style={{
              background: "#9013FE",
              borderRadius: "999px",
            }}
          >
            Hubungi Saya
          </a>
        </div>
      </div>
    </nav>
  );
}
