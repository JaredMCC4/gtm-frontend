import { apiClient } from "@/lib/api-client";
import type {
  AuthResponse,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
  SocialLoginRequest,
} from "@/types/auth";

export const authService = {
  login: (payload: LoginRequest) =>
    apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: payload,
    }),
  register: (payload: RegisterRequest) =>
    apiClient<AuthResponse>("/auth/registro", {
      method: "POST",
      body: payload,
    }),
  oauthLogin: (payload: SocialLoginRequest) =>
    apiClient<AuthResponse>("/auth/oauth/login", {
      method: "POST",
      body: payload,
    }),
  refresh: (payload: RefreshTokenRequest) =>
    apiClient<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: payload,
    }),
  logout: (payload: LogoutRequest) =>
    apiClient<void>("/auth/logout", {
      method: "POST",
      body: payload,
      auth: true,
    }),
};
