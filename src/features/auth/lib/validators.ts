import { z } from "zod";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Mínimo 2 caracteres")
      .max(80, "Máximo 80 caracteres"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Mínimo 8 caracteres"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginFormValues = LoginRequest;
export type RegisterFormValues = RegisterRequest & { confirmPassword: string };
