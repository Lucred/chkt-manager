import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Users
  const user = await prisma.user.upsert({
    where: { name: 'Alice' },
    update: {},
    create: {
      name: 'Alice',
      role: 'USER',
    },
  })

  const admin = await prisma.user.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  // Create Products
  const products = [
    { name: 'Apple', price: 1.5 },
    { name: 'Banana', price: 0.8 },
    { name: 'Orange', price: 1.2 },
    { name: 'Milk', price: 3.0 },
    { name: 'Bread', price: 2.5 },
  ]

  for (const p of products) {
    await prisma.product.create({
      data: p,
    })
  }

  console.log({ user, admin, products })
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
