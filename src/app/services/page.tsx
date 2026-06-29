import Link from "next/link";
import { ArrowRight, CheckCircle, Bot, Globe, Smartphone, LayoutDashboard, Lightbulb, IndianRupee } from "lucide-react";
import CTABanner from "@/components/CTABanner";
import { prisma } from "../../../backend/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From AI automation to full-stack development — we build what your business actually needs.",
};

const iconMap: Record<string, React.ReactNode> = {
  "ai-automation": <Bot size={28} />,
  "web-development": <Globe size={28} />,
  "mobile-apps": <Smartphone size={28} />,
  "internal-tools": <LayoutDashboard size={28} />,
  "it-consulting": <Lightbulb size={28} />,
};

const gradientMap: Record<string, string> = {
  "ai-automation": "from-violet-600/20 to-purple-600/5 border-violet-500/20",
  "web-development": "from-blue-600/20 to-cyan-600/5 border-blue-500/20",
  "mobile-apps": "from-green-600/20 to-emerald-600/5 border-green-500/20",
  "internal-tools": "from-orange-600/20 to-amber-600/5 border-orange-500/20",
  "it-consulting": "from-rose-600/20 to-pink-600/5 border-rose-500/20",
};

const iconColorMap: Record<string, string> = {
  "ai-automation": "bg-violet-600/15 border-violet-500/25 text-violet-400",
  "web-development": "bg-blue-600/15 border-blue-500/25 text-blue-400",
  "mobile-apps": "bg-green-600/15 border-green-500/25 text-green-400",
  "internal-tools": "bg-orange-600/15 border-orange-500/25 text-orange-400",
  "it-consulting": "bg-rose-600/15 border-rose-500/25 text-rose-400",
};

export default async function ServicesPage() {
  const rawServices = await prisma.service.findMany({ orderBy: { createdAt: "asc" } });
  const services = rawServices.map(svc => ({
    ...svc,
    included: JSON.parse(svc.included) as string[],
    techStack: svc.techStack ? (JSON.parse(svc.techStack) as string[]) : undefined,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(100,65,245,0.15)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">Services</p>
          <h1 className="font-heading font-black text-5xl md:text-6xl text-white mb-6 leading-tight">
            Services We <span className="gradient-text">Offer</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            From AI automation to full-stack development — we build what your business actually needs.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          {services.map((svc, idx) => (
            <div
              id={svc.id}
              key={svc.id}
              className={`rounded-2xl border bg-gradient-to-br ${gradientMap[svc.id]} p-8 md:p-10 backdrop-blur-sm`}
            >
              <div className="grid md:grid-cols-5 gap-8 items-start">
                {/* Left: icon + title */}
                <div className="md:col-span-2">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${iconColorMap[svc.id]}`}>
                    {iconMap[svc.id]}
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
                    {svc.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    <span className="text-slate-300 font-medium">For: </span>
                    {svc.whoFor}
                  </p>
                  {svc.result && (
                    <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                      <p className="text-sm text-slate-300 italic">"{svc.result}"</p>
                    </div>
                  )}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-6 btn-primary text-sm"
                  >
                    {svc.cta} <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right: what's included */}
                <div className="md:col-span-3">
                  <h3 className="font-heading font-semibold text-white text-sm tracking-widest uppercase mb-4 opacity-60">
                    What&apos;s Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle size={15} className="text-brand-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {svc.techStack && (
                    <div className="mt-6">
                      <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {svc.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/[0.08]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing note */}
      <section className="py-20 bg-[#070a12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-600/15 border border-brand-500/25 flex items-center justify-center mx-auto mb-6">
            <IndianRupee size={26} className="text-brand-400" />
          </div>
          <h2 className="font-heading font-bold text-4xl text-white mb-6">
            How Our Pricing Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
            {[
              {
                num: "01",
                text: "Every project is scoped individually. We don't do one-size-fits-all pricing.",
              },
              {
                num: "02",
                text: "We give you a fixed quote before starting — no surprise bills at the end.",
              },
              {
                num: "03",
                text: "We offer milestone-based payment — you pay as we deliver, not all upfront.",
              },
            ].map((point) => (
              <div key={point.num} className="glass-card p-6">
                <p className="font-heading font-black text-4xl text-brand-600/30 mb-3">{point.num}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Talk to us about your project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
