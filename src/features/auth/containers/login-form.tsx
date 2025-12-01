"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { routes } from "@/config/routes";
import { translateApiError } from "@/lib/translate-api-error";
import { useAuth } from "@/providers/auth-provider";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";
import { AuthDivider } from "../components/auth-divider";
import { LoginFormValues, createLoginSchema } from "../lib/validators";
import { AuthCard } from "../components/auth-card";
import { authService } from "../lib/auth-service";
import { OAuthButtons } from "../components/oauth-buttons";

export function LoginFormContainer() {
  const { t } = useLanguage();
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const loginSchema = useMemo(
    () =>
      createLoginSchema({
        emailInvalid: t("authValidationEmailInvalid"),
        passwordMin: t("authValidationPasswordMin"),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      const response = await authService.login(values);
      setSession({ user: response.user, tokens: response.tokens });
    } catch (err) {
      setError(
        err instanceof Error
          ? translateApiError(err.message, t)
          : t("authLoginError"),
      );
    }
  };

  return (
    <AuthCard
      title={t("authLoginTitle")}
      description={t("authLoginDescription")}
      alternateCta={{ label: t("authCreateAccount"), href: routes.public.register }}
      appName={t("authAppName")}
      securityNote={t("authSecurityNote")}
      homeLabel={t("home")}
    >
      <div className="space-y-5">
        <OAuthButtons 
          onError={setError} 
          labels={{
            continueWithGoogle: t("authContinueWithGoogle"),
            openingGoogle: t("authOpeningGoogle"),
            continueWithGitHub: t("authContinueWithGitHub"),
            openingGitHub: t("authOpeningGitHub"),
            oauthError: t("authOauthError"),
          }}
        />
        <AuthDivider label={t("authOrLoginWith")} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-primary)]" htmlFor="email">
              {t("authEmailLabel")}
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("authEmailPlaceholder")}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-[var(--text-primary)]"
              htmlFor="password"
            >
              {t("authPasswordLabel")}
            </label>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder={t("authPasswordPlaceholder")}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.password.message}</p>
            ) : null}
            <div className="flex justify-end pt-1">
              <Link
                href={routes.public.forgotPassword}
                className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)] hover:underline"
              >
                {t("authForgotPassword")}
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full py-3 text-base font-semibold" disabled={isSubmitting}>
            {isSubmitting ? t("authLoginLoading") : t("authLoginButton")}
          </Button>
        </form>
        {error ? (
          <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : null}
      </div>
    </AuthCard>
  );
}
