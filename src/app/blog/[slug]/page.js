"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fallbackPosts = {
  "kenapa-laravel-masih-dipilih-2025": {
    category: "Web Development",
    title: "Kenapa Laravel Masih Dipilih di 2025",
    excerpt: "Laravel tetap relevan di tengah munculnya framework modern.",
    content: "Laravel bukan hanya framework PHP biasa — ia berkembang menjadi ekosistem lengkap yang mencakup authentication (Breeze, Jetstream), queue management, real-time broadcasting, dan testing tools yang matang.\n\nDengan hadirnya Laravel 11, konfigurasi menjadi lebih ringkas, performa meningkat signifikan, dan developer experience semakin baik. Ecosystem seperti Forge, Vapor, dan Nova membuat Laravel tidak hanya cocok untuk proyek kecil, tapi juga enterprise-grade applications.\n\nBeberapa alasan utama:\n\n1. **Eloquent ORM** — Query database menjadi sangat intuitif\n2. **Blade Templating** — Rendering server-side yang powerful\n3. **Artisan CLI** — Automation untuk tugas repetitif\n4. **Community** — Salah satu komunitas terbesar di dunia PHP\n5. **Documentation** — Dokumentasi yang sangat lengkap dan terstruktur\n\nLaravel masih dan akan terus menjadi pilihan utama untuk backend development di tahun-tahun mendatang.",
    featured_image_url: "/images/blogs/laravel-2025.jpg",
    published_at: "2025-10-16",
    views: 8,
  },
  "ai-dan-otomasi-untuk-developer-muda": {
    category: "Technology Insight",
    title: "AI dan Otomasi: Tantangan dan Peluang bagi Developer Muda",
    excerpt: "AI bukan ancaman bagi developer, tapi alat untuk mempercepat inovasi.",
    content: "Di era AI, developer ditantang untuk lebih kreatif dan strategis. Tools seperti GitHub Copilot, ChatGPT, dan Claude bukan pengganti developer — mereka adalah akselerator.\n\nSebagai developer muda, penting untuk memahami bahwa AI mengubah cara kita bekerja, bukan menghilangkan pekerjaan kita. Developer yang bisa memanfaatkan AI akan jauh lebih produktif.\n\nBeberapa cara memanfaatkan AI:\n\n1. **Code Generation** — Mempercepat penulisan boilerplate code\n2. **Debugging** — AI membantu mengidentifikasi bug lebih cepat\n3. **Documentation** — Auto-generate dokumentasi dari kode\n4. **Learning** — AI sebagai tutor personal yang selalu available\n\nKunci sukses di era AI adalah terus belajar, beradaptasi, dan fokus pada problem-solving — bukan hanya coding.",
    featured_image_url: "/images/blogs/ai-developer.png",
    published_at: "2025-10-16",
    views: 7,
  },
  "nextjs-vs-laravel": {
    category: "Web Development",
    title: "Next.js vs Laravel: Mana yang Lebih Cocok untuk Proyekmu?",
    excerpt: "Dua framework populer dengan kekuatan berbeda.",
    content: "Laravel unggul dalam struktur backend yang solid, sedangkan Next.js kuat di sisi frontend modern dengan React.\n\n**Kapan pakai Laravel?**\n- Backend-heavy applications\n- CMS dan admin panels\n- E-commerce dengan logika bisnis kompleks\n- API development\n- Server-side rendering dengan Blade\n\n**Kapan pakai Next.js?**\n- Frontend-heavy applications\n- Static sites dan blogs\n- SEO-critical pages\n- Real-time interfaces\n- Single Page Applications\n\n**Kombinasi terbaik:**\nGunakan Laravel sebagai API backend dan Next.js sebagai frontend. Ini memberikan yang terbaik dari kedua dunia — backend yang robust dan frontend yang modern.\n\nDi proyek saya, saya sering menggunakan kombinasi ini untuk hasil optimal.",
    featured_image_url: "/images/blogs/nextjs-vs-laravel.png",
    published_at: "2025-10-16",
    views: 1,
  },
};

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          const found = data.find((p) => p.slug === params.slug);
          if (found) {
            setPost(found);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // fallback
      }

      if (fallbackPosts[params.slug]) {
        setPost(fallbackPosts[params.slug]);
      }
      setLoading(false);
    }
    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-white mb-4">404</h1>
            <p className="text-muted mb-6">Artikel tidak ditemukan.</p>
            <a href="/blog" className="px-6 py-3 bg-accent text-surface font-semibold rounded-xl">
              Kembali ke Blog
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>
                {new Date(post.published_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/1200x600/1A1A1A/8B5CF6?text=${encodeURIComponent(post.title)}`;
              }}
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/<[a-z]/i.test(post.content) ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3 key={i} className="text-xl font-bold text-white mt-8 mb-4">
                      {paragraph.replace(/\*\*/g, "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ") || paragraph.match(/^\d+\./)) {
                  const items = paragraph.split("\n");
                  return (
                    <ul key={i} className="space-y-2 mb-6">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-muted-light">
                          <span className="text-accent mt-1">•</span>
                          <span dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^[-\d.]+\s*/, "")
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                          }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-muted-light leading-relaxed mb-4" dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                  }} />
                );
              })
            )}
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-surface-border">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Kembali ke Blog
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
