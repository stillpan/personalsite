import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-[#D8D2C8] bg-[#F7F4EF] p-6 flex flex-col gap-4 hover:border-[#E8272A] transition-colors group">
      <div className="flex items-start justify-between gap-4">
        <span className="font-[family-name:var(--font-space)] text-[10px] uppercase tracking-widest text-[#E8272A]">
          {project.tag}
        </span>
        <span className="font-[family-name:var(--font-space)] text-xs text-[#555] shrink-0">{project.period}</span>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-[#0A0A0A] mb-1 group-hover:text-[#E8272A] transition-colors">
          {project.title}
        </h3>
        <p className="font-[family-name:var(--font-space)] text-xs text-[#555]">{project.org}</p>
      </div>

      <p className="font-[family-name:var(--font-space)] text-sm text-[#0A0A0A]/70 leading-relaxed flex-1">
        {project.summary}
      </p>

      {project.hasDetailPage && (
        <Link
          href={`/projects/${project.slug}`}
          className="font-[family-name:var(--font-space)] text-xs text-[#E8272A] hover:underline mt-auto self-start tracking-wide"
        >
          View project →
        </Link>
      )}
    </article>
  );
}
