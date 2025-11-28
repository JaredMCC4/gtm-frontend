"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { routes } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { RegisterFormValues, registerSchema } from "../lib/validators";
import { AuthCard } from "../components/auth-card";
import { authService } from "../lib/auth-service";

export function RegisterFormContainer() {
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);

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
      const { confirmPassword, ...payload } = values;
      const response = await authService.register(payload);
      setSession({ user: response.user, tokens: response.tokens });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo crear la cuenta. Intenta de nuevo.",
      );
    }
  };

  return (
    <AuthCard
      title="Crear cuenta"
      description="Regístrate para comenzar a organizar tus tareas."
      alternateCta={{ label: "¿Ya tienes cuenta?", href: routes.public.login }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-800"
            htmlFor="displayName"
          >
            Nombre visible
          </label>
          <Input id="displayName" {...register("displayName")} />
          {errors.displayName ? (
            <p className="text-sm text-red-600">{errors.displayName.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-800" htmlFor="email">
            Correo
          </label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email ? (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
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
              autoComplete="new-password"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="confirmPassword"
            >
              Confirmar contraseña
            </label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
        </div>
        <p className="text-xs text-slate-600">
          La contraseña debe tener mínimo 8 caracteres. Evita reutilizar claves
          de otros servicios.
        </p>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Registrarse"}
        </Button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </AuthCard>
  );
}
