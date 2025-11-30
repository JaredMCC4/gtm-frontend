"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { routes } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";
import { AuthDivider } from "../components/auth-divider";
import { RegisterFormValues, createRegisterSchema } from "../lib/validators";
import { AuthCard } from "../components/auth-card";
import { authService } from "../lib/auth-service";
import { OAuthButtons } from "../components/oauth-buttons";

export function RegisterFormContainer() {
  const { t } = useLanguage();
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const registerSchema = useMemo(
    () =>
      createRegisterSchema({
        emailInvalid: t("authValidationEmailInvalid"),
        passwordMin: t("authValidationPasswordMin"),
        usernameMin: t("authValidationUsernameMin"),
        usernameMax: t("authValidationUsernameMax"),
        passwordsMismatch: t("authValidationPasswordsMismatch"),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    try {
      const { confirmPassword: _confirmPassword, ...payload } = values;
      const response = await authService.register(payload);
      setSession({ user: response.user, tokens: response.tokens });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("authRegisterError"),
      );
    }
  };

  return (
    <AuthCard
      title={t("authRegisterTitle")}
      description={t("authRegisterDescription")}
      alternateCta={{ label: t("authAlreadyHaveAccount"), href: routes.public.login }}
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
        <AuthDivider label={t("authOrRegisterWith")} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-[var(--text-primary)]"
              htmlFor="displayName"
            >
              {t("authUsernameLabel")}
            </label>
            <Input 
              id="displayName" 
              autoComplete="username"
              placeholder={t("authUsernamePlaceholder")}
              {...register("displayName")} 
            />
            {errors.displayName ? (
              <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.displayName.message}</p>
            ) : null}
          </div>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-[var(--text-primary)]"
                htmlFor="password"
              >
                {t("authPasswordLabel")}
              </label>
              <PasswordInput
                id="password"
                autoComplete="new-password"
                placeholder={t("authPasswordPlaceholder")}
                {...register("password")}
              />
              {errors.password ? (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.password.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-[var(--text-primary)]"
                htmlFor="confirmPassword"
              >
                {t("authConfirmPasswordLabel")}
              </label>
              <PasswordInput
                id="confirmPassword"
                autoComplete="new-password"
                placeholder={t("authConfirmPasswordPlaceholder")}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            {t("authPasswordHint")}
          </p>
          <Button type="submit" className="w-full py-3 text-base font-semibold" disabled={isSubmitting}>
            {isSubmitting ? t("authRegisterLoading") : t("authRegisterButton")}
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
