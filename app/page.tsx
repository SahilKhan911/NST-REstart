import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurriculumComparison from "@/components/CurriculumComparison";
import Achievements from "@/components/Achievements";
import FAQ from "@/components/FAQ";
import WhatsAppChat from "@/components/WhatsAppChat";
import CTASection from "@/components/CTASection";
import { getServiceSupabase, type Category, type Question } from "@/lib/supabase";

export const revalidate = 30; // ISR — refresh published Q&A every 30s

async function loadData(): Promise<{
  categories: Category[];
  messagesByCategory: Record<string, Question[]>;
}> {
  try {
    const supabase = getServiceSupabase();
    const [{ data: categories }, { data: questions }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order", { ascending: true }),
      supabase
        .from("questions")
        .select("*")
        .eq("is_published", true)
        .order("answered_at", { ascending: true })
        .limit(500),
    ]);
    const cats = (categories ?? []) as Category[];
    const qs = (questions ?? []) as Question[];
    const grouped: Record<string, Question[]> = {};
    for (const c of cats) grouped[c.id] = [];
    for (const q of qs) {
      if (!grouped[q.category_id]) grouped[q.category_id] = [];
      grouped[q.category_id].push(q);
    }
    return { categories: cats, messagesByCategory: grouped };
  } catch (err) {
    console.error("[landing] failed to load data — falling back to empty state", err);
    return { categories: [], messagesByCategory: {} };
  }
}

export default async function Page() {
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ?? "https://chat.whatsapp.com/";
  const { categories, messagesByCategory } = await loadData();

  return (
    <main className="bg-white">
      <Navbar whatsappUrl={whatsappUrl} />
      <Hero whatsappUrl={whatsappUrl} />
      <CurriculumComparison />
      <Achievements />
      <FAQ />
      {categories.length > 0 ? (
        <WhatsAppChat
          categories={categories}
          initialMessagesByCategory={messagesByCategory}
        />
      ) : (
        <ChatPlaceholder />
      )}
      <CTASection whatsappUrl={whatsappUrl} />
      <Footer whatsappUrl={whatsappUrl} />
    </main>
  );
}

function ChatPlaceholder() {
  return (
    <section id="chat" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div className="rounded-3xl border border-nst-line bg-nst-soft/60 p-8 sm:p-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-nst bg-white ring-1 ring-nst/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-nst" />
            Setup required
          </div>
          <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-black tracking-tight">
            Chat is almost ready
          </h3>
          <p className="mt-3 text-black/65 leading-relaxed">
            Run the SQL in{" "}
            <code className="bg-white px-1.5 py-0.5 rounded border border-nst-line text-nst font-mono text-sm">
              supabase/schema.sql
            </code>{" "}
            against your Supabase project to seed the categories and enable the
            chat. See the README for the one-command setup.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <footer className="bg-black text-white/55 py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm">
        <div className="flex items-center gap-3">
          <img
            src="https://ik.imagekit.io/cotszrkgk/restart-removebg-preview.png"
            alt="Restart"
            className="h-20 w-auto opacity-90"
          />
          <span>
            © {new Date().getFullYear()} Restart 2026 | All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#curriculum" className="hover:text-white transition">
            Curriculum
          </a>
          <a href="#achievements" className="hover:text-white transition">
            Achievements
          </a>
          <a href="#faq" className="hover:text-white transition">
            FAQ
          </a>
          <a href="#chat" className="hover:text-white transition">
            Q&amp;A
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="text-nst-blueLight hover:text-white transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-6 pt-5 border-t border-white/5 text-[11px] text-white/35 leading-relaxed">
        Restart is an independent counselling initiative. All curriculum,
        outcome and stipend data is sourced from publicly available
        Newton School of Technology disclosures. Trademarks and program names
        belong to their respective owners.
      </div>
    </footer>
  );
}
