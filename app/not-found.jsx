"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000); // ⏱️ 10 seconds

    return () => clearTimeout(timer); // cleanup
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-200 to-green-400 dark:from-green-900 dark:to-green-700">

      <div className="text-center bg-white/80 dark:bg-black/40 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full">

        {/* 🚫 404 */}
        <h1 className="text-6xl font-bold text-green-700 dark:text-green-300 mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* ⏳ Redirect Info */}
        <p className="text-xs text-gray-500 mb-6">
          You will be redirected to home in 10 seconds...
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-md hover:opacity-90 active:scale-95 transition"
          >
            Go Home
          </Link>

          <Link
            href="/guide"
            className="px-4 py-2 rounded-xl border border-green-500 text-green-700 dark:text-green-300 font-semibold hover:bg-green-100 dark:hover:bg-green-900/30 transition"
          >
            View Guide
          </Link>

        </div>

      </div>
    </div>
  );
}