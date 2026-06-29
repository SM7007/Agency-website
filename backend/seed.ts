import { prisma } from "./db";
import { services, projects, teamMembers } from "../src/lib/data";
import { hashPassword } from "../src/lib/auth";

const initialEnquiries = [
  { name: "Arun Kumar", email: "arun@example.com", phone: "+91 99001 23456", service: "Full-Stack Web Development", budget: "₹75,000 – ₹1,50,000", status: "New", message: "We need a full ecommerce platform with payment integration. Timeline is 3 months." },
  { name: "Meera Singh", email: "meera@clinic.in", phone: "+91 98765 43210", service: "AI & WhatsApp Automation", budget: "₹25,000 – ₹75,000", status: "Contacted", message: "Looking for WhatsApp automation for appointment booking." },
  { name: "Ravi Shankar", email: "ravi@startup.io", phone: "+91 87654 32100", service: "Mobile App Development", budget: "Above ₹1,50,000", status: "In Progress", message: "Need a Flutter app for delivery tracking with real-time GPS." },
  { name: "Priya Nair", email: "priya@brand.co", phone: "+91 76543 21000", service: "IT Consulting / Tech Audit", budget: "Under ₹25,000", status: "New", message: "Our current system is slow. Need an audit and recommendations." },
  { name: "Karthik B", email: "karthik@co.in", phone: "+91 65432 10000", service: "Internal Tools & Admin Portal", budget: "Let's discuss", status: "Closed", message: "Custom CRM for our sales team." },
];

async function main() {
  console.log("Seeding started...");

  // 1. Seed Services
  console.log("Seeding services...");
  for (const svc of services) {
    await prisma.service.upsert({
      where: { id: svc.id },
      update: {},
      create: {
        id: svc.id,
        icon: svc.icon,
        title: svc.title,
        shortDesc: svc.shortDesc,
        whoFor: svc.whoFor,
        included: JSON.stringify(svc.included),
        result: svc.result || null,
        techStack: svc.techStack ? JSON.stringify(svc.techStack) : null,
        cta: svc.cta || "Get a Quote",
      },
    });
  }

  // 2. Seed Projects
  console.log("Seeding projects...");
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        industry: p.industry,
        stack: JSON.stringify(p.stack),
        shortDesc: p.shortDesc,
        problem: p.problem,
        built: JSON.stringify(p.built),
        result: p.result,
        featured: p.featured || false,
        visible: true,
      },
    });
  }

  // 3. Seed Team Members
  console.log("Seeding team members...");
  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: member.name },
    });
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio,
          linkedin: member.linkedin || "#",
          initial: member.initial,
          color: member.color,
        },
      });
    }
  }

  // 4. Seed Enquiries
  console.log("Seeding enquiries...");
  const enquiryCount = await prisma.enquiry.count();
  if (enquiryCount === 0) {
    for (const e of initialEnquiries) {
      await prisma.enquiry.create({
        data: e,
      });
    }
  }

  // 5. Seed Admin
  console.log("Seeding admin...");
  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    const hashedPassword = hashPassword("adminpassword123");
    await prisma.admin.create({
      data: {
        uname: "admin",
        pass: hashedPassword,
      },
    });
    console.log("Default admin account created: admin / adminpassword123");
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
