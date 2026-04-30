import { comparisonRows } from "@/lib/comparison";

export default function CurriculumComparison() {
  return (
    <section
      id="curriculum"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-white via-nst-soft to-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 dot-grid opacity-30"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Curriculum"
          title="Real talk vs. brochure talk"
          subtitle="Left: what's actually happening at NST, in plain language. Right: phrasing pulled straight from the way most engineering colleges market themselves. You decide."
        />

        {/* Header row (md+) */}
        <div className="hidden md:grid grid-cols-12 gap-4 mt-14 text-[11px] font-semibold uppercase tracking-[0.18em]">
          <div className="col-span-3" />
          <div className="col-span-5 flex items-center gap-2.5 text-nst">
            <span className="grid place-items-center w-7 h-7 rounded-md bg-nst text-white text-xs font-bold shadow-glow">
              N
            </span>
            Real talk — at NST
          </div>
          <div className="col-span-4 text-black/40 flex items-center gap-2.5">
            <span className="grid place-items-center w-7 h-7 rounded-md bg-black/5 text-black/40 text-xs font-bold">
              ·
            </span>
            Brochure talk — typical engineering college
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-nst-line bg-white shadow-soft overflow-hidden">
          {comparisonRows.map((row, i) => (
            <div
              key={row.dimension}
              className={`md:grid md:grid-cols-12 md:gap-4 p-5 sm:p-6 transition hover:bg-nst-soft/40 ${
                i !== 0 ? "border-t border-nst-line" : ""
              }`}
            >
              <div className="md:col-span-3 flex items-start gap-3">
                <span className="hidden md:inline-flex w-7 h-7 rounded-lg bg-nst-soft text-nst grid place-items-center text-xs font-bold shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="font-semibold text-black tracking-tight text-[15px] leading-snug pt-1">
                  {row.dimension}
                </div>
              </div>
              <div className="mt-3 md:mt-0 md:col-span-5">
                <div className="md:hidden flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-nst mb-1.5">
                  <span className="grid place-items-center w-4 h-4 rounded bg-nst text-white text-[9px]">
                    N
                  </span>
                  Real talk
                </div>
                <div className="rounded-xl bg-gradient-to-br from-nst-soft to-white border border-nst/15 px-4 py-3.5 text-[14.5px] text-black leading-relaxed">
                  {row.nst}
                </div>
              </div>
              <div className="mt-3 md:mt-0 md:col-span-4">
                <div className="md:hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40 mb-1.5">
                  Brochure talk
                </div>
                <div className="rounded-xl bg-black/[0.02] border border-black/5 px-4 py-3.5 text-[14.5px] text-black/55 leading-relaxed italic">
                  {row.others}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-black/40 text-center max-w-2xl mx-auto leading-relaxed">
          The right column quotes phrasing common across Indian engineering
          college websites and brochures — generic enough that no specific
          institution is named. Make your own comparison with the colleges
          you're actually considering.
        </p>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-nst bg-nst/8 ring-1 ring-nst/15 px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-nst" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-black leading-[1.1]">
        {title}
      </h2>
      <p className="mt-4 text-black/65 leading-relaxed text-[15px] sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}
