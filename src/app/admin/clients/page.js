"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/ui/ImageUploader";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    logo_url: "",
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      if (editId) {
        res = await fetch(`/api/clients/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchClients();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleEdit = (client) => {
    setEditId(client.id);
    setForm({
      name: client.name || "",
      logo_url: client.logo_url || "",
      display_order: client.display_order || 0,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      name: "",
      logo_url: "",
      display_order: 0,
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus klien ini?")) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Klien & Partner</h1>
          <p className="text-muted text-sm">{clients.length} partner terdaftar</p>
        </div>
        <button
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setShowForm(true);
            }
          }}
          className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-surface font-semibold text-sm rounded-xl transition-all duration-300"
        >
          {showForm ? "✕ Batal" : "+ Tambah Klien"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Klien" : "Tambah Klien Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Nama Klien / Partner</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Cth: PT Trimas Sarana Garmen, KNPI, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">Logo URL</label>
                <input
                  type="text"
                  value={form.logo_url}
                  onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                  placeholder="/images/clients/logo.png"
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Upload Logo</label>
                <ImageUploader
                  label="Pilih Logo"
                  folder="clients"
                  onUploadSuccess={(url) => setForm({ ...form, logo_url: url })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Display Order</label>
              <input
                type="number"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-surface-border/50 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 bg-surface hover:bg-surface-hover border border-surface-border text-white font-semibold text-sm rounded-xl transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-surface font-semibold text-sm rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? "Menyimpan..." : editId ? "Update Klien" : "Simpan Klien"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Clients Display List */}
      <div className="glass-card rounded-2xl p-6">
        {clients.length === 0 ? (
          <p className="text-muted text-sm py-8 text-center">Belum ada klien.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group relative bg-surface/30 border border-surface-border/40 hover:border-accent/30 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 min-h-[120px]"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/100/1A1A1A/8B5CF6?text=${encodeURIComponent(client.name[0])}`;
                    }}
                  />
                </div>
                <span className="text-white text-xs font-semibold text-center line-clamp-1">{client.name}</span>
                
                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-background/90 rounded-xl flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(client)}
                    className="px-2 py-1 bg-accent hover:bg-accent-dark text-surface text-xs font-bold rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
