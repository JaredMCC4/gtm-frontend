import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OAuthCallbackPage from "./page";
import { routes } from "@/config/routes";
import { authService } from "@/features/auth/lib/auth-service";
import { getStateStorageKey } from "@/features/auth/lib/oauth-providers";
import { authTokens } from "@/lib/auth-tokens";
import { renderWithProviders } from "@/test/test-utils";

const replaceMock = vi.fn();
const pushMock = vi.fn();
let searchParams: URLSearchParams;
let params: { provider: string | string[] };

vi.mock("next/navigation", () => ({
  useParams: () => params,
  useRouter: () => ({ replace: replaceMock, push: pushMock }),
  useSearchParams: () => searchParams,
}));

describe("OAuthCallbackPage", () => {
  beforeEach(() => {
    params = { provider: "google" };
    searchParams = new URLSearchParams();
    replaceMock.mockReset();
    pushMock.mockReset();
  });

  it("muestra error si el proveedor no es soportado", async () => {
    params = { provider: "twitter" };

    renderWithProviders(<OAuthCallbackPage />);

    expect(await screen.findByText("Proveedor de autenticación no soportado.")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("muestra error del proveedor si llega en el querystring", async () => {
    searchParams = new URLSearchParams({ error: "access_denied", error_description: "denegado" });

    renderWithProviders(<OAuthCallbackPage />);

    expect(await screen.findByText("denegado")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("detiene el flujo si el estado no coincide", async () => {
    sessionStorage.setItem(getStateStorageKey("google"), "state-1");
    searchParams = new URLSearchParams({ code: "abc", state: "other" });

    renderWithProviders(<OAuthCallbackPage />);

    expect(
      await screen.findByText("El estado de la solicitud no coincide. Inicia el proceso otra vez."),
    ).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("intercambia el codigo y redirige al dashboard cuando todo es valido", async () => {
    sessionStorage.setItem(getStateStorageKey("google"), "state-123");
    searchParams = new URLSearchParams({ code: "auth-code", state: "state-123" });
    const oauthSpy = vi.spyOn(authService, "oauthLogin").mockResolvedValue({
      user: { id: "1", email: "user@example.com", displayName: "Tester" },
      tokens: { accessToken: "token-123", refreshToken: "refresh-456" },
    });
    const persistSpy = vi.spyOn(authTokens, "persistTokens");

    renderWithProviders(<OAuthCallbackPage />);

    await waitFor(() =>
      expect(oauthSpy).toHaveBeenCalledWith({
        provider: "GOOGLE",
        code: "auth-code",
        redirectUri: `${window.location.origin}/auth/callback/google`,
      }),
    );
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(routes.protected.dashboard));
    expect(persistSpy).toHaveBeenCalledWith({ accessToken: "token-123", refreshToken: "refresh-456" });
    expect(sessionStorage.getItem(getStateStorageKey("google"))).toBeNull();
  });
});
