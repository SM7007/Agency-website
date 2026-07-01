"use client";
import { useState } from "react";
import { Mail, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

const services = [
  "AI & WhatsApp Automation",
  "Full-Stack Web Development",
  "Mobile App Development",
  "Internal Tools & Admin Portal",
  "IT Consulting / Tech Audit",
  "Not sure yet",
];

const budgets = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹1,50,000",
  "Above ₹1,50,000",
  "Let's discuss",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(100,65,245,0.15)_0%,transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
          <h1 className="font-heading font-black text-5xl md:text-6xl text-white mb-6 leading-tight">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Together</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Tell us about your project. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Form */}
            <div className="md:col-span-3">
              {submitted ? (
                <div className="glass-card p-12 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-white">Message Sent!</h2>
                  <p className="text-slate-400 leading-relaxed max-w-sm">
                    Thanks! We've received your message. We'll get back to you within 24 hours.
                    For urgent enquiries, WhatsApp us directly.
                  </p>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 mt-2"
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass-card p-8 flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm text-slate-300 font-medium">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="bg-white/[0.04] border border-white/[0.1] hover:border-brand-500/40 focus:border-brand-500/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm text-slate-300 font-medium">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="bg-white/[0.04] border border-white/[0.1] hover:border-brand-500/40 focus:border-brand-500/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm text-slate-300 font-medium">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 99999 99999"
                      className="bg-white/[0.04] border border-white/[0.1] hover:border-brand-500/40 focus:border-brand-500/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 transition-colors duration-200"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className="text-sm text-slate-300 font-medium">
                        Service Needed <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        className="bg-[#0d1117] border border-white/[0.1] hover:border-brand-500/40 focus:border-brand-500/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors duration-200"
                      >
                        <option value="" disabled selected>Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="budget" className="text-sm text-slate-300 font-medium">
                        Budget Range <span className="text-slate-500 text-xs">(optional)</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="bg-[#0d1117] border border-white/[0.1] hover:border-brand-500/40 focus:border-brand-500/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors duration-200"
                      >
                        <option value="">Select a range</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-slate-300 font-medium">
                      Project Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project, what problem you're solving, and any deadline you have in mind..."
                      className="bg-white/[0.04] border border-white/[0.1] hover:border-brand-500/40 focus:border-brand-500/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2 flex flex-col gap-5">
              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Chat on WhatsApp</h3>
                  <p className="text-slate-400 text-sm mb-3">For quick questions and instant replies.</p>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                  >
                    Open WhatsApp →
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Send an Email</h3>
                  <p className="text-slate-400 text-sm mb-3">For detailed project briefs.</p>
                  <a
                    href="mailto:hello@aiosen.com"
                    className="text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
                  >
                    hello@aiosen.com →
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Response Time</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We typically respond within <span className="text-white font-medium">24 hours</span> on working days.
                  </p>
                </div>
              </div>

              {/* Location card */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-2">📍 Based In</h3>
                <p className="text-slate-400 text-sm">
                  Chennai, Tamil Nadu, India.<br />
                  Working with clients across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
