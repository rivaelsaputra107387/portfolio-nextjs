export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("pricing_packages")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/pricing:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = createServerSupabase();
    const body = await request.json();

    const { data, error } = await supabase
      .from("pricing_packages")
      .insert([
        {
          name: body.name,
          subtitle: body.subtitle,
          price: body.price,
          features: body.features || [],
          is_recommended: !!body.is_recommended,
          display_order: parseInt(body.display_order) || 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/pricing:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
