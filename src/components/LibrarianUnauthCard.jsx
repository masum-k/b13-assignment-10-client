import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function LibrarianUnauthCard() {

  const { data: session, isPending } = useSession();

  return (
    <div className="w-full max-w-md mx-auto my-12 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 text-center shadow-sm font-sans">
      {/* Icon Badge */}
      <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-sm flex items-center justify-center mx-auto mb-4 border border-rose-100">
        <ShieldAlert className="w-6 h-6 stroke-2" />
      </div>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
        UNAUTHORIZED ACCESS
      </h2>

      <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
        {session?.user?.role === "reader" ?"You are unauthorized": "You need an active account to view this page. Please log in or sign up to continue."}
      </p>

      {/* Primary Action Button */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <Link
          href="/auth/signin"
          className="w-full sm:w-auto border-2 border-rose-600 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-sm transition-colors text-center"
        >
          Log In
        </Link>
        <Link
          href="/auth/signup"
          className="w-full sm:w-auto border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-sm transition-colors text-center"
        >
          Sign Up
        </Link>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-gray-100 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Bookstore
        </Link>
      </div>
    </div>
  );
}