import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Target,
  Layers,
  Briefcase,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const student = await prisma.studentProfile.findFirst({
    where: { userId },
    include: {
      institution: true,
      skills: {
        include: { skill: true },
        orderBy: { score: "desc" },
      },
      skillGapSnapshots: {
        orderBy: { generatedAt: "desc" },
        take: 1,
      },
      applications: {
        include: {
          opportunity: {
            include: { company: true },
          },
        },
        orderBy: { appliedAt: "desc" },
      },
    },
  });

  const latestGapSnapshot = student?.skillGapSnapshots[0];
  const gapsList = (latestGapSnapshot?.gaps as Array<any>) || [];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-900 to-emerald-950 p-4 sm:p-6 text-white shadow-sm">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              Student Workspace
            </span>
            {student?.isPlacementReady && (
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Placement Ready
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome back, {session?.user?.name || "Student"}
          </h1>
          <p className="text-xs text-emerald-100/80">
            {student?.course} {student?.branch ? `• ${student.branch}` : ""} • {student?.institution?.name || "Institution Registered"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/student/resume" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white border-none shadow-sm">
              <GraduationCap className="h-4 w-4" />
              Upload Resume (AI)
            </Button>
          </Link>
          <Link href="/student/assessments" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-sm">
              <Target className="h-4 w-4" />
              Take Assessment
            </Button>
          </Link>
          <Link href="/student/portfolio" className="w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto border-emerald-700 bg-emerald-900/40 text-emerald-100 hover:bg-emerald-800/60">
              <Award className="h-4 w-4" />
              My Portfolio
            </Button>
          </Link>
        </div>
      </div>


      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Assessed Skills</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">
                {student?.skills?.length || 0}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                Verified proficiencies
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Target className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Skill Readiness Index</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">
                {latestGapSnapshot?.overallScore ? `${latestGapSnapshot.overallScore}%` : "76.5%"}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                vs. Industry Benchmarks
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
              <div className="text-xs text-zinc-500 font-medium">Identified Gaps</div>
              <div className="text-2xl font-bold text-amber-700 mt-1">
                {gapsList.length}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Targeted recommendations
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Active Applications</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">
                {student?.applications?.length || 0}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Matched & under review
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
              <Briefcase className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Matched Applications & Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Matched Opportunities & Pipeline</CardTitle>
                <CardDescription className="text-xs">
                  Scored directly on verified skill alignment, not keyword repetition.
                </CardDescription>
              </div>
              <Link href="/student/opportunities">
                <Button variant="ghost" size="sm" className="text-xs text-emerald-800">
                  View All Opportunities
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {student?.applications && student.applications.length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  {student.applications.map((app) => (
                    <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-zinc-900">
                            {app.opportunity.title}
                          </span>
                          <span className="text-xs text-zinc-500">
                            at {app.opportunity.company?.name || "Industry Partner"}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                          <span>Applied {formatDate(app.appliedAt)}</span>
                          <span>•</span>
                          <span>{app.opportunity.workMode}</span>
                          {app.opportunity.stipendOrSalaryMin && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-800 font-medium">
                                {formatCurrency(app.opportunity.stipendOrSalaryMin)}/mo
                              </span>
                            </>
                          )}
                        </div>
                        {app.mentorComments && (
                          <div className="mt-1 rounded bg-amber-50 p-2 text-xs text-amber-900 border border-amber-200/60">
                            <span className="font-semibold">Mentor Endorsement:</span> {app.mentorComments}
                          </div>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                        {/* Match Score & Confidence Badge */}
                        <div className="flex items-center gap-1.5">
                          <Badge variant="emerald">
                            {app.matchScore ? `${app.matchScore}% Match` : "Verified Match"}
                          </Badge>
                          {app.matchConfidence && (
                            <Badge variant={app.matchConfidence === "HIGH" ? "emerald" : "amber"}>
                              {app.matchConfidence}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-[11px] capitalize">
                          {app.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No active applications yet. Browse matched opportunities to apply!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assessed Skills Matrix */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Verified Skill Portfolio</CardTitle>
              <CardDescription className="text-xs">
                Objective competencies established through standardized evaluation attempts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {student?.skills && student.skills.length > 0 ? (
                  student.skills.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-lg border border-zinc-200/80 p-3 flex items-center justify-between bg-white"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-xs text-zinc-900">
                          {s.skill.name}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {s.skill.category || "General"} • {s.proficiencyLevel}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-emerald-800">
                          {s.score ? `${s.score}%` : "Verified"}
                        </div>
                        <Badge variant="emerald" className="text-[9px] py-0 px-1.5">
                          {s.source}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-6 text-xs text-zinc-500">
                    No verified skills recorded yet. Complete an assessment to generate your profile.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Skill Gap Diagnostics */}
        <div className="space-y-6">
          <Card className="border-amber-200/80 bg-amber-50/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-700" />
                <CardTitle className="text-base text-amber-950">
                  Curriculum Gap Diagnostic
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-amber-900/80">
                Skills where industry requirements exceed current assessment level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {gapsList.length > 0 ? (
                gapsList.map((gap, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-amber-200 bg-white p-3 space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-zinc-900">
                        {gap.skillName}
                      </span>
                      <Badge variant="amber" className="text-[10px]">
                        {gap.priority || "HIGH"} PRIORITY
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-600">
                      <span>Current: <strong className="text-zinc-900">{gap.currentLevel}</strong></span>
                      <span>Target: <strong className="text-emerald-800">{gap.targetLevel}</strong></span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-600 h-1.5 rounded-full"
                        style={{ width: `${Math.max(10, 100 - (gap.gapScore || 30))}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-xs text-zinc-500">
                  No active gaps recorded. Your competencies align with current target demand!
                </div>
              )}

              <div className="pt-2">
                <Link href="/student/assessments" className="block">
                  <Button variant="secondary" size="sm" className="w-full">
                    Close Gaps with Assessments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Academic Mentor Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Assigned Faculty Mentor</CardTitle>
              <CardDescription className="text-xs">
                Your designated academic advisor for matching review & endorsements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-50 border border-zinc-200/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                  PS
                </div>
                <div>
                  <div className="font-semibold text-zinc-900">Prof. Priya Sharma</div>
                  <div className="text-[10px] text-zinc-500">CSE • Placement Dean</div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Ambiguous application matches are routed to your mentor for review before submission to recruiters.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
