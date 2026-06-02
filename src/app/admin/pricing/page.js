"use client";

import { useEffect, useState } from "react";

export default function AdminPricing() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    subtitle: "",
    price: "",
    features: "",
    is_recommended: false,
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/pricing");
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
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
        name: form.name,
        subtitle: form.subtitle,
        price: form.price,
        features: featuresArray,
        is_recommended: !!form.is_recommended,
        display_order: parseInt(form.display_order) || 0,
      };

      let res;
      if (editId) {
        res = await fetch(`/api/pricing/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchPackages();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleEdit = (pkg) => {
    setEditId(pkg.id);
    setForm({
      name: pkg.name || "",
      subtitle: pkg.subtitle || "",
      price: pkg.price || "",
      features: (pkg.features || []).join("\n"),
      is_recommended: !!pkg.is_recommended,
      display_order: pkg.display_order || 0,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      name: "",
      subtitle: "",
      price: "",
      features: "",
      is_recommended: false,
      display_order: 0,
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus paket harga ini?")) return;
    try {
      const res = await fetch(`/api/pricing/${id}`, { method: "DELETE" });
      if (res.ok) fetchPackages();
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
          <h1 className="text-2xl font-bold text-white mb-1">Pricing Packages</h1>
          <p className="text-muted text-sm">{packages.length} paket harga terdaftar</p>
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
          {showForm ? "✕ Batal" : "+ Tambah Paket"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Paket Harga" : "Tambah Paket Harga Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Nama Paket</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Cth: Landing Page, E-Commerce, Custom, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Subtitle / Deskripsi Singkat</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                required
                placeholder="Cth: Cocok untuk landing page promosi produk"
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
                placeholder="Cth: Rp 1.5jt, Rp 4jt - 6jt, dll."
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
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_recommended"
                checked={form.is_recommended}
                onChange={(e) => setForm({ ...form, is_recommended: e.target.checked })}
                className="w-4 h-4 text-accent bg-surface border-surface-border rounded focus:ring-accent"
              />
              <label htmlFor="is_recommended" className="text-sm font-medium text-white cursor-pointer select-none">
                Rekomendasikan paket ini (Glow effect & Best Value badge)
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-1">Fitur Paket (satu per baris)</label>
              <textarea
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                required
                rows={5}
                placeholder="1-3 Halaman Landing Page&#10;Desain Responsive Mobile-First&#10;Form WhatsApp Terintegrasi"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 border-t border-surface-border/50 pt-4">
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
                {submitting ? "Menyimpan..." : editId ? "Update Paket" : "Simpan Paket"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages list display */}
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`glass-card rounded-2xl p-6 relative flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 ${
              pkg.is_recommended ? "border-accent/60 shadow-[0_0_20px_rgba(139,92,246,0.15)] bg-accent/[0.02]" : ""
            }`}
          >
            {pkg.is_recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-surface text-xs font-bold rounded-full shadow-lg">
                BEST VALUE
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-surface text-xs font-semibold rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-md transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted mb-4">{pkg.subtitle}</p>
              <div className="text-2xl font-extrabold text-accent mb-6">{pkg.price}</div>
              
              <ul className="space-y-3 mb-6">
                {(pkg.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-light">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {packages.length === 0 && (
          <div className="col-span-3 glass-card rounded-2xl p-12 text-center">
            <p className="text-muted text-sm">Belum ada paket harga terdaftar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
