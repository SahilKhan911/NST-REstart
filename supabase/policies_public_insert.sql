-- Optional: lets the public submit form work even when the server only has the
-- publishable key (no secret/service-role key configured).
-- Run this in addition to schema.sql if you don't want to set SUPABASE_SECRET_KEY.
--
-- Note: with this policy, the questions table accepts inserts from anyone who has
-- the publishable key (which is exposed in the browser). Our /api/questions route
-- still validates payloads, but direct API access becomes possible. For production,
-- prefer setting SUPABASE_SECRET_KEY and removing this policy.

drop policy if exists "questions_insert_anon" on questions;
create policy "questions_insert_anon" on questions
  for insert
  with check (
    is_published = false
    and answer is null
    and answered_at is null
  );
