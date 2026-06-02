"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const fallbackPosts = [
  {
    id: 1,
    category: "Web Development",
    title: "Kenapa Laravel Masih Dipilih di 2025",
    slug: "kenapa-laravel-masih-dipilih-2025",
    excerpt: "Laravel tetap relevan di tengah munculnya framework modern. Tapi apa yang membuatnya masih bertahan dan dicintai developer?",
    featured_image_url: "/images/blogs/laravel-2025.jpg",
    published_at: "2025-10-16",
    views: 8,
  },
  {
    id: 2,
    category: "Technology Insight",
    title: "AI dan Otomasi: Tantangan dan Peluang bagi Developer Muda",
    slug: "ai-dan-otomasi-untuk-developer-muda",
    excerpt: "AI bukan ancaman bagi developer, tapi alat untuk mempercepat inovasi.",
    featured_image_url: "/images/blogs/ai-developer.png",
    published_at: "2025-10-16",
    views: 7,
  },
  {
    id: 3,
    category: "Web Development",
    title: "Next.js vs Laravel: Mana yang Lebih Cocok untuk Proyekmu?",
    slug: "nextjs-vs-laravel",
    excerpt: "Dua framework populer dengan kekuatan berbeda. Kapan pakai Laravel, kapan Next.js?",
    featured_image_url: "/images/blogs/nextjs-vs-laravel.png",
    published_at: "2025-10-16",
    views: 1,
  },
];

export default function BlogPreview() {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPosts(data.slice(0, 3));
          }
        }
      } catch (err) {
        // Use fallback
      }
    }
    fetchPosts();
  }, []);

  return (
    <motion.section
      id="blog"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 bg-[#111118] relative"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            subtitle="Blog"
            title="Artikel Terbaru"
            description="Pemikiran, tips, dan insight seputar web development dan teknologi."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.id || i}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 block"
            >
              {/* Image */}
              <div className="relative h-36 md:h-48 overflow-hidden bg-surface">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/600x400/1A1A1A/8B5CF6?text=Blog`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                <span className="absolute top-3 left-3 bg-accent/90 text-surface px-2.5 py-0.5 text-xs font-bold rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-3 md:p-5">
                <div className="flex items-center gap-3 text-xs text-muted mb-1">
                  <span>
                    {new Date(post.published_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.views} views</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-2 group-hover:gap-2 transition-all duration-300">
                  Baca Selengkapnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-surface-border hover:border-accent/50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-accent/5"
          >
            Lihat Semua Artikel
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
