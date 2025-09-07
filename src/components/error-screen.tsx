"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionLink = {
  href?: string;
  label: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | null | undefined;
};

export function ErrorScreen({
  code,
  title,
  description,
  primary,
  secondary,
  illustration,
  className,
}: {
  code?: string | number;
  title: string;
  description?: string | React.ReactNode;
  primary?: ActionLink;
  secondary?: ActionLink;
  illustration?: React.ReactNode;
  className?: string;
}) {
  const getDefaultIllustration = () => {
    const codeStr = String(code);

    switch (codeStr) {
      case "401":
        return (
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        );
      case "403":
        return (
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        );
      case "404":
        return (
          <svg
            className="w-8 h-8 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.7-2.7"
            />
          </svg>
        );
      case "500":
        return (
          <svg
            className="w-8 h-8 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "503":
        return (
          <svg
            className="w-8 h-8 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center px-4 py-8",
        "min-h-screen w-full",
        className,
      )}
    >
      {/* Background with animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />

        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

        <div className="absolute inset-0 bg-radial-gradient opacity-30" />
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-2xl text-center relative z-10 w-full">
        {code && (
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 mb-6">
            <span className="text-sm font-bold text-gray-700 tracking-wide">ERROR {code}</span>
          </div>
        )}

        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-lg backdrop-blur-sm">
          <div className="relative">
            {illustration ?? getDefaultIllustration()}
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-sm" />
          </div>
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:text-5xl">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {description && (
          <div className="mt-4 max-w-lg mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {primary && (
            <div className="order-1 sm:order-2">
              {primary.href ? (
                <Link href={primary.href} passHref>
                  <Button variant={primary.variant ?? "default"} className="min-w-[140px]">
                    {primary.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant={primary.variant ?? "default"}
                  onClick={primary.onClick}
                  className="min-w-[140px]"
                >
                  {primary.label}
                </Button>
              )}
            </div>
          )}

          {secondary && (
            <div className="order-2 sm:order-1">
              {secondary.href ? (
                <Link href={secondary.href} passHref>
                  <Button variant={secondary.variant ?? "secondary"} className="min-w-[140px]">
                    {secondary.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant={secondary.variant ?? "secondary"}
                  onClick={secondary.onClick}
                  className="min-w-[140px]"
                >
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Cần hỗ trợ thêm?{" "}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .bg-radial-gradient {
                    background: radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
                }
            `}</style>
    </div>
  );
}

export default ErrorScreen;
