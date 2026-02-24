const { PrismaClient } = require('./src/generated');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: '123',
      roleId: 1 // Default role ID
    }
  });

  console.log('Admin user created');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());