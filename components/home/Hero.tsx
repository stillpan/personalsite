import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-[#8B5E3C] mb-6">
          Electrical Engineer · Researcher · Designer
        </p>

        <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl font-bold leading-tight text-[#1a1a1a] mb-8">
          Yuki Zhang
        </h1>

        <p className="text-lg sm:text-xl text-[#6b6b6b] leading-relaxed mb-4">
          Sophomore at Brown University studying Electrical Engineering.
          Researcher at CERN and Brown Physics. Designer of wearable hardware.
        </p>
        <p className="text-lg sm:text-xl text-[#6b6b6b] leading-relaxed mb-12">
          Also: automotive enthusiast, aspiring DJ, water polo manager, and
          always looking for the next interesting thing.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-block px-6 py-3 bg-[#1a1a1a] text-[#FAF7F2] text-sm font-medium hover:bg-[#8B5E3C] transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/resume"
            className="inline-block px-6 py-3 border border-[#D9D0C4] text-[#1a1a1a] text-sm font-medium hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/about"
            className="inline-block px-6 py-3 text-[#6b6b6b] text-sm font-medium hover:text-[#8B5E3C] transition-colors"
          >
            About me →
          </Link>
        </div>
      </div>

      <div className="mt-24 pt-12 border-t border-[#D9D0C4] grid grid-cols-2 sm:grid-cols-4 gap-8">
        {[
          { number: "3", label: "Research labs" },
          { number: "2023", label: "First publication" },
          { number: "CERN", label: "Summer 2025" },
          { number: "Brown", label: "Class of 2028" },
        ].map(({ number, label }) => (
          <div key={label}>
            <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a1a]">
              {number}
            </p>
            <p className="text-sm text-[#6b6b6b] mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
