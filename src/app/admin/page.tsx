import Link from "next/link";
import { LayoutDashboard, Inbox, FolderKanban, Users, Settings, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "../../../backend/db";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const statusConfig: Record<string, { color: string; dot: string }> = {
  New: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", dot: "bg-yellow-400" },
  Contacted: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", dot: "bg-blue-400" },
  "In Progress": { color: "text-green-400 bg-green-400/10 border-green-400/20", dot: "bg-green-400" },
  Closed: { color: "text-red-400 bg-red-400/10 border-red-400/20", dot: "bg-red-400" },
};

export default async function AdminDashboard() {
  // Query statistics from SQLite database
  const totalEnquiries = await prisma.enquiry.count();
  
  // Calculate new enquiries in the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newThisWeek = await prisma.enquiry.count({
    where: {
      createdAt: {
        gte: oneWeekAgo,
      },
    },
  });

  const projectsCount = await prisma.project.count();
  const teamCount = await prisma.teamMember.count();

  const recentEnquiriesRaw = await prisma.enquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentEnquiries = recentEnquiriesRaw.map((e) => ({
    name: e.name,
    service: e.service,
    date: e.createdAt.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: e.status,
  }));

  const stats = [
    { label: "Total Enquiries", value: totalEnquiries.toString(), icon: <Inbox size={20} />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "New This Week", value: newThisWeek.toString(), icon: <TrendingUp size={20} />, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    { label: "Projects Listed", value: projectsCount.toString(), icon: <FolderKanban size={20} />, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Team Members", value: teamCount.toString(), icon: <Users size={20} />, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back — here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`glass-card p-5 flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="/admin/projects" className="btn-primary text-sm inline-flex items-center gap-2">
          + Add New Project
        </Link>
        <Link href="/admin/enquiries" className="btn-secondary text-sm inline-flex items-center gap-2">
          View New Enquiries
        </Link>
      </div>

      {/* Recent Enquiries Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="font-heading font-semibold text-white">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentEnquiries.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No enquiries received yet.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Name", "Service", "Date", "Status"].map((col) => (
                    <th key={col} className="text-left text-xs text-slate-500 font-semibold tracking-wider uppercase px-6 py-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((row, i) => {
                  const sc = statusConfig[row.status] || { color: "text-slate-400 bg-slate-400/10 border-slate-400/20", dot: "bg-slate-400" };
                  return (
                    <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-medium">{row.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{row.service}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
