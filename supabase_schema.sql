-- ==========================================
-- SQL SCHEMA FOR PORTFOLIO NEXT.JS (SUPABASE)
-- Copy and paste this script into your Supabase SQL Editor
-- ==========================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT DEFAULT '/images/projects/default.png',
  demo_url TEXT,
  tech_stack TEXT[] DEFAULT '{}'::TEXT[],
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.1 Add Gallery URLs Column to Projects Table (for multiple images)
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] DEFAULT '{}'::TEXT[];

-- 2. Create Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT DEFAULT '/images/blogs/default.jpg',
  views INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  published_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Leads Table (Contact Form)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Profile / Settings Table (Single row for About Me, CV, and Contacts)
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT DEFAULT 'Rivael Saputra',
  title TEXT DEFAULT 'Fullstack Developer',
  about_bio TEXT NOT NULL,
  cv_url TEXT DEFAULT '#',
  whatsapp TEXT DEFAULT '6285794946920',
  email TEXT DEFAULT 'riva.elsaputra2020@gmail.com',
  location TEXT DEFAULT 'Bandung, Indonesia',
  github_url TEXT DEFAULT 'https://github.com/rivaelsaputra',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/in/rivaelsaputra',
  instagram_url TEXT DEFAULT 'https://instagram.com/rievaelss',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Skills Table (Tech Stack & Progress)
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  percentage INTEGER NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  category TEXT NOT NULL, -- e.g., 'Frontend', 'Backend', 'Tools'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Experiences Table (Career Timeline)
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL, -- Short description or HTML/text
  tech TEXT[] DEFAULT '{}'::TEXT[], -- Tech stack tags used in this job
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Create Services Table (Layanan)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL, -- Emoji or name
  price TEXT NOT NULL, -- e.g., 'Rp 1.5jt' or 'Mulai Rp 4.5jt'
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}'::TEXT[], -- Features list
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Create Testimonials Table (Apa Kata Mereka)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT DEFAULT '/images/testimonials/default.png',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Create Pricing Packages Table (Paket Layanan)
CREATE TABLE IF NOT EXISTS public.pricing_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  price TEXT NOT NULL,
  features TEXT[] DEFAULT '{}'::TEXT[],
  is_recommended BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Create Clients Table (Klien & Partner Logos)
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- ==========================================

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- 1. Projects policies
DROP POLICY IF EXISTS "Allow public read projects" ON public.projects;
DROP POLICY IF EXISTS "Allow admin CRUD projects" ON public.projects;
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admin CRUD projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

-- 2. Blog posts policies
DROP POLICY IF EXISTS "Allow public read blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow admin CRUD blog_posts" ON public.blog_posts;
CREATE POLICY "Allow public read blog_posts" ON public.blog_posts FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admin CRUD blog_posts" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);

-- 3. Leads policies
DROP POLICY IF EXISTS "Allow public insert leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin CRUD leads" ON public.leads;
CREATE POLICY "Allow public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin CRUD leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);

-- 4. Profile policies
DROP POLICY IF EXISTS "Allow public read profile" ON public.profile;
DROP POLICY IF EXISTS "Allow admin CRUD profile" ON public.profile;
CREATE POLICY "Allow public read profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow admin CRUD profile" ON public.profile FOR ALL USING (true) WITH CHECK (true);

-- 5. Skills policies
DROP POLICY IF EXISTS "Allow public read skills" ON public.skills;
DROP POLICY IF EXISTS "Allow admin CRUD skills" ON public.skills;
CREATE POLICY "Allow public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow admin CRUD skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);

-- 6. Experiences policies
DROP POLICY IF EXISTS "Allow public read experiences" ON public.experiences;
DROP POLICY IF EXISTS "Allow admin CRUD experiences" ON public.experiences;
CREATE POLICY "Allow public read experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow admin CRUD experiences" ON public.experiences FOR ALL USING (true) WITH CHECK (true);

-- 7. Services policies
DROP POLICY IF EXISTS "Allow public read services" ON public.services;
DROP POLICY IF EXISTS "Allow admin CRUD services" ON public.services;
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow admin CRUD services" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- 8. Testimonials policies
DROP POLICY IF EXISTS "Allow public read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow admin CRUD testimonials" ON public.testimonials;
CREATE POLICY "Allow public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow admin CRUD testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

-- 9. Pricing packages policies
DROP POLICY IF EXISTS "Allow public read pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin CRUD pricing_packages" ON public.pricing_packages;
CREATE POLICY "Allow public read pricing_packages" ON public.pricing_packages FOR SELECT USING (true);
CREATE POLICY "Allow admin CRUD pricing_packages" ON public.pricing_packages FOR ALL USING (true) WITH CHECK (true);

-- 10. Clients policies
DROP POLICY IF EXISTS "Allow public read clients" ON public.clients;
DROP POLICY IF EXISTS "Allow admin CRUD clients" ON public.clients;
CREATE POLICY "Allow public read clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Allow admin CRUD clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);


-- ==========================================
-- SEED DATA (INITIAL DATA)
-- ==========================================

-- Seed Profile (About Me)
INSERT INTO public.profile (about_bio, cv_url, github_url, linkedin_url, instagram_url)
VALUES (
  'Saya Rivael Saputra, seorang Fullstack Developer profesional yang berdedikasi membangun solusi web modern, berkinerja tinggi, dan berdampak nyata bagi bisnis Anda.',
  '#',
  'https://github.com/rivaelsaputra',
  'https://linkedin.com/in/rivaelsaputra',
  'https://instagram.com/rievaelss'
) ON CONFLICT DO NOTHING;

-- Seed Projects
INSERT INTO public.projects (title, slug, description, category, image_url, demo_url, tech_stack, display_order)
VALUES 
(
  'Sistem Informasi Organisasi — KNPI Kabupaten Bandung',
  'sistem-informasi-organisasi-knpi-kab-bandung',
  'Website profil publik DPD KNPI Kabupaten Bandung sebagai media digital resmi dengan panel admin untuk manajemen konten berita, struktur kepengurusan, dan program kerja pemuda.',
  'Web System',
  '/images/projects/knpi.png',
  'https://knpikabbdg.com/',
  ARRAY['Laravel', 'Blade', 'MySQL', 'Bootstrap', 'JavaScript'],
  1
),
(
  'Sistem Toko Online — UMKM Mamaku',
  'sistem-toko-online-umkm-mamaku',
  'Platform e-commerce untuk UMKM sayur dan buah segar dengan integrasi Midtrans, fitur pre-order, dashboard admin real-time, dan laporan transaksi PDF.',
  'E-Commerce',
  '/images/projects/mamaku.png',
  'https://www.instagram.com/rievaelss/',
  ARRAY['Laravel', 'MySQL', 'Midtrans', 'Bootstrap', 'JavaScript'],
  2
),
(
  'SITT — Modul Manajemen Stok (PT Trimas Sarana Garmen)',
  'sitt-pengelolaan-stok-pt-trimas',
  'Modul inventory alat pemotong terintegrasi ke dalam Sistem Informasi Trimas Terpadu (SITT) menggunakan CodeIgniter 4 backend dan Next.js frontend dengan koneksi SQL Server.',
  'Internal Tool',
  '/images/projects/sitt.png',
  NULL,
  ARRAY['CodeIgniter 4', 'Next.js', 'SQL Server', 'RESTful API', 'Postman'],
  3
),
(
  'Sistem Manajemen Dokumen dengan Auto-Tagging AI',
  'manajemen-dokumen-digital-autotagging',
  'Sistem arsip digital berbasis Laravel dengan integrasi Hugging Face (zero-shot & NER) untuk auto-tagging dokumen, pencarian full-text, RBAC, activity log, dan backup terjadwal.',
  'Web System',
  '/images/projects/dokumen-ai.png',
  'https://knpikabbdg.com/',
  ARRAY['Laravel', 'PHP', 'Hugging Face', 'NLP', 'RBAC', 'MySQL'],
  4
),
(
  'Karang Taruna Mandiri Jaya — Landing Page',
  'karang-taruna-mandiri-jaya-landing',
  'Landing page responsif organisasi pemuda dengan hero komunikatif, galeri kegiatan, struktur organisasi, dan form kontak terintegrasi. Mobile-first design.',
  'Landing Page',
  '/images/projects/karang-taruna.png',
  'https://karang-taruna-mandiri-jaya.vercel.app/',
  ARRAY['HTML', 'CSS', 'JavaScript', 'UI/UX', 'Vercel'],
  5
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Blog Posts
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image_url, views)
VALUES
(
  'Kenapa Laravel Masih Dipilih di 2025',
  'kenapa-laravel-masih-dipilih-2025',
  'Web Development',
  'Laravel tetap relevan di tengah munculnya framework modern. Tapi apa yang membuatnya masih bertahan dan dicintai developer?',
  'Laravel bukan hanya framework PHP biasa — ia berkembang menjadi ekosistem lengkap yang mencakup authentication (Breeze, Jetstream), queue management, real-time broadcasting, dan testing tools yang matang.

Dengan hadirnya Laravel 11, konfigurasi menjadi lebih ringkas, performa meningkat signifikan, dan developer experience semakin baik. Ecosystem seperti Forge, Vapor, dan Nova membuat Laravel tidak hanya cocok untuk proyek kecil, tapi juga enterprise-grade applications.

Beberapa alasan utama:
1. **Eloquent ORM** — Query database menjadi sangat intuitif
2. **Blade Templating** — Rendering server-side yang powerful
3. **Artisan CLI** — Automation untuk tugas repetitif
4. **Community** — Salah satu komunitas terbesar di dunia PHP
5. **Documentation** — Dokumentasi yang sangat lengkap dan terstruktur

Laravel masih dan akan terus menjadi pilihan utama untuk backend development di tahun-tahun mendatang.',
  '/images/blogs/laravel-2025.jpg',
  8
),
(
  'AI dan Otomasi: Tantangan dan Peluang bagi Developer Muda',
  'ai-dan-otomasi-untuk-developer-muda',
  'Technology Insight',
  'AI bukan ancaman bagi developer, tapi alat untuk mempercepat inovasi.',
  'Di era AI, developer ditantang untuk lebih kreatif dan strategis. Tools seperti GitHub Copilot, ChatGPT, dan Claude bukan pengganti developer — mereka adalah akselerator.

Sebagai developer muda, penting untuk memahami bahwa AI mengubah cara kita bekerja, bukan menghilangkan pekerjaan kita. Developer yang bisa memanfaatkan AI akan jauh lebih produktif.

Beberapa cara memanfaatkan AI:
1. **Code Generation** — Mempercepat penulisan boilerplate code
2. **Debugging** — AI membantu mengidentifikasi bug lebih cepat
3. **Documentation** — Auto-generate dokumentasi dari kode
4. **Learning** — AI sebagai tutor personal yang selalu available

Kunci sukses di era AI adalah terus belajar, beradaptasi, dan fokus pada problem-solving — bukan hanya coding.',
  '/images/blogs/ai-developer.png',
  7
),
(
  'Next.js vs Laravel: Mana yang Lebih Cocok untuk Proyekmu?',
  'nextjs-vs-laravel',
  'Web Development',
  'Dua framework populer dengan kekuatan berbeda. Kapan pakai Laravel, kapan Next.js?',
  'Laravel unggul dalam struktur backend yang solid, sedangkan Next.js kuat di sisi frontend modern dengan React.

**Kapan pakai Laravel?**
- Backend-heavy applications
- CMS dan admin panels
- E-commerce dengan logika bisnis kompleks
- API development
- Server-side rendering dengan Blade

**Kapan pakai Next.js?**
- Frontend-heavy applications
- Static sites dan blogs
- SEO-critical pages
- Real-time interfaces
- Single Page Applications

**Kombinasi terbaik:**
Gunakan Laravel sebagai API backend dan Next.js sebagai frontend. Ini memberikan yang terbaik dari kedua dunia — backend yang robust and frontend yang modern.

Di proyek saya, saya sering menggunakan kombinasi ini untuk hasil optimal.',
  '/images/blogs/nextjs-vs-laravel.png',
  1
)
ON CONFLICT (slug) DO NOTHING;

-- Add new columns to Profile
ALTER TABLE public.profile 
ADD COLUMN IF NOT EXISTS favicon_url TEXT,
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS hero_image_url TEXT;

-- Add new columns to Services
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'Tier 1 — Starter',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Landing Page',
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT;
