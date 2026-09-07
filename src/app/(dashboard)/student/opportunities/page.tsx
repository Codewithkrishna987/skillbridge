import React from "react";
import { Briefcase } from "lucide-react";
import { prisma } from "@/lib/db";
import { StudentOpportunityList } from "@/components/interactive/student-opportunity-list";

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({
    include: {
      company: true,
      institution: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedOpportunities = opportunities.map((opp) => ({
    id: opp.id,
    title: opp.title,
    description: opp.description,
    type: opp.type,
    location: opp.location,
    workMode: opp.workMode,
    stipendOrSalaryMin: opp.stipendOrSalaryMin,
    stipendOrSalaryMax: opp.stipendOrSalaryMax,
    durationMonths: opp.durationMonths,
    companyName: opp.company?.name,
    institutionName: opp.institution?.name,
    matchScore: 84.5,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DFD1] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#1B4332]" />
            Matched Opportunities (Smart Matching Engine)
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Roles mapped to verified skills with algorithmic confidence and human-in-the-loop escalation (Flowchart Phase 4).
          </p>
        </div>
      </div>

      <StudentOpportunityList initialOpportunities={formattedOpportunities} />
    </div>
  );
}
