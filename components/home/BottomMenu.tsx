"use client";

import { useState } from "react";
import Link from "next/link";

const pages = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/resume", label: "RESUME" },
];

export default function BottomMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4">
      {/* Nav items */}
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {pages.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest text-[#0A0A0A] hover:text-[#E8272A] transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="w-8 h-8 border border-[#0A0A0A]/30 hover:border-[#E8272A] hover:text-[#E8272A] flex items-center justify-center transition-all duration-200 font-[family-name:var(--font-space)] text-sm"
      >
        {open ? "×" : "+"}
      </button>
    </div>
  );
}
