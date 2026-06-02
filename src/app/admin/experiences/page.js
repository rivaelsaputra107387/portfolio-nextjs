"use client";

import { useEffect, useState } from "react";

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    role: "",
    company: "",
    period: "",
    description: "",
    tech: "",
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experiences");
      if (res.ok) {
        const data = await res.json();
        setExperiences(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const descriptionArray = form.description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const techArray = form.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        role: form.role,
        company: form.company,
        period: form.period,
        description: descriptionArray,
        tech: techArray,
        display_order: parseInt(form.display_order) || 0,
      };

      let res;
      if (editId) {
        res = await fetch(`/api/experiences/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchExperiences();
      } else {
        const errorData = await res.json();
        alert("Gagal menyimpan riwayat karir: " + (errorData.error || "Terjadi kesalahan"));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan koneksi saat menyimpan.");
    }
    setSubmitting(false);
  };

  const handleEdit = (exp) => {
    setEditId(exp.id);
    setForm({
      role: exp.role || "",
      company: exp.company || "",
      period: exp.period || "",
      description: (exp.description || []).join("\n"),
      tech: (exp.tech || []).join(", "),
      display_order: exp.display_order || 0,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      role: "",
      company: "",
      period: "",
      description: "",
      tech: "",
      display_order: 0,
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus riwayat karir ini?")) return;
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (res.ok) fetchExperiences();
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
          <h1 className="text-2xl font-bold text-white mb-1">Career Timeline</h1>
          <p className="text-muted text-sm">{experiences.length} riwayat karir terdaftar</p>
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
          {showForm ? "✕ Batal" : "+ Tambah Pengalaman"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Pengalaman Karir" : "Tambah Pengalaman Karir Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Role / Jabatan</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
                placeholder="Fullstack Developer, Freelancer, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Perusahaan / Organisasi</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
                placeholder="Nama Perusahaan atau Nama Klien"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Periode Waktu</label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                required
                placeholder="Cth: Okt 2022 - Des 2023, 2024 - Sekarang"
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
              <label className="block text-sm font-medium text-white mb-1">Tech Stack yang Digunakan (comma-separated)</label>
              <input
                type="text"
                value={form.tech}
                onChange={(e) => setForm({ ...form, tech: e.target.value })}
                placeholder="Laravel, MySQL, Bootstrap"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-1">Deskripsi Pekerjaan / Bullet Points (satu per baris)</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={5}
                placeholder="Mengembangkan modul inventori baru&#10;Melakukan maintenance bug API"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none font-sans"
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
                {submitting ? "Menyimpan..." : editId ? "Update Pengalaman" : "Simpan Pengalaman"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="glass-card rounded-2xl p-6 hover:border-accent/30 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <p className="text-accent text-sm font-medium">{exp.company} • {exp.period}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-3 py-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-surface text-xs font-semibold rounded-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-lg transition-all"
                >
                  Hapus
                </button>
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-1 mb-4">
              {(exp.description || []).map((point, idx) => (
                <li key={idx} className="text-muted-light text-sm">{point}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {(exp.tech || []).map((t, idx) => (
                <span key={idx} className="px-2 py-1 bg-surface-card border border-surface-border text-xs text-muted-light rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-muted text-sm">Belum ada riwayat karir terdaftar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
