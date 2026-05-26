export type ProjectCategory = "electrical-engineering" | "product-design" | "artworks";

export interface ProjectResult {
  metric: string;
  detail: string;
}

export interface DesignPhase {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  tag: string;
  period: string;
  org: string;
  summary: string;
  hasDetailPage: boolean;
  // detail page fields (optional — only for projects with hasDetailPage: true)
  context?: string;
  problem?: string;
  role?: string;
  designProcess?: DesignPhase[];
  finalDesign?: string[];
  results?: ProjectResult[];
  nextSteps?: string[];
  portfolioPdf?: string;
}

export const projects: Project[] = [
  // ─── Most recent first ────────────────────────────────────────────────────
  {
    slug: "ppg-sensor-enclosure",
    title: "PPG Sensor Wearable Enclosure",
    category: "product-design",
    tag: "Product Design · Medical",
    period: "Jan 2026 – Present",
    org: "PROBE Lab — ENGN 0620",
    summary:
      "Redesigned a wearable enclosure for the PROBE Lab's equitable PPG sensor from bulky dual-enclosure to a compact watch-style form factor, improving signal acquisition speed by ~40%.",
    hasDetailPage: true,
    context:
      "The PROBE Lab at Brown University developed a novel PPG (photoplethysmography) sensor designed to maintain signal accuracy across varying melanin levels — addressing a well-documented disparity in pulse oximeter accuracy across skin tones. For clinical testing on Brown students, the sensor needed a wearable form factor that could be used reliably in outpatient monitoring applications.",
    problem:
      "The original PROBE Lab enclosure was bulky, uncomfortable, and difficult to use. It used a dual-enclosure form factor — a separate housing for the sensor region and for the PCB 'ears' — which resulted in uneven contact pressure, excessive bulk, and increased risk of PCB stress between enclosures. The form factor made consistent sensor-to-skin contact difficult to achieve.",
    role:
      "As design engineer on the ENGN 0620 team, I led CAD design and prototyping iterations, from initial concept sketches through 3D-printed final prototypes. Prototypes were printed in collaboration with team members Anika and Mira.",
    designProcess: [
      {
        title: "Initial Sketches",
        description:
          "Explored both watch-style and cuff-style encapsulations using a folded PCB architecture to reduce device footprint. Early concepts investigated weighted internal attachments for PCB stabilization before transitioning to a support rod approach.",
      },
      {
        title: "Prototype 1 — Low Fidelity",
        description:
          "Cardboard mockups based on initial sketches, exploring watch and cuff-style form factors. Focused on placement, comfort, and attachment mechanisms.",
      },
      {
        title: "Prototype 2 — Resin Printed",
        description:
          "Selected the watch-style direction as a team and developed a dual-encapsulation design for unfolded PCB 'ears' using CAD and resin printing. The design introduced excessive bulk, imprecise fabrication, and increased risk of PCB stress between enclosures.",
      },
      {
        title: "Prototype 3 — 3D Printed (CAD Iteration 3)",
        description:
          "Revised into a single enclosure with folded PCB integration, internal extrusions, and a battery compartment. Incorrect battery measurements and unnecessary material usage meant further bulk reduction was needed for the final prototype.",
      },
      {
        title: "Final CAD Model",
        description:
          "Refined through PROBE Lab testing: improved wire routing, watch strap attachment, and extrusion geometry for better PCB stability and contact pressure. Snap-fit hinge with interlocking ball joints for secure assembly; cantilever closure for tool-free operation.",
      },
    ],
    finalDesign: [
      "Single-enclosure watch-style form factor constrained to sensor footprint — ~30% of the original surface area.",
      "Snap-fit hinge mechanism with interlocking ball joints for secure assembly and smooth movement, with integrated watch strap attachment openings.",
      "Cantilever snap-fit closure integrated into the main housing for tool-free assembly and improved durability.",
      "Internal extrusions designed around PCB dimensions to maintain consistent contact pressure through a silicone layer while preserving battery wire clearance.",
    ],
    results: [
      { metric: "43.94 mmHg", detail: "Contact pressure — within the clinically validated PPG sensing range" },
      { metric: "7:28 → 4:37", detail: "Signal acquisition time improvement, producing clearer and more stable waveforms" },
      { metric: "~30%", detail: "Of original surface area — significant reduction in enclosure bulk" },
      { metric: "~40%", detail: "Improvement in signal acquisition speed vs. the original design" },
    ],
    nextSteps: [
      "Refine battery enclosure geometry and integration.",
      "Improve durability of repeated PCB folding.",
      "Optimize long-term wearability and strap comfort.",
    ],
    portfolioPdf: "/pdfs/portfolio-ppg.pdf",
  },
  {
    slug: "cern-hgcal",
    title: "HGCAL Silicon Detector Testing",
    category: "electrical-engineering",
    tag: "Research · Particle Physics",
    period: "Apr – Aug 2025",
    org: "CERN",
    summary:
      "Tested advanced silicon detector modules for the CMS HGCAL upgrade at CERN's silicon testing clean room, and documented testing procedures for the Future Circular Collider.",
    hasDetailPage: false,
  },
  {
    slug: "lgad-research",
    title: "LGAD Characterization & PCB Design",
    category: "electrical-engineering",
    tag: "Research · Hardware",
    period: "Dec 2024 – Present",
    org: "Brown University Department of Physics",
    summary:
      "UTRA-awarded research characterizing low-gain avalanche diodes under varying voltages, with PCB design in KiCad to support CERN's data readout system.",
    hasDetailPage: false,
  },
  {
    slug: "mcp-pmt",
    title: "MCP-PMT Voltage Optimization",
    category: "electrical-engineering",
    tag: "Research · Published",
    period: "Apr – Oct 2023",
    org: "Chinese Academy of Sciences — IHEP",
    summary:
      "Optimized microchannel plate photomultiplier tubes for particle experiments; recorded the lab's lowest transit time spread and published findings at the 2023 International Cosmic Rays Conference.",
    hasDetailPage: false,
  },

  // ─── Artworks ─────────────────────────────────────────────────────────────
  // Placeholder — artwork projects to be added
];

export const categoryLabels: Record<ProjectCategory, string> = {
  "electrical-engineering": "Electrical Engineering",
  "product-design": "Product Design",
  artworks: "Artworks",
};
