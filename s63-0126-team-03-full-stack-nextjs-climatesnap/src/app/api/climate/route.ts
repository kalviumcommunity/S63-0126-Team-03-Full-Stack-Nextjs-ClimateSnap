import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

type ClimateSummary = {
  cityId?: string;
  cityName: string;
  cityState?: string;
  latestReading: {
    id: string;
    temperature: number;
    rainfall: number;
    airQuality: number;
    recordedAt: string;
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam) || 10, 1), 100);

  try {
    const db = await getDb();
    const collection = db.collection("climateData");

    let docs = await collection
      .find({}, { projection: { _id: 1, cityName: 1, cityState: 1, temperature: 1, rainfall: 1, airQuality: 1, recordedAt: 1 } })
      .sort({ recordedAt: -1 })
      .limit(limit)
      .toArray();

    // If no data exists yet, seed a small set of Indian cities so the
    // dashboard and map have something to display in development.
    if (docs.length === 0) {
      const now = new Date();
      const seedDocs = [
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

      await collection.insertMany(seedDocs);

      docs = await collection
        .find({}, { projection: { _id: 1, cityName: 1, cityState: 1, temperature: 1, rainfall: 1, airQuality: 1, recordedAt: 1 } })
        .sort({ recordedAt: -1 })
        .limit(limit)
        .toArray();
    }

    const summaries: ClimateSummary[] = docs.map((doc: any) => ({
      cityId: doc.cityId?.toString(),
      cityName: doc.cityName ?? "Unknown city",
      cityState: doc.cityState,
      latestReading: {
        id: doc._id.toString(),
        temperature: doc.temperature ?? 0,
        rainfall: doc.rainfall ?? 0,
        airQuality: doc.airQuality ?? 0,
        recordedAt: (doc.recordedAt instanceof Date ? doc.recordedAt : new Date(doc.recordedAt ?? Date.now())).toISOString(),
      },
    }));

    return NextResponse.json({
      success: true,
      message: "Climate data fetched from MongoDB successfully",
      data: {
        items: summaries,
        count: summaries.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[GET /api/climate] Failed to fetch climate data from MongoDB", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch climate data",
        error: "INTERNAL_SERVER_ERROR",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

