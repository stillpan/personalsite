"use client";

import { useState } from "react";
import PhotoButton from "@/components/home/PhotoButton";
import AboutModal from "@/components/home/AboutModal";
import Sketchbook from "@/components/home/Sketchbook";
import YukiButton from "@/components/layout/YukiButton";
import WorkDrawer from "@/components/home/WorkDrawer";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  return (
    <>
      {/* ─── Section 1: Studio / Listening Room ──────────────────────────── */}
      <section
        id="studio"
        className="min-h-[140vh]"
        style={{ background: "#F7F4EF" }}
      >
        <div className="pt-5 flex justify-center">
          <YukiButton />
        </div>

        <div className="h-[calc(100vh-3rem)] flex items-center justify-center relative">
          <PhotoButton onClick={() => setAboutOpen(true)} />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none select-none">
            <span className="font-[family-name:var(--font-space)] text-xs uppercase tracking-widest text-[#3D3530]">
              scroll
            </span>
            <div className="w-px h-10 bg-[#3D3530]" />
          </div>
        </div>
      </section>

      {/* ─── Section 2: Garage / Workshop ────────────────────────────────── */}
      <section
        id="garage"
        className="min-h-[200vh] relative"
        style={{ backgroundColor: "#F7F4EF" }}
      >
        {/* Full image — no cropping, right padding balances internal left space in image */}
        <div className="relative w-full" style={{ paddingRight: "4%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/backgrounds/workbench.png"
            alt=""
            className="w-full h-auto block"
          />

          {/* Button overlaid at center of image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Radial beige glow — makes it look like the center of the workbench is burned out */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "36rem",
                height: "24rem",
                background: "radial-gradient(ellipse at center, #F7F4EF 25%, rgba(247,244,239,0.6) 50%, transparent 72%)",
              }}
            />
            <p className="relative font-[family-name:var(--font-space)] text-[9px] uppercase tracking-[0.25em] text-[#0A0A0A]/60">
              what i build
            </p>
            <button
              onClick={() => setWorkOpen(true)}
              className="relative font-[family-name:var(--font-bebas)] text-lg tracking-widest text-[#0A0A0A] px-8 py-2 hover:opacity-80 transition-opacity duration-200"
              style={{
                backgroundImage: "url('/images/backgrounds/metal.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              WORK
            </button>
          </div>
        </div>

        {/* Beige scroll space below the image */}

        {/* Gradient at very bottom — transitions into patio warm brown */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[18%] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #F7F4EF)" }}
        />
      </section>

      {/* ─── Section 3: Patio / Outside Space ────────────────────────────── */}
      <section
        id="patio"
        className="min-h-[220vh]"
        style={{
          background: "#F7F4EF",
        }}
      >
        <div className="h-[20vh]" />

        <div className="h-screen flex flex-col items-center justify-center gap-6">
          <p className="font-[family-name:var(--font-space)] text-[9px] uppercase tracking-[0.25em] text-[#0A0A0A]/40">
            what inspires me
          </p>

          <Sketchbook />
        </div>
      </section>

      {/* ─── Section 4: Beach / Ending ───────────────────────────────────── */}
      <section id="beach">
        {/* Thin sand strip — transition from patio */}
        <div className="h-8" style={{ background: "#F8E8CA" }} />

        {/* Beach image with text overlaid on top half */}
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/backgrounds/beach.png"
            alt=""
            className="w-full h-auto block"
          />
          <a
            href="https://www.youtube.com/watch?v=1zcIUk66HX4"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-[2%] left-0 right-0 flex justify-center font-[family-name:var(--font-bebas)] text-2xl tracking-widest hover:opacity-70 transition-opacity duration-200"
            style={{ color: "#4A90B8" }}
          >
            go for a swim
          </a>

          <div className="absolute top-0 left-0 right-0 flex justify-center pt-12">
            <div className="max-w-sm w-full space-y-10 px-6">
              <div>
                <p className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#6B5B4E] mb-2">
                  CURRENTLY READING
                </p>
                <p className="font-[family-name:var(--font-space)] text-base text-[#3D3530]/45 italic">
                  — coming soon
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#6B5B4E] mb-2">
                  LISTENING TO
                </p>
                <p className="font-[family-name:var(--font-space)] text-base text-[#3D3530]/45 italic">
                  — coming soon
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#6B5B4E] mb-2">
                  WORTH YOUR TIME
                </p>
                <p className="font-[family-name:var(--font-space)] text-base text-[#3D3530]/45 italic">
                  — coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-32 bg-white" />
      </section>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {workOpen && <WorkDrawer onClose={() => setWorkOpen(false)} />}
    </>
  );
}
