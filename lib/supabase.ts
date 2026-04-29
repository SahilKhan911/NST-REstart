import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Treat both "unset" and "" the same — `??` only catches null/undefined.
const pick = (...vals: (string | undefined)[]) =>
  vals.find((v) => typeof v === "string" && v.length > 0);

const url = pick(process.env.NEXT_PUBLIC_SUPABASE_URL);
// Supports both the new "publishable" key naming and the legacy "anon" naming.
const publishableKey = pick(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
// Supports both the new "secret" naming and the legacy "service_role" naming.
const secretKey = pick(
  process.env.SUPABASE_SECRET_KEY,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

if (!url) {
  console.warn("[supabase] NEXT_PUBLIC_SUPABASE_URL is not set");
}

export type Category = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  description: string | null;
  sort_order: number;
};

export type Question = {
  id: string;
  category_id: string;
  asker_name: string;
  asker_email: string;
  question: string;
  answer: string | null;
  answered_by: string | null;
  answered_at: string | null;
  is_published: boolean;
  created_at: string;
};

let browserClient: SupabaseClient | null = null;
export function getBrowserSupabase(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(url ?? "", publishableKey ?? "", {
      auth: { persistSession: false },
    });
  }
  return browserClient;
}

/**
 * Returns a server-side client. Prefers the secret/service-role key (bypasses RLS,
 * required for inserts and admin writes). Falls back to the publishable key when no
 * secret is configured — that fallback is read-only via RLS, useful so the public
 * landing page can still server-render published Q&A in dev.
 */
export function getServiceSupabase(): SupabaseClient {
  const key = secretKey ?? publishableKey;
  if (!key) {
    throw new Error(
      "Supabase keys missing — set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY at minimum",
    );
  }
  return createClient(url ?? "", key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function hasSecretKey(): boolean {
  return Boolean(secretKey);
}
