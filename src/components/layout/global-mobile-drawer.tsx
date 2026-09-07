"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useSidebar } from "@/components/layout/sidebar-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Compass,
  X,
  LayoutDashboard,
  Target,
  FileCheck2,
  Briefcase,
  Award,
  Layers,
  Users,
  CheckCircle2,
  GraduationCap,
  Building2,
  PlusCircle,
  TrendingUp,
  ShieldCheck,
  ClipboardList,
  LogOut,
  Home,
  User as UserIcon,
  ArrowRight,
} from "lucide-react";

export function GlobalMobileDrawer() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;
  const { isOpen, close } = useSidebar();

  if (!isOpen) return null;

  const studentLinks = [
    { href: "/student", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/student/assessments", label: "Skill Assessments", icon: Target },
    { href: "/student/skill-gaps", label: "Skill Gap Analysis", icon: Layers },
    { href: "/student/opportunities", label: "Matched Opportunities", icon: Briefcase },
    { href: "/student/applications", label: "My Applications", icon: ClipboardList },
    { href: "/student/portfolio", label: "Digital Portfolio", icon: Award },
  ];

  const academicianLinks = [
    { href: "/academician", label: "Faculty Dashboard", icon: LayoutDashboard },
    { href: "/academician/mentees", label: "Assigned Mentees", icon: Users },
    { href: "/academician/reviews", label: "Escalated Match Queue", icon: FileCheck2 },
    { href: "/academician/verifications", label: "Portfolio Verifications", icon: CheckCircle2 },
    { href: "/academician/collaborations", label: "FDP & Research", icon: GraduationCap },
  ];

  const industryLinks = [
    { href: "/industry", label: "Recruiter Dashboard", icon: LayoutDashboard },
    { href: "/industry/post", label: "Post Opportunity", icon: PlusCircle },
    { href: "/industry/applications", label: "Candidate Pipeline", icon: Briefcase },
    { href: "/industry/skill-demand", label: "Skill Gap Analytics", icon: TrendingUp },
  ];

  const adminLinks = [
    { href: "/admin", label: "Admin Console", icon: LayoutDashboard },
    { href: "/admin/directory", label: "Institutions & Companies", icon: Building2 },
    { href: "/admin/skills", label: "Skill Taxonomy", icon: Layers },
    { href: "/admin/assessments", label: "Assessment Library", icon: Target },
    { href: "/admin/audits", label: "Audit & Compliance", icon: ShieldCheck },
  ];

  const guestLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/#solution", label: "The Solution", icon: Target },
    { href: "/#students", label: "For Students", icon: GraduationCap },
    { href: "/#institutions", label: "For Institutions", icon: Building2 },
    { href: "/#industry", label: "For Industry", icon: Briefcase },
  ];

  let roleLinks = studentLinks;
  if (role === "ACADEMICIAN" || role === "MENTOR") roleLinks = academicianLinks;
  else if (role === "INDUSTRY") roleLinks = industryLinks;
  else if (role === "ADMIN") roleLinks = adminLinks;

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity"
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div className="relative flex w-80 max-w-[85vw] flex-1 flex-col bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-250 border-r border-cream-border">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-cream-border bg-parchment/60">
          <Link href="/" onClick={close} className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest text-parchment shadow-xs">
              <Compass className="h-5 w-5 text-gold" />
            </div>
            <span className="font-bold text-lg text-forest tracking-tight">
              SkillBridge
            </span>
          </Link>

          <button
            type="button"
            onClick={close}
            className="rounded-xl p-2 text-ink-muted hover:bg-parchment hover:text-ink transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {user ? (
            <>
              {/* User Identity Card */}
              <div className="rounded-xl border border-cream-border bg-parchment/70 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-xs font-bold text-parchment shadow-2xs">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-ink truncate max-w-[140px]">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-ink-muted truncate max-w-[140px]">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <Badge variant="forest" className="text-[10px] py-0 px-2">
                    {user.role}
                  </Badge>
                </div>
              </div>

              {/* Navigation Links for Role */}
              <div className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                  {role} Workspace
                </div>
                <nav className="space-y-0.5">
                  {roleLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all",
                          isActive
                            ? "bg-forest/10 text-forest font-bold border-l-2 border-forest"
                            : "text-ink-light hover:bg-parchment hover:text-ink"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isActive ? "text-forest" : "text-ink-muted"
                          )}
                        />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Portal & Public Links */}
              <div className="pt-2 border-t border-cream-border space-y-1">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                  Quick Navigation
                </div>
                <Link
                  href="/"
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-ink-light hover:bg-parchment"
                >
                  <Home className="h-4 w-4 text-ink-muted" />
                  <span>Landing Page</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-ink-light hover:bg-parchment"
                >
                  <LayoutDashboard className="h-4 w-4 text-ink-muted" />
                  <span>Role Switcher</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Guest Menu */}
              <div className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                  Site Navigation
                </div>
                <nav className="space-y-1">
                  {guestLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-ink-light hover:bg-parchment hover:text-forest transition-colors"
                      >
                        <Icon className="h-4 w-4 text-ink-muted" />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Guest Actions */}
              <div className="pt-4 border-t border-cream-border space-y-2">
                <Link href="/login" onClick={close} className="block">
                  <Button variant="primary" className="w-full justify-center">
                    Enter Portal
                    <ArrowRight className="h-4 w-4 text-gold" />
                  </Button>
                </Link>
                <Link href="/register" onClick={close} className="block">
                  <Button variant="outline" className="w-full justify-center">
                    Register Institution or Corporate
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {user && (
          <div className="p-4 border-t border-cream-border bg-parchment/40">
            <button
              type="button"
              onClick={() => {
                close();
                signOut({ callbackUrl: "/" });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/60 px-4 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out of SkillBridge</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
