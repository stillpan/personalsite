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
    title: "Wrist-Worn PPG Wearable Encapsulation",
    category: "product-design",
    tag: "Product Design · Medical",
    period: "Jan – May 2026",
    org: "PROBE Lab — ENGN 0620",
    summary:
      "Redesigned a wearable enclosure for the PROBE Lab's equitable PPG sensor — folding the PCB to reduce surface area and iterating from sketches and cardboard prototypes through a dual-enclosure concept to a refined single-enclosure watch-style form factor, validated through clinical pressure testing.",
    hasDetailPage: true,
    context:
      "The PROBE Lab at Brown University developed a novel PPG (photoplethysmography) sensor engineered to maintain signal accuracy across varying melanin levels — addressing a well-documented disparity in pulse oximeter performance across skin tones. The sensor requires a consistent, controlled contact pressure between 30–60 mmHg for accurate readings, and needed a wearable enclosure for outpatient clinical testing on Brown University students.",
    problem:
      "The original PROBE Lab enclosure was a single housing with the PCB fully expanded, requiring the top and bottom to be screwed together to secure the board. This resulted in a large, cumbersome form factor that was uncomfortable to wear and time-consuming to set up. Our approach was to fold the PCB to recover surface area — but this introduced new design challenges around housing the folded board, stabilizing it under contact pressure, and managing wire routing.",
    role:
      "Design engineer on the ENGN 0620 team alongside Mira Bhandari and Anika Sinha. Led CAD design and prototyping iterations from concept through 3D-printed final prototypes. Conducted user research via affinity mapping, applied decision matrices to select the form factor, and collaborated on physical prototyping and validation testing with the PROBE Lab.",
    designProcess: [
      {
        title: "User Research — Affinity Mapping",
        description:
          "Synthesized user pain points from interviews into an affinity map, then ranked them by difficulty and importance. The highest-priority issues were: inability to adjust or correct placement during use, lack of visual/tactile feedback on correct usage, and difficulty achieving consistent sensor-to-skin contact.",
      },
      {
        title: "Form Factor Selection — Weighted Decision Matrix",
        description:
          "Evaluated four candidate form factors — watch, cuff, ring, and glove — across criteria including comfort, ease of use, contact pressure consistency, durability, and adaptability to different users. The watch form factor scored highest at 4.42, driven by its superior comfort and ease-of-use ratings. Cuff scored second at 3.86.",
      },
      {
        title: "Prototype 1 — Low Fidelity (Cardboard)",
        description:
          "Built cardboard mockups exploring watch and cuff form factors with the folded PCB architecture. Focused on placement, comfort, and how a folded board could meaningfully reduce the device's footprint relative to the original screw-together design.",
      },
      {
        title: "Prototype 2 — Medium Fidelity (Resin, Dual-Enclosure)",
        description:
          "Developed a resin-printed watch-style design using a dual-enclosure approach — separate housings for the sensor region and the PCB ears. Testing revealed imprecise fabrication tolerances, excessive bulk, and risk of PCB stress at the junction between enclosures.",
      },
      {
        title: "Prototype 3 — High Fidelity (PLA, Single Enclosure)",
        description:
          "Refined into a single PLA enclosure that integrates the folded PCB with internal extrusions for board support and a battery compartment. Identified issues with incorrect battery measurements and excess material; users preferred the silicone skin contact pad over PDMS and watch strap over rope.",
      },
      {
        title: "Final Design — Refined CAD",
        description:
          "Refined based on PROBE Lab validation: improved wire routing, corrected extrusion geometry for more consistent contact pressure, and added integrated watch strap attachment openings. Snap-fit hinge with interlocking ball joints enables secure assembly; cantilever snap-fit closure allows tool-free operation.",
      },
    ],
    finalDesign: [
      "Single PLA enclosure constrained to the sensor footprint — significantly reduced bulk compared to the dual-enclosure original.",
      "Snap-fit hinge with interlocking ball joints for secure, repeatable assembly and smooth movement, with integrated watch strap attachment openings.",
      "Cantilever snap-fit closure for tool-free assembly and improved durability over repeated use.",
      "Internal extrusions sized to PCB dimensions, maintaining consistent contact pressure through a silicone skin-contact layer while preserving wire clearance.",
      "Silicone pad (preferred over PDMS in user testing) and standard watch strap (preferred over rope) for improved comfort and wearability.",
    ],
    results: [
      { metric: "55.0 mmHg", detail: "Mean contact pressure — within the clinically required 30–60 mmHg range for PPG sensing" },
      { metric: "7:28 → 4:37", detail: "Signal acquisition time — cleaner waveforms achieved ~40% faster than the original design" },
      { metric: "Improved morphology", detail: "Waveform quality improved: clearer systolic peaks, dicrotic notch, and diastolic peaks in final prototype" },
      { metric: "Single enclosure", detail: "Eliminated dual-enclosure PCB stress risk; assembly reduced to a single snap-fit mechanism" },
    ],
    nextSteps: [
      "Refine battery enclosure geometry and reduce unnecessary housing material.",
      "Test durability of snap-fit hinge under repeated assembly cycles.",
      "Validate contact pressure consistency across a wider range of wrist sizes.",
      "Explore further miniaturization as PCB design evolves.",
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
    hasDetailPage: true,
    context:
      "The High Granularity Calorimeter (HGCAL) is a major upgrade to the CMS experiment at the Large Hadron Collider, designed to handle the extreme radiation and particle flux of the High-Luminosity LHC era. Silicon sensors are a core component, and each must be rigorously characterized before integration — assessed against stringent requirements across the full workflow from unpacking and preparation through final acceptance testing.",
    role:
      "Performed clean-room testing of silicon sensors at CERN, executing established testing protocols, operating specialized instrumentation, and analyzing results. As a culminating deliverable, wrote a technical document detailing the full clean-room testing procedures — intended to standardize practices for future sensor characterization at Brown University and to support sensor development for the Future Circular Collider (FCC).",
    portfolioPdf: "/pdfs/silicon-sensor-testing.pdf",
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
