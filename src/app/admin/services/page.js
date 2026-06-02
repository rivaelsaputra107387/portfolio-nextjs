"use client";

import { useEffect, useState } from "react";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    icon: "💻",
    price: "",
    description: "",
    features: "",
    display_order: 0,
    tier: "Tier 1 — Starter",
    duration: "",
    notes: "",
    category: "Landing Page",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const featuresArray = form.features
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const payload = {
        title: form.title,
        icon: form.icon,
        price: form.price,
        description: form.description,
        features: featuresArray,
        display_order: parseInt(form.display_order) || 0,
        tier: form.tier,
        duration: form.duration,
        notes: form.notes,
        category: form.category,
      };

      let res;
      if (editId) {
        res = await fetch(`/api/services/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchServices();
      } else {
        const errorData = await res.json();
        alert("Gagal menyimpan layanan: " + (errorData.error || "Terjadi kesalahan"));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan koneksi saat menyimpan.");
    }
    setSubmitting(false);
  };

  const handleEdit = (service) => {
    setEditId(service.id);
    setForm({
      title: service.title || "",
      icon: service.icon || "💻",
      price: service.price || "",
      description: service.description || "",
      features: (service.features || []).join("\n"),
      display_order: service.display_order || 0,
      tier: service.tier || "Tier 1 — Starter",
      duration: service.duration || "",
      notes: service.notes || "",
      category: service.category || "Landing Page",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      title: "",
      icon: "💻",
      price: "",
      description: "",
      features: "",
      display_order: 0,
      tier: "Tier 1 — Starter",
      duration: "",
      notes: "",
      category: "Landing Page",
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) fetchServices();
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
          <h1 className="text-2xl font-bold text-white mb-1">Layanan (Services)</h1>
          <p className="text-muted text-sm">{services.length} layanan ditawarkan</p>
        </div>
        <button
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setShowForm(true);
            }
          }}
          className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-surface font-semibold text-sm rounded-xl transition-all duration-300 cursor-pointer"
        >
          {showForm ? "✕ Batal" : "+ Tambah Layanan"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Layanan" : "Tambah Layanan Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Title Layanan</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Cth: Pembuatan Website, Optimasi SEO, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Icon (Emoji atau Kode SVG)</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                required
                placeholder="💻, 🚀, 🌐, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Harga (Price)</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                placeholder="Cth: Mulai dari Rp 1.5jt, Kontak Hubungi, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Tier Paket</label>
              <select
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 cursor-pointer"
              >
                <option value="Tier 1 — Starter">Tier 1 — Starter</option>
                <option value="Tier 2 — Growth (⭐ Most Popular)">Tier 2 — Growth (⭐ Most Popular)</option>
                <option value="Tier 3 — Ultimate">Tier 3 — Ultimate</option>
                <option value="Tier 4 — Enterprise · Custom Scope">Tier 4 — Enterprise · Custom Scope</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Kategori (Filter UI)</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 cursor-pointer"
              >
                <option value="Landing Page">Landing Page</option>
                <option value="Company Profile">Company Profile</option>
                <option value="Web Sistem">Web Sistem</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Portal / Enterprise">Portal / Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Durasi Pengerjaan</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="Cth: ⏱ 5–7 hari kerja"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-1">Deskripsi Singkat / Sub-deskripsi</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={2}
                placeholder="Cth: Promo produk, event, profil bisnis baru, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-1">Fitur / Keunggulan (satu per baris)</label>
              <textarea
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                required
                rows={4}
                placeholder="Desain Custom Premium&#10;Gratis Hosting & Domain 1 Tahun&#10;Support Integrasi Midtrans"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-1">Catatan Bawah (Opsional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                placeholder="Cth: DP di awal · termin per milestone · scope dikunci sebelum deal"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 border-t border-surface-border/50 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 bg-surface hover:bg-surface-hover border border-surface-border text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-surface font-semibold text-sm rounded-xl transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Menyimpan..." : editId ? "Update Layanan" : "Simpan Layanan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="glass-card rounded-2xl p-6 hover:border-accent/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="px-2.5 py-1.5 bg-accent/15 text-accent hover:bg-accent hover:text-surface text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-2.5 py-1.5 bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[10px] font-semibold rounded-md">
                  {service.tier || "Tier 1 — Starter"}
                </span>
                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-semibold rounded-md">
                  {service.category || "Landing Page"}
                </span>
                {service.duration && (
                  <span className="px-2 py-0.5 bg-white/5 border border-surface-border text-muted-light text-[10px] rounded-md">
                    {service.duration}
                  </span>
                )}
              </div>
              <p className="text-accent text-sm font-semibold mb-3">{service.price}</p>
              <p className="text-muted text-sm mb-4 line-clamp-3">{service.description}</p>
              
              <div className="border-t border-surface-border/30 pt-3 mb-4">
                <h4 className="text-xs text-white font-bold mb-2">FITUR LAYANAN:</h4>
                <ul className="space-y-1">
                  {(service.features || []).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-light">
                      <span className="text-accent">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {service.notes && (
                <div className="border-t border-surface-border/30 pt-3">
                  <p className="text-[11px] text-muted-light italic">
                    <span className="font-semibold text-white not-italic">Catatan: </span>
                    {service.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="col-span-2 glass-card rounded-2xl p-12 text-center">
            <p className="text-muted text-sm">Belum ada layanan terdaftar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
