"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/ui/ImageUploader";
import RichTextEditor from "@/components/ui/RichTextEditor";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Web System",
    image_url: "",
    demo_url: "",
    tech_stack: "",
    display_order: 0,
    gallery_urls: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const categories = ["Web System", "E-Commerce", "Internal Tool", "Landing Page", "API", "Other"];

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const techArray = form.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        image_url: form.image_url,
        demo_url: form.demo_url,
        tech_stack: techArray,
        display_order: parseInt(form.display_order) || 0,
        gallery_urls: form.gallery_urls || [],
      };

      let res;
      if (editId) {
        res = await fetch(`/api/projects/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      category: project.category || "Web System",
      image_url: project.image_url || "",
      demo_url: project.demo_url || "",
      tech_stack: (project.tech_stack || []).join(", "),
      display_order: project.display_order || 0,
      gallery_urls: project.gallery_urls || [],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      title: "",
      description: "",
      category: "Web System",
      image_url: "",
      demo_url: "",
      tech_stack: "",
      display_order: 0,
      gallery_urls: [],
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus project ini?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGalleryUrl = (url) => {
    setForm((prev) => ({
      ...prev,
      gallery_urls: [...(prev.gallery_urls || []), url],
    }));
  };

  const handleRemoveGalleryUrl = (idxToRemove) => {
    setForm((prev) => ({
      ...prev,
      gallery_urls: prev.gallery_urls.filter((_, idx) => idx !== idxToRemove),
    }));
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
          <h1 className="text-2xl font-bold text-white mb-1">Projects</h1>
          <p className="text-muted text-sm">{projects.length} project terdaftar</p>
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
          {showForm ? "✕ Batal" : "+ Tambah Project"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Project" : "Tambah Project Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-1">Description</label>
              <RichTextEditor
                value={form.description}
                onChange={(val) => setForm({ ...form, description: val })}
                placeholder="Tulis deskripsi proyek di sini..."
                minHeight="150px"
                id="description"
              />
            </div>

            {/* Cover Image URL & Uploader */}
            <div className="md:col-span-2 grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="/images/projects/name.png"
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Upload Cover</label>
                <ImageUploader
                  label="Pilih Cover"
                  folder="projects"
                  onUploadSuccess={(url) => setForm({ ...form, image_url: url })}
                />
              </div>
            </div>

            {/* Gallery Images Section */}
            <div className="md:col-span-2 border-t border-surface-border/50 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Galeri Gambar Proyek</h3>
                  <p className="text-xs text-muted">Gambar tambahan untuk tampilan carousel detail proyek</p>
                </div>
                <ImageUploader
                  label="+ Upload ke Galeri"
                  folder="projects/gallery"
                  onUploadSuccess={handleAddGalleryUrl}
                />
              </div>

              {/* Gallery List Previews */}
              {form.gallery_urls && form.gallery_urls.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-3 bg-surface/50 border border-surface-border rounded-xl">
                  {form.gallery_urls.map((url, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-surface-border group">
                      <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryUrl(idx)}
                        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted italic">Belum ada gambar galeri tambahan.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Demo URL (Optional)</label>
              <input
                type="text"
                value={form.demo_url}
                onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={form.tech_stack}
                onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                placeholder="Laravel, MySQL, Bootstrap"
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
                {submitting ? "Menyimpan..." : editId ? "Update Project" : "Simpan Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Project List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {projects.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">Belum ada project.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface/50">
                  <th className="text-left py-3 px-4 text-muted font-medium">#</th>
                  <th className="text-left py-3 px-4 text-muted font-medium">Title</th>
                  <th className="text-left py-3 px-4 text-muted font-medium hidden md:table-cell">Category</th>
                  <th className="text-left py-3 px-4 text-muted font-medium hidden lg:table-cell">Tech Stack</th>
                  <th className="text-left py-3 px-4 text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, i) => (
                  <tr key={project.id} className="border-b border-surface-border/50 hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-muted">{i + 1}</td>
                    <td className="py-3 px-4 text-white font-medium max-w-[250px]">
                      <span className="line-clamp-1">{project.title}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <span className="text-muted text-xs line-clamp-1">
                        {(project.tech_stack || []).join(", ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-accent hover:text-accent-light text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </div>
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
