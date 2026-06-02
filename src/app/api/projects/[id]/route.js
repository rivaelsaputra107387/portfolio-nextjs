import { createServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabase();
    const { id } = await params;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const supabase = createServerSupabase();
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("projects")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
