"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/ui/ImageUploader";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    content: "",
    avatar_url: "/images/testimonials/default.png",
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      if (editId) {
        res = await fetch(`/api/testimonials/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchTestimonials();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleEdit = (testi) => {
    setEditId(testi.id);
    setForm({
      name: testi.name || "",
      role: testi.role || "",
      content: testi.content || "",
      avatar_url: testi.avatar_url || "/images/testimonials/default.png",
      display_order: testi.display_order || 0,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      name: "",
      role: "",
      content: "",
      avatar_url: "/images/testimonials/default.png",
      display_order: 0,
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) fetchTestimonials();
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
          <h1 className="text-2xl font-bold text-white mb-1">Testimonials</h1>
          <p className="text-muted text-sm">{testimonials.length} testimoni klien terdaftar</p>
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
          {showForm ? "✕ Batal" : "+ Tambah Testimoni"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Testimoni" : "Tambah Testimoni Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Nama Klien</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Cth: Ahmad Fauzi"
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Pekerjaan / Perusahaan</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                  placeholder="Cth: CEO PT Maju Bersama, Owner UMKM X"
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Isi Testimoni</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                rows={4}
                placeholder="Tulis ulasan/testimoni klien di sini..."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">Avatar / Foto URL</label>
                <input
                  type="text"
                  value={form.avatar_url}
                  onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                  placeholder="/images/testimonials/default.png"
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Upload Foto</label>
                <ImageUploader
                  label="Pilih Foto"
                  folder="testimonials"
                  onUploadSuccess={(url) => setForm({ ...form, avatar_url: url })}
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
                {submitting ? "Menyimpan..." : editId ? "Update Testimoni" : "Simpan Testimoni"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testi) => (
          <div key={testi.id} className="glass-card rounded-2xl p-6 hover:border-accent/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-surface-border bg-surface">
                    <img
                      src={testi.avatar_url}
                      alt={testi.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/100/1A1A1A/8B5CF6?text=${encodeURIComponent(testi.name[0])}`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{testi.name}</h3>
                    <p className="text-muted text-xs">{testi.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(testi)}
                    className="px-2 py-1 bg-accent/15 text-accent hover:bg-accent hover:text-surface text-xs font-semibold rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testi.id)}
                    className="px-2 py-1 bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <p className="text-muted-light text-sm italic leading-relaxed">
                "{testi.content}"
              </p>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-2 glass-card rounded-2xl p-12 text-center">
            <p className="text-muted text-sm">Belum ada testimoni terdaftar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
