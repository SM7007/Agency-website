"use client";
import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import CTABanner from "@/components/CTABanner";

const categories = ["All", "Web", "Mobile", "AI & Automation", "Internal Tool"];

interface Project {
  slug: string;
  name: string;
  category: string;
  industry: string;
  stack: string[];
  shortDesc: string;
  problem: string;
  built: string[];
  result: string;
  featured: boolean;
  visible: boolean;
}

export default function WorkClient({ initialProjects }: { initialProjects: Project[] }) {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeTab);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(100,65,245,0.15)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">Portfolio</p>
          <h1 className="font-heading font-black text-5xl md:text-6xl text-white mb-6 leading-tight">
            Our <span className="gradient-text">Work</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Projects we've built for real clients across web, mobile, and AI.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-6 sticky top-16 z-20 bg-[#080b14]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === cat
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/[0.08]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No projects in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
