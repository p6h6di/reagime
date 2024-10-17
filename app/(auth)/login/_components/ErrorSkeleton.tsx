import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";

const ErrorSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-6 shadow-lg sm:p-8 md:p-12">
        <div className="mx-auto size-32 animate-pulse rounded-full bg-gray-200 sm:size-40 md:size-48 lg:size-56" />
        <div className="space-y-4 text-center">
          <div className="mx-auto h-8 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="mx-auto h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="mx-auto h-4 w-4/6 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mx-auto mt-4 h-16 w-full animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Button
            variant="outline"
            className="w-full animate-pulse bg-gray-200"
            disabled
          >
            <Home className="mr-2 size-4 sm:size-5" />
            Return to Home
          </Button>
          <Button className="w-full animate-pulse bg-gray-200" disabled>
            <RefreshCw className="mr-2 size-4 sm:size-5" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorSkeleton;
