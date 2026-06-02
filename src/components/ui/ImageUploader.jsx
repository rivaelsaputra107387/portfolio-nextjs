"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ImageUploader({ onUploadSuccess, label = "Pilih Gambar", folder = "public" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    try {
      setError("");
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar (PNG, JPG, JPEG, dll)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        return;
      }

      setUploading(true);

      // Create preview url
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Generate unique file path
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage bucket 'portfolio'
      const { data, error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filePath);

      onUploadSuccess(publicUrl);
    } catch (err) {
      console.error("Storage upload error:", err);
      setError(`Gagal mengunggah: ${err.message || "Pastikan RLS bucket 'portfolio' mengizinkan insert."}`);
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        {/* Upload Button */}
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-surface-card border border-surface-border hover:border-accent/40 hover:bg-surface-hover text-white text-xs font-semibold rounded-xl transition-all duration-300">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {uploading ? "Mengunggah..." : label}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {/* Loading Spinner */}
        {uploading && (
          <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full" />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}

      {/* Image Preview (Tiny) */}
      {preview && (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-surface-border bg-surface mt-2">
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
