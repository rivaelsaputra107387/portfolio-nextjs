"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, leads: 0, unreadLeads: 0, blogPosts: 0 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, leadsRes, blogRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/leads"),
          fetch("/api/blog"),
        ]);

        const projects = projectsRes.ok ? await projectsRes.json() : [];
        const leads = leadsRes.ok ? await leadsRes.json() : [];
        const blog = blogRes.ok ? await blogRes.json() : [];

        setStats({
          projects: projects.length,
          leads: leads.length,
          unreadLeads: leads.filter((l) => !l.is_read).length,
          blogPosts: blog.length,
        });

        setRecentLeads(leads.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Projects",
      value: stats.projects,
      icon: "📦",
      color: "bg-accent/10 border-accent/20",
    },
    {
      label: "Total Leads",
      value: stats.leads,
      icon: "📩",
      color: "bg-green-500/10 border-green-500/20",
      badge: stats.unreadLeads > 0 ? `${stats.unreadLeads} unread` : null,
    },
    {
      label: "Blog Posts",
      value: stats.blogPosts,
      icon: "📝",
      color: "bg-blue-500/10 border-blue-500/20",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-muted">Overview semua data portfolio Anda.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`glass-card rounded-2xl p-6 border ${card.color} hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              {card.badge && (
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
              )}
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{card.value}</div>
            <div className="text-sm text-muted">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <a
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-surface font-semibold text-sm rounded-xl transition-all duration-300"
        >
          + Tambah Project
        </a>
        <a
          href="/admin/blog"
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-surface-border hover:border-accent/30 text-white font-medium text-sm rounded-xl transition-all duration-300"
        >
          + Tulis Artikel
        </a>
      </div>

      {/* Recent Leads */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Leads Terbaru</h2>
          <a href="/admin/leads" className="text-accent text-sm hover:underline">
            Lihat Semua →
          </a>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-muted text-sm py-8 text-center">Belum ada leads masuk.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left py-3 px-2 text-muted font-medium">Nama</th>
                  <th className="text-left py-3 px-2 text-muted font-medium hidden md:table-cell">WhatsApp</th>
                  <th className="text-left py-3 px-2 text-muted font-medium hidden lg:table-cell">Pesan</th>
                  <th className="text-left py-3 px-2 text-muted font-medium">Status</th>
                  <th className="text-left py-3 px-2 text-muted font-medium">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-surface-border/50 hover:bg-white/[0.02]">
                    <td className="py-3 px-2 text-white font-medium">{lead.name}</td>
                    <td className="py-3 px-2 text-muted hidden md:table-cell">{lead.whatsapp}</td>
                    <td className="py-3 px-2 text-muted hidden lg:table-cell">
                      <span className="line-clamp-1 max-w-[200px]">{lead.message}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          lead.is_read
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {lead.is_read ? "Read" : "New"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-muted text-xs">
                      {new Date(lead.created_at).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
