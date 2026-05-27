"use client";

import { useState, useRef } from "react";
import { animate, motion } from "framer-motion";

const W = 720;
const H = 420;
const FOLD = 0.45;

const ARTWORKS = [
  { title: "architecture · 2025", idx: 0 },
  { title: "cars & drift",        idx: 1 },
  { title: "surf & coast",        idx: 2 },
  { title: "circuits & sensors",  idx: 3 },
];

const TOTAL = ARTWORKS.length + 2; // 0=cover, 1-4=artworks, 5=back

function SketchSVG({ idx }: { idx: number }) {
  const art = [
    <svg key={0} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.38 }}>
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
    <svg key={1} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.38 }}>
      <path d="M44,210 L80,210 L110,162 L188,140 L298,140 L352,172 L368,210 Z" stroke="#3D3530" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="110" cy="216" r="22" stroke="#3D3530" strokeWidth="1.8" fill="none" />
      <circle cx="310" cy="216" r="22" stroke="#3D3530" strokeWidth="1.8" fill="none" />
      <path d="M142,156 L160,140 L270,140 L288,156" stroke="#3D3530" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="215" y1="140" x2="215" y2="156" stroke="#3D3530" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.4" />
      <line x1="44" y1="240" x2="44" y2="264" stroke="#3D3530" strokeWidth="0.9" opacity="0.28" />
      <line x1="368" y1="240" x2="368" y2="264" stroke="#3D3530" strokeWidth="0.9" opacity="0.28" />
      <line x1="44" y1="264" x2="368" y2="264" stroke="#3D3530" strokeWidth="0.9" opacity="0.28" />
    </svg>,
    <svg key={2} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.38 }}>
      <path d="M30,178 C95,122 158,218 220,168 C282,118 345,212 405,162" stroke="#3D3530" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M30,208 C95,152 158,248 220,198 C282,148 345,242 405,192" stroke="#3D3530" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.45" />
      <ellipse cx="220" cy="100" rx="28" ry="76" stroke="#3D3530" strokeWidth="1.4" fill="none" transform="rotate(-10 220 100)" />
      <line x1="212" y1="36" x2="228" y2="164" stroke="#3D3530" strokeWidth="0.8" opacity="0.25" />
    </svg>,
    <svg key={3} viewBox="0 0 440 320" width="100%" height="100%" style={{ opacity: 0.38 }}>
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

// ─── Page components ───────────────────────────────────────────────────────────

function CoverPage({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 cursor-pointer"
      style={{ background: "linear-gradient(160deg, #2C1C0C 0%, #1A0E04 100%)" }}
      onClick={onOpen}
    >
      <div className="w-28 h-px" style={{ background: "rgba(255,255,255,0.13)" }} />
      <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.4em]"
        style={{ color: "rgba(255,255,255,0.22)" }}>SKETCHBOOK</span>
      <div className="w-28 h-px" style={{ background: "rgba(255,255,255,0.13)" }} />
      <span className="font-[family-name:var(--font-space)] text-[10px] uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.14)" }}>click or hover to open</span>
    </div>
  );
}

function NotebookBack({ onFlipBack }: { onFlipBack: () => void }) {
  return (
    <div
      className="absolute inset-0 cursor-pointer select-none"
      style={{ background: "#E8E3DA", borderBottom: "1px solid #C8BFB0" }}
      onClick={onFlipBack}
    >
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${40 + i * 46}px`, background: "#D4CEC6" }} />
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <span className="font-[family-name:var(--font-space)] text-[8px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(10,10,10,0.15)" }}>click to go back</span>
      </div>
    </div>
  );
}

function ArtworkPage({ artIdx, title, onBottom }: {
  artIdx: number; title: string; onBottom: () => void;
}) {
  return (
    <div className="absolute inset-0 select-none"
      style={{ background: "#F0EBE3", borderTop: "1px solid #C8BFB0" }}>
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: `${52 + i * 44}px`, background: "#E4DFD8" }} />
      ))}
      {/* Bottom half — click to go forward */}
      <div className="absolute left-0 right-0 cursor-pointer z-10" style={{ bottom: 0, height: "50%" }} onClick={onBottom} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 56px" }}>
        <SketchSVG idx={artIdx} />
      </div>
      <span className="absolute bottom-4 pointer-events-none font-[family-name:var(--font-space)] text-[9px] uppercase tracking-widest"
        style={{ left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", color: "rgba(10,10,10,0.22)" }}>
        — {title}
      </span>
    </div>
  );
}

function BackPage({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-7"
      style={{ background: "linear-gradient(160deg, #1A0E04 0%, #2C1C0C 100%)", borderTop: "1px solid #3D2A14" }}>
      <div className="w-28 h-px" style={{ background: "rgba(255,255,255,0.10)" }} />
      <button
        onClick={onReset}
        className="font-[family-name:var(--font-space)] text-sm uppercase tracking-widest transition-colors"
        style={{ color: "rgba(255,255,255,0.5)" }}
        onMouseEnter={e => ((e.target as HTMLElement).style.color = "#E8272A")}
        onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
      >
        ← back to the beginning
      </button>
      <div className="w-28 h-px" style={{ background: "rgba(255,255,255,0.10)" }} />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Sketchbook() {
  const [pageIdx, setPageIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isOpen = pageIdx > 0;

  async function flipTo(target: number) {
    if (busy || !bottomRef.current) return;
    setBusy(true);

    const forward = target > pageIdx;
    // Restore the original midAngle values that produced the good animation.
    // transformOrigin is set via CSS style on the element (not via animate options,
    // which framer-motion ignores for this property).
    const midAngle = forward ? -90 : 90;

    await animate(bottomRef.current, { rotateX: midAngle }, { duration: FOLD, ease: "easeIn" });
    setPageIdx(target);
    animate(bottomRef.current, { rotateX: -midAngle }, { duration: 0 });
    await animate(bottomRef.current, { rotateX: 0 }, { duration: FOLD, ease: "easeOut" });

    setBusy(false);
  }

  function reset() {
    if (bottomRef.current) animate(bottomRef.current, { rotateX: 0 }, { duration: 0 });
    setPageIdx(0);
    setBusy(false);
  }

  function renderBottom() {
    if (pageIdx === 0) return <CoverPage onOpen={() => flipTo(1)} />;
    if (pageIdx === TOTAL - 1) return <BackPage onReset={reset} />;
    const art = ARTWORKS[pageIdx - 1];
    return (
      <ArtworkPage
        artIdx={art.idx}
        title={art.title}
        onBottom={() => flipTo(pageIdx + 1)}
      />
    );
  }

  return (
    <div
      className="flex justify-center"
      onMouseEnter={() => { if (pageIdx === 0 && !busy) flipTo(1); }}
    >
      <div style={{ width: W, perspective: "900px" }}>

        {/* Top page — animates its height smoothly so there's no layout jump */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? H : 0 }}
          transition={{ duration: FOLD, ease: "easeOut" }}
          style={{ overflow: "hidden", width: W }}
        >
          <div className="relative" style={{ width: W, height: H }}>
            <NotebookBack onFlipBack={() => { if (!busy && pageIdx > 0) flipTo(pageIdx - 1); }} />
          </div>
        </motion.div>

        {/* Bottom page — the spine is its top edge, set via CSS transformOrigin */}
        <div
          ref={bottomRef}
          className="relative"
          style={{
            width: W,
            height: H,
            // transformOrigin MUST be in the CSS style — framer-motion animate()
            // ignores transformOrigin when passed as a transition option.
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
          }}
        >
          {renderBottom()}
        </div>

      </div>
    </div>
  );
}
