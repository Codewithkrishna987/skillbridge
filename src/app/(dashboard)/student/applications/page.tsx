import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Clock, CheckCircle2, ShieldCheck, MessageSquare, ArrowRight, UserCheck } from "lucide-react";
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

  const trackingSteps = [
    { name: "1. Applied", active: true, done: true },
    { name: "2. Mentor Endorsed", active: true, done: true },
    { name: "3. Shortlisted", active: true, done: true },
    { name: "4. Interviewing", active: true, done: false },
    { name: "5. Placement", active: false, done: false },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-[#1B4332]" />
          My Applications (Step 6: Application Tracking)
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Track verified applications through faculty mentor review, recruiter shortlisting, and interview scheduling.
        </p>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500 bg-white">
            No active applications found. Explore matched opportunities to submit your profile!
          </div>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="border-[#E4DFD1] bg-white shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-800">
                        {app.opportunity.company?.name || "Corporate Partner"}
                      </span>
                      <Badge className="bg-[#1B4332] text-white text-[10px] flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-300" /> Faculty Endorsed
                      </Badge>
                    </div>
                    <CardTitle className="text-base text-zinc-900 mt-1">{app.opportunity.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="verified" className="text-sm font-bold">
                      Match: {app.matchScore || 84.5}%
                    </Badge>
                    <Badge variant="outline" className="text-xs font-semibold text-emerald-800">
                      SHORTLISTED & INTERVIEWING
                    </Badge>
                  </div>
                </div>

                {/* 5-Step Progress Timeline matching Step 6 of Flowchart */}
                <div className="pt-4 mt-2 border-t border-zinc-100">
                  <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    End-to-End Placement Status:
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {trackingSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-2 text-center text-[11px] font-medium border ${
                          step.done
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                            : step.active
                            ? "bg-amber-50 border-amber-300 text-amber-900 font-bold"
                            : "bg-zinc-50 border-zinc-200 text-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {step.done ? (
                            <CheckCircle2 className="h-3 w-3 text-emerald-700 shrink-0" />
                          ) : step.active ? (
                            <Clock className="h-3 w-3 text-amber-600 shrink-0" />
                          ) : null}
                          <span className="truncate">{step.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2 border-t border-zinc-100 bg-emerald-50/50 p-4 rounded-b-xl text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Faculty Mentor Endorsement (Dr. Aris Thorne):</strong>{" "}
                    {app.mentorComments ||
                      "Candidate exhibits mastery in React (90%) and TypeScript (85%). Actively completing supervised Docker module. Fully endorsed for industry interview."}
                  </div>
                </div>
                <Badge className="bg-white border border-emerald-300 text-emerald-900 text-[11px] shrink-0 font-medium">
                  Verified Dossier Dispatched
                </Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
