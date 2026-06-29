import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  name: string;
  category: string;
  industry: string;
  stack: string[];
  shortDesc: string;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  Web: "tag-web",
  Mobile: "tag-mobile",
  "AI & Automation": "tag-ai",
  "Internal Tool": "tag-tool",
};

const categoryGradient: Record<string, string> = {
  Web: "from-blue-600/20 to-cyan-600/10",
  Mobile: "from-green-600/20 to-emerald-600/10",
  "AI & Automation": "from-violet-600/20 to-purple-600/10",
  "Internal Tool": "from-orange-600/20 to-amber-600/10",
};

export default function ProjectCard({
  slug,
  name,
  category,
  industry,
  stack,
  shortDesc,
}: ProjectCardProps) {
  const colorClass = categoryColors[category] || "tag-web";
  const gradientClass = categoryGradient[category] || "from-blue-600/20 to-cyan-600/10";

  return (
    <div className="group glass-card gradient-border overflow-hidden flex flex-col h-full">
      {/* Card header/visual */}
      <div
        className={`relative h-44 bg-gradient-to-br ${gradientClass} flex items-center justify-center border-b border-white/[0.06] overflow-hidden`}
      >
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 text-center px-4">
          <p className="font-heading font-bold text-2xl text-white/80 mb-1">{name}</p>
          <p className="text-xs text-white/40">{industry}</p>
        </div>
        {/* Glow circle */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`tag ${colorClass}`}>{category}</span>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">{shortDesc}</p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/[0.08]"
            >
              {tech}
            </span>
          ))}
          {stack.length > 4 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-500 border border-white/[0.08]">
              +{stack.length - 4} more
            </span>
          )}
        </div>

        <Link
          href={`/work/${slug}`}
          className="flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors duration-200 group/btn"
        >
          View Details
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
