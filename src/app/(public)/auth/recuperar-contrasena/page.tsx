"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { routes } from "@/config/routes";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { AuthCard } from "@/features/auth/components/auth-card";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPasswordSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("authValidationEmailInvalid")),
      }),
    [t]
  );

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setError(null);
    try {
      // TODO: Implementar llamada al backend para recuperación de contraseña
      // await authService.forgotPassword(values.email);
      
      // Por ahora simulamos el éxito
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("authLoginError")
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <AuthCard
        title={t("authForgotPasswordTitle")}
        description={!success ? t("authForgotPasswordDescription") : undefined}
        alternateCta={{ label: t("authBackToLogin"), href: routes.public.login }}
        appName={t("authAppName")}
        securityNote={t("authSecurityNote")}
        homeLabel={t("home")}
      >
        {success ? (
          <div className="rounded-md bg-green-100 border border-green-300 p-4 dark:bg-green-900/20 dark:border-green-700">
            <p className="text-base font-semibold text-green-700 dark:text-green-400 leading-relaxed">
              {t("authForgotPasswordSuccess")}
            </p>
          </div>
        ) : (
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
            <Button type="submit" className="w-full py-3 text-base font-semibold" disabled={isSubmitting}>
              {isSubmitting ? t("authForgotPasswordLoading") : t("authForgotPasswordButton")}
            </Button>
            {error ? (
              <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : null}
          </form>
        )}
      </AuthCard>
    </div>
  );
}
