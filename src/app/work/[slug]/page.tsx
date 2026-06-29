import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { projects } from "@/lib/data";
import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.name,
    description: project.shortDesc,
  };
}

const categoryColors: Record<string, string> = {
  Web: "tag-web",
  Mobile: "tag-mobile",
  "AI & Automation": "tag-ai",
  "Internal Tool": "tag-tool",
};

const sectionGradient: Record<string, string> = {
  Web: "from-blue-900/30 via-[#080b14] to-[#080b14]",
  Mobile: "from-green-900/30 via-[#080b14] to-[#080b14]",
  "AI & Automation": "from-violet-900/30 via-[#080b14] to-[#080b14]",
  "Internal Tool": "from-orange-900/30 via-[#080b14] to-[#080b14]",
};

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const catColor = categoryColors[project.category] || "tag-web";
  const gradient = sectionGradient[project.category] || sectionGradient.Web;

  const idx = projects.findIndex((p) => p.slug === params.slug);
  const prevProject = idx > 0 ? projects[idx - 1] : null;
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className={`relative pt-32 pb-16 overflow-hidden bg-gradient-to-b ${gradient}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`tag ${catColor}`}>{project.category}</span>
            <span className="text-slate-500 text-xs">· {project.industry}</span>
          </div>

          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-4 leading-tight">
            {project.name}
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl">{project.shortDesc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main */}
            <div className="md:col-span-2 flex flex-col gap-10">
              {/* The Challenge */}
              <div className="glass-card p-8">
                <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-red-500/20 text-red-400 text-xs flex items-center justify-center font-bold">!</span>
                  The Challenge
                </h2>
                <p className="text-slate-300 leading-relaxed">{project.problem}</p>
              </div>

              {/* What We Built */}
              <div className="glass-card p-8">
                <h2 className="font-heading font-bold text-xl text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold">→</span>
                  What We Built
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.built.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              {project.result && (
                <div className="rounded-2xl bg-gradient-to-br from-brand-600/15 to-violet-600/10 border border-brand-500/20 p-8">
                  <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-green-500/20 text-green-400 text-xs flex items-center justify-center font-bold">✓</span>
                    The Outcome
                  </h2>
                  <p className="text-slate-200 leading-relaxed text-lg">{project.result}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Tech Stack */}
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-4 opacity-60">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="glass-card p-6 text-center">
                <p className="text-white font-semibold mb-2">Want something like this?</p>
                <p className="text-slate-400 text-sm mb-5">Let's talk about your project.</p>
                <Link href="/contact" className="btn-primary w-full text-center block text-sm">
                  Start a Project
                </Link>
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-16 grid grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="glass-card p-5 flex items-center gap-3 group"
              >
                <ArrowLeft size={18} className="text-slate-500 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Previous</p>
                  <p className="text-sm text-white font-semibold">{prevProject.name}</p>
                </div>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="glass-card p-5 flex items-center justify-end gap-3 group text-right ml-auto w-full"
              >
                <div>
                  <p className="text-xs text-slate-500 mb-1">Next</p>
                  <p className="text-sm text-white font-semibold">{nextProject.name}</p>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
