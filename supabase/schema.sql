-- NST Restart — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query)
-- or via the Supabase MCP server.

create extension if not exists "pgcrypto";

create table if not exists categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  emoji        text not null default '💬',
  description  text,
  sort_order   int  not null default 100,
  created_at   timestamptz not null default now()
);

create table if not exists questions (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid not null references categories(id) on delete cascade,
  asker_name   text not null,
  asker_email  text not null,
  question     text not null,
  answer       text,
  answered_by  text,
  answered_at  timestamptz,
  is_published boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists questions_category_published_idx
  on questions (category_id, is_published, answered_at desc);

create index if not exists questions_pending_idx
  on questions (is_published, created_at desc) where answer is null;

-- Row Level Security: public can read published Q&A only.
-- Inserts (new questions) and admin updates go through service-role on the server,
-- so anon clients never bypass moderation.
alter table categories enable row level security;
alter table questions  enable row level security;

drop policy if exists "categories_read_all" on categories;
create policy "categories_read_all" on categories
  for select using (true);

drop policy if exists "questions_read_published" on questions;
create policy "questions_read_published" on questions
  for select using (is_published = true);

-- Realtime: emit changes on questions so the chat UI can stream new answers.
alter publication supabase_realtime add table questions;

-- Seed categories (idempotent).
insert into categories (slug, name, emoji, description, sort_order) values
  ('nst-life',     'NST Life',          '🎓', 'Day-to-day at Newton School of Technology — culture, clubs, friendships, weekends.', 10),
  ('curriculum',   'Curriculum & Tech', '💻', 'What you actually learn — courses, stack, projects, capstones.', 20),
  ('placements',   'Placements & Careers', '🚀', 'Companies, roles, CTC, prep cycle, alumni outcomes.', 30),
  ('food-hostel',  'Food & Hostel',     '🍱', 'Mess, cafes, hostel rooms, laundry, the unfiltered truth.', 40),
  ('faculty',      'Faculty & Mentors', '👨‍🏫', 'Who teaches you, industry mentors, 1:1 guidance.', 50),
  ('campus',       'Campus & Facilities','🏫', 'Labs, library, sports, infra, Wi-Fi, the small stuff.', 60),
  ('fees',         'Fees & Scholarships','💰', 'Total cost, payment options, scholarships, ISA, ROI.', 70),
  ('admissions',   'Admissions & NSAT', '📝', 'Eligibility, NSAT, interview rounds, deadlines.', 80)
on conflict (slug) do update
  set name = excluded.name,
      emoji = excluded.emoji,
      description = excluded.description,
      sort_order = excluded.sort_order;
