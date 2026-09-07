import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Clock, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: {
      opportunity: {
        include: { company: true },
      },
    },
    orderBy: { appliedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-[#1B4332]" />
          My Applications
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Track verified applications, institutional mentor reviews, and recruiter decisions.
        </p>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500 bg-white">
            No active applications found. Explore matched opportunities to submit your profile!
          </div>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="border-[#E4DFD1] bg-white">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-base text-zinc-900">{app.opportunity.title}</CardTitle>
                    <div className="text-xs text-zinc-500 font-medium">{app.opportunity.company?.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="verified">
                      Match: {app.matchScore || 84.5}%
                    </Badge>
                    <Badge variant={app.status === "SHORTLISTED" ? "verified" : app.isEscalated ? "warning" : "default"}>
                      {app.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              {app.mentorComments && (
                <CardContent className="pt-2 border-t border-zinc-100 bg-amber-50/50 p-4 rounded-b-xl text-xs text-amber-900 flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Mentor Feedback:</strong> {app.mentorComments}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
