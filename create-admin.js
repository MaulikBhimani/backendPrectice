const { PrismaClient } = require('../src/generated');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123', 10);
  
  const managerRole = await prisma.role.findUnique({
    where: { name: 'MANAGER' }
  });

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      roleId: managerRole.id
    }
  });

  console.log('Admin user created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });