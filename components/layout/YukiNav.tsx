"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { id: "studio", label: "STUDIO" },
  { id: "garage", label: "GARAGE" },
  { id: "patio", label: "PATIO" },
  { id: "beach", label: "BEACH" },
];

const pages = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/resume", label: "RESUME" },
];

export default function YukiNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div ref={ref} className="flex flex-col items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#0A0A0A] hover:text-[#E8272A] transition-colors"
      >
        YUKI
      </button>

      {open && (
        <div className="absolute top-full mt-3 flex flex-col items-center gap-1 bg-[#F7F4EF]/95 backdrop-blur-sm border border-[#D8D2C8] px-10 py-5">
          {sections.map(({ id, label }) =>
            isHome ? (
              // On home page — smooth scroll to section
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-[family-name:var(--font-bebas)] text-lg tracking-widest text-[#0A0A0A] hover:text-[#E8272A] transition-colors"
              >
                {label}
              </button>
            ) : (
              // On sub-pages — navigate home to that section anchor
              <Link
                key={id}
                href={`/#${id}`}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-bebas)] text-lg tracking-widest text-[#0A0A0A] hover:text-[#E8272A] transition-colors"
              >
                {label}
              </Link>
            )
          )}

          <div className="w-full h-px bg-[#D8D2C8] my-2" />

          {pages.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-bebas)] text-lg tracking-widest text-[#0A0A0A]/50 hover:text-[#E8272A] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
