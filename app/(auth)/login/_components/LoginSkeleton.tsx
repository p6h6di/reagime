import React from "react";
import { Icons } from "@/components/ui/icons";

const LoginSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="p-4 sm:p-6">
        <div className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
          <Icons.arrow_left className="mr-2 size-4" />
          <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
        </div>
      </header>
      <main className="flex grow items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto size-16 animate-pulse rounded-full bg-gray-200"></div>
            <div className="mx-auto mt-6 h-10 w-3/4 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mt-8 space-y-4">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="h-12 w-full animate-pulse rounded-lg bg-gray-200"
              ></div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="mx-auto mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginSkeleton;
