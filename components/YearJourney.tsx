"use client";

import { useState } from "react";
import { yearPlans } from "@/lib/comparison";
import { SectionHeader } from "./CurriculumComparison";

export default function YearJourney() {
  const [active, setActive] = useState(0);
  const plan = yearPlans[active];

  return (
    <section id="journey" className="relative py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Course Roadmap"
          title="The 4-year journey: Build → Innovate → Achieve → Succeed"
          subtitle="Each year of the B.Tech CSE (AI & ML) program at NST Pune compounds on the last — from your first project to a paid internship to a fully-funded startup or a Master's pathway."
        />

        {/* Year tabs */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {yearPlans.map((y, i) => {
            const isActive = i === active;
            return (
              <button
                key={y.year}
                onClick={() => setActive(i)}
                className={`text-left rounded-2xl border p-4 sm:p-5 transition relative overflow-hidden ${
                  isActive
                    ? "bg-nst border-nst text-white shadow-glow"
                    : "bg-white border-nst-line hover:border-nst/40 text-black"
                }`}
              >
                <div
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "text-white/80" : "text-nst"
                  }`}
                >
                  Year {y.year}
                </div>
                <div className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight">
                  {y.title}
                </div>
                <div
                  className={`mt-2 text-xs leading-snug line-clamp-2 ${
                    isActive ? "text-white/80" : "text-black/55"
                  }`}
                >
                  {y.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Plan body */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-nst-soft to-white border border-nst-line shadow-soft overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-nst-line">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-nst">
                  Year {plan.year} · {plan.title}
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-bold text-black tracking-tight max-w-2xl">
                  {plan.tagline}
                </div>
              </div>
              <span className="inline-flex items-center gap-2 bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-nst-blueLight" />
                Career outcome
              </span>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-8">
              {/* What you learn */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-black/70">
                  What you'll learn
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {plan.learn.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[15px] text-black/85"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nst shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-black/70">
                  Projects you'll ship
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {plan.projects.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-[15px] text-black/85"
                    >
                      <CheckIcon />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beyond classroom */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-black/70">
                  Beyond the classroom
                </h4>
                <ul className="mt-4 space-y-3">
                  {plan.beyond.map((b) => (
                    <li
                      key={b.title}
                      className="rounded-xl bg-white border border-nst-line p-3.5"
                    >
                      <div className="text-sm font-semibold text-black">
                        {b.title}
                      </div>
                      <div className="text-xs text-black/60 mt-1 leading-relaxed">
                        {b.body}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Outcome ribbon */}
            <div className="mt-8 rounded-2xl bg-black text-white p-5 sm:p-6 flex items-start gap-4">
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-nst shrink-0">
                <TrophyIcon />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-nst-blueLight">
                  Career outcome
                </div>
                <div className="mt-1 text-base sm:text-lg font-medium text-white leading-snug">
                  {plan.outcome}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-1 w-4 h-4 shrink-0 text-nst"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l3.5 3.5L16 6" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      className="w-5 h-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 5h3a2 2 0 0 1 0 4h-3M7 5H4a2 2 0 0 0 0 4h3" />
    </svg>
  );
}
