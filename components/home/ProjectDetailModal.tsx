"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, projects } from "@/data/projects";
import { CardOrigin } from "./BuildSheet";

interface Props {
  project: Project;
  origin: CardOrigin;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, origin, onClose }: Props) {
  const startIndex = projects.findIndex((p) => p.slug === project.slug);
  const [index, setIndex] = useState(startIndex === -1 ? 0 : startIndex);
  const [direction, setDirection] = useState(0);
  const current = projects[index];

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  };
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % projects.length);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[170] overflow-hidden flex flex-col"
      style={{ background: "rgba(10, 6, 2, 0.50)", transformOrigin: `${origin.x * 100}% ${origin.y * 100}%` }}
      initial={{ scale: 0.08, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0.2, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Scrollable area with flanking arrows ── */}
      <div className="overflow-y-auto flex-1">
        <div className="py-8 flex items-start gap-4 mx-auto px-4" style={{ maxWidth: "72rem" }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* Left arrow */}
          <div className="sticky top-8 shrink-0 flex items-center justify-center w-32 pt-24">
            <button
              onClick={prev}
              className="transition-all hover:scale-110 group"
              aria-label="Previous project"
            >
              <svg width="48" height="64" viewBox="0 0 48 64" fill="none">
                <polyline points="36,8 12,32 36,56" stroke="rgba(255,255,255,0.75)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:stroke-[#E8272A] transition-colors" />
              </svg>
            </button>
          </div>

          {/* Card with swipe animation */}
          <div className="flex-1 overflow-hidden">
            {/* × close above card, right-aligned */}
            <div className="flex justify-end pb-2">
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="font-[family-name:var(--font-space)] text-4xl leading-none transition-colors"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#E8272A")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                aria-label="Close"
              >×</button>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={{ x: direction * 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -200, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative overflow-hidden"
                style={{
                  background: "#FAFAF8",
                  backgroundImage: "repeating-linear-gradient(transparent 0px, transparent 31px, #EDEAE7 31px, #EDEAE7 32px)",
                  backgroundPosition: "0 48px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                }}
              >
                {/* Red margin line */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{ left: "80px", width: "1px", background: "rgba(232, 39, 42, 0.35)" }}
                />

                {/* Content indented past the margin */}
                <div style={{ padding: "36px 48px 40px 96px" }}>
                  {/* Title block */}
                  <p
                    className="font-[family-name:var(--font-space)] text-xs uppercase tracking-widest mb-1"
                    style={{ color: "#E8272A", opacity: 0.85 }}
                  >
                    {current.org}
                  </p>
                  <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-[#0A0A0A] leading-tight mb-2">
                    {current.title}
                  </h1>
                  <p className="font-[family-name:var(--font-space)] text-sm text-[#0A0A0A]/70 mb-6">
                    {current.period} · {current.tag}
                  </p>

                  <div className="w-full h-px mb-8" style={{ background: "#D8D2C8" }} />

                  <p className="font-[family-name:var(--font-space)] text-base text-[#0A0A0A]/80 leading-relaxed mb-10">
                    {current.summary}
                  </p>

                  {current.context && <Section label="CONTEXT" body={current.context} />}
                  {current.problem && <Section label="THE PROBLEM" body={current.problem} />}
                  {current.role && <Section label="MY ROLE" body={current.role} />}

                  {current.designProcess && current.designProcess.length > 0 && (
                    <div className="mb-10">
                      <SectionLabel>DESIGN PROCESS</SectionLabel>
                      <div className="space-y-6 mt-4">
                        {current.designProcess.map((phase, i) => (
                          <div key={i} className="flex gap-5">
                            <span
                              className="font-[family-name:var(--font-bebas)] text-base tracking-widest shrink-0 mt-0.5"
                              style={{ color: "#E8272A", opacity: 0.5 }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <p className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-[#0A0A0A] mb-1">
                                {phase.title}
                              </p>
                              <p className="font-[family-name:var(--font-space)] text-sm text-[#0A0A0A]/70 leading-relaxed">
                                {phase.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {current.finalDesign && current.finalDesign.length > 0 && (
                    <div className="mb-10">
                      <SectionLabel>FINAL DESIGN</SectionLabel>
                      <ul className="space-y-3 mt-4">
                        {current.finalDesign.map((point, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-[#C8BFB0] shrink-0 mt-0.5">·</span>
                            <p className="font-[family-name:var(--font-space)] text-sm text-[#0A0A0A]/75 leading-relaxed">
                              {point}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {current.results && current.results.length > 0 && (
                    <div className="mb-10">
                      <SectionLabel>RESULTS</SectionLabel>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {current.results.map((r, i) => (
                          <div key={i} className="p-4" style={{ border: "1px solid #D8D2C8" }}>
                            <p className="font-[family-name:var(--font-bebas)] text-3xl text-[#0A0A0A] leading-none mb-2">
                              {r.metric}
                            </p>
                            <p className="font-[family-name:var(--font-space)] text-sm text-[#0A0A0A]/70 leading-relaxed">
                              {r.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {current.nextSteps && current.nextSteps.length > 0 && (
                    <div className="mb-10">
                      <SectionLabel>NEXT STEPS</SectionLabel>
                      <ul className="space-y-2.5 mt-4">
                        {current.nextSteps.map((s, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-[#C8BFB0] shrink-0">·</span>
                            <p className="font-[family-name:var(--font-space)] text-sm text-[#0A0A0A]/70 leading-relaxed">
                              {s}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {current.portfolioPdf && (
                    <a
                      href={current.portfolioPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-[family-name:var(--font-space)] text-sm uppercase tracking-widest px-5 py-3 transition-colors"
                      style={{ border: "1px solid #0A0A0A", color: "#0A0A0A" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#0A0A0A";
                        (e.currentTarget as HTMLElement).style.color = "#F7F4EF";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
                      }}
                    >
                      View Full Portfolio PDF →
                    </a>
                  )}

                  {!current.context && !current.problem && !current.designProcess && (
                    <div className="py-10 text-center" style={{ borderTop: "1px solid #D8D2C8" }}>
                      <p className="font-[family-name:var(--font-space)] text-base text-[#0A0A0A]/40 italic">
                        — detailed write-up coming soon
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <div className="sticky top-8 shrink-0 flex items-center justify-center w-32 pt-24">
            <button
              onClick={next}
              className="transition-all hover:scale-110 group"
              aria-label="Next project"
            >
              <svg width="48" height="64" viewBox="0 0 48 64" fill="none">
                <polyline points="12,8 36,32 12,56" stroke="rgba(255,255,255,0.75)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:stroke-[#E8272A] transition-colors" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-bebas)] text-base tracking-widest text-[#0A0A0A]/55 mb-0">
      {children}
    </p>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="mb-10">
      <SectionLabel>{label}</SectionLabel>
      <p className="font-[family-name:var(--font-space)] text-base text-[#0A0A0A]/75 leading-relaxed mt-3">
        {body}
      </p>
    </div>
  );
}
