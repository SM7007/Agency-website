import Link from "next/link";

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-linkedin"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  initial: string;
  color: string;
}

export default function TeamCard({ name, role, bio, linkedin, initial, color }: TeamCardProps) {
  return (
    <div className="group glass-card p-6 flex flex-col items-center text-center gap-4">
      {/* Avatar */}
      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-heading font-bold text-2xl shadow-lg group-hover:scale-105 transition-transform duration-300`}>
        {initial}
      </div>

      <div>
        <h3 className="font-heading font-semibold text-white text-lg">{name}</h3>
        <p className="text-brand-400 text-sm font-medium mt-0.5">{role}</p>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed">{bio}</p>

      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 hover:bg-blue-600/20 hover:border-blue-500/40 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-200"
        aria-label={`${name} on LinkedIn`}
      >
        <LinkedinIcon size={16} />
      </a>
    </div>
  );
}
