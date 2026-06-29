import Link from "next/link";
import { ArrowRight, ChevronDown, Zap, Globe, Smartphone, LayoutDashboard, Lightbulb, Bot, CheckCircle, Star } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import TeamCard from "@/components/TeamCard";
import CTABanner from "@/components/CTABanner";
import { testimonials } from "@/lib/data";
import { prisma } from "../../backend/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevCraft Studio — Digital Products That Actually Work",
  description:
    "Full-stack web, mobile, and AI solutions for startups and growing businesses — built fast, built clean, built to scale.",
};

const serviceIconMap: Record<string, React.ReactNode> = {
  "ai-automation": <Bot size={22} />,
  "web-development": <Globe size={22} />,
  "mobile-apps": <Smartphone size={22} />,
  "internal-tools": <LayoutDashboard size={22} />,
  "it-consulting": <Lightbulb size={22} />,
};

const whyUs = [
  {
    title: "We Move Fast",
    desc: "We don't spend 6 months planning. We scope, build, and ship your product in weeks — not quarters.",
    icon: <Zap size={20} className="text-brand-400" />,
  },
  {
    title: "We Think Like Founders",
    desc: "We've built real products for real clients. We understand startup pressure, budget limits, and what actually matters.",
    icon: <Star size={20} className="text-amber-400" />,
  },
  {
    title: "Full-Stack Team",
    desc: "One team handles everything — frontend, backend, mobile, AI, and deployment. No handoff chaos.",
    icon: <CheckCircle size={20} className="text-green-400" />,
  },
];

export default async function HomePage() {
  const rawServices = await prisma.service.findMany({ orderBy: { createdAt: "asc" } });
  const services = rawServices.map(svc => ({
    ...svc,
    included: JSON.parse(svc.included) as string[],
    techStack: svc.techStack ? (JSON.parse(svc.techStack) as string[]) : undefined,
  }));

  const rawProjects = await prisma.project.findMany({
    where: { visible: true },
    orderBy: { createdAt: "desc" },
  });
  const projects = rawProjects.map((p) => ({
    ...p,
    stack: JSON.parse(p.stack) as string[],
    built: JSON.parse(p.built) as string[],
  }));

  const teamMembers = await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } });

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* ────── HERO ────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#080b14]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(100,65,245,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(168,85,247,0.12)_0%,transparent_60%)]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-32 left-[10%] w-72 h-72 bg-brand-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-24 right-[10%] w-96 h-96 bg-violet-600/8 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Available for New Projects — Based in Chennai
          </div>

          {/* Headline */}
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 tracking-tight animate-slide-up">
            We Build Digital{" "}
            <span className="gradient-text block">Products That</span>
            Actually Work
          </h1>

          {/* Sub */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Full-stack web, mobile, and AI solutions for startups and growing
            businesses — built fast, built clean, built to scale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-brand-600/40 hover:-translate-y-1 group"
            >
              Start a Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/work"
              className="btn-secondary inline-flex items-center gap-2"
            >
              See Our Work
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { num: "7+", label: "Projects Shipped" },
              { num: "4", label: "Team Members" },
              { num: "100%", label: "Client Focus" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading font-bold text-3xl text-white">{stat.num}</p>
                <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* ────── SERVICES ────── */}
      <section className="section-pad relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(100,65,245,0.07)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
              Everything Your Startup Needs
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From idea to deployment — we cover every technical layer your business requires.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <ServiceCard
                key={svc.id}
                id={svc.id}
                icon={serviceIconMap[svc.id]}
                title={svc.title}
                description={svc.shortDesc}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ────── WHY US ────── */}
      <section className="section-pad relative bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">Why Choose Us</p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
                Why Startups Work With Us
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                We're not a big agency with layers of management. We're a focused team that
                cares deeply about the products we build.
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Meet the Team <ArrowRight size={16} />
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {whyUs.map((item) => (
                <div key={item.title} className="glass-card p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── FEATURED PROJECTS ────── */}
      <section className="section-pad relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(100,65,245,0.07)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">Portfolio</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
              Work We're Proud Of
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Real projects. Real problems solved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/work" className="btn-secondary inline-flex items-center gap-2">
              See All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ────── TESTIMONIALS ────── */}
      <section className="section-pad bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
              What Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card p-6 flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.06]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── TEAM PREVIEW ────── */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">The Team</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
              The Team Behind The Work
            </h2>
            <p className="text-slate-400 text-lg">
              4 people. Real skills. No outsourcing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
              Meet The Full Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ────── CTA BANNER ────── */}
      <CTABanner />
    </>
  );
}
