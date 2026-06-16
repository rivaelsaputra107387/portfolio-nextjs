"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/admin/profile",
    label: "Profile Settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    href: "/admin/leads",
    label: "Leads / Messages",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function LoginGate({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client-side check (MVP approach)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "Akunaslibode1.") {
      localStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError("Password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-2xl font-bold text-surface mx-auto mb-4">
            R
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-muted text-sm mt-1">Masukkan password untuk akses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-surface border border-surface-border rounded-xl text-white text-sm placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
          />
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent-dark text-surface font-bold rounded-xl transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-muted text-sm hover:text-accent transition-colors">
            ← Kembali ke Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuth(true);
    }
    setCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuth(false);
    setShowLogoutConfirm(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuth) {
    return <LoginGate onLogin={() => setIsAuth(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-surface-border transform transition-transform duration-300 lg:translate-x-0 flex flex-col h-screen overflow-hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-surface-border flex-shrink-0">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center font-bold text-surface text-lg">
              R
            </div>
            <div>
              <span className="text-lg font-bold text-white">RIVA</span>
              <span className="text-accent">.</span>
              <p className="text-xs text-muted -mt-1">Admin Panel</p>
            </div>
          </a>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-surface-border pb-6 min-h-0">
          {sidebarLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-border flex-shrink-0 bg-surface">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="bg-surface/80 backdrop-blur-xl border-b border-surface-border px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-white hover:text-accent transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-sm text-muted">
            Welcome, <span className="text-white font-medium">Rivael Saputra</span>
          </div>
          <a
            href="/"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Website
          </a>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="glass-card rounded-2xl p-6 max-w-sm w-full z-10 animate-fade-up relative">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Konfirmasi Logout</h3>
              <p className="text-muted text-sm mt-2">
                Apakah Anda yakin ingin keluar dari Admin Panel?
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-surface-border transition-colors text-sm cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors text-sm shadow-lg shadow-red-500/20 cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
