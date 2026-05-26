"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

const categoryThumbnail: Record<string, string> = {
  "electrical-engineering":
    "linear-gradient(135deg, #1C1A14 0%, #2E2A1E 50%, #141208 100%)",
  "product-design":
    "linear-gradient(135deg, #2A1C0E 0%, #3D2A14 50%, #1C1008 100%)",
  artworks:
    "linear-gradient(135deg, #0E1620 0%, #182435 50%, #080E16 100%)",
};

const categoryLabel: Record<string, string> = {
  "electrical-engineering": "Electrical Engineering",
  "product-design": "Product Design",
  artworks: "Artworks",
};

export interface CardOrigin {
  x: number; // fraction 0-1 of viewport width
  y: number; // fraction 0-1 of drawer height
}

interface BuildSheetProps {
  project: Project;
  index: number;
  onSelect: (project: Project, origin: CardOrigin) => void;
}

// Drawer top is at 12vh (since height is 88vh)
const DRAWER_TOP_FRACTION = 0.12;

export default function BuildSheet({ project, index, onSelect }: BuildSheetProps) {
  const num = String(index + 1).padStart(2, "0");

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const drawerTop = window.innerHeight * DRAWER_TOP_FRACTION;
    const drawerHeight = window.innerHeight * (1 - DRAWER_TOP_FRACTION);
    const origin: CardOrigin = {
      x: cardCenterX / window.innerWidth,
      y: (cardCenterY - drawerTop) / drawerHeight,
    };
    onSelect(project, origin);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15 + index * 0.055,
        duration: 0.38,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="flex flex-col cursor-pointer group overflow-hidden rounded"
      style={{ background: "#EEEAE4", border: "1px solid #C8BFB0" }}
      onClick={handleClick}
    >
      {/* Thumbnail placeholder — swap background-image for a real photo later */}
      <div
        className="w-full h-28 flex items-end px-3 pb-2 shrink-0"
        style={{ background: categoryThumbnail[project.category] }}
      >
        <span className="font-[family-name:var(--font-bebas)] text-[9px] tracking-widest text-white/25 uppercase">
          {categoryLabel[project.category]}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-bebas)] text-xs tracking-widest text-[#0A0A0A]/30">
            {num}
          </span>
          <span className="font-[family-name:var(--font-space)] text-[9px] uppercase tracking-widest text-[#E8272A]/70">
            {project.tag.split(" · ")[0]}
          </span>
        </div>

        <p className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-[#0A0A0A] leading-tight">
          {project.title}
        </p>

        <p className="font-[family-name:var(--font-space)] text-xs text-[#0A0A0A]/60 leading-relaxed flex-1">
          {project.summary}
        </p>

        <div
          className="flex items-center justify-between mt-2 pt-2"
          style={{ borderTop: "1px solid #D8D2C8" }}
        >
          <span className="font-[family-name:var(--font-space)] text-[9px] text-[#0A0A0A]/40">
            {project.period}
          </span>
          <span className="font-[family-name:var(--font-bebas)] text-xs tracking-widest text-[#0A0A0A]/45 group-hover:text-[#E8272A] transition-colors">
            OPEN →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
