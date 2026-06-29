import { NextResponse } from "next/server";
import { prisma } from "../../../../../backend/db";

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const body = await request.json();
    const { name, category, industry, stack, shortDesc, problem, built, result, featured, visible } = body;

    if (!name || !category || !industry || !stack || !shortDesc || !problem || !built || !result) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await prisma.project.update({
      where: { slug },
      data: {
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
      ...updated,
      stack: JSON.parse(updated.stack),
      built: JSON.parse(updated.built),
    });
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    await prisma.project.delete({
      where: { slug },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 500 });
  }
}
