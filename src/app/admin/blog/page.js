"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/ui/ImageUploader";
import RichTextEditor from "@/components/ui/RichTextEditor";

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "Web Development",
    excerpt: "",
    content: "",
    featured_image_url: "",
    published_at: new Date().toISOString().split("T")[0],
  });
  const [submitting, setSubmitting] = useState(false);

  const categories = ["Web Development", "Technology Insight", "Tutorial", "Career", "Other"];

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      if (editId) {
        res = await fetch(`/api/blog/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (res.ok) {
        handleCancel();
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setForm({
      title: post.title || "",
      category: post.category || "Web Development",
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image_url: post.featured_image_url || "",
      published_at: post.published_at ? new Date(post.published_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      title: "",
      category: "Web Development",
      excerpt: "",
      content: "",
      featured_image_url: "",
      published_at: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) fetchPosts();
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
          <h1 className="text-2xl font-bold text-white mb-1">Blog Posts</h1>
          <p className="text-muted text-sm">{posts.length} artikel terdaftar</p>
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
          {showForm ? "✕ Batal" : "+ Tulis Artikel"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {editId ? "Edit Artikel" : "Tulis Artikel Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Excerpt</label>
              <input
                type="text"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                required
                placeholder="Ringkasan singkat artikel..."
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Content</label>
              <RichTextEditor
                value={form.content}
                onChange={(val) => setForm({ ...form, content: val })}
                placeholder="Tulis konten artikel di sini..."
                minHeight="300px"
                id="content"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={form.featured_image_url}
                  onChange={(e) => setForm({ ...form, featured_image_url: e.target.value })}
                  placeholder="/images/blogs/filename.jpg"
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Upload Image</label>
                <ImageUploader
                  label="Pilih Gambar"
                  folder="blog"
                  onUploadSuccess={(url) => setForm({ ...form, featured_image_url: url })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Published Date</label>
              <input
                type="date"
                value={form.published_at}
                onChange={(e) => setForm({ ...form, published_at: e.target.value })}
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
                {submitting ? "Menyimpan..." : editId ? "Update Artikel" : "Publish Artikel"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {posts.length === 0 ? (
          <p className="text-muted text-sm py-12 text-center">Belum ada artikel.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface/50">
                  <th className="text-left py-3 px-4 text-muted font-medium">#</th>
                  <th className="text-left py-3 px-4 text-muted font-medium">Title</th>
                  <th className="text-left py-3 px-4 text-muted font-medium hidden md:table-cell">Category</th>
                  <th className="text-left py-3 px-4 text-muted font-medium hidden lg:table-cell">Views</th>
                  <th className="text-left py-3 px-4 text-muted font-medium hidden md:table-cell">Published</th>
                  <th className="text-left py-3 px-4 text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post.id} className="border-b border-surface-border/50 hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-muted">{i + 1}</td>
                    <td className="py-3 px-4 text-white font-medium max-w-[250px]">
                      <span className="line-clamp-1">{post.title}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted hidden lg:table-cell">{post.views}</td>
                    <td className="py-3 px-4 text-muted text-xs hidden md:table-cell">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-accent hover:text-accent-light text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
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
