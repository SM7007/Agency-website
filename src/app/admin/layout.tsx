"use client";
import AdminSidebar from "@/components/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#080b14]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#080b14] flex">
      <AdminSidebar />
      <div className="ml-56 flex-1 p-8">
        {children}
      </div>
    </div>
  );
}

