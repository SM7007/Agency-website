"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from "lucide-react";

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

const CATEGORIES = ["Web", "Mobile", "AI & Automation", "Internal Tool"];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Web");
  const [industry, setIndustry] = useState("");
  const [stackStr, setStackStr] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [problem, setProblem] = useState("");
  const [builtStr, setBuiltStr] = useState("");
  const [result, setResult] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingProject(null);
    setSlug("");
    setName("");
    setCategory("Web");
    setIndustry("");
    setStackStr("");
    setShortDesc("");
    setProblem("");
    setBuiltStr("");
    setResult("");
    setFeatured(false);
    setIsModalOpen(true);
  }

  function openEditModal(project: Project) {
    setEditingProject(project);
    setSlug(project.slug);
    setName(project.name);
    setCategory(project.category);
    setIndustry(project.industry);
    setStackStr(project.stack.join(", "));
    setShortDesc(project.shortDesc);
    setProblem(project.problem);
    setBuiltStr(project.built.join("\n"));
    setResult(project.result);
    setFeatured(project.featured);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const projectData = {
      slug,
      name,
      category,
      industry,
      stack: stackStr.split(",").map(s => s.trim()).filter(Boolean),
      shortDesc,
      problem,
      built: builtStr.split("\n").map(s => s.trim()).filter(Boolean),
      result,
      featured,
      visible: editingProject ? editingProject.visible : true,
    };

    try {
      let res;
      if (editingProject) {
        // Edit existing project
        res = await fetch(`/api/projects/${editingProject.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      } else {
        // Create new project
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      }

      if (res.ok) {
        const savedProject = await res.json();
        if (editingProject) {
          setProjects(prev => prev.map(p => p.slug === editingProject.slug ? savedProject : p));
        } else {
          setProjects(prev => [savedProject, ...prev]);
        }
        setIsModalOpen(false);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to save project"}`);
      }
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Something went wrong while saving the project.");
    }
  }

  async function toggleVisibility(project: Project) {
    try {
      const updatedVisible = !project.visible;
      const res = await fetch(`/api/projects/${project.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...project,
          visible: updatedVisible,
        }),
      });

      if (res.ok) {
        setProjects(prev =>
          prev.map(p => (p.slug === project.slug ? { ...p, visible: updatedVisible } : p))
        );
      }
    } catch (err) {
      console.error("Error toggling project visibility:", err);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.slug !== slug));
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Portfolio Projects</h1>
          <p className="text-slate-500 text-sm mt-1">{projects.length} projects total</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm inline-flex items-center gap-2">
          <Plus size={16} />
          Add New Project
        </button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No projects found. Create one to get started!</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Name", "Category", "Industry", "Featured", "Visibility", "Actions"].map((col) => (
                    <th key={col} className="text-left text-xs text-slate-500 font-semibold tracking-wider uppercase px-5 py-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((row) => (
                  <tr key={row.slug} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${!row.visible ? "opacity-50" : ""}`}>
                    <td className="px-5 py-4">
                      <p className="text-sm text-white font-medium">{row.name}</p>
                      <p className="text-xs text-slate-500">slug: {row.slug}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/[0.08] text-slate-300">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">{row.industry}</td>
                    <td className="px-5 py-4">
                      {row.featured ? (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/25 text-violet-400">
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleVisibility(row)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                          row.visible
                            ? "text-green-400 bg-green-400/10 border-green-400/20"
                            : "text-slate-400 bg-white/5 border-white/[0.08]"
                        }`}
                      >
                        {row.visible ? (
                          <>
                            <Eye size={12} /> Visible
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} /> Hidden
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(row)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-brand-500/20 text-slate-400 hover:text-brand-400 flex items-center justify-center transition-all"
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(row.slug)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-all"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-10">
          <div className="bg-[#0d1117] border border-white/[0.1] rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl my-auto max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
              <h3 className="font-heading font-bold text-white text-lg">
                {editingProject ? `Edit Project: ${editingProject.name}` : "Create New Project"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm text-slate-300">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nature Fresh Grocery App"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Slug / Unique ID *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProject}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "-"))}
                    placeholder="e.g. nature-fresh-grocery"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#161b22] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500/40"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Industry *</label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Healthcare / Retail / SaaS"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Tech Stack (comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={stackStr}
                  onChange={(e) => setStackStr(e.target.value)}
                  placeholder="Next.js, Prisma, Tailwind, Stripe"
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Short Description *</label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="One sentence pitch of the project..."
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">The Problem *</label>
                <textarea
                  required
                  rows={2}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What was the client's problem, and what were the requirements?"
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">What We Built (one per line) *</label>
                <textarea
                  required
                  rows={3}
                  value={builtStr}
                  onChange={(e) => setBuiltStr(e.target.value)}
                  placeholder="Setup full n8n backend&#10;Integrated Stripe subscriptions&#10;Built dashboard UI"
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Result *</label>
                <input
                  type="text"
                  required
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="e.g. Delivered 3 connected portals within 4 weeks, client went live."
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  id="featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 text-brand-600 focus:ring-brand-500 bg-white/[0.04]"
                />
                <label htmlFor="featured" className="text-xs font-semibold uppercase cursor-pointer text-slate-300">
                  Feature this project on the homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm transition-colors text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-sm font-semibold text-white transition-colors"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
