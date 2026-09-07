"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, GraduationCap, Building2, Briefcase, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "ACADEMICIAN" | "INDUSTRY">("STUDENT");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "", // Institution for Student/Academician, Company for Industry
    identifier: "", // Enrollment number for student, department for academician, designation for industry
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: selectedRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to register account.");
        setIsSubmitting(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setError("An unexpected registration error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4 sm:p-8 bg-[#fafbfb]">
      <div className="w-full max-w-lg space-y-6">
        {/* Branding Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm mb-2">
            <Compass className="h-6 w-6 text-emerald-200" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Create Portal Account
          </h1>
          <p className="text-sm text-zinc-600">
            Select your role to connect to the verified skill and placement ecosystem.
          </p>
        </div>

        <Card className="shadow-sm border-zinc-200/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Your Primary Role</CardTitle>
            <CardDescription className="text-xs">
              Your role determines available features, assessment pathways, and permissions.
            </CardDescription>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRole("STUDENT")}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all text-center gap-1.5",
                  selectedRole === "STUDENT"
                    ? "border-emerald-700 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-700 font-semibold"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                )}
              >
                <GraduationCap className={cn("h-5 w-5", selectedRole === "STUDENT" ? "text-emerald-700" : "text-zinc-500")} />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("ACADEMICIAN")}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all text-center gap-1.5",
                  selectedRole === "ACADEMICIAN"
                    ? "border-amber-700 bg-amber-50 text-amber-950 ring-1 ring-amber-700 font-semibold"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                )}
              >
                <Building2 className={cn("h-5 w-5", selectedRole === "ACADEMICIAN" ? "text-amber-700" : "text-zinc-500")} />
                <span>Faculty / Mentor</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("INDUSTRY")}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all text-center gap-1.5",
                  selectedRole === "INDUSTRY"
                    ? "border-zinc-800 bg-zinc-100 text-zinc-950 ring-1 ring-zinc-800 font-semibold"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                )}
              >
                <Briefcase className={cn("h-5 w-5", selectedRole === "INDUSTRY" ? "text-zinc-900" : "text-zinc-500")} />
                <span>Industry Recruiter</span>
              </button>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                <span>Registration successful! Redirecting to sign in...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Full Name"
                  id="name"
                  placeholder="e.g. Aarav Mehta"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Work / College Email"
                  id="email"
                  type="email"
                  placeholder="name@apex.edu.in"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label={selectedRole === "INDUSTRY" ? "Company / Employer" : "College / University"}
                  id="organization"
                  placeholder={selectedRole === "INDUSTRY" ? "e.g. Nexura Cloud" : "e.g. Apex Institute"}
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
                <Input
                  label={
                    selectedRole === "STUDENT"
                      ? "Enrollment / Roll No."
                      : selectedRole === "ACADEMICIAN"
                      ? "Department / Subject"
                      : "Designation"
                  }
                  id="identifier"
                  placeholder={
                    selectedRole === "STUDENT"
                      ? "e.g. 2023CS042"
                      : selectedRole === "ACADEMICIAN"
                      ? "e.g. Computer Science"
                      : "e.g. University Recruiter"
                  }
                  required
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <div className="rounded-lg bg-zinc-50 p-3 text-[11px] text-zinc-600 border border-zinc-200/60 leading-relaxed">
                By registering, you consent to skill assessment evaluation and institutional aggregate reporting in accordance with DPDP compliance.
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-2"
                disabled={isSubmitting || success}
              >
                {isSubmitting ? "Creating Account..." : "Complete Registration"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-zinc-100 pt-4 text-xs text-zinc-600 bg-zinc-50/50 rounded-b-xl">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-emerald-800 hover:underline ml-1">
              Sign In here
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
