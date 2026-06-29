import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("admin_session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    cookieStore.delete("admin_session");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.redirect(new URL("/admin/login", "http://localhost:3000"));
  }
}
