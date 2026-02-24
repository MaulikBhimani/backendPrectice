const { PrismaClient } = require('../src/generated');

const prisma = new PrismaClient();

async function main() {
  // Create roles
  await prisma.role.createMany({
    data: [
      { name: 'MANAGER' },
      { name: 'SUPPORT' },
      { name: 'USER' }
    ],
    skipDuplicates: true
  });

  console.log('Roles seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });