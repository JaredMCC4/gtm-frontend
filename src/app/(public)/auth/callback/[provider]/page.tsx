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

type Status = "processing" | "success" | "error";

export default function OAuthCallbackPage() {
  const params = useParams<{ provider: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession } = useAuth();
  const providerParam = useMemo(
    () => (Array.isArray(params.provider) ? params.provider[0] : params.provider),
    [params.provider],
  );
  const provider = isOAuthProvider(providerParam) ? providerParam : null;

  const [status, setStatus] = useState<Status>("processing");
  const [message, setMessage] = useState("Validando credenciales...");

  useEffect(() => {
    if (!provider) {
      setStatus("error");
      setMessage("Proveedor de autenticación no soportado.");
      return;
    }

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const providerError = searchParams.get("error");
    const providerErrorDesc = searchParams.get("error_description");

    if (providerError) {
      clearOAuthState(provider);
      setStatus("error");
      setMessage(providerErrorDesc || "El proveedor canceló la autenticación.");
      return;
    }

    if (!code) {
      clearOAuthState(provider);
      setStatus("error");
      setMessage("No se recibió el código de autorización. Intenta de nuevo.");
      return;
    }

    const storedState = sessionStorage.getItem(getStateStorageKey(provider));
    if (storedState && storedState !== state) {
      clearOAuthState(provider);
      setStatus("error");
      setMessage("El estado de la solicitud no coincide. Inicia el proceso otra vez.");
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
        setMessage("Autenticación exitosa. Redirigiendo a tu panel...");
        router.replace(routes.protected.dashboard);
      } catch (error) {
        clearOAuthState(provider);
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "No se pudo completar el login. Inténtalo nuevamente.",
        );
      }
    };

    exchangeCode();
  }, [provider, router, searchParams, setSession]);

  const title = provider ? `Conectando con ${getProviderLabel(provider)}` : "Error de autenticación";

  return (
    <div className="flex justify-center">
      <AuthCard
        title={title}
        description="Estamos validando la sesión con el proveedor seleccionado."
        alternateCta={{ label: "Volver al inicio", href: routes.public.home }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {status === "processing" ? (
            <Loader2 className="h-10 w-10 animate-spin text-[var(--accent)]" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          ) : (
            <TriangleAlert className="h-10 w-10 text-red-600" />
          )}
          <p className="text-sm text-slate-700">{message}</p>
          {status === "error" ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => router.push(routes.public.login)}
              >
                Ir al login
              </Button>
              {provider ? (
                <Button onClick={() => retryOAuth(provider)}>Reintentar</Button>
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
