"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getBrowserSupabase, type Category, type Question } from "@/lib/supabase";
import { SectionHeader } from "./CurriculumComparison";

type Status = "idle" | "submitting" | "sent" | "error";

export default function WhatsAppChat({
  categories,
  initialMessagesByCategory,
}: {
  categories: Category[];
  initialMessagesByCategory: Record<string, Question[]>;
}) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [messagesByCategory, setMessagesByCategory] = useState(
    initialMessagesByCategory,
  );

  // Realtime: subscribe once, route updates to the right category bucket.
  useEffect(() => {
    const supabase = getBrowserSupabase();
    const channel = supabase
      .channel("public:questions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "questions" },
        (payload) => {
          const row = (payload.new ?? payload.old) as Question | undefined;
          if (!row) return;
          // Only published rows are visible to anon; ignore others
          if (payload.eventType === "DELETE") {
            setMessagesByCategory((prev) => {
              const list = prev[row.category_id] ?? [];
              return { ...prev, [row.category_id]: list.filter((q) => q.id !== row.id) };
            });
            return;
          }
          if (!row.is_published) return;
          setMessagesByCategory((prev) => {
            const list = prev[row.category_id] ?? [];
            const existingIdx = list.findIndex((q) => q.id === row.id);
            const next =
              existingIdx >= 0
                ? list.map((q) => (q.id === row.id ? row : q))
                : [...list, row].sort(
                    (a, b) =>
                      new Date(a.answered_at ?? a.created_at).getTime() -
                      new Date(b.answered_at ?? b.created_at).getTime(),
                  );
            return { ...prev, [row.category_id]: next };
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeId) ?? categories[0],
    [categories, activeId],
  );
  const activeMessages = messagesByCategory[activeId] ?? [];

  return (
    <section id="chat" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Ask anything"
          title="A WhatsApp-style Q&A, by category"
          subtitle="Pick a channel. Drop your question. A current student or counsellor replies — by email and on the public chat below, so the next person with the same question doesn't have to ask twice."
        />

        <div className="mt-10 rounded-2xl overflow-hidden border border-black/10 shadow-2xl shadow-nst/10 bg-wa-bg grid grid-cols-12 h-[640px]">
          <Sidebar
            categories={categories}
            activeId={activeId}
            onSelect={setActiveId}
            messagesByCategory={messagesByCategory}
          />
          <ChatPanel
            key={activeCategory?.id}
            category={activeCategory}
            messages={activeMessages}
          />
        </div>
        <p className="mt-4 text-xs text-nst/50 text-center">
          Your email is used only to send you the answer. The published Q&A on this page
          shows your first name only.
        </p>
      </div>
    </section>
  );
}

function Sidebar({
  categories,
  activeId,
  onSelect,
  messagesByCategory,
}: {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
  messagesByCategory: Record<string, Question[]>;
}) {
  return (
    <aside className="hidden sm:flex col-span-4 lg:col-span-3 flex-col bg-wa-panel border-r border-wa-divider">
      <div className="p-4 border-b border-wa-divider">
        <div className="text-wa-text font-semibold">NST Restart</div>
        <div className="text-wa-subtext text-xs mt-0.5">
          {categories.length} channels · all answers public
        </div>
      </div>
      <div className="flex-1 overflow-y-auto wa-scroll">
        {categories.map((c) => {
          const list = messagesByCategory[c.id] ?? [];
          const last = list[list.length - 1];
          const active = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-wa-divider/60 transition ${
                active ? "bg-white/5" : "hover:bg-white/[0.03]"
              }`}
            >
              <div className="grid place-items-center w-11 h-11 rounded-full bg-wa-bubbleIn text-xl shrink-0">
                {c.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-wa-text font-medium truncate">{c.name}</div>
                  <div className="text-[10px] text-wa-subtext shrink-0">
                    {list.length > 0 ? `${list.length} Q&A` : "new"}
                  </div>
                </div>
                <div className="text-wa-subtext text-xs truncate mt-0.5">
                  {last?.answer
                    ? `${last.answered_by ?? "Student"}: ${last.answer.slice(0, 60)}`
                    : c.description ?? "Be the first to ask"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function ChatPanel({
  category,
  messages,
}: {
  category: Category | undefined;
  messages: Question[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, category?.id]);

  if (!category) return <div className="col-span-12 grid place-items-center text-wa-subtext">No channels yet</div>;

  return (
    <div className="col-span-12 sm:col-span-8 lg:col-span-9 flex flex-col wa-doodle">
      {/* Mobile category picker */}
      <div className="sm:hidden bg-wa-panel border-b border-wa-divider p-3">
        <div className="flex items-center gap-2 text-wa-text">
          <span className="text-lg">{category.emoji}</span>
          <span className="font-medium">{category.name}</span>
        </div>
      </div>

      {/* Header */}
      <div className="hidden sm:flex items-center gap-3 bg-wa-panel border-b border-wa-divider px-5 py-3">
        <div className="grid place-items-center w-10 h-10 rounded-full bg-wa-bubbleIn text-xl">
          {category.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-wa-text font-medium">{category.name}</div>
          <div className="text-wa-subtext text-xs truncate">{category.description}</div>
        </div>
        <div className="text-[11px] text-wa-subtext">end-to-end · public Q&A</div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto wa-scroll px-3 sm:px-6 py-5 space-y-3">
        <div className="text-center">
          <span className="inline-block text-[11px] text-wa-text bg-[#1d2c34] px-3 py-1 rounded-full">
            Welcome — every answer here comes from a real student or counsellor.
          </span>
        </div>
        {messages.length === 0 && (
          <div className="text-center text-wa-subtext text-sm pt-10">
            No Q&A yet in <strong className="text-wa-text">{category.name}</strong>. Be
            the first to ask 👇
          </div>
        )}
        {messages.map((m) => (
          <QABubble key={m.id} q={m} />
        ))}
      </div>

      <Composer categoryId={category.id} categoryName={category.name} />
    </div>
  );
}

function QABubble({ q }: { q: Question }) {
  const firstName = (q.asker_name || "Student").split(" ")[0];
  const askedAt = formatTime(q.created_at);
  const answeredAt = q.answered_at ? formatTime(q.answered_at) : null;
  return (
    <div className="space-y-1.5 animate-fadeUp">
      <div className="flex">
        <div className="relative max-w-[85%] sm:max-w-[70%] bg-wa-bubbleIn bubble-in text-wa-text rounded-lg rounded-tl-none px-3.5 py-2.5 shadow-sm ml-1.5">
          <div className="text-[11px] font-semibold text-emerald-300 mb-0.5">
            {firstName}
          </div>
          <div className="whitespace-pre-wrap leading-relaxed">{q.question}</div>
          <div className="text-[10px] text-wa-subtext mt-1 text-right">{askedAt}</div>
        </div>
      </div>
      {q.answer && (
        <div className="flex justify-end">
          <div className="relative max-w-[85%] sm:max-w-[70%] bg-wa-bubbleOut bubble-out text-wa-text rounded-lg rounded-tr-none px-3.5 py-2.5 shadow-sm mr-1.5">
            <div className="text-[11px] font-semibold text-emerald-200 mb-0.5">
              {q.answered_by ?? "NST student"}
            </div>
            <div className="whitespace-pre-wrap leading-relaxed">{q.answer}</div>
            <div className="text-[10px] text-emerald-100/70 mt-1 text-right">
              {answeredAt} · ✓✓
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Composer({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !question.trim()) return;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: categoryId,
          asker_name: name.trim(),
          asker_email: email.trim(),
          question: question.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Could not submit");
      }
      setStatus("sent");
      setQuestion("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-wa-panel border-t border-wa-divider p-3 sm:p-4 space-y-2"
    >
      <div className="grid grid-cols-2 gap-2">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          className="bg-wa-bubbleIn text-wa-text placeholder-wa-subtext text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-wa-accent/40"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (we'll send the reply here)"
          className="bg-wa-bubbleIn text-wa-text placeholder-wa-subtext text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-wa-accent/40"
        />
      </div>
      <div className="flex items-end gap-2">
        <textarea
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          placeholder={`Ask anything about ${categoryName}…`}
          className="flex-1 bg-wa-bubbleIn text-wa-text placeholder-wa-subtext text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-wa-accent/40 resize-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="grid place-items-center w-11 h-11 rounded-full bg-wa-accent hover:bg-emerald-500 disabled:opacity-60 transition shrink-0"
          aria-label="Send question"
        >
          {status === "submitting" ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>
      <div className="min-h-[18px]">
        {status === "sent" && (
          <div className="text-emerald-300 text-xs animate-fadeUp">
            ✓ Sent. A counsellor or current student will reply by email — and the
            answer will appear right here.
          </div>
        )}
        {status === "error" && (
          <div className="text-rose-300 text-xs">{errorMsg}</div>
        )}
        {status === "idle" && (
          <div className="text-wa-subtext text-[11px]">
            Questions are moderated before publishing. Replies usually go out within
            24 hours.
          </div>
        )}
      </div>
    </form>
  );
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    let h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
  } catch {
    return "";
  }
}
