// seed_skills.js
const fs = require('fs');
const path = require('path');

// 1. Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
let supabaseUrl = '';
let supabaseKey = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('NEXT_PUBLIC_SUPABASE_URL=')[1].trim();
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('NEXT_PUBLIC_SUPABASE_ANON_KEY=')[1].trim();
    }
  }
} catch (err) {
  console.error('Gagal membaca file .env.local:', err.message);
  process.exit(1);
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Kredensial Supabase tidak ditemukan di .env.local');
  process.exit(1);
}

console.log('Menghubungkan ke Supabase:', supabaseUrl);

const skillsData = [
  // Modern Web Development
  { name: 'Laravel', percentage: 100, category: 'Modern Web Development', display_order: 1 },
  { name: 'Next.js', percentage: 100, category: 'Modern Web Development', display_order: 2 },
  { name: 'React', percentage: 100, category: 'Modern Web Development', display_order: 3 },
  { name: 'Tailwind CSS', percentage: 100, category: 'Modern Web Development', display_order: 4 },
  { name: 'PHP', percentage: 100, category: 'Modern Web Development', display_order: 5 },
  { name: 'CodeIgniter 4', percentage: 100, category: 'Modern Web Development', display_order: 6 },
  { name: 'Bootstrap', percentage: 100, category: 'Modern Web Development', display_order: 7 },
  { name: 'JavaScript (ES6+)', percentage: 100, category: 'Modern Web Development', display_order: 8 },

  // Database & System Architecture
  { name: 'MySQL', percentage: 100, category: 'Database & System Architecture', display_order: 9 },
  { name: 'PostgreSQL', percentage: 100, category: 'Database & System Architecture', display_order: 10 },
  { name: 'Supabase', percentage: 100, category: 'Database & System Architecture', display_order: 11 },
  { name: 'SQL Server', percentage: 100, category: 'Database & System Architecture', display_order: 12 },
  { name: 'MongoDB', percentage: 100, category: 'Database & System Architecture', display_order: 13 },
  { name: 'RESTful API', percentage: 100, category: 'Database & System Architecture', display_order: 14 },
  { name: 'Git & GitHub', percentage: 100, category: 'Database & System Architecture', display_order: 15 },
  { name: 'Postman', percentage: 100, category: 'Database & System Architecture', display_order: 16 },

  // Automation & AI Integration
  { name: 'Webhook Integration', percentage: 100, category: 'Automation & AI Integration', display_order: 17 },
  { name: 'Hugging Face API', percentage: 100, category: 'Automation & AI Integration', display_order: 18 },
  { name: 'Workflow Automation', percentage: 100, category: 'Automation & AI Integration', display_order: 19 },
  { name: 'Payment Gateway', percentage: 100, category: 'Automation & AI Integration', display_order: 20 },
  { name: 'Email Service (Resend)', percentage: 100, category: 'Automation & AI Integration', display_order: 21 },
  { name: 'ETL & Data Migration', percentage: 100, category: 'Automation & AI Integration', display_order: 22 }
];

async function seed() {
  try {
    // A. Menghapus data skill lama agar tidak duplikat
    console.log('Membersihkan data skill lama di database...');
    const deleteRes = await fetch(`${supabaseUrl}/rest/v1/skills?id=not.is.null`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!deleteRes.ok) {
      const errText = await deleteRes.text();
      throw new Error(`Gagal menghapus data lama: ${errText}`);
    }
    console.log('Tabel skills berhasil dibersihkan.');

    // B. Memasukkan data skill baru secara bulk
    console.log('Memasukkan 22 data tech stack baru...');
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/skills`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(skillsData)
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      throw new Error(`Gagal memasukkan data baru: ${errText}`);
    }

    const insertedData = await insertRes.json();
    console.log(`Sukses! ${insertedData.length} data tech stack berhasil disimpan ke Supabase.`);
  } catch (err) {
    console.error('Terjadi kesalahan saat seeding:', err.message);
  }
}

seed();
