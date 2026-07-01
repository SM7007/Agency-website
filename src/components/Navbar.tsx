"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080b14]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-600/40 group-hover:shadow-brand-600/60 transition-shadow duration-300">
              <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none">
                <defs>
                  <linearGradient id="navGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop stop-color="#fff" />
                    <stop offset="1" stop-color="#e2e1ff" />
                  </linearGradient>
                </defs>
                <path d="M16 3L3 28H29L16 3Z" stroke="url(#navGrad)" stroke-width="2.5" stroke-linejoin="round" />
                <path d="M8 20H24" stroke="url(#navGrad)" stroke-width="2.5" stroke-linecap="round" />
                <path d="M23 10C26.5 10 28 12 28 14.5C28 17 26 18.5 23 18.5C19.5 18.5 17 20 17 23.5C17 26 19 28.5 22.5 28.5" stroke="url(#navGrad)" stroke-width="2.5" stroke-linecap="round" fill="none" />
              </svg>
            </div>
            <span className="font-heading font-bold text-lg text-white">
              A<span className="text-brand-400">iosen</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-primary text-sm">
              Start a Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1117]/98 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary text-sm text-center mt-2">
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
