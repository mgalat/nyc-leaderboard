"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user has an active session
    async function checkSession() {
      const response = await fetch("/api/auth/check");
      if (!response.ok) {
        router.push("/login");
        return;
      }

      // Get username from cookie (stored in document.cookie on client side)
      const cookies = document.cookie.split(";");
      const usernameCookie = cookies.find((c) => c.trim().startsWith("username="));
      if (usernameCookie) {
        setUsername(usernameCookie.split("=")[1]);
      }

      setLoading(false);
    }
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-black dark:text-zinc-50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-3xl font-semibold text-black dark:text-zinc-50">
          Welcome Home{username ? `, ${username}` : ""}!
        </h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-zinc-400">
          You have successfully logged in.
        </p>
        <button
          onClick={handleLogout}
          className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
