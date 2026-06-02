import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabase();
    const { id } = await params;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) throw error;
    return NextResponse.json({ message: "Service deleted" });
  } catch (error) {
    console.error("Error in DELETE /api/services/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const supabase = createServerSupabase();
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("services")
      .update({
        title: body.title,
        icon: body.icon,
        price: body.price,
        description: body.description,
        features: body.features,
        display_order: body.display_order !== undefined ? parseInt(body.display_order) : undefined,
        tier: body.tier,
        duration: body.duration,
        notes: body.notes,
        category: body.category,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PATCH /api/services/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
