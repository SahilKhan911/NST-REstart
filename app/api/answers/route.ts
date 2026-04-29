import { NextResponse } from "next/server";
import { getServiceSupabase, hasSecretKey } from "@/lib/supabase";
import { sendAnswerEmail } from "@/lib/resend";

export const runtime = "nodejs";

function authorized(req: Request) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token === expected;
}

export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasSecretKey()) {
    return NextResponse.json(
      {
        error:
          "SUPABASE_SECRET_KEY is not set on the server. Grab the secret/service-role key from Supabase → Settings → API and add it to .env.local before publishing answers.",
      },
      { status: 500 },
    );
  }
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = String(body?.id ?? "").trim();
  const answer = String(body?.answer ?? "").trim().slice(0, 5000);
  const answered_by = String(body?.answered_by ?? "").trim().slice(0, 80) || "NST Restart";

  if (!id || !answer) {
    return NextResponse.json({ error: "Missing id or answer" }, { status: 400 });
  }

  const supabase = getServiceSupabase();

  // Load the question + its category for the email body.
  const { data: q, error: qErr } = await supabase
    .from("questions")
    .select("id, asker_name, asker_email, question, category_id")
    .eq("id", id)
    .maybeSingle();
  if (qErr || !q) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }
  const { data: cat } = await supabase
    .from("categories")
    .select("name")
    .eq("id", q.category_id)
    .maybeSingle();

  // Persist the answer + publish.
  const { error: updErr } = await supabase
    .from("questions")
    .update({
      answer,
      answered_by,
      answered_at: new Date().toISOString(),
      is_published: true,
    })
    .eq("id", id);
  if (updErr) {
    console.error("[api/answers] update failed", updErr);
    return NextResponse.json({ error: "Could not publish answer" }, { status: 500 });
  }

  // Send email. If this fails we don't roll back the publish — counsellor can resend.
  let emailWarning: string | null = null;
  try {
    await sendAnswerEmail({
      to: q.asker_email,
      askerName: q.asker_name,
      category: cat?.name ?? "NST Restart",
      question: q.question,
      answer,
      answeredBy: answered_by,
      whatsappUrl:
        process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ?? "https://chat.whatsapp.com/",
    });
  } catch (err: any) {
    emailWarning = err?.message ?? "Email send failed";
    console.error("[api/answers] resend failed", err);
  }

  return NextResponse.json({ ok: true, emailWarning });
}
