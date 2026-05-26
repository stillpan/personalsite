import {
  education,
  workExperience,
  projectActivities,
  skills,
  interests,
} from "@/data/resume";
import Timeline from "@/components/resume/Timeline";

export const metadata = {
  title: "Resume — Yuki Zhang",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-24 pb-20">
      <header className="mb-16 flex items-end justify-between flex-wrap gap-6">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-[#1a1a1a]">
            Resume
          </h1>
        </div>
        <a
          href="/pdfs/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm border border-[#D9D0C4] text-[#6b6b6b] px-5 py-3 hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors"
        >
          Download PDF →
        </a>
      </header>

      <div className="space-y-16">
        {/* Education */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1a1a1a]">
              Education
            </h2>
            <div className="flex-1 h-px bg-[#D9D0C4]" />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4 p-6 border border-[#D9D0C4] bg-[#F0EBE1]/40">
            <div>
              <p className="font-medium text-[#1a1a1a]">{education.school}</p>
              <p className="text-sm text-[#6b6b6b]">{education.location}</p>
              <p className="text-sm text-[#8B5E3C] font-medium mt-1">
                {education.degree}
              </p>
            </div>
            <p className="text-sm text-[#6b6b6b]">{education.graduation}</p>
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1a1a1a]">
              Work Experience
            </h2>
            <div className="flex-1 h-px bg-[#D9D0C4]" />
          </div>
          <Timeline entries={workExperience} />
        </section>

        {/* Projects & Activities */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1a1a1a]">
              Projects & Activities
            </h2>
            <div className="flex-1 h-px bg-[#D9D0C4]" />
          </div>
          <Timeline entries={projectActivities} />
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1a1a1a]">
              Technical Skills
            </h2>
            <div className="flex-1 h-px bg-[#D9D0C4]" />
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 border border-[#D9D0C4] text-sm text-[#1a1a1a] bg-[#F0EBE1]/40 hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1a1a1a]">
              Interests
            </h2>
            <div className="flex-1 h-px bg-[#D9D0C4]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {interests.map(({ label, note }) => (
              <div
                key={label}
                className="p-4 border border-[#D9D0C4] bg-[#F0EBE1]/40"
              >
                <p className="font-medium text-sm text-[#1a1a1a]">{label}</p>
                <p className="text-xs text-[#6b6b6b] mt-1">{note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
