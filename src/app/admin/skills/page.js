"use client";

import { useEffect, useState } from "react";

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    percentage: 100,
    category: "Modern Web Development",
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Modern Web Development",
    "Database & System Architecture",
    "Automation & AI Integration"
  ];

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      if (editId) {
        res = await fetch(`/api/skills/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchSkills();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleEdit = (skill) => {
    setEditId(skill.id);
    setForm({
      name: skill.name || "",
      percentage: skill.percentage !== undefined ? skill.percentage : 100,
      category: skill.category || "Modern Web Development",
      display_order: skill.display_order || 0,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      name: "",
      percentage: 100,
      category: "Modern Web Development",
      display_order: 0,
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus skill ini?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) fetchSkills();
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
          <h1 className="text-2xl font-bold text-white mb-1">Skills & Tech Stack</h1>
          <p className="text-muted text-sm">{skills.length} keahlian terdaftar</p>
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
          {showForm ? "✕ Batal" : "+ Tambah Skill"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Skill" : "Tambah Skill Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Skill Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Next.js, Laravel, dll."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
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
            <div className="hidden">
              <input
                type="hidden"
                value={form.percentage}
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
                {submitting ? "Menyimpan..." : editId ? "Update Skill" : "Simpan Skill"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Grid Grouped by Category */}
      <div className="space-y-8">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;

          return (
            <div key={cat} className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-accent mb-4 border-b border-surface-border/50 pb-2">{cat}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {catSkills.map((skill) => (
                  <div key={skill.id} className="p-4 bg-surface/30 border border-surface-border/40 rounded-xl flex items-center justify-between hover:border-accent/25 transition-all">
                    <div className="flex-grow flex items-center justify-between mr-4 bg-surface-card/30 p-2.5 rounded-xl border border-surface-border/40">
                      <span className="font-semibold text-white text-sm">{skill.name}</span>
                      <span className="text-[11px] font-semibold text-muted bg-surface/50 border border-surface-border/60 px-2.5 py-0.5 rounded-md">Order: {skill.display_order}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-2 text-accent hover:bg-accent/10 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {skills.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-muted text-sm">Belum ada data skill terdaftar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
