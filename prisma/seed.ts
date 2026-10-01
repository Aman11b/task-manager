import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.task.deleteMany();

  await prisma.task.createMany({
    data: [
      {
        title: "Set up project repository",
        description: "Initialize Git and project structure",
        status: "COMPLETED",
        priority: "MEDIUM",
      },
      {
        title: "Learn Express middleware",
        description: "Understand request processing and error handling",
        status: "IN_PROGRESS",
        priority: "HIGH",
      },
      {
        title: "Write Prisma schema",
        description: null,
        status: "TODO",
        priority: "LOW",
        dueDate: new Date("2026-11-01T00:00:00.000Z"),
      },
    ],
  });

  console.log("Seed data created.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });