import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname !== "/api/secret") return NextResponse.next();

  const key = req.headers.get("x-api-key");
  const expected = process.env.API_KEY;

  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/secret"]
};
