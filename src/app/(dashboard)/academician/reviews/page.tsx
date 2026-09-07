import React from "react";
import { FileCheck2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { AcademicianReviewList } from "@/components/interactive/academician-review-list";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const escalatedApps = await prisma.application.findMany({
    where: { isEscalated: true },
    include: {
      student: { include: { user: true } },
      opportunity: { include: { company: true } },
    },
  });

  const formattedReviews = escalatedApps.map((app) => ({
    id: app.id,
    candidateName: app.student.user.name,
    candidateCourse: `${app.student.course} (${app.student.branch})`,
    opportunityTitle: app.opportunity.title,
    companyName: app.opportunity.company?.name || "Corporate Partner",
    matchScore: app.matchScore || 84.5,
    matchConfidence: app.matchConfidence || "MEDIUM",
    coverNote:
      app.coverNote ||
      "Eager to contribute frontend engineering skills (React/Next.js) while completing Docker bridging module under mentor supervision.",
    identifiedDeficit: "Docker (Containerization)",
    initialEndorsed: false,
  }));

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <FileCheck2 className="h-6 w-6 text-[#1B4332]" />
          Escalated Match Review Queue (AI Flow Phase 4)
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Applications with borderline skill-gap scores (70–84%) requiring faculty mentor review and endorsement before recruiter dispatch.
        </p>
      </div>

      <AcademicianReviewList initialReviews={formattedReviews} />
    </div>
  );
}
