import React, { Suspense } from "react";
import LoginContent from "./_components/LoginContent";
import LoginSkeleton from "./_components/LoginSkeleton";

const LoginPage = () => {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
