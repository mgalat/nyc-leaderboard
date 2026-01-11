"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has an active session
    async function checkSession() {
      const response = await fetch("/api/auth/check");
      if (response.ok) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    }
    checkSession();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-black dark:text-zinc-50">Loading...</div>
    </div>
  );
}
