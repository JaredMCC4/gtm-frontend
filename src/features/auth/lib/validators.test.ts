import { describe, expect, it } from "vitest";
import { createLoginSchema, createRegisterSchema } from "./validators";

const messages = {
  emailInvalid: "correo invalido",
  passwordMin: "minimo 8",
  usernameMin: "usuario corto",
  usernameMax: "usuario largo",
  passwordsMismatch: "no coinciden",
  mustAcceptTos: "debes aceptar tos",
};

describe("auth validators", () => {
  it("valida email y longitud de password en login", () => {
    const schema = createLoginSchema(messages);
    const result = schema.safeParse({ email: "bad-email", password: "123" });

    expect(result.success).toBe(false);
    if (result.success) return;
    const { fieldErrors } = result.error.flatten();
    expect(fieldErrors.email?.[0]).toBe(messages.emailInvalid);
    expect(fieldErrors.password?.[0]).toBe(messages.passwordMin);
  });

  it("acepta credenciales validas en login", () => {
    const schema = createLoginSchema(messages);
    const result = schema.safeParse({ email: "user@example.com", password: "supersecure" });

    expect(result.success).toBe(true);
  });

  it("valida displayName y confirmacion de password en registro", () => {
    const schema = createRegisterSchema(messages);
    const result = schema.safeParse({
      displayName: "a",
      email: "userexample.com",
      password: "1234567",
      confirmPassword: "87654321",
      acceptTos: false,
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    const { fieldErrors } = result.error.flatten();
    expect(fieldErrors.displayName?.[0]).toBe(messages.usernameMin);
    expect(fieldErrors.email?.[0]).toBe(messages.emailInvalid);
    expect(fieldErrors.password?.[0]).toBe(messages.passwordMin);
    expect(fieldErrors.acceptTos?.[0]).toBe(messages.mustAcceptTos);
  });

  it("acepta datos validos de registro", () => {
    const schema = createRegisterSchema(messages);
    const result = schema.safeParse({
      displayName: "Usuario Seguro",
      email: "user@example.com",
      password: "12345678",
      confirmPassword: "12345678",
      acceptTos: true,
    });

    expect(result.success).toBe(true);
  });
});
