"use client";

import { useEffect, useState } from "react";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const toggleRead = async (lead) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, is_read: !lead.is_read }),
      });
      if (res.ok) fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = leads.filter((l) => !l.is_read).length;

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
        <h1 className="text-2xl font-bold text-white mb-1">
          Leads / Pesan Masuk
          {unreadCount > 0 && (
            <span className="ml-3 text-sm bg-red-500/20 text-red-400 px-3 py-1 rounded-full align-middle">
              {unreadCount} unread
            </span>
          )}
        </h1>
        <p className="text-muted text-sm">{leads.length} total leads</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {leads.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">Belum ada leads masuk.</p>
        ) : (
          <div className="divide-y divide-surface-border">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className={`p-4 md:p-6 transition-colors ${
                  !lead.is_read ? "bg-accent/[0.03]" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    !lead.is_read ? "bg-accent/20 text-accent" : "bg-surface text-muted"
                  }`}>
                    {lead.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm">{lead.name}</h3>
                      {!lead.is_read && (
                        <span className="w-2 h-2 bg-accent rounded-full" />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted mb-2">
                      {lead.email && <span>📧 {lead.email}</span>}
                      <span>📱 {lead.whatsapp}</span>
                      <span>📅 {new Date(lead.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</span>
                    </div>

                    <p className="text-muted-light text-sm leading-relaxed">{lead.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleRead(lead)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                        lead.is_read
                          ? "bg-surface border border-surface-border text-muted hover:text-white"
                          : "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20"
                      }`}
                    >
                      {lead.is_read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <a
                      href={`https://wa.me/${lead.whatsapp.replace(/^0/, "62").replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all duration-300"
                    >
                      WA ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
