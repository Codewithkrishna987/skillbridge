import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileCheck2, AlertCircle, Check, X, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const escalatedApps = await prisma.application.findMany({
    where: { isEscalated: true },
    include: {
      student: { include: { user: true } },
      opportunity: { include: { company: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <FileCheck2 className="h-6 w-6 text-[#1B4332]" />
          Escalated Match Review Queue
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Applications with borderline skill-gap scores (70–84%) requiring faculty mentor review and recommendation before recruiter dispatch.
        </p>
      </div>

      <div className="space-y-4">
        {escalatedApps.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500 bg-white">
            No pending escalated applications. All candidate recommendations are current!
          </div>
        ) : (
          escalatedApps.map((app) => (
            <Card key={app.id} className="border-[#E4DFD1] bg-white">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-emerald-800">Candidate: {app.student.user.name}</div>
                    <CardTitle className="text-base text-zinc-900 mt-0.5">
                      Target Role: {app.opportunity.title} ({app.opportunity.company?.name})
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">
                      Score: {app.matchScore || 74}% (Borderline)
                    </Badge>
                    <Badge variant="outline">
                      {app.matchConfidence || "MEDIUM"} Confidence
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  <strong>Student Cover Note:</strong> {app.coverNote || "Eager to contribute frontend engineering skills while completing Docker training."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-zinc-600">
                  Deficit identified in <strong>Docker</strong>. Faculty endorsement needed for prerequisite exemption.
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs text-red-700 border-red-200 hover:bg-red-50">
                    <X className="h-3.5 w-3.5 mr-1" /> Defer
                  </Button>
                  <Button variant="primary" size="sm" className="text-xs">
                    <Check className="h-3.5 w-3.5 mr-1" /> Endorse Candidate
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
