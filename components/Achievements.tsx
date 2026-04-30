import {
  achievementCards,
  facultyMembers,
  internshipCompanies,
  internshipStats,
} from "@/lib/comparison";
import { SectionHeader } from "./CurriculumComparison";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-white via-nst-soft/60 to-white"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Outcomes"
          title="The receipts: what NST students actually shipped"
          subtitle="National hackathon wins, ICPC regional finals, GSoC selections, Linux Foundation mentorships — verified outcomes from the current cohort, not glossy claims."
        />

        {/* Achievement cards */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementCards.map((card) => (
            <article
              key={card.title}
              className="group rounded-2xl bg-white border border-nst-line shadow-soft p-6 hover:border-nst/40 hover:shadow-glow transition relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-nst/5 group-hover:bg-nst/10 transition"
              />
              <div className="relative">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-nst">
                  {card.tag}
                </div>
                <h3 className="mt-3 text-lg font-bold text-black tracking-tight leading-snug">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm text-black/60 leading-relaxed">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Internship strip */}
        <div className="mt-16 rounded-3xl bg-black text-white overflow-hidden relative">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,133,255,0.6), transparent 70%)",
            }}
          />
          <div className="relative p-8 sm:p-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-nst-blueLight bg-nst/15 ring-1 ring-nst/30 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-nst-blueLight" />
                  Paid internships by our students
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight max-w-xl leading-tight">
                  93%+ placement rate, certified by IIM Ahmedabad's auditors.
                </h3>
              </div>
              <p className="text-xs text-white/40 max-w-xs leading-relaxed">
                Independently audited by B2K Analytics. Stipend figures cover
                the current internship cycle across the active cohort.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {internshipStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-nst-blueLight tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-xs sm:text-[13px] text-white/60 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/50 mb-5">
                Hiring partners — current cohort
              </div>
              <div className="flex flex-wrap gap-2">
                {internshipCompanies.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 text-white text-sm px-3.5 py-1.5 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-nst-blueLight" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Faculty */}
        <div className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-nst bg-nst/8 ring-1 ring-nst/15 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-nst" />
                Industry faculty
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-black">
                Taught by people who built the systems you'll use.
              </h3>
            </div>
            <p className="text-sm text-black/55 max-w-sm leading-relaxed">
              Plus weekly masterclasses with CTOs, VPs of Engineering, and ICPC
              World Finalists.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {facultyMembers.map((f) => (
              <div
                key={f.name}
                className="rounded-2xl bg-white border border-nst-line p-5 hover:border-nst/40 transition shadow-soft"
              >
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-nst-soft text-nst font-bold text-sm mb-3">
                  {f.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="font-semibold text-black text-[15px] tracking-tight leading-snug">
                  {f.name}
                </div>
                <div className="text-xs text-black/55 mt-1 leading-relaxed">
                  {f.role}
                </div>
                <div className="text-xs font-semibold text-nst mt-1.5">
                  {f.org}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
