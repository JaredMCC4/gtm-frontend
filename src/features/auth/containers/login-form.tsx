"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { routes } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { AuthDivider } from "../components/auth-divider";
import { LoginFormValues, loginSchema } from "../lib/validators";
import { AuthCard } from "../components/auth-card";
import { authService } from "../lib/auth-service";
import { OAuthButtons } from "../components/oauth-buttons";

export function LoginFormContainer() {
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);
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
          ? err.message
          : "No se pudo iniciar sesión. Intenta de nuevo.",
      );
    }
  };

  return (
    <AuthCard
      title="Iniciar sesión"
      description="Accede con tus credenciales para gestionar tus tareas."
      alternateCta={{ label: "Crear cuenta", href: routes.public.register }}
    >
      <div className="space-y-4">
        <OAuthButtons onError={setError} />
        <AuthDivider label="O ingresa con tu correo" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="email">
              Correo
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="password"
            >
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Validando..." : "Entrar"}
          </Button>
        </form>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </AuthCard>
  );
}
