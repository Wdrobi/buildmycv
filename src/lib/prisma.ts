// Database client setup with Prisma
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const prisma =
  global.prismaClient ||
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prismaClient = prisma;
}

export default prisma;
