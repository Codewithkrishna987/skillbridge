import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building2,
  Briefcase,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AcademicianDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const academician = await prisma.academicianProfile.findFirst({
    where: { userId },
    include: {
      institution: true,
      mentorAssignments: {
        include: {
          student: {
            include: {
              user: true,
              skills: { include: { skill: true } },
            },
          },
        },
      },
      reviewedApplications: {
        include: {
          student: { include: { user: true } },
          opportunity: { include: { company: true } },
        },
        orderBy: { appliedAt: "desc" },
      },
    },
  });

  const menteeCount = academician?.mentorAssignments.length || 0;
  const reviews = academician?.reviewedApplications || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-stone-900 via-zinc-900 to-amber-950 p-4 sm:p-6 text-white shadow-sm">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
              Academic & Mentor Workspace
            </span>
            <span className="text-xs text-amber-200/80">
              {academician?.designation || "Faculty Mentor"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome, {session?.user?.name || "Professor"}
          </h1>
          <p className="text-xs text-zinc-300">
            {academician?.department} • {academician?.institution?.name}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/academician/reviews" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white border-none shadow-sm">
              <FileCheck2 className="h-4 w-4" />
              Review Escalations
            </Button>
          </Link>
          <Link href="/academician/collaborations" className="w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
              <GraduationCap className="h-4 w-4" />
              FDP Programs
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Assigned Mentees</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{menteeCount}</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Active student advisees
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Escalated Matches</div>
              <div className="text-2xl font-bold text-amber-700 mt-1">{reviews.length}</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Human review threshold
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <FileCheck2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Credential Verifications</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">2</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Certifications pending
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Curriculum Signal</div>
              <div className="text-2xl font-bold text-emerald-800 mt-1">88%</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Industry alignment score
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Escalated Matches Review Queue */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Escalated Match Review Queue</CardTitle>
              <CardDescription className="text-xs">
                Matches with medium/ambiguous confidence routed to faculty mentors for domain recommendation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  {reviews.map((app) => (
                    <div key={app.id} className="py-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-semibold text-sm text-zinc-900 flex items-center gap-2">
                            <span>{app.student.user.name}</span>
                            <span className="text-xs text-zinc-500 font-normal">
                              ({app.student.course} • Roll: {app.student.enrollmentNumber})
                            </span>
                          </div>
                          <div className="text-xs text-zinc-600 mt-0.5">
                            Target Role: <strong className="text-zinc-900">{app.opportunity.title}</strong> at {app.opportunity.company?.name || "Company"}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="emerald">
                            {app.matchScore}% Match
                          </Badge>
                          <Badge variant="amber">
                            {app.reviewDecision || "PENDING"}
                          </Badge>
                        </div>
                      </div>

                      {app.coverNote && (
                        <div className="rounded-lg bg-zinc-50 p-2.5 text-xs text-zinc-700 border border-zinc-200/60 italic">
                          &ldquo;{app.coverNote}&rdquo;
                        </div>
                      )}

                      {app.mentorComments && (
                        <div className="rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 border border-amber-200/60">
                          <strong>Your Review Endorsement:</strong> {app.mentorComments}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                        <span>Submitted on {formatDate(app.appliedAt)}</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            View Full Candidate Gap
                          </Button>
                          <Button size="sm" variant="primary" className="h-7 text-xs bg-emerald-700 hover:bg-emerald-800">
                            Endorse for Interview
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No escalated matches in your review queue right now.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Assigned Mentees Roster */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Assigned Mentees</CardTitle>
              <CardDescription className="text-xs">
                Undergraduate students under your placement advisement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {academician?.mentorAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="rounded-lg border border-zinc-200/80 p-3 space-y-2 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-zinc-900">
                        {assignment.student.user.name}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {assignment.student.course} • Year {assignment.student.yearOfStudy}
                      </div>
                    </div>
                    <Badge variant={assignment.student.isPlacementReady ? "emerald" : "outline"} className="text-[10px]">
                      {assignment.student.isPlacementReady ? "Ready" : "In Training"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {assignment.student.skills.slice(0, 3).map((s) => (
                      <span
                        key={s.id}
                        className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-700"
                      >
                        {s.skill.name} ({s.score}%)
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
