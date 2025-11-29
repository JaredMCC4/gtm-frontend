import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .url()
    .default("http://localhost:2828/api/v1"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z
    .string()
    .min(1, "Falta NEXT_PUBLIC_GOOGLE_CLIENT_ID")
    .describe("Client ID público de Google OAuth"),
  NEXT_PUBLIC_GITHUB_CLIENT_ID: z
    .string()
    .min(1, "Falta NEXT_PUBLIC_GITHUB_CLIENT_ID")
    .describe("Client ID público de GitHub OAuth"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
});

if (!parsed.success) {
  console.error("Error al validar las variables de entorno", parsed.error);
  throw new Error("Variables de entorno inválidas para el frontend");
}

export const env = parsed.data;
