import { NextResponse } from "next/server";
import { prisma } from "../../../../backend/db";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, message } = body;

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        service,
        budget: budget || null,
        message,
        status: "New",
      },
    });

    return NextResponse.json(enquiry);
  } catch (error: any) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json({ error: error.message || "Failed to submit enquiry" }, { status: 500 });
  }
}
