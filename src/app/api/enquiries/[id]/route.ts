import { NextResponse } from "next/server";
import { prisma } from "../../../../../backend/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid enquiry ID" }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status field is required" }, { status: 400 });
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json({ error: error.message || "Failed to update enquiry" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid enquiry ID" }, { status: 400 });
    }

    await prisma.enquiry.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json({ error: error.message || "Failed to delete enquiry" }, { status: 500 });
  }
}
