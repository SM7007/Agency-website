"use client";
import { useState, useEffect } from "react";
import { Search, Eye, Trash2 } from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string | null;
  message: string;
  status: string;
  createdAt: string;
}

const statusConfig: Record<string, { color: string; dot: string }> = {
  New: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", dot: "bg-yellow-400" },
  Contacted: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", dot: "bg-blue-400" },
  "In Progress": { color: "text-green-400 bg-green-400/10 border-green-400/20", dot: "bg-green-400" },
  Closed: { color: "text-red-400 bg-red-400/10 border-red-400/20", dot: "bg-red-400" },
};

const allStatuses = ["All", "New", "Contacted", "In Progress", "Closed"];

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    try {
      const res = await fetch("/api/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error("Error loading enquiries:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: number, newStatus: string) {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setEnquiries(prev => prev.map(e => e.id === id ? updated : e));
        if (selected && selected.id === id) {
          setSelected(updated);
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (selected && selected.id === id) {
          setSelected(null);
        }
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  }

  const filtered = enquiries.filter((e) => {
    const matchFilter = filter === "All" || e.status === filter;
    const matchSearch =
      search === "" ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.service.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-white">Enquiries & Leads</h1>
        <p className="text-slate-500 text-sm mt-1">{enquiries.length} total enquiries</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === s
                  ? "bg-brand-600 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/[0.08]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs sm:ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading enquiries...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No enquiries found.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Name", "Service", "Budget", "Date", "Status", "Actions"].map((col) => (
                    <th key={col} className="text-left text-xs text-slate-500 font-semibold tracking-wider uppercase px-5 py-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const sc = statusConfig[row.status] || { color: "text-slate-400 bg-slate-400/10 border-slate-400/20", dot: "bg-slate-400" };
                  const formattedDate = new Date(row.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm text-white font-medium">{row.name}</p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                        <p className="text-xs text-slate-500">{row.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400 max-w-[180px] truncate">{row.service}</td>
                      <td className="px-5 py-4 text-xs text-slate-500">{row.budget || "N/A"}</td>
                      <td className="px-5 py-4 text-xs text-slate-500">{formattedDate}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelected(row)}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-brand-500/20 text-slate-400 hover:text-brand-400 flex items-center justify-center transition-all"
                            title="View details"
                          >
                            <Eye size={13} />
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
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-[#0d1117] border border-white/[0.1] rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-heading font-bold text-white text-lg">{selected.name}</h3>
                <p className="text-slate-500 text-sm">{selected.email} · {selected.phone}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors">✕</button>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex gap-3">
                <span className="text-slate-500 w-20 flex-shrink-0">Service:</span>
                <span className="text-slate-300">{selected.service}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-500 w-20 flex-shrink-0">Budget:</span>
                <span className="text-slate-300">{selected.budget || "N/A"}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-500 w-20 flex-shrink-0">Date:</span>
                <span className="text-slate-300">
                  {new Date(selected.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              
              <div className="flex gap-3 items-center mt-2">
                <span className="text-slate-500 w-20 flex-shrink-0">Status:</span>
                <select
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                  className="bg-[#161b22] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {allStatuses.filter(s => s !== "All").map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Message</p>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
