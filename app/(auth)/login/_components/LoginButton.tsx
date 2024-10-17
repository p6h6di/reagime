"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Provider } from "@/hooks/use-auth";
import Image from "next/image";
import React from "react";

interface LoginButtonProps {
  provider: Provider;
  icon: string;
  text: string;
  isLoading: boolean;
  onSignIn: (provider: Provider) => void;
}

const LoginButton = ({
  icon,
  isLoading,
  onSignIn,
  provider,
  text,
}: LoginButtonProps) => {
  return (
    <Button
      onClick={() => onSignIn(provider)}
      variant="outline"
      size="lg"
      disabled={isLoading}
      className="flex w-full items-center space-x-3 leading-none"
    >
      {isLoading ? (
        <>
          <Spinner className="size-4" />
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <Image
            src={icon}
            alt={`${provider} logo`}
            width={20}
            height={20}
            className="size-5"
          />
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};

export default LoginButton;
