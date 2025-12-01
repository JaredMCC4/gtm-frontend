import { AuthTokens } from "@/types/auth";

const ACCESS_TOKEN_KEY = "gtm_access_token";
const REFRESH_TOKEN_KEY = "gtm_refresh_token";
const ACCESS_EXPIRES_AT_KEY = "gtm_access_expires_at";

const isBrowser = typeof window !== "undefined";

function setCookie(name: string, value: string, days: number = 7) {
  if (!isBrowser) return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (!isBrowser) return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function persistTokens(tokens: AuthTokens) {
  if (!isBrowser) return;
  sessionStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  setCookie(ACCESS_TOKEN_KEY, tokens.accessToken);
  if (tokens.refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
  if (tokens.expiresAt) {
    sessionStorage.setItem(ACCESS_EXPIRES_AT_KEY, tokens.expiresAt);
  }
}

function getAccessToken() {
  if (!isBrowser) return null;
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

function getRefreshToken() {
  if (!isBrowser) return null;
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

function getAccessExpiry() {
  if (!isBrowser) return null;
  return sessionStorage.getItem(ACCESS_EXPIRES_AT_KEY);
}

function clearTokens() {
  if (!isBrowser) return;
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_EXPIRES_AT_KEY);
  deleteCookie(ACCESS_TOKEN_KEY);
}

export const authTokens = {
  persistTokens,
  getAccessToken,
  getRefreshToken,
  getAccessExpiry,
  clearTokens,
};
