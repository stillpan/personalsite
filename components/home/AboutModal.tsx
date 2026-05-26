"use client";

import { useEffect } from "react";
export default function AboutModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 bg-[#F7F4EF] border-2 border-[#0A0A0A] max-w-sm w-full mx-6 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner label */}
        <span className="absolute top-4 left-5 font-[family-name:var(--font-bebas)] text-xs tracking-widest text-[#0A0A0A]/30">
          ABOUT
        </span>

        <button
          onClick={onClose}
          className="absolute top-3 right-5 font-[family-name:var(--font-space)] text-xl text-[#0A0A0A]/40 hover:text-[#E8272A] transition-colors leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <p className="font-[family-name:var(--font-space)] text-[#0A0A0A]/80 leading-relaxed text-sm mt-4 mb-8">
          I&apos;m endlessly curious and inspired by the world around me — the
          ideas, places, people, and experiences that shape how we think and
          create. Drawn to the space where engineering meets creativity, I love
          building things that feel thoughtful, meaningful, and rooted in life
          itself.
        </p>

        <p className="font-[family-name:var(--font-space)] text-[#0A0A0A]/80 leading-relaxed text-sm mb-8">
          Take a scroll through my world — see what I&apos;m building, sketching,
          listening to, watching, and currently obsessed with.
        </p>

      </div>
    </div>
  );
}
