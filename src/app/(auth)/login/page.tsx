"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Compass, GraduationCap, Building2, Briefcase, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

function getErrorMessage(errCode: string | null): string | null {
  if (!errCode) return null;
  switch (errCode) {
    case "CredentialsSignin":
      return "Invalid email or password. Please verify your credentials.";
    case "SessionRequired":
      return "Please sign in to access that protected portal.";
    case "AccessDenied":
      return "Access denied. You do not have permission for that section.";
    case "Configuration":
      return "Authentication service configuration issue. Please try again.";
    default:
      return `Authentication notice: ${errCode}`;
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(() => getErrorMessage(urlError));
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected authentication error occurred.");
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setError(null);
    setIsLoading(true);
    setEmail(demoEmail);
    setPassword("Password123!");

    const res = await signIn("credentials", {
      email: demoEmail,
      password: "Password123!",
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header Branding */}
      <div className="text-center space-y-1">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm mb-2">
          <Compass className="h-6 w-6 text-emerald-200" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Welcome to SkillBridge
        </h1>
        <p className="text-sm text-zinc-600">
          Sign in to access your role-specific dashboard and skill pipeline.
        </p>
      </div>

      {/* Credentials Card */}
      <Card className="shadow-sm border-zinc-200/80">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Sign In with Credentials</CardTitle>
          <CardDescription className="text-xs">
            Enter your verified institutional or corporate credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="name@institution.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign In to Portal"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-zinc-100 pt-4 bg-zinc-50/50 rounded-b-xl">
          {/* 1-Click Demo Logins for Prototype Testing */}
          <div className="w-full space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 text-center">
              Instant Demo Access (Prototype Testing)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("student@skillbridge.edu")}
                className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5 text-left text-xs font-medium text-emerald-900 hover:bg-emerald-100/80 transition-colors"
              >
                <GraduationCap className="h-4 w-4 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-semibold">Student</div>
                  <div className="text-[10px] text-emerald-800">Aarav Mehta</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("academician@skillbridge.edu")}
                className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/70 p-2.5 text-left text-xs font-medium text-amber-900 hover:bg-amber-100/80 transition-colors"
              >
                <Building2 className="h-4 w-4 text-amber-700 shrink-0" />
                <div>
                  <div className="font-semibold">Academician</div>
                  <div className="text-[10px] text-amber-800">Prof. Priya Sharma</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("recruiter@nexura.com")}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2.5 text-left text-xs font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <Briefcase className="h-4 w-4 text-zinc-700 shrink-0" />
                <div>
                  <div className="font-semibold">Industry</div>
                  <div className="text-[10px] text-zinc-600">Nexura Recruiter</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin@skillbridge.org")}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2.5 text-left text-xs font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-zinc-700 shrink-0" />
                <div>
                  <div className="font-semibold">Admin</div>
                  <div className="text-[10px] text-zinc-600">System Governance</div>
                </div>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-emerald-800 hover:underline">
              Create role profile
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 sm:p-8 bg-[#fafbfb]">
      <Suspense fallback={<div className="text-xs text-zinc-500">Loading sign-in...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
