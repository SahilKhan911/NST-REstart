"use client";

import { useState } from "react";
import { faqItems } from "@/lib/comparison";
import { SectionHeader } from "./CurriculumComparison";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="The questions everyone asks first"
          subtitle="Quick answers to what comes up in nearly every counselling conversation. Anything missing? Drop it into the chat below — a current student will reply."
        />
        <div className="mt-10 divide-y divide-nst-line rounded-3xl border border-nst-line bg-white shadow-soft overflow-hidden">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-nst-soft/50 transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-black pr-4 text-[15.5px] leading-snug tracking-tight">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 mt-0.5 grid place-items-center w-7 h-7 rounded-full border border-nst-line text-nst transition-transform ${
                      isOpen ? "rotate-45 bg-nst text-white border-nst" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-6 text-black/65 leading-relaxed text-[15px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
