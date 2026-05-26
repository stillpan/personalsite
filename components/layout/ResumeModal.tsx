"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-[#F7F4EF] border-2 border-[#0A0A0A] w-full max-w-2xl mx-6 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[#D8D2C8] shrink-0">
          <span className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#0A0A0A]">
            RESUME
          </span>
          <div className="flex items-center gap-4">
            <a
              href="/pdfs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-space)] text-[10px] uppercase tracking-widest border border-[#0A0A0A] px-4 py-2 hover:bg-[#0A0A0A] hover:text-[#F7F4EF] transition-colors"
            >
              View PDF
            </a>
            <button
              onClick={onClose}
              className="font-[family-name:var(--font-space)] text-xl text-[#0A0A0A]/40 hover:text-[#E8272A] transition-colors leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-8 py-6 space-y-8">

          {/* Education */}
          <section>
            <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/40 mb-3">
              EDUCATION
            </p>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-[family-name:var(--font-space)] font-semibold text-sm text-[#0A0A0A]">
                  {education.school}
                </p>
                <p className="font-[family-name:var(--font-space)] text-xs text-[#555] mt-0.5">
                  {education.degree}
                </p>
              </div>
              <p className="font-[family-name:var(--font-space)] text-xs text-[#555] shrink-0 ml-4">
                {education.graduation}
              </p>
            </div>
          </section>

          {/* Work Experience */}
          <section>
            <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/40 mb-4">
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
                    <p className="font-[family-name:var(--font-space)] text-xs text-[#555] shrink-0 ml-4">
                      {entry.period}
                    </p>
                  </div>
                  <ul className="space-y-1 mt-2">
                    {entry.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-[#0A0A0A]/70 leading-relaxed">
                        <span className="text-[#D8D2C8] shrink-0">·</span>
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
            <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/40 mb-4">
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
                    <p className="font-[family-name:var(--font-space)] text-xs text-[#555] shrink-0 ml-4">
                      {entry.period}
                    </p>
                  </div>
                  <ul className="space-y-1 mt-2">
                    {entry.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-[#0A0A0A]/70 leading-relaxed">
                        <span className="text-[#D8D2C8] shrink-0">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="pb-2">
            <p className="font-[family-name:var(--font-bebas)] text-[10px] tracking-widest text-[#0A0A0A]/40 mb-3">
              SKILLS
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-[family-name:var(--font-space)] text-[10px] border border-[#D8D2C8] px-3 py-1 text-[#0A0A0A]/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>,
    document.body
  );
}
