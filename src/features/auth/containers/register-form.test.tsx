import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { RegisterFormContainer } from "./register-form";
import { authService } from "../lib/auth-service";
import { authTokens } from "@/lib/auth-tokens";
import { renderWithProviders } from "@/test/test-utils";
import { useEffect } from "react";

// Mock Turnstile component to auto-verify
vi.mock("@/shared/components/cloudflare-turnstile", () => ({
  CloudflareTurnstile: ({ onVerify }: { onVerify: (token: string) => void }) => {
    useEffect(() => {
      onVerify("test-turnstile-token");
    }, [onVerify]);
    return <div data-testid="turnstile-mock">Turnstile Mock</div>;
  },
}));

describe("RegisterFormContainer", () => {
  it("muestra validaciones cuando los campos son invalidos o no coinciden", async () => {
    renderWithProviders(<RegisterFormContainer />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText("El nombre de usuario debe tener al menos 2 caracteres")).toBeInTheDocument();
    expect(await screen.findByText("Ingresa un correo electrónico válido")).toBeInTheDocument();
    expect(await screen.findAllByText("La contraseña debe tener al menos 8 caracteres")).toHaveLength(2);
    expect(await screen.findByText("Debes aceptar los Términos de Servicio para continuar.")).toBeInTheDocument();
  });

  it("evita enviar si las contraseñas no coinciden", async () => {
    const registerSpy = vi.spyOn(authService, "register").mockResolvedValue({
      user: { id: "1", email: "user@example.com", displayName: "Tester" },
      tokens: { accessToken: "token-1" },
    });
    renderWithProviders(<RegisterFormContainer />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nombre de usuario/i), "Usuario");
    await user.type(screen.getByLabelText(/^correo electrónico$/i), "user@example.com");
    await user.type(screen.getByLabelText(/^contraseña$/i), "strong-pass");
    await user.type(screen.getByLabelText(/confirmar contraseña/i), "different-pass");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText("Las contraseñas no coinciden")).toBeInTheDocument();
    expect(registerSpy).not.toHaveBeenCalled();
  });

  it("envia datos validos y persiste tokens", async () => {
    const registerSpy = vi.spyOn(authService, "register").mockResolvedValue({
      user: { id: "1", email: "user@example.com", displayName: "Tester" },
      tokens: { accessToken: "token-123", refreshToken: "refresh-456" },
    });
    const persistSpy = vi.spyOn(authTokens, "persistTokens");
    renderWithProviders(<RegisterFormContainer />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nombre de usuario/i), "Usuario Seguro");
    await user.type(screen.getByLabelText(/^correo electrónico$/i), "user@example.com");
    await user.type(screen.getByLabelText(/^contraseña$/i), "strong-pass");
    await user.type(screen.getByLabelText(/confirmar contraseña/i), "strong-pass");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    await waitFor(() =>
      expect(registerSpy).toHaveBeenCalledWith({
        nombreUsuario: "Usuario Seguro",
        email: "user@example.com",
        password: "strong-pass",
        turnstileToken: "test-turnstile-token",
      }),
    );
    expect(persistSpy).toHaveBeenCalledWith({ accessToken: "token-123", refreshToken: "refresh-456" });
    expect(authTokens.getAccessToken()).toBe("token-123");
  });

  it("muestra mensaje generico cuando el servicio devuelve un error inesperado", async () => {
    vi.spyOn(authService, "register").mockRejectedValue("unexpected");
    renderWithProviders(<RegisterFormContainer />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nombre de usuario/i), "Usuario Seguro");
    await user.type(screen.getByLabelText(/^correo electrónico$/i), "user@example.com");
    await user.type(screen.getByLabelText(/^contraseña$/i), "strong-pass");
    await user.type(screen.getByLabelText(/confirmar contraseña/i), "strong-pass");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText("No se pudo crear la cuenta. Intenta de nuevo.")).toBeInTheDocument();
  });
});
