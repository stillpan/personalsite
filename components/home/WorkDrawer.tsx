"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import BuildSheet, { CardOrigin } from "./BuildSheet";
import ProjectDetailModal from "./ProjectDetailModal";

interface Selected {
  project: Project;
  origin: CardOrigin;
}

export default function WorkDrawer({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<Selected | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selected) setSelected(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, selected]);

  return createPortal(
    <>
      {/* Visual backdrop — dark overlay, pointer-events-none (purely visual) */}
      <motion.div
        className="fixed inset-0 z-[149] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
        style={{ background: "rgba(8, 6, 2, 0.72)" }}
      />

      {/* Top close zone — the ~12vh above the drawer */}
      <div
        className="fixed top-0 left-0 right-0 z-[150] cursor-pointer"
        style={{ height: "12vh" }}
        onClick={onClose}
      />

      {/* Side close strips — outer 5vw on each side, sit above the drawer */}
      <div
        className="fixed bottom-0 left-0 z-[162] cursor-pointer"
        style={{ width: "5vw", height: "88vh" }}
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 right-0 z-[162] cursor-pointer"
        style={{ width: "5vw", height: "88vh" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[160] flex flex-col overflow-hidden"
        style={{
          height: "88vh",
          backgroundImage: "url('/images/backgrounds/metal.png')",
          backgroundSize: "cover",
          backgroundPosition: "center -270px",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.55, ease: "linear" }}
      >
        {/* Centered content wrapper */}
        <div className="max-w-4xl w-full mx-auto flex flex-col flex-1 min-h-0">
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 shrink-0"
            style={{ paddingTop: "2.75rem", paddingBottom: "1.25rem" }}
          >
            <div className="flex items-center gap-4">
              <span
                className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest"
                style={{ color: "rgba(20,15,10,0.85)" }}
              >
                BUILD ARCHIVE
              </span>
              <span
                className="font-[family-name:var(--font-space)] text-sm"
                style={{ color: "rgba(20,15,10,0.5)" }}
              >
                — {projects.length} projects
              </span>
            </div>

            <button
              onClick={onClose}
              className="font-[family-name:var(--font-space)] text-5xl leading-none transition-colors pb-1"
              style={{ color: "rgba(20,15,10,0.7)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#E8272A")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(20,15,10,0.7)")}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Scrollable build sheets */}
          <div className="overflow-y-auto px-6 py-8 flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <BuildSheet
                  key={project.slug}
                  project={project}
                  index={i}
                  onSelect={(p, origin) => setSelected({ project: p, origin })}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail modal — outside the drawer's stacking context */}
      {selected && (
        <ProjectDetailModal
          project={selected.project}
          origin={selected.origin}
          onClose={() => setSelected(null)}
        />
      )}
    </>,
    document.body
  );
}
