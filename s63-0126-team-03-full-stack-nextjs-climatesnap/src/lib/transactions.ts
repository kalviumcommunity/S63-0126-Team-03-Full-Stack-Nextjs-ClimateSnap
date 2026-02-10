import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function addClimateDataTransaction() {
  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // STEP 1: climate data create
    const climate = await tx.climateData.create({
      data: {
        temperature: 32,
        rainfall: 8.5,
        airQuality: 150,
        cityId: 1,
        userId: 1,
        recordedAt: new Date(),
      },
    });

    // STEP 2: city fetch (update skipped as updatedAt is missing in schema)
    const city = await tx.city.findUnique({
      where: { id: 1 },
    });

    return { climate, city };
  });

  console.log("Transaction successful:", result);
}

export async function addClimateDataWithRollback() {
  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.climateData.create({
        data: {
          temperature: 45,
          rainfall: 2,
          airQuality: 220,
          cityId: 9999, // ❌ invalid cityId
          userId: 1,
          recordedAt: new Date(),
        },
      });

      // Update skipped
      /*
      await tx.city.update({
        where: { id: 1 },
        data: { updatedAt: new Date() },
      });
      */
    });
  } catch (error) {
    console.error("Transaction failed. Rolling back.", error);
  }
}

/*
// Example usage:
// (async () => {
//   await prisma.user.findMany({
//     include: {
//       climateData: true,
//     },
//   });

//   await prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       email: true,
//     },
//   });

//   await prisma.city.createMany({
//     data: [
//       { name: "Delhi", state: "Delhi" },
//       { name: "Bangalore", state: "Karnataka" },
//     ],
//     skipDuplicates: true,
//   });
  
//   await prisma.climateData.findMany({
//     skip: 0,
//     take: 10,
//     orderBy: { recordedAt: "desc" },
//   });
// })();
*/
