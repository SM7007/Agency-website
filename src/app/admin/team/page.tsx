"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, ExternalLink } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  initial: string;
  color: string;
}

const COLOR_PRESETS = [
  { label: "Purple-Indigo", value: "from-violet-500 to-indigo-600" },
  { label: "Cyan-Blue", value: "from-cyan-500 to-blue-600" },
  { label: "Pink-Rose", value: "from-pink-500 to-rose-600" },
  { label: "Amber-Orange", value: "from-amber-500 to-orange-600" },
  { label: "Emerald-Teal", value: "from-emerald-500 to-teal-600" },
];

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("#");
  const [initial, setInitial] = useState("");
  const [color, setColor] = useState("from-violet-500 to-indigo-600");

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/team-members");
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (err) {
      console.error("Error loading team members:", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingMember(null);
    setName("");
    setRole("");
    setBio("");
    setLinkedin("#");
    setInitial("");
    setColor("from-violet-500 to-indigo-600");
    setIsModalOpen(true);
  }

  function openEditModal(member: TeamMember) {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setBio(member.bio);
    setLinkedin(member.linkedin || "#");
    setInitial(member.initial);
    setColor(member.color);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalInitial = initial.trim() || name.charAt(0).toUpperCase();
    const memberData = {
      name,
      role,
      bio,
      linkedin: linkedin.trim() || "#",
      initial: finalInitial,
      color,
    };

    try {
      let res;
      if (editingMember) {
        res = await fetch(`/api/team-members/${editingMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memberData),
        });
      } else {
        res = await fetch("/api/team-members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memberData),
        });
      }

      if (res.ok) {
        const saved = await res.json();
        if (editingMember) {
          setMembers(prev => prev.map(m => m.id === editingMember.id ? saved : m));
        } else {
          setMembers(prev => [...prev, saved]);
        }
        setIsModalOpen(false);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to save team member"}`);
      }
    } catch (err) {
      console.error("Error saving team member:", err);
      alert("Something went wrong while saving.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/team-members/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMembers(prev => prev.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error("Error deleting team member:", err);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">Team Members</h1>
          <p className="text-slate-500 text-sm mt-1">{members.length} team members total</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm inline-flex items-center gap-2">
          <Plus size={16} />
          Add Member
        </button>
      </div>

      {/* Grid List */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading team members...</div>
          ) : members.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No team members found. Add one to get started!</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Avatar / Initial", "Name", "Role", "Bio", "LinkedIn", "Actions"].map((col) => (
                    <th key={col} className="text-left text-xs text-slate-500 font-semibold tracking-wider uppercase px-5 py-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${row.color} flex items-center justify-center text-white font-heading font-black text-lg`}>
                        {row.initial}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-white font-medium">{row.name}</td>
                    <td className="px-5 py-4 text-xs text-slate-400">{row.role}</td>
                    <td className="px-5 py-4 text-xs text-slate-500 max-w-[250px] truncate">{row.bio}</td>
                    <td className="px-5 py-4">
                      {row.linkedin !== "#" ? (
                        <a href={row.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink size={16} />
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
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
          <div className="bg-[#0d1117] border border-white/[0.1] rounded-2xl p-8 max-w-xl w-full mx-4 shadow-2xl my-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
              <h3 className="font-heading font-bold text-white text-lg">
                {editingMember ? `Edit Member: ${editingMember.name}` : "Add Team Member"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm text-slate-300">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Siva Shankar"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Avatar Initial *</label>
                  <input
                    type="text"
                    maxLength={1}
                    value={initial}
                    onChange={(e) => setInitial(e.target.value.toUpperCase())}
                    placeholder="e.g. S"
                    className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Role *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Frontend Developer & UI Designer"
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Bio *</label>
                <textarea
                  required
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about their expertise and style..."
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">LinkedIn Profile Link</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="e.g. https://linkedin.com/in/username"
                  className="bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold uppercase">Avatar Color Preset *</label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-[#161b22] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500/40"
                >
                  {COLOR_PRESETS.map(preset => (
                    <option key={preset.value} value={preset.value}>{preset.label}</option>
                  ))}
                </select>
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
                  {editingMember ? "Save Changes" : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
