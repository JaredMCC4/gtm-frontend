import { UserProfile } from "./user";

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface AuthSession {
  user: UserProfile | null;
  tokens: AuthTokens | null;
}

export interface AuthResponse {
  user: UserProfile;
  tokens: AuthTokens;
}

export type OAuthProvider = "GOOGLE" | "GITHUB";

export interface SocialLoginRequest {
  provider: OAuthProvider;
  code?: string;
  accessToken?: string;
  redirectUri?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombreUsuario: string;
  turnstileToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken?: string;
}
