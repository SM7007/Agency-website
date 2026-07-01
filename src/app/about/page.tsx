import TeamCard from "@/components/TeamCard";
import CTABanner from "@/components/CTABanner";
import { prisma } from "../../../backend/db";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small team of developers and tech enthusiasts based in Chennai, building real products for real businesses.",
};

const values = [
  {
    title: "Honest Communication",
    desc: "We tell you what's possible, what's not, and how long it'll actually take.",
    emoji: "🤝",
  },
  {
    title: "Quality Over Quantity",
    desc: "We don't take 10 projects at once. We focus on what we've committed to and do it well.",
    emoji: "⭐",
  },
  {
    title: "Long-Term Thinking",
    desc: "We build things that last — clean code, proper documentation, and systems you can maintain.",
    emoji: "🏗️",
  },
];

interface TeamMemberType {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  initial: string;
  color: string;
}

export default async function AboutPage() {
  const teamMembers = await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } }) as TeamMemberType[];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(100,65,245,0.15)_0%,transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">About Us</p>
          <h1 className="font-heading font-black text-5xl md:text-6xl text-white mb-6 leading-tight">
            Who <span className="gradient-text">We Are</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            A small team of developers and tech enthusiasts based in Chennai,
            building real products for real businesses.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">Our Story</p>
              <h2 className="font-heading font-bold text-4xl text-white mb-6 leading-tight">
                Built With a Simple Belief
              </h2>
              <div className="flex flex-col gap-4 text-slate-400 leading-relaxed">
                <p>
                  DevCraft Studio started with a simple belief — most small businesses and startups
                  deserve the same quality of technology that big companies have, without the big
                  company price tag.
                </p>
                <p>
                  We're a team of 4 — developers and a business specialist — who came together to
                  build digital products that actually solve problems. Every project we take is
                  something we care about delivering well.
                </p>
                <p>
                  Based in Chennai, we work with startups and growing businesses across India.
                </p>
              </div>
            </div>

            {/* Mission box */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-600/15 to-violet-600/10 border border-brand-500/20 p-10">
              <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">What Drives Us</p>
              <blockquote className="font-heading font-bold text-2xl text-white leading-snug">
                "We build technology that works — clean code, clear communication, and products
                delivered on time. No fluff. No excuses."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">The People</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
              Meet The Team
            </h2>
            <p className="text-slate-400 text-lg">4 people. Real skills. No outsourcing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">Our Values</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
              How We Work
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-8">
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{v.title}</h3>
                <p className="text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
