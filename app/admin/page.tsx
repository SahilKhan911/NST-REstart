"use client";

import { useCallback, useEffect, useState } from "react";

type Pending = {
  id: string;
  category_id: string;
  asker_name: string;
  asker_email: string;
  question: string;
  created_at: string;
};
type Cat = { id: string; name: string; emoji: string };

const TOKEN_KEY = "nst_admin_token";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pending, setPending] = useState<Pending[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (stored) {
      setToken(stored);
      setAuthed(true);
    }
  }, []);

  const load = useCallback(async (tok: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/pending", {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.status === 401) {
        setAuthed(false);
        localStorage.removeItem(TOKEN_KEY);
        setErrorMsg("Invalid token");
        return;
      }
      if (!res.ok) throw new Error("Failed to load");
      const j = await res.json();
      setPending(j.pending);
      setCats(j.categories);
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Could not load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed && token) load(token);
  }, [authed, token, load]);

  const onSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    localStorage.setItem(TOKEN_KEY, token.trim());
    setAuthed(true);
  };

  const onSignOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthed(false);
    setPending([]);
  };

  if (!authed) {
    return (
      <main className="min-h-screen grid place-items-center bg-nst-soft p-6">
        <form
          onSubmit={onSignIn}
          className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-nst">
              Restart admin
            </div>
            <h1 className="mt-1 text-xl font-bold text-nst">Sign in</h1>
            <p className="text-sm text-nst/60 mt-1">
              Paste the <code>ADMIN_TOKEN</code> from your .env.local.
            </p>
          </div>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            className="w-full border border-black/10 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-nst/30"
          />
          {errorMsg && <div className="text-rose-600 text-sm">{errorMsg}</div>}
          <button
            type="submit"
            className="w-full bg-nst hover:bg-nst-muted text-white font-semibold rounded-lg py-2.5"
          >
            Continue
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-nst-soft">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-nst text-white font-bold">
              N
            </span>
            <span className="font-semibold">
              Restart <span className="text-nst">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(token)}
              className="text-sm text-nst/70 hover:text-nst"
              disabled={loading}
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
            <button
              onClick={onSignOut}
              className="text-sm text-rose-600 hover:text-rose-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <h2 className="text-2xl font-bold text-nst">
          Pending questions{" "}
          <span className="text-nst/40 font-normal">({pending.length})</span>
        </h2>
        {errorMsg && <div className="text-rose-600 mt-3">{errorMsg}</div>}

        <div className="mt-6 space-y-4">
          {pending.length === 0 && !loading && (
            <div className="rounded-xl bg-white border border-black/5 p-8 text-center text-nst/60">
              All caught up — no pending questions.
            </div>
          )}
          {pending.map((q) => (
            <PendingCard
              key={q.id}
              q={q}
              category={cats.find((c) => c.id === q.category_id)}
              token={token}
              onAnswered={() => load(token)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function PendingCard({
  q,
  category,
  token,
  onAnswered,
}: {
  q: Pending;
  category: Cat | undefined;
  token: string;
  onAnswered: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [answeredBy, setAnsweredBy] = useState("");
  const [busy, setBusy] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setBusy(true);
    setErrorMsg(null);
    setWarning(null);
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: q.id,
          answer: answer.trim(),
          answered_by: answeredBy.trim() || "NST student",
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error ?? "Failed to publish");
      if (j.emailWarning) setWarning(`Published, but email failed: ${j.emailWarning}`);
      onAnswered();
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-xl bg-white border border-black/5 shadow-sm p-5 sm:p-6 space-y-4"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="bg-nst-soft text-nst px-2 py-1 rounded-full font-medium">
          {category?.emoji} {category?.name ?? "Unknown channel"}
        </span>
        <span className="text-nst/50">
          {new Date(q.created_at).toLocaleString()}
        </span>
        <span className="text-nst/50">·</span>
        <span className="text-nst/70">
          {q.asker_name} <span className="text-nst/40">&lt;{q.asker_email}&gt;</span>
        </span>
      </div>
      <div className="text-nst whitespace-pre-wrap leading-relaxed bg-nst-soft/60 rounded-lg p-4">
        {q.question}
      </div>
      <textarea
        required
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
        placeholder="Answer (will be emailed to the asker AND published to the public chat)…"
        className="w-full border border-black/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-nst/30 resize-y"
      />
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          value={answeredBy}
          onChange={(e) => setAnsweredBy(e.target.value)}
          placeholder="Answered by (e.g. Riya, NST '27)"
          className="flex-1 border border-black/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-nst/30"
        />
        <button
          type="submit"
          disabled={busy}
          className="bg-wa-accent hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-2.5 transition"
        >
          {busy ? "Publishing…" : "Publish + email"}
        </button>
      </div>
      {warning && <div className="text-amber-700 text-sm">{warning}</div>}
      {errorMsg && <div className="text-rose-600 text-sm">{errorMsg}</div>}
    </form>
  );
}
