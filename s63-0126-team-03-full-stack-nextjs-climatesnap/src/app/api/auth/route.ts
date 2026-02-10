import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Auth API stub. TODO: implement signup/login handlers.",
  });
}

