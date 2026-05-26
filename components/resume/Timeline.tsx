import { WorkExperience, ProjectActivity } from "@/data/resume";

type TimelineEntry = WorkExperience | ProjectActivity;

function hasLocation(entry: TimelineEntry): entry is WorkExperience {
  return "location" in entry;
}

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="space-y-0">
      {entries.map((entry, i) => (
        <div key={`${entry.org}-${i}`} className="flex gap-6">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-[#8B5E3C] mt-2 shrink-0" />
            {i < entries.length - 1 && (
              <div className="w-px flex-1 bg-[#D9D0C4] my-2" />
            )}
          </div>

          {/* Entry content */}
          <div className="pb-10 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-medium text-[#1a1a1a]">{entry.org}</h3>
                {hasLocation(entry) && (
                  <span className="text-xs text-[#6b6b6b]">{entry.location}</span>
                )}
              </div>
              <span className="text-xs text-[#6b6b6b] shrink-0 mt-0.5">
                {entry.period}
              </span>
            </div>
            <p className="text-sm font-medium text-[#8B5E3C] mb-3">{entry.role}</p>
            <ul className="space-y-2">
              {entry.bullets.map((bullet, j) => (
                <li key={j} className="flex gap-3 text-sm text-[#1a1a1a]/80 leading-relaxed">
                  <span className="text-[#C9A882] shrink-0 mt-0.5">·</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
