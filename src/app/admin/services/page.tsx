"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Bot, Globe, Smartphone, LayoutDashboard, Lightbulb } from "lucide-react";

interface Service {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  whoFor: string;
  included: string[];
  result: string | null;
  techStack?: string[];
  cta: string;
}

const ICONS: Record<string, React.ReactNode> = {
  Bot: <Bot size={16} />,
  Globe: <Globe size={16} />,
  Smartphone: <Smartphone size={16} />,
  LayoutDashboard: <LayoutDashboard size={16} />,
  Lightbulb: <Lightbulb size={16} />,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form states
  const [id, setId] = useState("");
  const [icon, setIcon] = useState("Bot");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [whoFor, setWhoFor] = useState("");
  const [includedStr, setIncludedStr] = useState("");
  const [result, setResult] = useState("");
  const [techStackStr, setTechStackStr] = useState("");
  const [cta, setCta] = useState("Get a Quote");

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingService(null);
    setId("");
    setIcon("Bot");
    setTitle("");
    setShortDesc("");
    setWhoFor("");
    setIncludedStr("");
    setResult("");
    setTechStackStr("");
    setCta("Get a Quote");
    setIsModalOpen(true);
  }

  function openEditModal(svc: Service) {
    setEditingService(svc);
    setId(svc.id);
    setIcon(svc.icon);
    setTitle(svc.title);
    setShortDesc(svc.shortDesc);
    setWhoFor(svc.whoFor);
    setIncludedStr(svc.included.join("\n"));
    setResult(svc.result || "");
    setTechStackStr(svc.techStack ? svc.techStack.join(", ") : "");
    setCta(svc.cta || "Get a Quote");
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const serviceData = {
      id,
      icon,
      title,
      shortDesc,
      whoFor,
      included: includedStr.split("\n").map(s => s.trim()).filter(Boolean),
      result: result.trim() || null,
      techStack: techStackStr ? techStackStr.split(",").map(s => s.trim()).filter(Boolean) : null,
      cta,
    };

    try {
      let res;
      if (editingService) {
        res = await fetch(`/api/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        });
      } else {
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        });
      }

      if (res.ok) {
        const saved = await res.json();
        if (editingService) {
          setServices(prev => prev.map(s => s.id === editingService.id ? saved : s));
        } else {
          setServices(prev => [...prev, saved]);
        }
        setIsModalOpen(false);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to save service"}`);
      }
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Something went wrong while saving the service.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Agency Services</h1>
          <p className="text-slate-500 text-sm mt-1">{services.length} services total</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm inline-flex items-center gap-2">
          <Plus size={16} />
          Add New Service
        </button>
      </div>

      {/* Grid */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No services found. Create one to get started!</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Service Info", "Icon", "Target Client (Who For)", "CTA Button", "Actions"].map((col) => (
                    <th key={col} className="text-left text-xs text-slate-500 font-semibold tracking-wider uppercase px-5 py-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm text-white font-medium">{row.title}</p>
                      <p className="text-xs text-slate-500">ID: {row.id}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-400">
                        {ICONS[row.icon] || <span>✨</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400 max-w-[200px] truncate">{row.whoFor}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/[0.08]">
                        {row.cta}
                      </span>
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
                          onClick={() => handleDelete(row.id)}
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
                {editingService ? `Edit Service: ${editingService.title}` : "Create New Service"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm text-slate-300">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Web Development"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Unique ID / Slug *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingService}
                    value={id}
                    onChange={(e) => setId(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "-"))}
                    placeholder="e.g. web-development"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Lucide Icon *</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="bg-[#161b22] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500/40"
                  >
                    {Object.keys(ICONS).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">CTA Text *</label>
                  <input
                    type="text"
                    required
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                    placeholder="e.g. Get a Quote"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="A short summary of what this service is..."
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Target Audience (Who For) *</label>
                <input
                  type="text"
                  required
                  value={whoFor}
                  onChange={(e) => setWhoFor(e.target.value)}
                  placeholder="e.g. Startups who need a product built from scratch..."
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">What's Included (one per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={includedStr}
                  onChange={(e) => setIncludedStr(e.target.value)}
                  placeholder="Custom web application development&#10;Ecommerce platforms&#10;Database design"
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Expected Outcome / Result (optional)</label>
                <input
                  type="text"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="e.g. Your business runs on autopilot. No missed leads."
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Tech Stack (comma-separated, optional)</label>
                <input
                  type="text"
                  value={techStackStr}
                  onChange={(e) => setTechStackStr(e.target.value)}
                  placeholder="Next.js, Node.js, PostgreSQL"
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
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
                  {editingService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
