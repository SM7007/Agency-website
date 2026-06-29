import { NextResponse } from "next/server";
import { prisma } from "../../../../backend/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    const parsedProjects = projects.map((p) => ({
      ...p,
      stack: JSON.parse(p.stack),
      built: JSON.parse(p.built),
    }));

    return NextResponse.json(parsedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, name, category, industry, stack, shortDesc, problem, built, result, featured, visible } = body;

    if (!slug || !name || !category || !industry || !stack || !shortDesc || !problem || !built || !result) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        slug,
        name,
        category,
        industry,
        stack: typeof stack === "string" ? stack : JSON.stringify(stack),
        shortDesc,
        problem,
        built: typeof built === "string" ? built : JSON.stringify(built),
        result,
        featured: featured === undefined ? false : featured,
        visible: visible === undefined ? true : visible,
      },
    });

    return NextResponse.json({
      ...project,
      stack: JSON.parse(project.stack),
      built: JSON.parse(project.built),
    });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
