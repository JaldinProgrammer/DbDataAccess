import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // Tell Prisma we want to listen for query events
  log: [
    { level: 'query', emit: 'event' }
  ]
});

// Hook into those events and dump them to the console
prisma.$on('query', (e) => {
  console.log('📋 Prisma Query:', e.query);
  console.log('🧩 Params:', e.params);
  console.log('⏱ Duration (ms):', e.duration);
});

export default prisma;