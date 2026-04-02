import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // Optional: clear existing islands
  await prisma.islands.deleteMany()

  await prisma.islands.createMany({
    data: [
      {
        name: "Atlantis",
        latitude: 25.0343,
        longitude: -77.3963,
        description: "Mythical island of great wealth and knowledge",
        discovery_date: new Date("1500-01-01"),
        disappeared_date: new Date("1600-01-01")
      },
      {
        name: "Hy-Brasil",
        latitude: 52.2297,
        longitude: -9.0578,
        description: "Phantom island off the west coast of Ireland",
        discovery_date: new Date("1325-01-01"),
        disappeared_date: new Date("1872-01-01")
      }
      // Add more unique entries here
    ]
  })
}

main()
  .then(() => {
    console.log("🌴 Islands seeded successfully!")
    return prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
