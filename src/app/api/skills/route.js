export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/skills:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = createServerSupabase();
    const body = await request.json();

    const { data, error } = await supabase
      .from("skills")
      .insert([
        {
          name: body.name,
          percentage: parseInt(body.percentage) || 0,
          category: body.category || "Other",
          display_order: parseInt(body.display_order) || 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/skills:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
