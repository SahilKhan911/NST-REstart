import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const supabase = getServiceSupabase();

  let q = supabase
    .from("questions")
    .select("*")
    .eq("is_published", true)
    .order("answered_at", { ascending: true })
    .limit(500);
  if (category) q = q.eq("category_id", category);

  const { data, error } = await q;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ messages: data ?? [] });
}
