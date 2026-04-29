import { WhatsAppIcon } from "./Navbar";

export default function Hero({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section
      id="top"
      className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
    >
      {/* Background gradients */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-nst-soft via-white to-white"
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] -z-10 opacity-60 blur-3xl rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,133,255,0.28), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 dot-grid opacity-40"
        style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
        {/* Logo lockup */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <img
            src="https://ik.imagekit.io/cotszrkgk/restart-removebg-preview.png"
            alt="Restart"
            className="h-[8.75rem] sm:h-40 w-auto animate-floatY"
          />
        </div>

        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-nst bg-nst/8 ring-1 ring-nst/15 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-nst animate-pulseDot" />
          Counselling · Live · Unfiltered
        </span>

        <h1 className="mt-7 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-black">
          See the curriculum.
          <br className="hidden sm:block" />
          <span className="text-nst">Hear it from the students.</span>
        </h1>

        <p className="mt-7 max-w-2xl mx-auto text-lg sm:text-xl text-black/65 leading-relaxed">
          A side-by-side look at how Newton School of Technology builds engineers — and a
          space to ask anything to the people actually living it.
          <span className="block mt-2 text-black/50 text-base">No glossy brochure. No filter.</span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#chat"
            className="inline-flex items-center justify-center gap-2 bg-black hover:bg-nst-muted text-white font-semibold px-7 py-3.5 rounded-xl transition shadow-soft"
          >
            Ask current students
            <span aria-hidden>→</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-nst hover:bg-nst-blueDeep text-white font-semibold px-7 py-3.5 rounded-xl shadow-glow transition"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Join the Restart group
          </a>
        </div>

        {/* Stat cards */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <Stat value="93%+" label="Paid internships by 2nd year" />
          <Stat value="₹1.25L/m" label="Highest stipend secured" />
          <Stat value="6" label="GSoC selections (Y1 students)" />
          <Stat value="22" label="ICPC Chennai Regionals rank" />
        </div>

        <p className="mt-8 text-xs text-black/45 uppercase tracking-[0.18em]">
          B.Tech CSE · AI &amp; ML · Ajeenkya DY Patil University · Pune
        </p>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group rounded-2xl bg-white border border-nst-line shadow-soft p-5 hover:border-nst/40 hover:shadow-glow transition">
      <div className="text-2xl sm:text-3xl font-bold text-nst tracking-tight">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-black/60 mt-1.5 leading-snug">
        {label}
      </div>
    </div>
  );
}
