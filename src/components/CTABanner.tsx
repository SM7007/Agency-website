import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CTABanner({
  heading = "Have a Project in Mind?",
  sub = "Let's talk. We'll scope it, price it, and get started within a week.",
  ctaLabel = "Get a Free Consultation",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0d0618] to-[#080b14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,65,245,0.15)_0%,transparent_70%)]" />
      {/* Animated orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-violet-600/15 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
          Available for New Projects
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {heading}
        </h2>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">{sub}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-brand-600/40 hover:-translate-y-1 group"
        >
          {ctaLabel}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
}
