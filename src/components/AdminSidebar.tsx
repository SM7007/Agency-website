"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Inbox, FolderKanban, Users, Settings, Layers, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { href: "/admin/enquiries", label: "Enquiries", icon: <Inbox size={16} /> },
    { href: "/admin/services", label: "Services", icon: <Layers size={16} /> },
    { href: "/admin/projects", label: "Projects", icon: <FolderKanban size={16} /> },
    { href: "/admin/team", label: "Team Members", icon: <Users size={16} /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <aside className="w-56 flex-shrink-0 bg-[#070a12] border-r border-white/[0.06] flex flex-col pt-8 pb-4 px-4 fixed top-0 left-0 h-full z-40">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-7 h-7 bg-gradient-to-br from-brand-600 to-violet-500 rounded-lg flex items-center justify-center">
          <Settings size={14} className="text-white" />
        </div>
        <span className="font-heading font-bold text-sm text-white">Admin Panel</span>
      </div>
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "text-white bg-white/10 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full text-left"
        >
          <LogOut size={16} />
          Logout
        </button>
        <Link href="/" className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 px-3 py-2 transition-colors">
          ← Back to Site
        </Link>
      </div>
    </aside>
  );
}
