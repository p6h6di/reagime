"use client";

import { Provider, useAuth } from "@/hooks/use-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import LoginButton from "./LoginButton";
import { Icons } from "@/components/ui/icons";

const PROVIDER_CONFIG = {
  google: {
    icon: "/assets/google.png",
    text: "Continue with Google",
  },
  github: {
    icon: "/assets/github.png",
    text: "Continue with Github",
  },
} as const;

const LoginContent = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with a different provider!"
      : "";

  const { loadingProvider, handleSignIn } = useAuth(callbackUrl);

  return (
    <div className="flex min-h-screen flex-col text-gray-900">
      <header className="p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          <Icons.arrow_left className="mr-2 size-4" />
          Back
        </Link>
      </header>
      <main className="flex grow items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Image
              src="/assets/logo.svg"
              alt="Pratikriye logo"
              width={64}
              height={64}
              className="mx-auto size-16"
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to Reagime
            </h1>
          </div>
          <div className="mt-8 space-y-4">
            {(
              Object.entries(PROVIDER_CONFIG) as [
                Provider,
                (typeof PROVIDER_CONFIG)[Provider],
              ][]
            ).map(([provider, config]) => (
              <LoginButton
                key={provider}
                provider={provider}
                icon={config.icon}
                text={config.text}
                isLoading={loadingProvider === provider}
                onSignIn={handleSignIn}
              />
            ))}
            {urlError && (
              <div className="rounded-md bg-red-50 p-3 text-sm font-normal text-red-500">
                {urlError}
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-primary hover:underline"
            >
              terms of service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginContent;
