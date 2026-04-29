import { WhatsAppIcon } from "./Navbar";

export default function CTASection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section className="relative py-20 sm:py-28 bg-black text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] -z-0 opacity-50 blur-3xl rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,133,255,0.55), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-0 dot-grid opacity-[0.07]"
      />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-nst-blueLight bg-nst/15 ring-1 ring-nst/30 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-nst-blueLight animate-pulseDot" />
          The Restart community
        </div>
        <h2 className="mt-7 text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.05]">
          Talk to students who were exactly
          <br className="hidden sm:block" />
          <span className="text-nst-blueLight"> where you are right now.</span>
        </h2>
        <p className="mt-6 text-white/70 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
          Restart is a moderated WhatsApp group where prospective students and
          parents connect directly with current NST students. Live counselling
          sessions are scheduled regularly. Ask anything. Get the unfiltered
          version.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-3 bg-nst hover:bg-nst-blueDeep text-white font-semibold px-7 py-4 rounded-xl text-base sm:text-lg shadow-glow transition"
        >
          <WhatsAppIcon className="w-6 h-6" />
          Join the Restart group on WhatsApp
        </a>
        <div className="mt-12 grid sm:grid-cols-3 gap-3 text-left">
          <Bullet
            title="Live sessions"
            body="Scheduled AMAs with current students and counsellors."
          />
          <Bullet
            title="Parent-friendly"
            body="Most-asked-by-parents thread, separate from student banter."
          />
          <Bullet
            title="Searchable"
            body="Past Q&A is mirrored to the public chat above so nothing gets lost."
          />
        </div>
      </div>
    </section>
  );
}

function Bullet({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-sm">
      <div className="font-semibold text-white">{title}</div>
      <div className="text-sm text-white/60 mt-1.5 leading-relaxed">{body}</div>
    </div>
  );
}
