"use client";

import { useState } from "react";
import ResumeModal from "@/components/layout/ResumeModal";

export default function YukiButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#0A0A0A] hover:text-[#E8272A] transition-colors"
      >
        YUKI
      </button>

      {open && <ResumeModal onClose={() => setOpen(false)} />}
    </>
  );
}
