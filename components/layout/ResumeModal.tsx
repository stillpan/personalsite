"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  education,
  workExperience,
  projectActivities,
  skills,
} from "@/data/resume";

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[150]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
        style={{ background: "rgba(8, 6, 2, 0.55)" }}
        onClick={onClose}
      />

      {/* Paper drawer — slides from top, centered panel */}
      <motion.div
        className="fixed top-0 z-[160] flex flex-col overflow-hidden"
        style={{
          height: "88vh",
          left: "50%",
          width: "min(672px, 92vw)",
          background: "#FAFAF8",
          backgroundImage: "repeating-linear-gradient(transparent 0px, transparent 31px, #EDEAE7 31px, #EDEAE7 32px)",
          backgroundPosition: "0 48px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }}
        initial={{ y: "-100%", x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        exit={{ y: "-100%", x: "-50%" }}
        transition={{ duration: 0.55, ease: "linear" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red margin line */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: "80px", width: "1px", background: "rgba(232, 39, 42, 0.35)" }}
        />

        {/* Header */}
        <div className="flex items-center justify-between shrink-0"
          style={{ padding: "18px 32px 14px 96px" }}>
          <div className="flex items-baseline gap-4">
            <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest text-[#0A0A0A]">
              YUKI ZHANG
            </span>
            <span className="font-[family-name:var(--font-space)] text-xs text-[#0A0A0A]/40 uppercase tracking-widest">
              — resume
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/pdfs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-space)] text-[10px] uppercase tracking-widest border border-[#0A0A0A]/30 px-4 py-1.5 hover:bg-[#0A0A0A] hover:text-[#F7F4EF] transition-colors text-[#0A0A0A]/70"
            >
              View PDF
            </a>
            <button
              onClick={onClose}
              className="font-[family-name:var(--font-space)] text-3xl leading-none text-[#0A0A0A]/75 hover:text-[#E8272A] transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable content — indented past margin line */}
        <div className="overflow-y-auto flex-1" style={{ padding: "24px 48px 40px 96px" }}>
          <div className="max-w-2xl space-y-8">

            {/* Education */}
            <section>
              <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/75 mb-3">
                EDUCATION
              </p>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-[family-name:var(--font-space)] font-semibold text-sm text-[#0A0A0A]">
                    {education.school}
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-xs text-[#333] mt-0.5">
                    {education.degree}
                  </p>
                </div>
                <p className="font-[family-name:var(--font-space)] text-xs text-[#333] shrink-0 ml-4">
                  {education.graduation}
                </p>
              </div>
            </section>

            {/* Work Experience */}
            <section>
              <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/75 mb-4">
                WORK EXPERIENCE
              </p>
              <div className="space-y-6">
                {workExperience.map((entry) => (
                  <div key={entry.org}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-[family-name:var(--font-space)] font-semibold text-sm text-[#0A0A0A]">
                          {entry.org}
                        </p>
                        <p className="font-[family-name:var(--font-space)] text-xs text-[#E8272A]">
                          {entry.role}
                        </p>
                      </div>
                      <p className="font-[family-name:var(--font-space)] text-xs text-[#333] shrink-0 ml-4">
                        {entry.period}
                      </p>
                    </div>
                    <ul className="space-y-1 mt-2">
                      {entry.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 text-xs text-[#0A0A0A]/85 leading-relaxed">
                          <span className="text-[#C8BFB0] shrink-0">·</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects & Activities */}
            <section>
              <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/75 mb-4">
                PROJECTS & ACTIVITIES
              </p>
              <div className="space-y-6">
                {projectActivities.map((entry) => (
                  <div key={entry.org}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-[family-name:var(--font-space)] font-semibold text-sm text-[#0A0A0A]">
                          {entry.org}
                        </p>
                        <p className="font-[family-name:var(--font-space)] text-xs text-[#E8272A]">
                          {entry.role}
                        </p>
                      </div>
                      <p className="font-[family-name:var(--font-space)] text-xs text-[#333] shrink-0 ml-4">
                        {entry.period}
                      </p>
                    </div>
                    <ul className="space-y-1 mt-2">
                      {entry.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 text-xs text-[#0A0A0A]/85 leading-relaxed">
                          <span className="text-[#C8BFB0] shrink-0">·</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="pb-4">
              <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/75 mb-3">
                SKILLS
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-[family-name:var(--font-space)] text-[10px] border border-[#DDD9D4] px-3 py-1 text-[#0A0A0A]/75"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

          </div>
        </div>
      </motion.div>
    </>,
    document.body
  );
}
