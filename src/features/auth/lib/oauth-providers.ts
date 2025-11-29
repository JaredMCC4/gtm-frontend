import { routes } from "@/config/routes";
import { env } from "@/lib/env";
import { OAuthProvider } from "@/types/auth";

export type OAuthProviderKey = "google" | "github";

interface OAuthProviderConfig {
  label: string;
  authorizeUrl: string;
  scopes: string[];
  clientId: string;
}

const oauthProviders: Record<OAuthProviderKey, OAuthProviderConfig> = {
  google: {
    label: "Google",
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scopes: ["openid", "email", "profile"],
    clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
  github: {
    label: "GitHub",
    authorizeUrl: "https://github.com/login/oauth/authorize",
    scopes: ["read:user", "user:email"],
    clientId: env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  },
};

export function isOAuthProvider(value: string | undefined | null): value is OAuthProviderKey {
  return value === "google" || value === "github";
}

export function getProviderLabel(provider: OAuthProviderKey): string {
  return oauthProviders[provider].label;
}

export function mapToApiProvider(provider: OAuthProviderKey): OAuthProvider {
  return provider === "google" ? "GOOGLE" : "GITHUB";
}

export function getRedirectUri(provider: OAuthProviderKey): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${routes.public.oauthCallback(provider)}`;
}

export function getStateStorageKey(provider: OAuthProviderKey): string {
  return `gtm_oauth_state_${provider}`;
}

function buildAuthorizeUrl(provider: OAuthProviderKey, redirectUri: string, state: string) {
  const cfg = oauthProviders[provider];
  if (!cfg.clientId) {
    throw new Error(`Falta configurar el client_id de ${cfg.label}.`);
  }

  const url = new URL(cfg.authorizeUrl);
  url.searchParams.set("client_id", cfg.clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", cfg.scopes.join(" "));
  url.searchParams.set("state", state);

  if (provider === "google") {
    url.searchParams.set("access_type", "online");
    url.searchParams.set("prompt", "consent");
  }

  if (provider === "github") {
    url.searchParams.set("allow_signup", "true");
  }

  return url.toString();
}

export function startOAuthFlow(provider: OAuthProviderKey) {
  if (typeof window === "undefined") return;
  const redirectUri = getRedirectUri(provider);
  if (!redirectUri) {
    throw new Error("No se pudo resolver el redirect_uri para OAuth.");
  }

  const state =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  sessionStorage.setItem(getStateStorageKey(provider), state);
  const authorizeUrl = buildAuthorizeUrl(provider, redirectUri, state);
  window.location.href = authorizeUrl;
}

export function clearOAuthState(provider: OAuthProviderKey) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(getStateStorageKey(provider));
}
