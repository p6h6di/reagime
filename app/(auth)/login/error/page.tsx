import React, { Suspense } from "react";
import LoginError from "../_components/LoginError";
import ErrorSkeleton from "../_components/ErrorSkeleton";

const LoginErrorPage = () => {
  return (
    <Suspense fallback={<ErrorSkeleton />}>
      <LoginError />
    </Suspense>
  );
};

export default LoginErrorPage;
