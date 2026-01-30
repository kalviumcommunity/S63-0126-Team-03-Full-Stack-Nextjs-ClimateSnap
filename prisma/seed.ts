import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@climatesnap.com" },
    update: {
      name: "Admin User",
      role: Role.ADMIN,
    },
    create: {
      name: "Admin User",
      email: "admin@climatesnap.com",
      role: Role.ADMIN,
    },
  });

  const city = await prisma.city.upsert({
    where: {
      name_state: {
        name: "Delhi",
        state: "Delhi",
      },
    },
    update: {},
    create: {
      name: "Delhi",
      state: "Delhi",
    },
  });

  // Use a deterministic timestamp so the seed is safely re-runnable.
  const recordedAt = new Date("2026-01-01T00:00:00.000Z");

  const existing = await prisma.climateData.findFirst({
    where: {
      cityId: city.id,
      userId: admin.id,
      recordedAt,
    },
  });

  if (!existing) {
    await prisma.climateData.create({
      data: {
        temperature: 32.5,
        rainfall: 10.2,
        airQuality: 180,
        recordedAt,
        cityId: city.id,
        userId: admin.id,
      },
    });
  }

  console.log(
    `Seed complete. adminId=${admin.id}, cityId=${city.id}, climateDataInserted=${existing ? 0 : 1}`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
