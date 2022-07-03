import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "drew",
      points: 1,
      dates: {
        create: [{ game: "bombparty" }, { game: "really boring website" }]
      }
    }
  })
  console.log(newUser)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
