"use client";

import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/features/auth/components/auth-card";
import {
  clearOAuthState,
  getProviderLabel,
  getRedirectUri,
  getStateStorageKey,
  isOAuthProvider,
  mapToApiProvider,
  startOAuthFlow,
  type OAuthProviderKey,
} from "@/features/auth/lib/oauth-providers";
import { authService } from "@/features/auth/lib/auth-service";
import { routes } from "@/config/routes";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useLanguage } from "@/providers/language-provider";

type Status = "processing" | "success" | "error";

export default function OAuthCallbackPage() {
  const params = useParams<{ provider: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession } = useAuth();
  const { t } = useLanguage();
  const providerParam = useMemo(
    () => (Array.isArray(params.provider) ? params.provider[0] : params.provider),
    [params.provider],
  );
  const provider = isOAuthProvider(providerParam) ? providerParam : null;

  const [status, setStatus] = useState<Status>("processing");
  const [message, setMessage] = useState(t("authValidatingCredentials"));

  useEffect(() => {
    if (!provider) {
      setStatus("error");
      setMessage(t("authProviderNotSupported"));
      return;
    }

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const providerError = searchParams.get("error");
    const providerErrorDesc = searchParams.get("error_description");

    if (providerError) {
      clearOAuthState(provider);
      setStatus("error");
      setMessage(providerErrorDesc || t("authProviderCancelled"));
      return;
    }

    if (!code) {
      clearOAuthState(provider);
      setStatus("error");
      setMessage(t("authNoAuthCode"));
      return;
    }

    const storedState = sessionStorage.getItem(getStateStorageKey(provider));
    if (storedState && storedState !== state) {
      clearOAuthState(provider);
      setStatus("error");
      setMessage(t("authStateMismatch"));
      return;
    }

    const redirectUri = getRedirectUri(provider);
    const exchangeCode = async () => {
      try {
        const response = await authService.oauthLogin({
          provider: mapToApiProvider(provider),
          code,
          redirectUri,
        });
        setSession({ user: response.user, tokens: response.tokens });
        clearOAuthState(provider);
        setStatus("success");
        setMessage(t("authSuccess"));
        router.replace(routes.protected.dashboard);
      } catch (error) {
        clearOAuthState(provider);
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : t("authCouldNotComplete"),
        );
      }
    };

    exchangeCode();
  }, [provider, router, searchParams, setSession, t]);

  const title = provider 
    ? `${t("authConnectingWith")} ${getProviderLabel(provider)}` 
    : t("authAuthError");

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <AuthCard
        title={title}
        description={t("authValidatingSession")}
        alternateCta={{ label: t("authBackToHome"), href: routes.public.home }}
        appName={t("authAppName")}
        securityNote={t("authSecurityNote")}
        homeLabel={t("home")}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {status === "processing" ? (
            <Loader2 className="h-10 w-10 animate-spin text-[var(--accent)]" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          ) : (
            <TriangleAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
          )}
          <p className="text-sm text-[var(--text-secondary)]">{message}</p>
          {status === "error" ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => router.push(routes.public.login)}
              >
                {t("authGoToLogin")}
              </Button>
              {provider ? (
                <Button onClick={() => retryOAuth(provider)}>{t("authRetry")}</Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </AuthCard>
    </div>
  );
}

function retryOAuth(provider: OAuthProviderKey) {
  try {
    clearOAuthState(provider);
    startOAuthFlow(provider);
  } catch {
    // Silenciamos porque los errores se mostrarán en la página de login/registro
  }
}
