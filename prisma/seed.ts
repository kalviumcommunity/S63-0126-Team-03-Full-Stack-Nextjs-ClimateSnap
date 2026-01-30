import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@climatesnap.com",
      role: "ADMIN",
    },
  });

  const city = await prisma.city.create({
    data: {
      name: "Delhi",
      state: "Delhi",
    },
  });

  await prisma.climateData.create({
    data: {
      temperature: 32.5,
      rainfall: 10.2,
      airQuality: 180,
      recordedAt: new Date(),
      cityId: city.id,
      userId: user.id,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
