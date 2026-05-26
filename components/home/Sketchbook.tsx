"use client";

import { useState, useRef } from "react";
import { animate } from "framer-motion";

const W = 780;       // full open width
const H = 500;       // height
const HALF = W / 2;  // half = one page = closed width
const FOLD = 0.2;    // seconds per half-fold phase

// ─── Placeholder artworks — swap SketchSVG content for <img> tags later ──────
const ARTWORKS = [
  { title: "architecture · 2025", idx: 0 },
  { title: "cars & drift",        idx: 1 },
  { title: "surf & coast",        idx: 2 },
  { title: "circuits & sensors",  idx: 3 },
];

type Phase = "front" | "spread" | "back";

// ─── SVG placeholder sketches ─────────────────────────────────────────────────
function SketchSVG({ idx }: { idx: number }) {
  const art = [
    <svg key={0} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.36 }}>
      <line x1="40" y1="270" x2="400" y2="270" stroke="#3D3530" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="95" y1="270" x2="95" y2="130" stroke="#3D3530" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="345" y1="270" x2="345" y2="148" stroke="#3D3530" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="95" y1="130" x2="220" y2="72" stroke="#3D3530" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="220" y1="72" x2="345" y2="148" stroke="#3D3530" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="162" y="188" width="116" height="82" stroke="#3D3530" strokeWidth="1.4" fill="none" />
      <line x1="220" y1="188" x2="220" y2="270" stroke="#3D3530" strokeWidth="0.9" opacity="0.4" />
      <line x1="55" y1="105" x2="158" y2="100" stroke="#3D3530" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
      <line x1="55" y1="120" x2="142" y2="116" stroke="#3D3530" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.22" />
    </svg>,
    <svg key={1} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.36 }}>
      <path d="M44,210 L80,210 L110,162 L188,140 L298,140 L352,172 L368,210 Z" stroke="#3D3530" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="110" cy="216" r="22" stroke="#3D3530" strokeWidth="1.8" fill="none" />
      <circle cx="310" cy="216" r="22" stroke="#3D3530" strokeWidth="1.8" fill="none" />
      <path d="M142,156 L160,140 L270,140 L288,156" stroke="#3D3530" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="215" y1="140" x2="215" y2="156" stroke="#3D3530" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.4" />
      <line x1="44" y1="240" x2="44" y2="264" stroke="#3D3530" strokeWidth="0.9" opacity="0.28" />
      <line x1="368" y1="240" x2="368" y2="264" stroke="#3D3530" strokeWidth="0.9" opacity="0.28" />
      <line x1="44" y1="264" x2="368" y2="264" stroke="#3D3530" strokeWidth="0.9" opacity="0.28" />
    </svg>,
    <svg key={2} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.36 }}>
      <path d="M30,178 C95,122 158,218 220,168 C282,118 345,212 405,162" stroke="#3D3530" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M30,208 C95,152 158,248 220,198 C282,148 345,242 405,192" stroke="#3D3530" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.45" />
      <ellipse cx="220" cy="100" rx="28" ry="76" stroke="#3D3530" strokeWidth="1.4" fill="none" transform="rotate(-10 220 100)" />
      <line x1="212" y1="36" x2="228" y2="164" stroke="#3D3530" strokeWidth="0.8" opacity="0.25" />
    </svg>,
    <svg key={3} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.36 }}>
      <rect x="40" y="72" width="360" height="196" stroke="#3D3530" strokeWidth="0.8" fill="none" opacity="0.2" />
      {[0,1,2,3].map(i => <line key={`h${i}`} x1="40" y1={72+i*49} x2="400" y2={72+i*49} stroke="#3D3530" strokeWidth="0.5" opacity="0.16" />)}
      {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={40+i*90} y1="72" x2={40+i*90} y2="268" stroke="#3D3530" strokeWidth="0.5" opacity="0.16" />)}
      <rect x="92" y="106" width="84" height="54" stroke="#3D3530" strokeWidth="1.5" fill="none" />
      <rect x="256" y="154" width="92" height="60" stroke="#3D3530" strokeWidth="1.5" fill="none" />
      <line x1="176" y1="133" x2="256" y2="133" stroke="#3D3530" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="256" y1="133" x2="256" y2="184" stroke="#3D3530" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="176" cy="133" r="5" fill="#3D3530" opacity="0.52" />
      <circle cx="302" cy="244" r="5" fill="#3D3530" opacity="0.52" />
    </svg>,
  ];
  return <>{art[idx % art.length]}</>;
}

// ─── Page halves ──────────────────────────────────────────────────────────────
// The artwork SVG is always rendered at full W×H, but clipped to the left or right half.

function LeftPage({ idx, title }: { idx: number; title: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none"
      style={{ background: "#F0EBE3", border: "1px solid #C8BFB0", borderRight: "none" }}>
      {[0,1,2,3,4,5,6].map(i => (
        <div key={i} className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${56+i*58}px`, background: "#E4DFD8" }} />
      ))}
      {/* Full artwork positioned so left half is visible */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 48px 56px" }}>
          <SketchSVG idx={idx} />
        </div>
      </div>
      <span className="absolute bottom-4 pointer-events-none font-[family-name:var(--font-space)] text-[9px] uppercase tracking-widest text-[#0A0A0A]/22"
        style={{ left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
        — {title}
      </span>
    </div>
  );
}

function RightPage({ idx }: { idx: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none"
      style={{ background: "#F0EBE3", border: "1px solid #C8BFB0", borderLeft: "none" }}>
      {[0,1,2,3,4,5,6].map(i => (
        <div key={i} className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${56+i*58}px`, background: "#E4DFD8" }} />
      ))}
      {/* Full artwork offset so right half is visible */}
      <div className="absolute inset-0 overflow-hidden">
        <div style={{ position: "absolute", left: -HALF, top: 0, width: W, height: H,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 48px 56px" }}>
          <SketchSVG idx={idx} />
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Sketchbook() {
  const [phase, setPhase] = useState<Phase>("front");
  const [spread, setSpread] = useState(1);
  const [busy, setBusy] = useState(false);
  const [showSpine, setShowSpine] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // ── helpers ────────────────────────────────────────────────────────────────

  const foldOut = (el: HTMLElement, origin: string) =>
    animate(el, { scaleX: 0 }, { duration: FOLD, ease: "easeIn",
      transformOrigin: origin } as Parameters<typeof animate>[2]);

  const foldIn = (el: HTMLElement, origin: string) =>
    animate(el, { scaleX: 1 }, { duration: FOLD, ease: "easeOut",
      transformOrigin: origin } as Parameters<typeof animate>[2]);

  const resizeContainer = (w: number, ease: string = "easeInOut") =>
    animate(containerRef.current!, { width: w },
      { duration: FOLD * 2, ease } as Parameters<typeof animate>[2]);

  // ── click right half ───────────────────────────────────────────────────────
  async function clickRight() {
    if (busy) return;
    setBusy(true);
    setShowSpine(true);

    if (phase === "front") {
      // Open book: instantly hide right half (it'll unfold in), expand container, reveal
      animate(rightRef.current!, { scaleX: 0 }, { duration: 0 });
      await resizeContainer(W, "easeOut");
      setPhase("spread");
      await foldIn(rightRef.current!, "0% 50%");

    } else if (phase === "spread") {
      if (spread < ARTWORKS.length) {
        // Fold right out, swap spread, fold back in
        await foldOut(rightRef.current!, "0% 50%");
        setSpread(i => i + 1);
        await foldIn(rightRef.current!, "0% 50%");
      } else {
        // Last spread → back cover: fold both halves, shrink container
        await foldOut(rightRef.current!, "0% 50%");
        await foldOut(leftRef.current!, "100% 50%");
        await resizeContainer(HALF, "easeIn");
        setPhase("back");
        animate(leftRef.current!, { scaleX: 1 }, { duration: 0 });
        animate(rightRef.current!, { scaleX: 1 }, { duration: 0 });
      }
    }

    setShowSpine(false);
    setBusy(false);
  }

  // ── click left half ────────────────────────────────────────────────────────
  async function clickLeft() {
    if (busy) return;
    setBusy(true);
    setShowSpine(true);

    if (phase === "back") {
      // Open from back: hide left, expand, reveal
      animate(leftRef.current!, { scaleX: 0 }, { duration: 0 });
      setSpread(ARTWORKS.length);
      await resizeContainer(W, "easeOut");
      setPhase("spread");
      await foldIn(leftRef.current!, "100% 50%");

    } else if (phase === "spread") {
      if (spread > 1) {
        await foldOut(leftRef.current!, "100% 50%");
        setSpread(i => i - 1);
        await foldIn(leftRef.current!, "100% 50%");
      } else {
        // First spread → front cover: fold both, shrink
        await foldOut(leftRef.current!, "100% 50%");
        await foldOut(rightRef.current!, "0% 50%");
        await resizeContainer(HALF, "easeIn");
        setPhase("front");
        animate(leftRef.current!, { scaleX: 1 }, { duration: 0 });
        animate(rightRef.current!, { scaleX: 1 }, { duration: 0 });
      }
    }

    setShowSpine(false);
    setBusy(false);
  }

  // ── back to beginning (instant) ────────────────────────────────────────────
  function backToBeginning() {
    animate(containerRef.current!, { width: HALF }, { duration: 0 });
    animate(leftRef.current!, { scaleX: 1 }, { duration: 0 });
    animate(rightRef.current!, { scaleX: 1 }, { duration: 0 });
    setPhase("front");
  }

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="flex justify-center"
      onMouseEnter={() => { if (phase === "front" && !busy) clickRight(); }}
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ width: HALF, height: H }}
      >

        {/* ── Left half ──────────────────────────────────────────────────── */}
        <div
          ref={leftRef}
          className="absolute top-0 left-0 bottom-0"
          style={{ width: HALF, transformOrigin: "100% 50%" }}
        >
          {phase === "front" && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-7 cursor-pointer"
              style={{ background: "linear-gradient(160deg, #2C1C0C 0%, #1A0E04 100%)" }}
              onClick={clickRight}
            >
              <div className="w-24 h-px" style={{ background: "rgba(255,255,255,0.13)" }} />
              <span className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.4em]"
                style={{ color: "rgba(255,255,255,0.22)" }}>SKETCHBOOK</span>
              <div className="w-24 h-px" style={{ background: "rgba(255,255,255,0.13)" }} />
              <span className="font-[family-name:var(--font-space)] text-[10px] uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.14)" }}>click or hover to open</span>
            </div>
          )}

          {phase === "back" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8"
              style={{ background: "linear-gradient(160deg, #1A0E04 0%, #2C1C0C 100%)" }}>
              <div className="w-24 h-px" style={{ background: "rgba(255,255,255,0.10)" }} />
              <button
                onClick={backToBeginning}
                className="font-[family-name:var(--font-space)] text-sm uppercase tracking-widest transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#E8272A")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                ← back to the beginning
              </button>
              <div className="w-24 h-px" style={{ background: "rgba(255,255,255,0.10)" }} />
            </div>
          )}

          {phase === "spread" && (
            <div className="absolute inset-0 cursor-pointer" onClick={clickLeft}>
              <LeftPage idx={ARTWORKS[spread - 1].idx} title={ARTWORKS[spread - 1].title} />
            </div>
          )}
        </div>

        {/* ── Right half ─────────────────────────────────────────────────── */}
        <div
          ref={rightRef}
          className="absolute top-0 bottom-0"
          style={{ left: HALF, width: HALF, transformOrigin: "0% 50%" }}
        >
          {phase === "spread" && (
            <div className="absolute inset-0 cursor-pointer" onClick={clickRight}>
              <RightPage idx={ARTWORKS[spread - 1].idx} />
            </div>
          )}
        </div>

        {/* ── Spine — visible only while folding ─────────────────────────── */}
        {showSpine && (
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: HALF - 2, width: 4, background: "#B8B0A4" }}
          />
        )}

        {/* ── Page counter ───────────────────────────────────────────────── */}
        {phase === "spread" && (
          <div
            className="absolute bottom-4 z-10 pointer-events-none font-[family-name:var(--font-space)] text-[8px] uppercase tracking-widest"
            style={{ left: "50%", transform: "translateX(-50%)", color: "rgba(10,10,10,0.25)" }}
          >
            {spread} / {ARTWORKS.length}
          </div>
        )}

      </div>
    </div>
  );
}
