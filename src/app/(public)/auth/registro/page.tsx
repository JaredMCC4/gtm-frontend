import { RegisterFormContainer } from "@/features/auth/containers/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <RegisterFormContainer />
    </div>
  );
}
