import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  id: string;
}

export default function ServiceCard({ icon, title, description, id }: ServiceCardProps) {
  return (
    <div className="group glass-card gradient-border p-6 flex flex-col gap-4 h-full">
      {/* Icon container */}
      <div className="w-12 h-12 rounded-xl bg-brand-600/10 border border-brand-600/20 flex items-center justify-center text-brand-400 group-hover:bg-brand-600/20 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <h3 className="font-heading font-semibold text-lg text-white">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-1">{description}</p>
      </div>

      <Link
        href={`/services#${id}`}
        className="flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors duration-200 group/btn"
      >
        Learn more
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
}
