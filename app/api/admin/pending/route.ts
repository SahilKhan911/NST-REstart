import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

function authorized(req: Request) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token === expected;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getServiceSupabase();
  const [{ data: pending }, { data: categories }] = await Promise.all([
    supabase
      .from("questions")
      .select("*")
      .is("answer", null)
      .order("created_at", { ascending: true })
      .limit(200),
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
  ]);
  return NextResponse.json({
    pending: pending ?? [],
    categories: categories ?? [],
  });
}
