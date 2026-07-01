"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";

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

const footerLinks = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "AI & Automation", href: "/services" },
    { label: "Web Development", href: "/services" },
    { label: "Mobile Apps", href: "/services" },
    { label: "Internal Tools", href: "/services" },
    { label: "IT Consulting", href: "/services" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-[#070a12] border-t border-white/[0.06] pt-16 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-violet-500 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none">
                  <defs>
                    <linearGradient id="footerGrad" x1="0" y1="0" x2="32" y2="32">
                      <stop stop-color="#fff" />
                      <stop offset="1" stop-color="#e2e1ff" />
                    </linearGradient>
                  </defs>
                  <path d="M16 3L3 28H29L16 3Z" stroke="url(#footerGrad)" stroke-width="2.5" stroke-linejoin="round" />
                  <path d="M8 20H24" stroke="url(#footerGrad)" stroke-width="2.5" stroke-linecap="round" />
                  <path d="M23 10C26.5 10 28 12 28 14.5C28 17 26 18.5 23 18.5C19.5 18.5 17 20 17 23.5C17 26 19 28.5 22.5 28.5" stroke="url(#footerGrad)" stroke-width="2.5" stroke-linecap="round" fill="none" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg text-white">
                A<span className="text-brand-400">iosen</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Full-stack web, mobile, and AI solutions for startups and growing
              businesses — built fast, built clean, built to scale.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917200670847"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:aiosenteam@gmail.com"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-500/20 border border-white/10 hover:border-brand-500/30 flex items-center justify-center text-slate-400 hover:text-brand-400 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading font-semibold text-white text-sm mb-4 tracking-wide">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2025 Aiosen. All rights reserved. Based in Chennai, India.
          </p>
          <p className="text-slate-600 text-xs">
            Built with Next.js · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
