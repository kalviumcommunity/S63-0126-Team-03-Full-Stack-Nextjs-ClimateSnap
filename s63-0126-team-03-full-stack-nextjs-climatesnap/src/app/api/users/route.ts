import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Users API stub. TODO: implement user-facing endpoints.",
  });
}

