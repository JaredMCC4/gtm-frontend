import { afterEach, describe, expect, it } from "vitest";
import {
  getRedirectUri,
  getStateStorageKey,
  isOAuthProvider,
  mapToApiProvider,
  startOAuthFlow,
} from "./oauth-providers";

const originalLocation = window.location;

function setMockLocation(origin: string) {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: {
      href: `${origin}/`,
      origin,
    } as Location,
  });
}

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: originalLocation,
  });
});

describe("oauth-providers utils", () => {
  it("valida los proveedores soportados", () => {
    expect(isOAuthProvider("google")).toBe(true);
    expect(isOAuthProvider("github")).toBe(true);
    expect(isOAuthProvider("twitter")).toBe(false);
  });

  it("convierte correctamente el provider al formato de API", () => {
    expect(mapToApiProvider("google")).toBe("GOOGLE");
    expect(mapToApiProvider("github")).toBe("GITHUB");
  });

  it("construye el redirectUri a partir del origen del navegador", () => {
    setMockLocation("https://frontend.example.com");
    expect(getRedirectUri("github")).toBe("https://frontend.example.com/auth/callback/github");
  });

  it("genera el estado y redirige al proveedor usando el client_id configurado", () => {
    setMockLocation("https://frontend.example.com");

    startOAuthFlow("google");

    const storedState = sessionStorage.getItem(getStateStorageKey("google"));
    expect(storedState).toBeTruthy();
    expect(window.location.href).toContain("accounts.google.com/o/oauth2/v2/auth");
    expect(window.location.href).toContain(`state=${storedState}`);
    expect(window.location.href).toContain("client_id=test-google-client-id");
    expect(window.location.href).toContain(
      "redirect_uri=https%3A%2F%2Ffrontend.example.com%2Fauth%2Fcallback%2Fgoogle",
    );
  });
});
