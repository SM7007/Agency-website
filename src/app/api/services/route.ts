import { NextResponse } from "next/server";
import { prisma } from "../../../../backend/db";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "asc" },
    });
    
    // Parse JSON strings back to arrays
    const parsedServices = services.map(svc => ({
      ...svc,
      included: JSON.parse(svc.included),
      techStack: svc.techStack ? JSON.parse(svc.techStack) : undefined,
    }));

    return NextResponse.json(parsedServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, icon, title, shortDesc, whoFor, included, result, techStack, cta } = body;

    if (!id || !title || !shortDesc || !whoFor || !included) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        id,
        icon,
        title,
        shortDesc,
        whoFor,
        included: typeof included === "string" ? included : JSON.stringify(included),
        result: result || null,
        techStack: techStack ? (typeof techStack === "string" ? techStack : JSON.stringify(techStack)) : null,
        cta: cta || "Get a Quote",
      },
    });

    return NextResponse.json({
      ...service,
      included: JSON.parse(service.included),
      techStack: service.techStack ? JSON.parse(service.techStack) : undefined,
    });
  } catch (error: any) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: error.message || "Failed to create service" }, { status: 500 });
  }
}
