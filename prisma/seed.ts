import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.islands.deleteMany()

  const islands = [
    {
      name: "Atlantis",
      latitude: 25.0343,
      longitude: -77.3963,
      description: "Mythical island of great wealth and advanced civilization, first described by Plato. Said to have sunk beneath the sea in a single day and night of misfortune.",
      discovery_date: new Date("1500-01-01"),
      disappeared_date: new Date("1600-01-01")
    },
    {
      name: "Hy-Brasil",
      latitude: 52.2297,
      longitude: -9.0578,
      description: "Phantom island off the west coast of Ireland. Appears on maps from the 14th century as a mysterious land that could never be reached.",
      discovery_date: new Date("1325-01-01"),
      disappeared_date: new Date("1872-01-01")
    },
    {
      name: "Sandy Island",
      latitude: -19.9333,
      longitude: 152.5833,
      description: "A phantom island in the Coral Sea that appeared on maps for over a century until proven not to exist in 2012.",
      discovery_date: new Date("1876-01-01"),
      disappeared_date: new Date("2012-11-22")
    },
    {
      name: "Bermeja",
      latitude: 24.0,
      longitude: -87.0,
      description: "Mexican phantom island that appeared on maps for centuries in the Gulf of Mexico. Never found despite numerous searches.",
      discovery_date: new Date("1500-01-01"),
      disappeared_date: new Date("2009-01-01")
    },
    {
      name: "Thule",
      latitude: 77.5,
      longitude: -20.5,
      description: "Ancient name for a mysterious island north of Britain, possibly the Faroe Islands or Iceland. Described by ancient geographers.",
      discovery_date: new Date("-300-01-01"),
      disappeared_date: new Date("1600-01-01")
    },
    {
      name: "Avalon",
      latitude: 51.2089,
      longitude: -2.9028,
      description: "Mythical island from Arthurian legend, said to be the place where King Arthur was taken after his final battle.",
      discovery_date: new Date("1200-01-01"),
      disappeared_date: new Date("1500-01-01")
    },
    {
      name: "Lemuria",
      latitude: -10.0,
      longitude: 80.0,
      description: "Hypothetical lost continent in the Indian Ocean, proposed by 19th century geologists to explain distribution of species.",
      discovery_date: new Date("1864-01-01"),
      disappeared_date: new Date("1920-01-01")
    },
    {
      name: "Rongelap",
      latitude: 11.35,
      longitude: 166.9,
      description: "Atoll in the Marshall Islands evacuated after nuclear testing. Residents returned years later to find their homeland transformed.",
      discovery_date: new Date("1522-01-01"),
      disappeared_date: new Date("1954-03-01")
    },
    {
      name: "Easter Island",
      latitude: -27.1127,
      longitude: -109.3497,
      description: "Famous for its moai statues. While not truly lost, its isolation and mysterious civilization make it legendary.",
      discovery_date: new Date("1722-04-05"),
      disappeared_date: null
    },
    {
      name: "Bounty Island",
      latitude: -23.9,
      longitude: -147.6,
      description: "Small reef in the Pacific where HMS Bounty mutineers settled. A reminder of naval history and exile.",
      discovery_date: new Date("1789-01-01"),
      disappeared_date: null
    },
    {
      name: "Tierra Austral",
      latitude: -55.0,
      longitude: -70.0,
      description: "Southern land of legend, sought by early explorers. Eventually led to the discovery of Tierra del Fuego.",
      discovery_date: new Date("1520-01-01"),
      disappeared_date: new Date("1616-01-01")
    },
    {
      name: "Java La Grande",
      latitude: -15.0,
      longitude: 120.0,
      description: "Phantom island believed to be a large landmass south of Java, appearing on French maps of the 18th century.",
      discovery_date: new Date("1722-01-01"),
      disappeared_date: new Date("1800-01-01")
    },
    {
      name: "Davis Land",
      latitude: -50.0,
      longitude: -140.0,
      description: "Phantom island reported by explorer John Davis in 1685, never confirmed and later proven not to exist.",
      discovery_date: new Date("1685-01-01"),
      disappeared_date: new Date("1876-01-01")
    },
    {
      name: "Meridian Island",
      latitude: 15.0,
      longitude: -40.0,
      description: "Phantom island in the Atlantic that appeared on Portuguese and Spanish maps of the 15th-16th century.",
      discovery_date: new Date("1450-01-01"),
      disappeared_date: new Date("1520-01-01")
    },
    {
      name: "San Brandano",
      latitude: 43.5,
      longitude: 10.0,
      description: "Legendary island said to appear near Tuscany. Multiple failed attempts to locate it over the centuries.",
      discovery_date: new Date("1400-01-01"),
      disappeared_date: new Date("1720-01-01")
    },
    {
      name: "Mulberry",
      latitude: 52.5,
      longitude: 1.75,
      description: "British artificial island built during WWII for the D-Day landings. Eventually destroyed by storms.",
      discovery_date: new Date("1944-06-01"),
      disappeared_date: new Date("1944-11-01")
    },
    {
      name: "D Hawkins",
      latitude: 0.0,
      longitude: -30.0,
      description: "Phantom island named after explorer Sir John Hawkins, appeared on 16th century Portuguese charts.",
      discovery_date: new Date("1560-01-01"),
      disappeared_date: new Date("1800-01-01")
    },
    {
      name: "Frisland",
      latitude: 54.0,
      longitude: -20.0,
      description: "Phantom island in the North Atlantic that appeared on numerous maps from the 16th to 18th centuries.",
      discovery_date: new Date("1560-01-01"),
      disappeared_date: new Date("1780-01-01")
    },
    {
      name: "Macherus",
      latitude: 31.5,
      longitude: 35.5,
      description: "Ancient fortress island in the Dead Sea, biblical site of imprisonment of John the Baptist.",
      discovery_date: new Date("100-01-01"),
      disappeared_date: new Date("70-01-01")
    }
  ]

  await prisma.islands.createMany({ data: islands })

  const atlantis = await prisma.islands.findFirst({ where: { name: "Atlantis" } })
  
  if (atlantis) {
    await prisma.discoveries.create({
      data: {
        island_id: atlantis.id,
        discoverer: "Plato",
        discovery_year: -360,
        notes: "First documented in Plato's dialogues Timaeus and Critias"
      }
    })

    await prisma.media.create({
      data: {
        island_id: atlantis.id,
        media_type: "image",
        media_url: "/assets/atlantis.jpg",
        description: "Artist's interpretation of Atlantis"
      }
    })

    await prisma.reference.create({
      data: {
        island_id: atlantis.id,
        source_name: "Plato - Timaeus",
        source_url: "https://en.wikipedia.org/wiki/Atlantis",
        description: "Ancient Greek account of the lost city"
      }
    })
  }

  const easterIsland = await prisma.islands.findFirst({ where: { name: "Easter Island" } })
  
  if (easterIsland) {
    await prisma.discoveries.create({
      data: {
        island_id: easterIsland.id,
        discoverer: "Jacob Roggeveen",
        discovery_year: 1722,
        notes: "First recorded European contact with the island"
      }
    })
  }

  console.log("🌴 Islands seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })