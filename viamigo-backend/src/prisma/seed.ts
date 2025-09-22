import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const pwd = await bcrypt.hash('password123', 10);

  // Users
  await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      password: pwd,
      preferences: { interests: ['nature', 'food', 'adventure'] },
    },
  });

  // Destinations
  await prisma.destination.upsert({
    where: { name_country: { name: 'Paris', country: 'France' } },
    update: {},
    create: {
      name: 'Paris',
      country: 'France',
      description: 'City of lights and art.',
      tags: ['romance', 'art', 'food'],
      lat: 48.8566,
      lon: 2.3522,
      avgCost: 150.0,
    },
  });

  await prisma.destination.upsert({
    where: { name_country: { name: 'Bergen', country: 'Norway' } },
    update: {},
    create: {
      name: 'Bergen',
      country: 'Norway',
      description: 'Gateway to fjords.',
      tags: ['nature', 'hiking', 'scenery'],
      lat: 60.3913,
      lon: 5.3221,
      avgCost: 200.0,
    },
  });

  console.log('Seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
