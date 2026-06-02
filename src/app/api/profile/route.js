export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabase();
    // Get the first profile row
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1);

    if (error) throw error;
    return NextResponse.json(data?.[0] || null);
  } catch (error) {
    console.error("Error in GET /api/profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = createServerSupabase();
    const body = await request.json();

    // Check if profile exists (order by created_at ascending to match GET)
    const { data: existing, error: fetchError } = await supabase
      .from("profile")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1);

    if (fetchError) throw fetchError;

    let result;
    if (existing && existing.length > 0) {
      // Update
      const { data, error } = await supabase
        .from("profile")
        .update({
          name: body.name,
          title: body.title,
          about_bio: body.about_bio,
          cv_url: body.cv_url,
          whatsapp: body.whatsapp,
          email: body.email,
          location: body.location,
          github_url: body.github_url,
          linkedin_url: body.linkedin_url,
          instagram_url: body.instagram_url,
          favicon_url: body.favicon_url,
          logo_url: body.logo_url,
          hero_image_url: body.hero_image_url,
        })
        .eq("id", existing[0].id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert
      const { data, error } = await supabase
        .from("profile")
        .insert([
          {
            name: body.name || "Rivael Saputra",
            title: body.title || "Fullstack Developer",
            about_bio: body.about_bio,
            cv_url: body.cv_url || "#",
            whatsapp: body.whatsapp || "6285794946920",
            email: body.email || "riva.elsaputra2020@gmail.com",
            location: body.location || "Bandung, Indonesia",
            github_url: body.github_url,
            linkedin_url: body.linkedin_url,
            instagram_url: body.instagram_url,
            favicon_url: body.favicon_url,
            logo_url: body.logo_url,
            hero_image_url: body.hero_image_url,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
