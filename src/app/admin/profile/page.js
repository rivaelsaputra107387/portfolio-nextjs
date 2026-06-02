"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/ui/ImageUploader";

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    title: "",
    about_bio: "",
    cv_url: "",
    whatsapp: "",
    email: "",
    location: "",
    github_url: "",
    linkedin_url: "",
    instagram_url: "",
    logo_url: "",
    favicon_url: "",
    hero_image_url: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setForm({
              name: data.name || "",
              title: data.title || "",
              about_bio: data.about_bio || "",
              cv_url: data.cv_url || "",
              whatsapp: data.whatsapp || "",
              email: data.email || "",
              location: data.location || "",
              github_url: data.github_url || "",
              linkedin_url: data.linkedin_url || "",
              instagram_url: data.instagram_url || "",
              logo_url: data.logo_url || "",
              favicon_url: data.favicon_url || "",
              hero_image_url: data.hero_image_url || "",
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccessMsg("Profil berhasil diperbarui! 🎉");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Gagal memperbarui profil.");
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Profile Settings</h1>
        <p className="text-muted text-sm">Kelola informasi diri, kontak, dan link media sosial Anda.</p>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm mb-6 flex items-center gap-2">
          <span>✨</span>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm mb-6 flex items-center gap-2">
          <span>⚠️</span>
          {errorMsg}
        </div>
      )}

      <div className="glass-card rounded-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Pekerjaan / Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Tentang Saya (Bio)</label>
            <textarea
              value={form.about_bio}
              onChange={(e) => setForm({ ...form, about_bio: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
              placeholder="Ceritakan tentang diri Anda..."
            />
          </div>

          <div className="border-t border-surface-border/50 pt-6">
            <h3 className="text-base font-semibold text-white mb-4">Informasi Kontak & CV</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">WhatsApp (gunakan format kode negara, cth: 628xxx)</label>
                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Lokasi */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Lokasi</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* CV URL */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">CV URL (Link file PDF)</label>
                <input
                  type="text"
                  value={form.cv_url}
                  onChange={(e) => setForm({ ...form, cv_url: e.target.value })}
                  placeholder="https://example.com/cv.pdf"
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-surface-border/50 pt-6">
            <h3 className="text-base font-semibold text-white mb-4">Link Media Sosial</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* GitHub */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={form.github_url}
                  onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={form.linkedin_url}
                  onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={form.instagram_url}
                  onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
            </div>
          </div>

          {/* Aset Visual & Brand */}
          <div className="border-t border-surface-border/50 pt-6">
            <h3 className="text-base font-semibold text-white mb-4">Aset Visual & Brand (Logo, Favicon & Foto Hero)</h3>
            <div className="space-y-6">
              {/* Logo */}
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">Logo URL (Kosongkan jika ingin memakai teks default 'RIVA')</label>
                  <input
                    type="text"
                    value={form.logo_url}
                    onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <ImageUploader
                    label="Upload Logo"
                    folder="brand"
                    onUploadSuccess={(url) => setForm({ ...form, logo_url: url })}
                  />
                </div>
              </div>

              {/* Favicon */}
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">Favicon URL (Kosongkan jika memakai favicon.ico bawaan)</label>
                  <input
                    type="text"
                    value={form.favicon_url}
                    onChange={(e) => setForm({ ...form, favicon_url: e.target.value })}
                    placeholder="https://example.com/favicon.png"
                    className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <ImageUploader
                    label="Upload Favicon"
                    folder="brand"
                    onUploadSuccess={(url) => setForm({ ...form, favicon_url: url })}
                  />
                </div>
              </div>

              {/* Hero Image */}
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">Foto Hero (Kosongkan jika ingin memakai mock-up codingan default)</label>
                  <input
                    type="text"
                    value={form.hero_image_url}
                    onChange={(e) => setForm({ ...form, hero_image_url: e.target.value })}
                    placeholder="https://example.com/my-photo.png"
                    className="w-full px-4 py-2.5 bg-surface border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <ImageUploader
                    label="Upload Foto Hero"
                    folder="brand"
                    onUploadSuccess={(url) => setForm({ ...form, hero_image_url: url })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-border/50 pt-6 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-accent hover:bg-accent-dark text-surface font-bold rounded-xl transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              {submitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
