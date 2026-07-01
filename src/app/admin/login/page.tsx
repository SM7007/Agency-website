"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uname.trim() || !pass.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, pass }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#080b14]">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-600/10 blur-[80px] pointer-events-none" />
      
      {/* Dot grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-600 to-violet-500 rounded-xl mb-4 shadow-lg shadow-brand-500/20">
            <Lock className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-heading font-black text-white tracking-tight">
            A<span className="gradient-text font-semibold">iosen</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {/* Login Form Card */}
        <div className="glass-card p-8 md:p-10 relative overflow-hidden">
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-75" />

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <p className="flex-1">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="uname" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                  id="uname"
                  type="text"
                  required
                  disabled={loading}
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:bg-white/[0.04] transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pass" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:bg-white/[0.04] transition-all text-sm"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-brand-600/20 disabled:opacity-50 transition-all text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Log In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-slate-400 transition-colors inline-flex items-center gap-1"
          >
            ← Return to public website
          </a>
        </div>
      </div>
    </div>
  );
}
