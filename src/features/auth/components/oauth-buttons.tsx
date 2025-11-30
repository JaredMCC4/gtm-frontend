"use client";

import { Github, Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { startOAuthFlow } from "../lib/oauth-providers";
import { Button } from "@/shared/ui/button";
import type { OAuthProviderKey } from "../lib/oauth-providers";

interface OAuthButtonsProps {
  onError?: (message: string | null) => void;
  labels: {
    continueWithGoogle: string;
    openingGoogle: string;
    continueWithGitHub: string;
    openingGitHub: string;
    oauthError: string;
  };
}

export function OAuthButtons({ onError, labels }: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<OAuthProviderKey | null>(null);

  const handleProviderClick = async (provider: OAuthProviderKey) => {
    onError?.(null);
    setLoadingProvider(provider);
    try {
      startOAuthFlow(provider);
    } catch (error) {
      setLoadingProvider(null);
      onError?.(
        error instanceof Error
          ? error.message
          : labels.oauthError,
      );
    }
  };

  return (
    <div className="space-y-3">
      <OAuthButton
        label={loadingProvider === "google" ? labels.openingGoogle : labels.continueWithGoogle}
        icon={loadingProvider === "google" ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
        onClick={() => handleProviderClick("google")}
        disabled={Boolean(loadingProvider)}
      />
      <OAuthButton
        label={loadingProvider === "github" ? labels.openingGitHub : labels.continueWithGitHub}
        icon={loadingProvider === "github" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Github className="h-5 w-5" />}
        onClick={() => handleProviderClick("github")}
        disabled={Boolean(loadingProvider)}
      />
    </div>
  );
}

function OAuthButton({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full justify-center py-3"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </Button>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M12 10.2v3.9h5.4c-.2 1.4-.9 2.6-2.1 3.4l3.4 2.6C20.7 18.4 22 15.5 22 12c0-.7-.1-1.4-.2-2H12z"
      />
      <path
        fill="#34A853"
        d="M5.3 14.3 4.4 15.1l-2.7 2.1C3.4 20.6 7.4 23 12 23c3 0 5.5-1 7.3-2.7l-3.4-2.6c-1 .7-2.3 1.1-3.9 1.1-3 0-5.6-2-6.5-4.8z"
      />
      <path
        fill="#FBBC05"
        d="M1.7 6.8C.9 8.4.9 10.2.9 12s0 3.6.8 5.2l3.6-2.8c-.2-.7-.3-1.4-.3-2.4 0-.9.1-1.7.3-2.4z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.6 0 3 .5 4.1 1.5l3-3C17.5 1.2 15 0 12 0 7.4 0 3.4 2.4 1.7 6.8l3.6 2.8C6.4 6.7 9 4.7 12 4.7z"
      />
    </svg>
  );
}
