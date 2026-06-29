import { NextResponse } from "next/server";
import { prisma } from "../../../../../backend/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { icon, title, shortDesc, whoFor, included, result, techStack, cta } = body;

    if (!title || !shortDesc || !whoFor || !included) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
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
      ...updated,
      included: JSON.parse(updated.included),
      techStack: updated.techStack ? JSON.parse(updated.techStack) : undefined,
    });
  } catch (error: any) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: error.message || "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.service.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: error.message || "Failed to delete service" }, { status: 500 });
  }
}
