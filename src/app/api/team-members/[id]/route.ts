import { NextResponse } from "next/server";
import { prisma } from "../../../../../backend/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, role, bio, linkedin, initial, color } = body;

    if (!name || !role || !bio || !initial || !color) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        bio,
        linkedin: linkedin || "#",
        initial,
        color,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating team member:", error);
    return NextResponse.json({ error: error.message || "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.teamMember.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting team member:", error);
    return NextResponse.json({ error: error.message || "Failed to delete team member" }, { status: 500 });
  }
}
