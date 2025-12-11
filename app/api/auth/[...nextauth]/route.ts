import { handlers } from "@/auth";

export const runtime = "nodejs"; // force Node runtime for Prisma

export const { GET, POST } = handlers;
