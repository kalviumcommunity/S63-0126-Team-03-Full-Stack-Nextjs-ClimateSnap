import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Admin API stub. TODO: protect with ADMIN role and add admin endpoints.",
  });
}

