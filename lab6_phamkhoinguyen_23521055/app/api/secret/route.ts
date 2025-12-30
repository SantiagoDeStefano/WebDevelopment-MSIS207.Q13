import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ secret: "Next.js is cool" });
}
