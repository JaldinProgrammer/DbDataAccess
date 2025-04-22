import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const users = [];
  for (let i = 0; i < 1000; i++) {
    users.push({
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
    });
  }
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
  
  console.log('✅ Seeded 1000 users (Prisma)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });