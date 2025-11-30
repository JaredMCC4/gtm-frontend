import { z } from "zod";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

export interface ValidationMessages {
  emailInvalid: string;
  passwordMin: string;
  usernameMin: string;
  usernameMax: string;
  passwordsMismatch: string;
}

export const createLoginSchema = (messages: Pick<ValidationMessages, "emailInvalid" | "passwordMin">) =>
  z.object({
    email: z.string().email(messages.emailInvalid),
    password: z.string().min(8, messages.passwordMin),
  });

export const createRegisterSchema = (messages: ValidationMessages) =>
  z
    .object({
      displayName: z
        .string()
        .min(2, messages.usernameMin)
        .max(80, messages.usernameMax),
      email: z.string().email(messages.emailInvalid),
      password: z.string().min(8, messages.passwordMin),
      confirmPassword: z.string().min(8, messages.passwordMin),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: messages.passwordsMismatch,
      path: ["confirmPassword"],
    });

// Default schemas for backward compatibility
export const loginSchema = createLoginSchema({
  emailInvalid: "Correo inválido",
  passwordMin: "Mínimo 8 caracteres",
});

export const registerSchema = createRegisterSchema({
  emailInvalid: "Correo inválido",
  passwordMin: "Mínimo 8 caracteres",
  usernameMin: "Mínimo 2 caracteres",
  usernameMax: "Máximo 80 caracteres",
  passwordsMismatch: "Las contraseñas no coinciden",
});

export type LoginFormValues = LoginRequest;
export type RegisterFormValues = RegisterRequest & { confirmPassword: string };
