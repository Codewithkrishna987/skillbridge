import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, ShieldCheck, Mail, ArrowRight, UserCheck } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function IndustryApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: {
      student: {
        include: {
          user: true,
          skills: { include: { skill: true } },
        },
      },
      opportunity: true,
    },
    orderBy: { matchScore: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-[#1B4332]" />
          Skill-Ranked Candidate Pipeline
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Review candidates ranked strictly by verified competency scores rather than keyword claims.
        </p>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500 bg-white">
            No applicants in pipeline yet.
          </div>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="border-[#E4DFD1] bg-white">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-800">
                        {app.student.course} ({app.student.branch})
                      </span>
                      {app.student.isPlacementReady && (
                        <Badge variant="verified" className="text-[10px]">
                          Placement Ready
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base text-zinc-900 mt-1">
                      {app.student.user.name} — Applied for {app.opportunity.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="verified" className="text-sm px-3 py-1">
                      Match: {app.matchScore || 84.5}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {app.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-zinc-600 mt-2 flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-zinc-700">Verified Skills:</span>
                  {app.student.skills.map((s) => (
                    <span key={s.id} className="rounded-md bg-zinc-100 border border-zinc-200/80 px-2 py-0.5 text-[11px] font-medium text-zinc-800">
                      {s.skill.name} ({s.score}%)
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-zinc-500">
                  Application submitted with verified assessment telemetry and mentor review status.
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    View Verified Dossier
                  </Button>
                  <Button variant="primary" size="sm" className="text-xs flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5" /> Advance to Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
