"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "./use-toast";

export type Provider = "google" | "github";

export const useAuth = (callbackUrl: string) => {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleSignIn = async (provider: Provider) => {
    try {
      setLoadingProvider(provider);
      await signIn(provider, {
        callbackUrl,
        redirect: false,
      });
    } catch (error) {
      toast({
        title: "❌ Oops! Something went wrong",
        description: "We couldn't sign you in. Please try again later.",
      });
    } finally {
      setLoadingProvider(null);
    }
  };

  return { loadingProvider, handleSignIn };
};
