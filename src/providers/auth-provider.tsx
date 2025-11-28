"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authTokens } from "@/lib/auth-tokens";
import type { AuthSession } from "@/types/auth";
import type { UserProfile } from "@/types/user";

interface AuthContextValue {
  session: AuthSession;
  isAuthenticated: boolean;
  setSession: (session: AuthSession) => void;
  updateUser: (user: UserProfile) => void;
  logout: () => void;
}

const defaultSession: AuthSession = {
  user: null,
  tokens: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession>(defaultSession);

  useEffect(() => {
    const accessToken = authTokens.getAccessToken();
    if (accessToken) {
      setSessionState((current) => ({
        user: current.user,
        tokens: {
          accessToken,
          refreshToken: authTokens.getRefreshToken() ?? undefined,
          expiresAt: authTokens.getAccessExpiry() ?? undefined,
        },
      }));
    }
  }, []);

  const setSession = (next: AuthSession) => {
    setSessionState(next);
    if (next.tokens) {
      authTokens.persistTokens(next.tokens);
    }
  };

  const logout = () => {
    authTokens.clearTokens();
    setSessionState(defaultSession);
  };

  const updateUser = (user: UserProfile) => {
    setSessionState((current) => ({ ...current, user }));
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session.tokens?.accessToken),
      setSession,
      updateUser,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
