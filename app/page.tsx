"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PhotoButton from "@/components/home/PhotoButton";
import Sketchbook from "@/components/home/Sketchbook";
import YukiButton from "@/components/layout/YukiButton";
import WorkDrawer from "@/components/home/WorkDrawer";

// Sentence 1 — top semicircle
const PARA1 = "I'm endlessly curious and inspired by the world around me — the ideas, places, people, and experiences that shape how we think and create.";
// Sentence 2 — bottom semicircle (mirrored, readable)
const PARA2 = "Drawn to the space where engineering meets creativity, I love building things that feel thoughtful, meaningful, and rooted in life itself.";
// Sentence 3 — static paragraph below vinyl
const PARA3 = "Take a scroll through my world — see what I'm building, sketching, listening to, watching, and currently obsessed with.";

// Both semicircles share the same radius so they mirror each other perfectly.
// Top arc: clockwise (sweep=1), short arc → goes through 12 o'clock.
// Bottom arc: counter-clockwise (sweep=0), short arc → goes through 6 o'clock.
// textAnchor="middle" + startOffset="50%" centers text at the peak of each arc.
const R_TOP = 348;
const R_BOT = 352;
const CX = 450;
const CY = 450;
const topArcPath    = `M ${CX - R_TOP},${CY} A ${R_TOP},${R_TOP} 0 0 1 ${CX + R_TOP},${CY}`;
const bottomArcPath = `M ${CX - R_BOT},${CY} A ${R_BOT},${R_BOT} 0 0 0 ${CX + R_BOT},${CY}`;

export default function Home() {
  const [workOpen, setWorkOpen] = useState(false);
  const [typed1, setTyped1] = useState(0);
  const [typed2, setTyped2] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const typing1Ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const typing2Ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const retractRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // 0 = idle, 1 = typing, 2 = spinning (done), 3 = retracting
  const phaseRef = useRef<0 | 1 | 2 | 3>(0);
  const pendingRetractRef = useRef(false);

  const startRetraction = useCallback(() => {
    setIsSpinning(false);
    phaseRef.current = 3;
    const total = Math.max(PARA1.length, PARA2.length);
    let tick = 0;
    const id = setInterval(() => {
      tick++;
      setTyped1(Math.max(0, PARA1.length - tick));
      setTyped2(Math.max(0, PARA2.length - tick));
      if (tick >= total) {
        clearInterval(id);
        retractRef.current = null;
        phaseRef.current = 0;
      }
    }, 10);
    retractRef.current = id;
  }, []);

  const handleVinylClick = useCallback(() => {
    // Spinning (done) → queue retract; fire after the current rotation completes
    if (phaseRef.current === 2) {
      pendingRetractRef.current = true;
      return;
    }

    if (phaseRef.current !== 0) return;

    phaseRef.current = 1;

    // Drive typed1 with a local counter — NO side effects inside state updaters
    let t1 = 0;
    const id1 = setInterval(() => {
      t1++;
      setTyped1(t1);
      if (t1 >= PARA1.length) {
        clearInterval(id1);
        typing1Ref.current = null;
        // Top arc finished — wait, then start bottom arc
        setTimeout(() => {
          if (phaseRef.current !== 1) return;
          let t2 = 0;
          const id2 = setInterval(() => {
            t2++;
            setTyped2(t2);
            if (t2 >= PARA2.length) {
              clearInterval(id2);
              typing2Ref.current = null;
              phaseRef.current = 2;
              setIsSpinning(true);
            }
          }, 38);
          typing2Ref.current = id2;
        }, 400);
      }
    }, 24);
    typing1Ref.current = id1;
  }, [startRetraction]);

  const handleAnimationIteration = useCallback(() => {
    if (pendingRetractRef.current) {
      pendingRetractRef.current = false;
      startRetraction();
    }
  }, [startRetraction]);

  const para1Visible = PARA1.slice(0, typed1);
  const para2Visible = PARA2.slice(0, typed2);

  return (
    <>
      <style>{`
        @keyframes vinyl-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      {/* ─── Section 1: Studio / Listening Room ──────────────────────────── */}
      <section
        id="studio"
        className="min-h-[175vh]"
        style={{ background: "#F7F4EF" }}
      >
        <div className="pt-5 flex justify-center">
          <YukiButton />
        </div>

        {/* Vinyl + text arcs, then PARA3 paragraph, stacked in a flex column */}
        <div className="flex justify-center" style={{ paddingTop: "calc(30vh - 20px)" }}>
          <div className="flex flex-col items-center">

            {/* Vinyl image with SVG arcs anchored to it */}
            <div className="relative">
              <PhotoButton onClick={handleVinylClick} />

              {/* Click prompt — disappears once typing starts */}
              {typed1 === 0 && (
                <p
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-space)] text-[10px] uppercase tracking-widest pointer-events-none"
                  style={{ color: "rgba(10,10,10,0.2)" }}
                >
                  click to read more
                </p>
              )}

              {/* SVG arcs — centered on the vinyl image */}
              {(typed1 > 0 || typed2 > 0) && (
                <svg
                  width="900"
                  height="900"
                  viewBox="0 0 900 900"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    overflow: "visible",
                    ...(isSpinning && {
                      animation: "vinyl-orbit 10s linear infinite",
                      transformOrigin: "50% 50%",
                    }),
                  }}
                  onAnimationIteration={handleAnimationIteration}
                >
                  <defs>
                    <path id="top-arc" d={topArcPath} />
                    <path id="bottom-arc" d={bottomArcPath} />
                  </defs>

                  {/* Top arc — types left-to-right; invisible remainder holds position */}
                  {typed1 > 0 && (
                    <text
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "14.5px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      <textPath href="#top-arc" startOffset="50%">
                        <tspan fill="rgba(24, 48, 112, 0.84)">{para1Visible}</tspan>
                        <tspan style={{ visibility: "hidden" }}>{PARA1.slice(typed1)}</tspan>
                      </textPath>
                    </text>
                  )}

                  {/* Bottom arc — types left-to-right; invisible remainder holds position */}
                  {typed2 > 0 && (
                    <text
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "14.5px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      <textPath href="#bottom-arc" startOffset="50%">
                        <tspan fill="rgba(24, 48, 112, 0.72)">{para2Visible}</tspan>
                        <tspan style={{ visibility: "hidden" }}>{PARA2.slice(typed2)}</tspan>
                      </textPath>
                    </text>
                  )}
                </svg>
              )}
            </div>

            {/* PARA3 — static paragraph + scroll line, replaces old scroll indicator */}
            <div
              className="flex flex-col items-center gap-4 text-center"
              style={{ marginTop: "280px" }}
            >
              <p
                className="font-[family-name:var(--font-space)] text-[14.5px] leading-relaxed max-w-[320px]"
                style={{ color: "rgba(10,10,10,0.45)" }}
              >
                {PARA3}
              </p>
              <div className="w-px h-14 opacity-30" style={{ background: "#3D3530" }} />
            </div>

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
            {/* Radial beige glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "36rem",
                height: "24rem",
                background:
                  "radial-gradient(ellipse at center, #F7F4EF 25%, rgba(247,244,239,0.6) 50%, transparent 72%)",
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
        style={{ background: "#F7F4EF" }}
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
          {/* SVG displacement filter — creates animated water ripple on the image */}
          <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
            <defs>
              <filter id="beach-ripple" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.012 0.008"
                  numOctaves="3"
                  seed="2"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="12s"
                    values="0.012 0.008;0.008 0.014;0.014 0.009;0.012 0.008"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="6"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/backgrounds/beach.png"
            alt=""
            className="w-full h-auto block"
            style={{ filter: "url(#beach-ripple)" }}
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

      <AnimatePresence>
        {workOpen && (
          <WorkDrawer key="work-drawer" onClose={() => setWorkOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
