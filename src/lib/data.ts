export const AGENCY_NAME = "Aiosen";
export const AGENCY_EMAIL = "aiosenteam@gmail.com";
export const AGENCY_WHATSAPP = "https://wa.me/917200670847";

export const services = [
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI & WhatsApp Automation",
    shortDesc:
      "WhatsApp AI agents, workflow automation, and intelligent systems that run your business without manual effort.",
    whoFor:
      "Startups, clinics, ecommerce brands, coaching centers — any business that loses customers due to slow responses or manual follow-ups.",
    included: [
      "WhatsApp AI agent setup (replies 24/7 automatically)",
      "Lead capture and qualification via WhatsApp",
      "Appointment booking automation",
      "Abandoned cart recovery (for ecommerce)",
      "n8n workflow automation for repetitive tasks",
      "Monthly maintenance and monitoring",
    ],
    result:
      "Your business runs on autopilot. No missed leads. No manual follow-up. No wasted time.",
    techStack: undefined as string[] | undefined,
    cta: "Get a Quote",
  },
  {
    id: "web-development",
    icon: "Globe",
    title: "Full-Stack Web Development",
    shortDesc:
      "Full-stack web applications, ecommerce platforms, admin dashboards, and internal tools built with modern stacks.",
    whoFor:
      "Startups who need a product built from scratch, or businesses who need to upgrade their current web platform.",
    included: [
      "Custom web application development",
      "Ecommerce platforms with payment integration",
      "Admin dashboards and analytics portals",
      "REST API and backend development",
      "Database design and management",
      "Deployment and hosting setup",
      "1 month post-launch support",
    ],
    result: "",
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Stripe", "Vercel"],
    cta: "Get a Quote",
  },
  {
    id: "mobile-apps",
    icon: "Smartphone",
    title: "Mobile App Development",
    shortDesc:
      "Cross-platform mobile apps using Flutter — from GPS tracking systems to customer-facing ordering apps.",
    whoFor:
      "Businesses that need a customer-facing mobile app or an internal team app.",
    included: [
      "Cross-platform app (iOS + Android) using Flutter",
      "GPS and location-based features",
      "Push notification system",
      "OTP and authentication",
      "Admin panel to manage app content",
      "Play Store / App Store deployment support",
    ],
    result: "",
    techStack: undefined as string[] | undefined,
    cta: "Get a Quote",
  },
  {
    id: "internal-tools",
    icon: "LayoutDashboard",
    title: "Internal Tools & Admin Portals",
    shortDesc:
      "Custom CRM systems, HR tools, inventory management, and analytics dashboards — owned by you, no monthly SaaS fee.",
    whoFor:
      "Startups that are paying too much for SaaS tools that don't fit their workflow.",
    included: [
      "Custom CRM systems",
      "HR and attendance management tools",
      "Inventory management systems",
      "Custom reporting and analytics dashboards",
      "Role-based access control",
      "Fully owned by you — no monthly SaaS fee",
    ],
    result: "",
    techStack: undefined as string[] | undefined,
    cta: "Get a Quote",
  },
  {
    id: "it-consulting",
    icon: "Lightbulb",
    title: "IT Consulting & Tech Audit",
    shortDesc:
      "We audit your current tech setup and tell you exactly what to fix, what to build, and where to invest.",
    whoFor:
      "Businesses that already have a product but feel something is broken, slow, or costing too much.",
    included: [
      "Full tech stack audit",
      "Security review",
      "Performance bottleneck identification",
      "Written report with fix recommendations",
      "Roadmap for next 3-6 months",
    ],
    result:
      "A clear, plain-English report that tells you exactly what's wrong and how to fix it.",
    techStack: undefined as string[] | undefined,
    cta: "Book an Audit",
  },
];

export const projects = [
  {
    slug: "ecommerce-platform",
    name: "Ecommerce Platform",
    category: "Web",
    industry: "Ecommerce / Retail",
    stack: ["Next.js 15", "React 19", "Stripe", "PostgreSQL", "Vercel"],
    shortDesc: "Production-ready ecommerce store handling real transactions.",
    problem:
      "Client needed a complete ecommerce store with modern payment integration, live inventory updates, and a full admin panel.",
    built: [
      "Full product catalog with filtering and search",
      "Live stock update system",
      "Stripe payment gateway integration",
      "JWT-authenticated admin portal",
      "SSR with Next.js for fast loading and SEO",
      "Deployed on Vercel",
    ],
    result:
      "Production-ready ecommerce store handling real transactions — deployed and live.",
    featured: true,
  },
  {
    slug: "nature-fresh-food",
    name: "Nature Fresh Food",
    category: "Web",
    industry: "Food & Grocery",
    stack: ["Node.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Cloudinary"],
    shortDesc: "Complete grocery ordering platform with customer and admin portals.",
    problem:
      "A fresh food business needed a complete digital ordering system with separate portals for customers and admins.",
    built: [
      "Customer ordering portal",
      "Full admin dashboard (orders, products, users)",
      "Backend API with JWT auth + role-based access",
      "Cloudinary for product image management",
      "Automated email notifications",
    ],
    result:
      "3 connected portals (user, admin, backend) running live for the client.",
    featured: true,
  },
  {
    slug: "one-more-mile",
    name: "One More Mile",
    category: "Mobile",
    industry: "Health & Fitness",
    stack: ["Flutter", "Go Fiber", "PostgreSQL"],
    shortDesc: "GPS fitness rewards app connecting users and merchants.",
    problem:
      "People need motivation to exercise. Merchants want to reward active customers. No existing app connected both.",
    built: [
      "GPS-based walking/running tracker",
      "Real-time step count, speed, distance tracking",
      "Challenge system — complete distance, earn rewards",
      "QR-based reward redemption at merchant stores",
      "4 user roles: User, Merchant, Employee, Admin",
      "OTP login, subscription system",
    ],
    result:
      "A complete fitness reward ecosystem connecting users and merchants through real GPS-tracked challenges.",
    featured: true,
  },
  {
    slug: "larsunlab",
    name: "Larsunlab",
    category: "Internal Tool",
    industry: "Laboratory / Healthcare",
    stack: ["Node.js", "Prisma", "PostgreSQL"],
    shortDesc: "Digital lab management platform with admin and user portals.",
    problem:
      "A lab needed a digital platform with separate portals for users and admins to manage operations efficiently.",
    built: [
      "Admin management portal",
      "User-facing portal",
      "Backend API with Prisma ORM",
      "Role-based access for admin vs users",
    ],
    result: "",
    featured: false,
  },
  {
    slug: "neuhealthcare",
    name: "NeuHealthcare",
    category: "Web",
    industry: "Healthcare",
    stack: ["Next.js", "React"],
    shortDesc: "Modern healthcare web platform with clean, accessible UI.",
    problem:
      "Healthcare client needed a modern, fast web platform for their services.",
    built: [
      "Full responsive Next.js frontend",
      "Clean, accessible UI for healthcare context",
      "SEO optimized, fast page loads",
    ],
    result: "",
    featured: false,
  },
  {
    slug: "jarvis-voice-assistant",
    name: "JARVIS Voice AI Assistant",
    category: "AI & Automation",
    industry: "Personal / AI",
    stack: ["Python", "Claude API", "Porcupine", "Kivy", "Android"],
    shortDesc: "Android voice assistant with Tanglish support and phone control.",
    problem:
      "Existing voice assistants don't understand Tamil + English (Tanglish) naturally and can't control phone functions.",
    built: [
      "Android voice assistant with custom wake word",
      "Claude AI integration for smart responses",
      "Tanglish language support",
      "Phone control via voice (calls, SMS, apps)",
    ],
    result:
      "A fully working JARVIS-style assistant built for Tamil speakers.",
    featured: false,
  },
  {
    slug: "resume-analyzer",
    name: "Resume Analyzer & Job Match",
    category: "AI & Automation",
    industry: "HR / Career Tech",
    stack: ["Python", "NLP", "AI"],
    shortDesc: "AI that matches resumes to job descriptions and suggests improvements.",
    problem:
      "Job seekers waste hours applying to jobs their resume doesn't match.",
    built: [
      "AI that reads resume + job description",
      "Gives a match score",
      "Suggests specific improvements",
      "Open source — available on GitHub",
    ],
    result:
      "Helps candidates fix their resume before applying, saving hours of wasted effort.",
    featured: false,
  },
];

export const teamMembers = [
  {
    name: "Krishna",
    role: "Full-Stack Developer & CTO",
    bio: "Leads architecture and backend systems. Builds fast, clean, and scalable.",
    linkedin: "#",
    initial: "K",
    color: "from-violet-500 to-indigo-600",
  },
  {
    name: "Siva",
    role: "Frontend Developer",
    bio: "Crafts pixel-perfect UIs and smooth user experiences across web and mobile.",
    linkedin: "#",
    initial: "S",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Priya",
    role: "Mobile & AI Developer",
    bio: "Specializes in Flutter apps and AI integrations that solve real problems.",
    linkedin: "#",
    initial: "P",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Rahul",
    role: "Business & Client Strategy",
    bio: "Bridges the gap between client needs and technical delivery. Keeps projects on track.",
    linkedin: "#",
    initial: "R",
    color: "from-amber-500 to-orange-600",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Aiosen was smooth from start to finish. They understood exactly what we needed and delivered on time.",
    name: "Arun Kumar",
    role: "Founder, NatureFresh Foods",
    initial: "A",
  },
  {
    quote:
      "They built our entire ordering platform in weeks. The quality was excellent and communication was always clear.",
    name: "Meera Raj",
    role: "CEO, Larsun Labs",
    initial: "M",
  },
  {
    quote:
      "The One More Mile app idea came to me and Aiosen turned it into a real product. Amazing team to work with.",
    name: "Vijay Anand",
    role: "Founder, One More Mile",
    initial: "V",
  },
];
