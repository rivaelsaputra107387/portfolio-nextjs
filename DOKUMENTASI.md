# Dokumentasi Singkat Project Portfolio

Project ini adalah website Portfolio Dinamis yang dibangun menggunakan framework **Next.js** dan terintegrasi dengan **Supabase** sebagai database & backend service-nya.

---

## 🚀 Teknologi Utama

1. **Framework**: [Next.js v16](https://nextjs.org) (App Router)
2. **Library UI/Library Utama**: [React v19](https://react.dev) & [React DOM v19]
3. **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (menggunakan `@tailwindcss/postcss`)
4. **Backend/Database**: [Supabase](https://supabase.com) (menggunakan `@supabase/supabase-js v2`)

---

## 📦 Library Tambahan yang Tersedia

*   **`framer-motion` (v12)**: Digunakan untuk animasi transisi dan micro-interactions yang interaktif dan dinamis.
*   **`lucide-react` (v1)**: Set ikon modern dan ringan yang digunakan di berbagai bagian website.

---

## 📁 Struktur Folder Project

Berikut adalah struktur folder di dalam direktori `src/` yang merupakan inti dari aplikasi ini:

```text
src/
├── app/                      # Next.js App Router (Routing & Halaman)
│   ├── admin/                # Halaman Dashboard Admin untuk manajemen konten
│   │   ├── blog/, clients/, experiences/, leads/, pricing/, profile/, projects/, services/, skills/, testimonials/
│   ├── api/                  # API Route handler untuk mengambil & menyimpan data ke Supabase
│   ├── blog/                 # Halaman blog publik
│   ├── karya/                # Halaman showcase proyek publik
│   ├── globals.css           # File stylesheet utama & konfigurasi Tailwind CSS v4
│   ├── layout.js             # Root layout dari aplikasi
│   └── page.js               # Halaman beranda utama (Landing Page)
│
├── components/               # Reusable React Components
│   ├── layout/               # Komponen global layout (Navbar, Footer, FaviconLink)
│   ├── sections/             # Section-section halaman utama (Hero, About, Skills, dll.)
│   └── ui/                   # Komponen UI reusable kecil (ProjectCard, MarkdownEditor, dll.)
│
└── lib/                      # Utilitas & Konfigurasi Integrasi
    ├── supabase.js           # Client Supabase untuk client-side
    └── supabase-server.js    # Client Supabase untuk server-side (dilengkapi DNS IPv4 fix untuk Windows)
```

### ⚙️ File Konfigurasi Penting di Root Project
*   **`supabase_schema.sql`**: Berisi skema database PostgreSQL untuk Supabase.
*   **`seed_skills.js`**: Script untuk seeding data awal/pilihan skill ke tabel database Supabase.
*   **`.env.local`**: File konfigurasi environment variables untuk URL & Anon Key Supabase.
*   **`next.config.mjs`**: Konfigurasi framework Next.js.
*   **`eslint.config.mjs` & `postcss.config.mjs`**: Konfigurasi linter code dan postcss Tailwind v4.
