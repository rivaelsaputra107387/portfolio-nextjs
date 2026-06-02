"use client";

const techColors = {
  "Laravel": "bg-red-500/20 text-red-400 border-red-500/30",
  "Next.js": "bg-white/10 text-white border-white/20",
  "React": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "MySQL": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "SQL Server": "bg-red-600/20 text-red-300 border-red-600/30",
  "Supabase": "bg-green-500/20 text-green-400 border-green-500/30",
  "Tailwind CSS": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "JavaScript": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "PHP": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "CodeIgniter 4": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Midtrans": "bg-blue-600/20 text-blue-300 border-blue-600/30",
  "Bootstrap": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "HTML": "bg-orange-600/20 text-orange-400 border-orange-600/30",
  "CSS": "bg-blue-400/20 text-blue-300 border-blue-400/30",
  "Blade": "bg-red-400/20 text-red-300 border-red-400/30",
  "Hugging Face": "bg-yellow-600/20 text-yellow-300 border-yellow-600/30",
  "NLP": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "RBAC": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "RESTful API": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Postman": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "UI/UX": "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  "Vercel": "bg-white/10 text-white border-white/20",
};

export default function TechBadge({ name }) {
  const colorClass = techColors[name] || "bg-zinc-700/50 text-zinc-300 border-zinc-600/30";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${colorClass} transition-all duration-300 hover:scale-105`}
    >
      {name}
    </span>
  );
}
