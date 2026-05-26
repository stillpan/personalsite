"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

const comingSoonLinks = ["DJing", "Cars", "Travel", "Surfing"];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#D9D0C4] bg-[#FAF7F2]/90 backdrop-blur-sm">
      <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-playfair)] text-lg font-semibold tracking-tight text-[#1a1a1a] hover:text-[#8B5E3C] transition-colors"
        >
          Yuki Zhang
        </Link>

        <div className="flex items-center gap-6">
          {primaryLinks.map(({ href, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  active
                    ? "text-[#8B5E3C] font-medium"
                    : "text-[#1a1a1a] hover:text-[#8B5E3C]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <span className="h-4 w-px bg-[#D9D0C4]" />

          {comingSoonLinks.map((label) => (
            <span
              key={label}
              className="text-sm text-[#6b6b6b]/50 cursor-default select-none"
              title="Coming soon"
            >
              {label}
            </span>
          ))}
        </div>
      </nav>
    </header>
  );
}
