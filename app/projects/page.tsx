import { projects, categoryLabels, ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata = {
  title: "Projects — Yuki Zhang",
};

const categories: ProjectCategory[] = [
  "electrical-engineering",
  "product-design",
  "artworks",
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-24 pb-20">
      <header className="mb-16">
        <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl font-bold text-[#0A0A0A]">
          Projects
        </h1>
      </header>

      <div className="space-y-20">
        {categories.map((category) => {
          const categoryProjects = projects.filter(
            (p) => p.category === category
          );

          return (
            <section key={category}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-[family-name:var(--font-bebas)] text-2xl font-semibold text-[#0A0A0A]">
                  {categoryLabels[category]}
                </h2>
                <div className="flex-1 h-px bg-[#D8D2C8]" />
              </div>

              {categoryProjects.length === 0 ? (
                <div className="border border-dashed border-[#D8D2C8] p-10 text-center">
                  <p className="text-sm text-[#555]">Coming soon</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
