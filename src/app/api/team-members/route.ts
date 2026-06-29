import { NextResponse } from "next/server";
import { prisma } from "../../../../backend/db";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, bio, linkedin, initial, color } = body;

    if (!name || !role || !bio || !initial || !color) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        bio,
        linkedin: linkedin || "#",
        initial,
        color,
      },
    });

    return NextResponse.json(member);
  } catch (error: any) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: error.message || "Failed to create team member" }, { status: 500 });
  }
}
