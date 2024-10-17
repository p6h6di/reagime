import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="m-6 space-y-4">
      <h1>Project Reagime!!</h1>
      <Link href="/login" className={buttonVariants()}>
        Get started
      </Link>
    </div>
  );
}
