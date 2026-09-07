import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Layers,
  Target,
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  Users,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const [institutionsCount, companiesCount, skillsCount, assessmentsCount, institutions, companies, skills] =
    await Promise.all([
      prisma.institution.count(),
      prisma.company.count(),
      prisma.skill.count(),
      prisma.assessment.count(),
      prisma.institution.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.company.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.skill.findMany({ take: 8, orderBy: { name: "asc" } }),
    ]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-gradient-to-r from-zinc-950 via-zinc-900 to-stone-900 p-4 sm:p-6 text-white shadow-sm">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              System Administration
            </span>
            <span className="text-xs text-zinc-400">Global Governance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            SkillBridge Control Center
          </h1>
          <p className="text-xs text-zinc-300">
            Platform-wide governance: institutions, taxonomy, assessments, and audit compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/skills" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-sm">
              <PlusCircle className="h-4 w-4" />
              Add Taxonomy Skill
            </Button>
          </Link>
          <Link href="/admin/audits" className="w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
              <ShieldCheck className="h-4 w-4" />
              Audit Logs
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Institutions</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{institutionsCount}</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Universities & Colleges
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Building2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Corporate Partners</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{companiesCount}</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Registered recruiters
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
              <Briefcase className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Skill Taxonomy</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{skillsCount}</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Standardized skills
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Assessment Catalog</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{assessmentsCount}</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Benchmarked evaluations
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Target className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institutions Directory */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Academic Institutions</CardTitle>
            <CardDescription className="text-xs">
              Affiliated universities, colleges, and polytechnics on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-zinc-100">
              {institutions.map((inst) => (
                <div key={inst.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-zinc-900">{inst.name}</div>
                    <div className="text-[11px] text-zinc-500">
                      {inst.city}, {inst.state} • {inst.accreditationBody} {inst.accreditationGrade}
                    </div>
                  </div>
                  <Badge variant={inst.isVerified ? "emerald" : "outline"} className="text-[10px]">
                    {inst.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Corporate Partners Directory */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Industry Partners</CardTitle>
            <CardDescription className="text-xs">
              Companies recruiting via skill-gap-first matching.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-zinc-100">
              {companies.map((comp) => (
                <div key={comp.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-zinc-900">{comp.name}</div>
                    <div className="text-[11px] text-zinc-500">
                      {comp.industrySector} • {comp.headquartersCity}
                    </div>
                  </div>
                  <Badge variant={comp.isVerified ? "emerald" : "outline"} className="text-[10px]">
                    {comp.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
