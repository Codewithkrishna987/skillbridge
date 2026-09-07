"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/layout/sidebar-context";
import {
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
  X,
  Compass,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const { isOpen, close } = useSidebar();

  const studentLinks = [
    { href: "/student", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/student/resume", label: "Upload Resume (AI)", icon: FileCheck2 },
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

  let links = studentLinks;
  if (role === "ACADEMICIAN" || role === "MENTOR") links = academicianLinks;
  else if (role === "INDUSTRY") links = industryLinks;
  else if (role === "ADMIN") links = adminLinks;

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4 bg-white">
      <div className="space-y-2">
        {/* Mobile Header with close button */}
        <div className="flex md:hidden items-center justify-between pb-3 mb-2 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-white">
              <Compass className="h-4 w-4 text-emerald-200" />
            </div>
            <span className="font-bold text-sm text-zinc-900">
              Skill<span className="text-emerald-700">Bridge</span>
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
          {role} Workspace
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all",
                  isActive
                    ? "bg-emerald-50 text-emerald-900 font-semibold border-r-2 border-emerald-700"
                    : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-emerald-700" : "text-zinc-500"
                  )}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Card */}
      <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-200/60 mt-4">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-800">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Skill-First Matching</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-600 leading-relaxed">
          Closing the curriculum-to-industry gap through verified skill feedback.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (visible md+) */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-cream-border bg-white min-h-[calc(100vh-5rem)]">
        {sidebarContent}
      </aside>
    </>
  );
}
