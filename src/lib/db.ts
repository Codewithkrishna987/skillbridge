import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log: ["error", "warn"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Execute a Prisma operation with automatic retry on transient serverless disconnection
 * (e.g., Neon compute wake-up or connection pool reset: E57P01)
 */
export async function withDbRetry<T>(operation: (client: PrismaClient) => Promise<T>, maxRetries = 2): Promise<T> {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      return await operation(prisma);
    } catch (err: any) {
      attempts++;
      const isConnectionError =
        err?.message?.includes("terminating connection") ||
        err?.message?.includes("Connection") ||
        err?.message?.includes("closed") ||
        err?.code === "P1001" ||
        err?.code === "P1017";

      if (isConnectionError && attempts < maxRetries) {
        console.warn(`[Prisma] Reconnecting after transient Neon reset (attempt ${attempts}/${maxRetries})...`);
        try {
          await prisma.$disconnect();
          await prisma.$connect();
        } catch {
          // Ignore reconnect error, will retry on next iteration
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
      }
      throw err;
    }
  }
  return operation(prisma);
}
