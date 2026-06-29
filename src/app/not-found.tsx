import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-heading font-black text-9xl text-brand-600/20 mb-4">404</p>
        <h1 className="font-heading font-bold text-3xl text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
