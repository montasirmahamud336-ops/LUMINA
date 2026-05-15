import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const dbUrl = process.env.DATABASE_URL;

if (dbUrl && dbUrl.trim() !== '' && dbUrl.startsWith('postgresql')) {
  try {
    prisma = new PrismaClient();
  } catch (error) {
    console.error('❌ Failed to initialize PrismaClient:', error);
    // Fallback to proxy if instantiation fails
    prisma = createProxy();
  }
} else {
  console.warn('⚠️ DATABASE_URL is missing or invalid. Database operations will be disabled.');
  prisma = createProxy();
}

function createProxy(): PrismaClient {
  return new Proxy({} as PrismaClient, {
    get: (_, prop: string) => {
      if (prop === '$connect' || prop === '$disconnect') return () => Promise.resolve();
      if (prop === 'then') return undefined;

      // This handles model access (e.g., prisma.user)
      return new Proxy({}, {
        get: (_, modelMethod: string) => {
          return () => {
            const errorMsg = `Database operation "${prop}.${modelMethod}" failed: DATABASE_URL is missing or invalid. Please check your Supabase connection and add DATABASE_URL to your secrets.`;
            console.error(`❌ ${errorMsg}`);
            throw new Error(errorMsg);
          };
        }
      });
    }
  });
}

export default prisma;
