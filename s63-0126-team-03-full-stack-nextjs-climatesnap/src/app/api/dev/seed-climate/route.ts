import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

type SeedDoc = {
  cityName: string;
  cityState: string;
  temperature: number;
  rainfall: number;
  airQuality: number;
  recordedAt: Date;
};

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection<SeedDoc>("climateData");

    // Clear existing documents (dev only!)
    await collection.deleteMany({});

    const now = new Date();

    const docs: SeedDoc[] = [
      {
        cityName: "Delhi",
        cityState: "Delhi",
        temperature: 34.5,
        rainfall: 2.1,
        airQuality: 210,
        recordedAt: now,
      },
      {
        cityName: "Mumbai",
        cityState: "Maharashtra",
        temperature: 30.2,
        rainfall: 12.3,
        airQuality: 120,
        recordedAt: now,
      },
      {
        cityName: "Bengaluru",
        cityState: "Karnataka",
        temperature: 26.8,
        rainfall: 6.4,
        airQuality: 80,
        recordedAt: now,
      },
      {
        cityName: "Chennai",
        cityState: "Tamil Nadu",
        temperature: 32.1,
        rainfall: 8.7,
        airQuality: 130,
        recordedAt: now,
      },
      {
        cityName: "Kolkata",
        cityState: "West Bengal",
        temperature: 31.4,
        rainfall: 10.2,
        airQuality: 160,
        recordedAt: now,
      },
      {
        cityName: "Hyderabad",
        cityState: "Telangana",
        temperature: 29.9,
        rainfall: 4.5,
        airQuality: 140,
        recordedAt: now,
      },
      {
        cityName: "Ahmedabad",
        cityState: "Gujarat",
        temperature: 33.0,
        rainfall: 1.8,
        airQuality: 190,
        recordedAt: now,
      },
      {
        cityName: "Pune",
        cityState: "Maharashtra",
        temperature: 27.3,
        rainfall: 7.1,
        airQuality: 95,
        recordedAt: now,
      },
      {
        cityName: "Jaipur",
        cityState: "Rajasthan",
        temperature: 35.2,
        rainfall: 0.9,
        airQuality: 180,
        recordedAt: now,
      },
    ];

    const result = await collection.insertMany(docs);

    return NextResponse.json({
      success: true,
      message: "Seeded Indian climate data into MongoDB (dev only).",
      data: {
        insertedCount: result.insertedCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[GET /api/dev/seed-climate] Failed to seed MongoDB", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed climate data",
        error: "INTERNAL_SERVER_ERROR",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

