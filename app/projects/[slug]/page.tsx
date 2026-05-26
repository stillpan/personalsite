import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects
    .filter((p) => p.hasDetailPage)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} — Yuki Zhang` };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.hasDetailPage);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      {/* Back link */}
      <Link
        href="/projects"
        className="text-sm text-[#6b6b6b] hover:text-[#8B5E3C] transition-colors mb-12 inline-flex items-center gap-2"
      >
        ← All projects
      </Link>

      {/* Header */}
      <header className="mt-8 mb-16 pb-12 border-b border-[#D9D0C4]">
        <p className="text-sm uppercase tracking-widest text-[#8B5E3C] mb-4">
          {project.tag}
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-4">
          {project.title}
        </h1>
        <p className="text-[#6b6b6b]">
          {project.org} · {project.period}
        </p>
      </header>

      <div className="space-y-16">
        {/* Context */}
        {project.context && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a1a] mb-4">
              Context
            </h2>
            <p className="text-[#1a1a1a]/80 leading-relaxed">{project.context}</p>
          </section>
        )}

        {/* Problem */}
        {project.problem && (
          <section className="p-8 bg-[#F0EBE1] border-l-4 border-[#8B5E3C]">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a1a] mb-4">
              The Problem
            </h2>
            <p className="text-[#1a1a1a]/80 leading-relaxed">{project.problem}</p>
          </section>
        )}

        {/* My Role */}
        {project.role && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a1a] mb-4">
              My Role
            </h2>
            <p className="text-[#1a1a1a]/80 leading-relaxed">{project.role}</p>
          </section>
        )}

        {/* Design Process */}
        {project.designProcess && project.designProcess.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a1a] mb-8">
              Design Process
            </h2>
            <div className="space-y-0">
              {project.designProcess.map((phase, i) => (
                <div key={phase.title} className="flex gap-6">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#8B5E3C] text-[#FAF7F2] flex items-center justify-center text-xs font-medium shrink-0">
                      {i + 1}
                    </div>
                    {i < (project.designProcess?.length ?? 0) - 1 && (
                      <div className="w-px flex-1 bg-[#D9D0C4] my-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-10 pt-1 flex-1">
                    <h3 className="font-medium text-[#1a1a1a] mb-2">{phase.title}</h3>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Final Design */}
        {project.finalDesign && project.finalDesign.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a1a] mb-6">
              Final Design
            </h2>
            <ul className="space-y-3">
              {project.finalDesign.map((point, i) => (
                <li key={i} className="flex gap-4 text-[#1a1a1a]/80 leading-relaxed">
                  <span className="text-[#8B5E3C] mt-0.5 shrink-0">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a1a] mb-8">
              Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.results.map(({ metric, detail }) => (
                <div
                  key={metric}
                  className="border border-[#D9D0C4] p-6 bg-[#FAF7F2]"
                >
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#8B5E3C] mb-2">
                    {metric}
                  </p>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Steps */}
        {project.nextSteps && project.nextSteps.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a1a] mb-4">
              Next Steps
            </h2>
            <ul className="space-y-2">
              {project.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-[#6b6b6b]">
                  <span className="text-[#C9A882] shrink-0">○</span>
                  {step}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* PDF Download */}
        {project.portfolioPdf && (
          <section className="pt-8 border-t border-[#D9D0C4]">
            <a
              href={project.portfolioPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#8B5E3C] border border-[#8B5E3C] px-5 py-3 hover:bg-[#8B5E3C] hover:text-[#FAF7F2] transition-colors"
            >
              View full portfolio PDF →
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
