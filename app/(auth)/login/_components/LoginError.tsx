"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { RefreshCw, Home } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function LoginError() {
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const provider = searchParams.get("provider") || "default";

  const handleRetry = useCallback(async () => {
    setIsRetrying(true);
    try {
      await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    } catch (error) {
      toast({
        title: "❌ Oops! Authentication Retry Failed",
        description:
          "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsRetrying(false);
    }
  }, [provider]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-6 shadow-lg sm:p-8 md:p-12">
        <Image
          src="/assets/error.svg"
          alt="Error Illustration"
          width={200}
          height={200}
          className="mx-auto w-32 sm:w-40 md:w-48 lg:w-56"
        />
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Aaaah! Something went wrong
          </h1>
          <p className="mb-4 text-base text-gray-600 sm:text-lg">
            Brace yourself till we get the error fixed.
            <br className="hidden sm:inline" />
            You may also refresh the page or try again later.
          </p>
          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-800 sm:text-base">
              <strong>Error details:</strong> {error}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 size-4 sm:size-5" />
            Return to Home
          </Button>
          <Button
            className="w-full"
            onClick={handleRetry}
            disabled={isRetrying}
          >
            <RefreshCw
              className={`mr-2 size-4 sm:size-5 ${isRetrying ? "animate-spin" : ""}`}
            />
            {isRetrying ? "Retrying..." : "Try Again"}
          </Button>
        </div>
      </div>
    </div>
  );
}
