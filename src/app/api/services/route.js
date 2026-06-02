export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/services:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = createServerSupabase();
    const body = await request.json();

    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          title: body.title,
          icon: body.icon,
          price: body.price,
          description: body.description,
          features: body.features || [],
          display_order: parseInt(body.display_order) || 0,
          tier: body.tier || 'Tier 1 — Starter',
          duration: body.duration || '',
          notes: body.notes || '',
          category: body.category || 'Landing Page',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/services:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
