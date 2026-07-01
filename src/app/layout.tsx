import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Aiosen — Digital Products That Actually Work",
    template: "%s | Aiosen",
  },
  description:
    "Full-stack web, mobile, and AI solutions for startups and growing businesses — built fast, built clean, built to scale.",
  keywords: ["web development", "mobile apps", "AI automation", "startup", "Chennai", "Next.js", "Flutter"],
  authors: [{ name: "Aiosen" }],
  openGraph: {
    title: "Aiosen",
    description: "Full-stack web, mobile, and AI solutions for startups.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080b14] text-slate-100 antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
