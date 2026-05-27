export interface WorkExperience {
  org: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface ProjectActivity {
  org: string;
  role: string;
  period: string;
  bullets: string[];
}

export const education = {
  school: "Brown University",
  location: "Providence, RI",
  degree: "Bachelor of Science in Electrical Engineering",
  graduation: "May 2028",
};

export const workExperience: WorkExperience[] = [
  {
    org: "Brown University Department of Physics",
    location: "Providence, RI",
    role: "Student Researcher",
    period: "Dec 2024 – Present",
    bullets: [
      "Designing and programming PCBs using KiCad to test the data readout system at CERN, under Prof. Loukas Gouskos.",
      "Received a UTRA award to characterize low-gain avalanche diodes (LGADs) — current and capacitance under varying voltages — and developed signal-sharing algorithms across channels via LabVIEW, under Prof. Jennifer Roloff.",
    ],
  },
  {
    org: "CERN",
    location: "Geneva, Switzerland",
    role: "Student Researcher",
    period: "Apr 2025 – Aug 2025",
    bullets: [
      "Collaborated on the development of advanced silicon detectors for the HGCAL upgrade in the CMS experiment.",
      "Tested advanced modules at CERN's silicon testing clean room, including performance evaluation and data analysis.",
      "Wrote a document on the testing procedure for silicon sensors to be used for the proposed Future Circular Collider.",
    ],
  },
  {
    org: "Chinese Academy of Sciences — Institute of High Energy Physics",
    location: "Beijing, China",
    role: "Visiting Researcher",
    period: "Apr 2023 – Oct 2023",
    bullets: [
      "Tested photomultiplier tubes for particle identification in high-energy particle experiments and medical imaging equipment, including in a particle accelerator.",
      "Conducted an experiment on the voltage optimization of microchannel plate photomultiplier tubes (MCP-PMTs); collected and analyzed 6 datasets for 3 samples using an oscilloscope and ROOT; published findings at the 2023 International Cosmic Rays Conference; recorded the lowest transit time spread of the MCP-PMT in a lab of 20+ postdoc, PhD, and grad students.",
      "Selected by Professor Yifang Wang as the only high school student to attend the 2023 International JUNO Collaboration Conference.",
    ],
  },
];

export const projectActivities: ProjectActivity[] = [
  {
    org: "Brown Moral Ambition",
    role: "Circle Program Coordinator",
    period: "Feb 2026 – Present",
    bullets: [
      "Facilitate student group discussions on moral ambition and high-impact careers for a pilot Circle Program, designing and adapting reading-based curriculum.",
      "Collect and synthesize participant feedback to improve program structure and learning outcomes.",
      "Collaborate with the executive board to support program launch and future scaling.",
    ],
  },
  {
    org: "PROBE Lab",
    role: "Design Engineer — ENGN 0620",
    period: "Jan 2026 – Present",
    bullets: [
      "Partnered with the PROBE Lab to redesign a wearable enclosure for a novel PPG sensor built for equitable signal accuracy across varying melanin levels.",
      "Redesigned from a bulky dual-enclosure form factor to a single-enclosure watch-style design through multiple CAD iterations and 3D-printed prototypes; reduced enclosure surface area to ~30% of the original.",
      "Validated with PROBE Lab: contact pressure of 43.94 mmHg (within clinical PPG range); symmetric enclosure design improved signal acquisition speed by ~40% and simplified assembly.",
    ],
  },
  {
    org: "Brown Formula Racing",
    role: "Electronics Team Member & Media Team",
    period: "Sep 2024 – Present",
    bullets: [
      "Worked with the electronics team to design and build an electrical system for a student-built formula-style competitive race car, including a new PCB design.",
      "Used Altium Designer to assist in creating the schematic for the PCB within the steering wheel.",
      "Assisted the shifting team by wiring and testing the shifting system on a dyno; assisted in testing carbon fiber composite through infusion.",
    ],
  },
];

export const skills = [
  "KiCad",
  "LabVIEW",
  "MATLAB",
  "CAD",
  "Python",
  "Java",
  "Circuit Design",
  "Hardware Testing",
  "Altium Designer",
  "PCB Design",
];

export const interests = [
  { label: "Water Polo", note: "Brown D1 manager, club team founder" },
  { label: "Automotive", note: "Vintage cars & car culture enthusiast" },
  { label: "DJing", note: "Aspiring DJ" },
  { label: "Surfing", note: "Lifestyle and creative energy" },
  { label: "Travel", note: "Stories, objects, place-based experiences" },
];
