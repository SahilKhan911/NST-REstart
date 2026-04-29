# NST Restart

Counselling website for **Newton School of Technology**:

- Side-by-side **curriculum comparison** vs. "other colleges" (no names — by design).
- Quick-answer **FAQ** for the questions every prospective student asks first.
- A **WhatsApp-style Q&A** with category channels (NST Life, Curriculum, Food & Hostel, Placements, Fees, Faculty, Campus, Admissions). Visitors submit questions; counsellors / current students answer; the asker gets the reply by email *and* the answered Q&A appears on the public chat for everyone else.
- **CTA** into the WhatsApp **Restart** group where live counselling sessions run.

Built with Next.js 14 (App Router) · TypeScript · Tailwind · Supabase (Postgres + Realtime) · Resend (email).

---

## 1. Install

```bash
cd NST_REstart
npm install
```

## 2. Environment

`.env.local` is already provisioned for this project. If you're cloning this elsewhere, copy `.env.example` and fill in:

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API (keep server-side only) |
| `SUPABASE_DB_PASSWORD` | The DB password you set when creating the project |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | A verified sender (default works for testing only) |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | The Restart WhatsApp group invite link |
| `ADMIN_TOKEN` | A long random string — paste into `/admin` to moderate |

> ⚠️ The `.env.local` checked into this folder contains real secrets. **Do not commit it** anywhere public — `.gitignore` already covers it.

## 3. Database

Apply the schema to your Supabase project — three options:

**Option A — Supabase MCP (recommended for Claude Code):**

```bash
claude mcp add --scope project --transport http supabase \
  "https://mcp.supabase.com/mcp?project_ref=aiwxfrszyvwtsavscodx"
claude /mcp        # then authenticate the supabase server
```

Once authenticated, ask Claude to apply `supabase/schema.sql` via the MCP.

**Option B — SQL editor:** open Supabase dashboard → SQL → paste the contents of `supabase/schema.sql` → Run.

**Option C — psql:**

```bash
psql "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.aiwxfrszyvwtsavscodx.supabase.co:5432/postgres" \
  -f supabase/schema.sql
```

The schema seeds 8 categories, sets up RLS so the public can only read **published** Q&A, and adds `questions` to the `supabase_realtime` publication so the chat updates live.

(Optional) Install Supabase agent skills:

```bash
npx skills add supabase/agent-skills
```

## 4. Run

```bash
npm run dev   # http://localhost:3000
```

- `/` — landing page (Hero → Curriculum comparison → FAQ → WhatsApp chat → CTA)
- `/admin` — moderation queue. Sign in with `ADMIN_TOKEN`, answer pending questions; submitting publishes to the public chat and emails the asker via Resend.

## 5. Flow

1. Visitor picks a category and posts a question (`POST /api/questions`). Stored as `is_published = false`.
2. Counsellor opens `/admin`, sees the queue, writes an answer.
3. `POST /api/answers` updates the row (`is_published = true`, `answered_at`, `answered_by`) and triggers `Resend` to email the asker.
4. Supabase Realtime broadcasts the update; every open chat tab adds the bubble live.
5. CTA throughout the page funnels visitors into the WhatsApp Restart group for scheduled live sessions.

## 6. Project structure

```
app/
  layout.tsx           Root layout
  page.tsx             Landing — server-renders categories + published Q&A
  admin/page.tsx       Token-gated moderation panel
  api/questions        POST: submit a question (anon)
  api/answers          POST: publish + email (admin token)
  api/messages         GET:  fetch published Q&A
  api/admin/pending    GET:  unanswered queue (admin token)
components/            Hero, Navbar, CurriculumComparison, FAQ, WhatsAppChat, CTASection
lib/
  supabase.ts          Browser + service-role clients
  resend.ts            Templated email send
  comparison.ts        Curriculum rows + FAQ content
supabase/schema.sql    Tables, RLS, realtime publication, seed categories
```

## 7. Editing content

- **Curriculum comparison rows + FAQ items** live in `lib/comparison.ts` — plain TypeScript arrays, edit in place.
- **Categories**: edit the `insert into categories` block at the bottom of `supabase/schema.sql` and re-run, or just `update` rows in Supabase.
- **Email template**: `lib/resend.ts` (`sendAnswerEmail`).

## 8. Deploy

Any Next.js host works (Vercel is one click). Set the same env vars in the host's dashboard. Make sure the Resend `from` address uses a domain you've verified before going to production — the default `onboarding@resend.dev` is rate-limited and visible.
