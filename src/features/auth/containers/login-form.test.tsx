import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { LoginFormContainer } from "./login-form";
import { authService } from "../lib/auth-service";
import { authTokens } from "@/lib/auth-tokens";
import { renderWithProviders } from "@/test/test-utils";

describe("LoginFormContainer", () => {
  it("muestra mensajes de validacion cuando los campos son invalidos", async () => {
    renderWithProviders(<LoginFormContainer />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText("Ingresa un correo electrónico válido")).toBeInTheDocument();
    expect(await screen.findByText("La contraseña debe tener al menos 8 caracteres")).toBeInTheDocument();
  });

  it("envia credenciales validas y persiste los tokens de sesion", async () => {
    const loginSpy = vi.spyOn(authService, "login").mockResolvedValue({
      user: { id: "1", email: "user@example.com", displayName: "Tester" },
      tokens: {
        accessToken: "token-123",
        refreshToken: "refresh-456",
        expiresAt: "2099-01-01T00:00:00.000Z",
      },
    });
    const persistSpy = vi.spyOn(authTokens, "persistTokens");
    renderWithProviders(<LoginFormContainer />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/correo/i), "user@example.com");
    await user.type(screen.getByLabelText(/^contraseña$/i), "strong-pass");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() =>
      expect(loginSpy).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "strong-pass",
      }),
    );
    expect(persistSpy).toHaveBeenCalledWith({
      accessToken: "token-123",
      refreshToken: "refresh-456",
      expiresAt: "2099-01-01T00:00:00.000Z",
    });
    expect(authTokens.getAccessToken()).toBe("token-123");
    expect(screen.queryByText("No se pudo iniciar sesión. Intenta de nuevo.")).not.toBeInTheDocument();
  });

  it("muestra el error devuelto por el servicio y no persiste tokens", async () => {
    vi.spyOn(authService, "login").mockRejectedValue(new Error("Credenciales inválidas"));
    const persistSpy = vi.spyOn(authTokens, "persistTokens");
    renderWithProviders(<LoginFormContainer />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/correo/i), "user@example.com");
    await user.type(screen.getByLabelText(/^contraseña$/i), "strong-pass");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText("Credenciales inválidas")).toBeInTheDocument();
    expect(persistSpy).not.toHaveBeenCalled();
  });
});
