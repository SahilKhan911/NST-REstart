import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const category_id = String(body?.category_id ?? "").trim();
  const asker_name = String(body?.asker_name ?? "").trim().slice(0, 80);
  const asker_email = String(body?.asker_email ?? "").trim().slice(0, 200);
  const question = String(body?.question ?? "").trim().slice(0, 2000);

  if (!category_id || !asker_name || !asker_email || !question) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  if (!EMAIL_RX.test(asker_email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { data: cat, error: catErr } = await supabase
    .from("categories")
    .select("id")
    .eq("id", category_id)
    .maybeSingle();
  if (catErr || !cat) {
    return NextResponse.json({ error: "Unknown category" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("questions")
    .insert({
      category_id,
      asker_name,
      asker_email,
      question,
      is_published: false,
    })
    .select("id")
    .single();
  if (error) {
    console.error("[api/questions] insert failed", error);
    return NextResponse.json({ error: "Could not save question" }, { status: 500 });
  }
  return NextResponse.json({ id: data.id }, { status: 201 });
}
