import { PrismaClient } from 'src/generated/prisma/client'
import * as bcrypt from 'bcrypt'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('pass', parseInt(process.env.BCRYPT_SALT_ROUNDS as string))

  await prisma.user.upsert({
    where: { username: 'johndoe' },
    update: {},
    create: {
      username: 'johndoe',
      email: 'johndoe@example.com',
      passwordHash: hashedPassword,
    },
  })
  console.log('User table seeded.')

  await prisma.thread.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1,
      title: 'How do I set up environment variables in Node.js?',
      content: 'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?'
    },
  })
  console.log('Thread table seeded.')
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