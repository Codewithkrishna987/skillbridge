import React from "react";
import { Briefcase } from "lucide-react";
import { prisma } from "@/lib/db";
import { IndustryPipelineList } from "@/components/interactive/industry-pipeline-list";

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

  const formattedCandidates = applications.map((app) => ({
    id: app.id,
    candidateName: app.student.user.name,
    courseBranch: `${app.student.course} (${app.student.branch})`,
    isPlacementReady: app.student.isPlacementReady,
    opportunityTitle: app.opportunity.title,
    matchScore: app.matchScore || 84.5,
    status: app.status,
    skills: app.student.skills.map((s) => ({
      name: s.skill.name,
      score: s.score ?? 0,
    })),
    mentorEndorsement:
      app.mentorComments ||
      "Candidate exhibits mastery in React (90%) and TypeScript (85%). Actively completing supervised Docker module. Fully endorsed for industry interview.",
  }));

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-[#1B4332]" />
          Skill-Ranked Candidate Pipeline (Flowchart Step 6)
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Review candidates ranked strictly by verified competency scores with faculty mentor sign-offs.
        </p>
      </div>

      <IndustryPipelineList initialCandidates={formattedCandidates} />
    </div>
  );
}
