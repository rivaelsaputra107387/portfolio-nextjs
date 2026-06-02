import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabase();
    const { id } = await params;

    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) throw error;
    return NextResponse.json({ message: "Skill deleted" });
  } catch (error) {
    console.error("Error in DELETE /api/skills/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const supabase = createServerSupabase();
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("skills")
      .update({
        name: body.name,
        percentage: body.percentage !== undefined ? parseInt(body.percentage) : undefined,
        category: body.category,
        display_order: body.display_order !== undefined ? parseInt(body.display_order) : undefined,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PATCH /api/skills/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
