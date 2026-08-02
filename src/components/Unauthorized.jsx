"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button, Chip } from "@heroui/react";
import { ShieldAlert, ArrowLeft, LogIn, Home } from "lucide-react";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-content1/50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <Card className="max-w-md w-full border border-default-200/80 shadow-lg bg-background">
        <Card className="p-8 sm:p-10 flex flex-col items-center text-center space-y-6">
          
          {/* ICON BADGE */}
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-danger-50 flex items-center justify-center text-danger border border-danger-200/60 shadow-inner">
              <ShieldAlert className="w-10 h-10 stroke-[1.75]" />
            </div>
            <Chip
              size="sm"
              color="danger"
              variant="flat"
              className="absolute -bottom-2 font-mono text-[11px] font-semibold tracking-wide border border-danger-200"
            >
              ERROR 401
            </Chip>
          </div>

          {/* HEADING & TEXT */}
          <div className="space-y-2 pt-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Authentication Required
            </h1>
            <p className="text-sm text-default-500 leading-relaxed max-w-sm">
              You don&apos;t have permission to access this page. Please sign in with an authorized account to continue.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="w-full space-y-3 pt-2">
            {/* Primary Action: Sign In */}
            <Link
              href="/auth/signin"
              color="primary"
              size="lg"
              className="w-full font-semibold text-sm shadow-sm flex items-center justify-center gap-2"
              startContent={<LogIn className="w-4 h-4" />}
            >
              Sign In to Continue
            </Link>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="flat"
                color="default"
                size="md"
                className="w-full text-xs font-semibold"
                startContent={<ArrowLeft className="w-3.5 h-3.5" />}
                onClick={() => router.back()}
              >
                Go Back
              </Button>

              <Button
                as={Link}
                href="/"
                variant="flat"
                color="default"
                size="md"
                className="w-full text-xs font-semibold"
                startContent={<Home className="w-3.5 h-3.5" />}
              >
                Home Page
              </Button>
            </div>
          </div>

          {/* HELPER FOOTER */}
          <p className="text-[11px] text-default-400 pt-2 border-t border-default-100 w-full">
            If you believe this is an error, please contact your administrator.
          </p>

        </Card>
      </Card>
    </main>
  );
}