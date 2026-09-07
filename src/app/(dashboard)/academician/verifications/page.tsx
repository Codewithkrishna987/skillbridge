import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Check, X, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default function VerificationsPage() {
  const pendingItems = [
    {
      studentName: "Aarav Mehta",
      itemTitle: "Full-Stack Microservices Capstone",
      type: "CAPSTONE PROJECT",
      submittedDate: "Submitted yesterday",
      evidence: "GitHub repository + Live deployment link verified via Docker swarm",
      skillsReported: ["Next.js", "Docker", "PostgreSQL"],
    },
    {
      studentName: "Rohan Patel",
      itemTitle: "AWS Certified Solutions Architect Associate",
      type: "EXTERNAL CERTIFICATION",
      submittedDate: "Submitted 3 days ago",
      evidence: "Credly Digital Badge verification ID: #CS-992140",
      skillsReported: ["Cloud Architecture", "AWS IAM", "S3"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-[#1B4332]" />
          Portfolio Verification Queue
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Authenticate student capstones, external certifications, and laboratory internships to issue verified digital badges.
        </p>
      </div>

      <div className="space-y-4">
        {pendingItems.map((item, idx) => (
          <Card key={idx} className="border-[#E4DFD1] bg-white">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-emerald-800">Applicant: {item.studentName}</div>
                  <CardTitle className="text-base text-zinc-900 mt-0.5">{item.itemTitle}</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.type}
                </Badge>
              </div>
              <CardDescription className="text-xs text-zinc-600 mt-2">
                <strong>Proof & Verification URL:</strong> {item.evidence}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {item.skillsReported.map((s, sIdx) => (
                  <span key={sIdx} className="rounded-md bg-white border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs text-zinc-600">
                  Request Revision
                </Button>
                <Button variant="primary" size="sm" className="text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Issue Institutional Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
