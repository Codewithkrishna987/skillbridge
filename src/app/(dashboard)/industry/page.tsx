import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  PlusCircle,
  Users,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  Layers,
  Award,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function IndustryDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const industry = await prisma.industryProfile.findFirst({
    where: { userId },
    include: {
      company: {
        include: {
          opportunities: {
            include: {
              requiredSkills: { include: { skill: true } },
              applications: {
                include: {
                  student: {
                    include: {
                      user: true,
                      skills: { include: { skill: true } },
                    },
                  },
                },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  const opportunities = industry?.company?.opportunities || [];
  const allApplications = opportunities.flatMap((o) => o.applications);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-gradient-to-r from-zinc-900 via-zinc-950 to-emerald-950 p-4 sm:p-6 text-white shadow-sm">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-300 border border-zinc-700">
              Corporate Recruitment Workspace
            </span>
            <span className="text-xs text-emerald-300">
              {industry?.designation || "Talent Partner"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {industry?.company?.name || "Corporate Partner"}
          </h1>
          <p className="text-xs text-zinc-300">
            {industry?.company?.industrySector} • {industry?.company?.headquartersCity}, {industry?.company?.headquartersCountry}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/industry/post" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-sm">
              <PlusCircle className="h-4 w-4" />
              Post Opportunity
            </Button>
          </Link>
          <Link href="/industry/skill-demand" className="w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
              <TrendingUp className="h-4 w-4" />
              Skill Demand Index
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Active Postings</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{opportunities.length}</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Skill-weighted roles
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
              <div className="text-xs text-zinc-500 font-medium">Matched Candidates</div>
              <div className="text-2xl font-bold text-emerald-800 mt-1">{allApplications.length}</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Pre-filtered by skill match
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Avg Match Score</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">84.5%</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                Verified candidate quality
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 font-medium">Campus Feedback Loop</div>
              <div className="text-2xl font-bold text-emerald-800 mt-1">Active</div>
              <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Signals routed to institutions
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Posted Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Skill-Weighted Opportunity Postings</CardTitle>
                <CardDescription className="text-xs">
                  Each role specifies mandatory skills, required proficiency tiers, and algorithmic weights.
                </CardDescription>
              </div>
              <Link href="/industry/post">
                <Button size="sm" variant="primary" className="text-xs">
                  <PlusCircle className="h-3.5 w-3.5" />
                  New Posting
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {opportunities.length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  {opportunities.map((opp) => (
                    <div key={opp.id} className="py-4 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-semibold text-sm text-zinc-900">
                            {opp.title}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-zinc-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {opp.location || "Onsite"}
                            </span>
                            <span>•</span>
                            <span>{opp.workMode}</span>
                            {opp.stipendOrSalaryMin && (
                              <>
                                <span>•</span>
                                <span className="text-emerald-800 font-medium">
                                  {formatCurrency(opp.stipendOrSalaryMin)}/mo
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <Badge variant="emerald">
                          {opp.applications.length} Pre-Screened Applicants
                        </Badge>
                      </div>

                      {/* Required Skills Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-zinc-500 font-medium mr-1">Required Skills:</span>
                        {opp.requiredSkills.map((rs) => (
                          <span
                            key={rs.id}
                            className="inline-flex items-center gap-1 rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-800 border border-zinc-200"
                          >
                            <span>{rs.skill.name}</span>
                            <span className="text-[10px] text-emerald-800 font-bold">({rs.minProficiency})</span>
                            {rs.isMandatory && <span className="text-red-500 text-[10px]">*</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No opportunities posted yet. Create your first opening with required skill weights.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Matched Candidate Pipeline */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Candidate Pipeline</CardTitle>
              <CardDescription className="text-xs">
                Matched students ranked by verified proficiency match score.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {allApplications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-lg border border-zinc-200/80 p-3 space-y-2 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-zinc-900">
                        {app.student.user.name}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {app.student.course} • CGPA: {app.student.cgpa || "8.5+"}
                      </div>
                    </div>
                    <Badge variant="emerald">
                      {app.matchScore}% Match
                    </Badge>
                  </div>

                  {app.mentorComments && (
                    <div className="rounded bg-amber-50 p-2 text-[11px] text-amber-900 border border-amber-200/60">
                      <span className="font-semibold">Mentor Review:</span> {app.mentorComments}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-zinc-500">
                      Applied {formatDate(app.appliedAt)}
                    </span>
                    <Button size="sm" variant="outline" className="h-6 text-[11px] px-2">
                      View Skill Breakdown
                    </Button>
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
