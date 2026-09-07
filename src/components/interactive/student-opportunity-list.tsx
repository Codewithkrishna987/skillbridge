"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  UserCheck,
  X,
} from "lucide-react";
import Link from "next/link";

interface OpportunityItem {
  id: string;
  title: string;
  description: string;
  type: string;
  location?: string | null;
  workMode: string;
  stipendOrSalaryMin?: number | null;
  stipendOrSalaryMax?: number | null;
  durationMonths?: number | null;
  companyName?: string;
  institutionName?: string;
  matchScore?: number;
}

export function StudentOpportunityList({ initialOpportunities }: { initialOpportunities: OpportunityItem[] }) {
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem | null>(null);
  const [appliedIds, setAppliedIds] = useState<string[]>(["clopp1"]);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [coverNote, setCoverNote] = useState<string>(
    "Eager to contribute frontend engineering skills (React/Next.js) while completing Docker bridging module under mentor supervision."
  );

  const handleApply = (opp: OpportunityItem) => {
    setSelectedOpp(opp);
    setSubmissionSuccess(false);
  };

  const confirmApplication = () => {
    if (!selectedOpp) return;
    setAppliedIds((prev) => [...prev, selectedOpp.id]);
    setSubmissionSuccess(true);
  };

  return (
    <div className="space-y-4">
      {/* Active opportunities */}
      {initialOpportunities.map((opp) => {
        const isApplied = appliedIds.includes(opp.id);
        const score = opp.matchScore || 84.5;
        const isBorderline = score >= 70 && score < 85;

        return (
          <Card key={opp.id} className="border-[#E4DFD1] bg-white hover:border-[#1B4332]/40 transition-all shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-bold text-sm">
                    {opp.companyName?.[0] || opp.institutionName?.[0] || "O"}
                  </div>
                  <div>
                    <CardTitle className="text-base text-zinc-900">{opp.title}</CardTitle>
                    <div className="text-xs text-zinc-500 font-medium">
                      {opp.companyName || opp.institutionName || "Partner Organization"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="verified" className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {score}% Match
                  </Badge>
                  <Badge variant="outline" className="text-xs font-medium">
                    {opp.type}
                  </Badge>
                  {isBorderline && (
                    <Badge variant="warning" className="text-[10px]">
                      Phase 4 Escalated
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription className="text-xs text-zinc-600 mt-2 leading-relaxed">
                {opp.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-50/50 p-4 rounded-b-xl">
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  {opp.location || "Remote"} ({opp.workMode})
                </span>
                {opp.stipendOrSalaryMin && (
                  <span className="flex items-center gap-1 font-semibold text-[#1B4332]">
                    <DollarSign className="h-3.5 w-3.5 text-[#1B4332]" />
                    ₹{opp.stipendOrSalaryMin.toLocaleString()} - ₹{opp.stipendOrSalaryMax?.toLocaleString()} / mo
                  </span>
                )}
                {opp.durationMonths && <span>• {opp.durationMonths} Months</span>}
              </div>

              {isApplied ? (
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#1B4332] text-white text-xs py-1 px-3 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> Application Active
                  </Badge>
                  <Link href="/student/applications">
                    <Button variant="outline" size="sm" className="text-xs">
                      Track Status
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  onClick={() => handleApply(opp)}
                  variant="primary"
                  size="sm"
                  className="text-xs shrink-0 flex items-center gap-1"
                >
                  Apply with Verified Score <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Interactive Application Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#E4DFD1] rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Step 5: Student Applies (End-to-End Flow)
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mt-1">
                  Apply for {selectedOpp.title}
                </h3>
                <p className="text-xs text-zinc-500">{selectedOpp.companyName || "Corporate Partner"}</p>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!submissionSuccess ? (
              <div className="space-y-4">
                {/* AI Score Breakdown */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-950">AI Semantic Match Index:</span>
                    <span className="font-bold text-emerald-800 text-sm">84.5%</span>
                  </div>
                  <div className="text-[11px] text-zinc-600 space-y-1">
                    <div className="flex justify-between">
                      <span>React (Weighted 40%):</span>
                      <strong className="text-emerald-700">90% (Verified)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>TypeScript (Weighted 30%):</span>
                      <strong className="text-emerald-700">85% (Verified)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Docker (Weighted 30%):</span>
                      <strong className="text-amber-700">55% (Skill Gap Deficit)</strong>
                    </div>
                  </div>
                </div>

                {/* Escalation Notice */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong>Phase 4 Escalation Rule:</strong> Because your match confidence is <strong>84.5%</strong> (borderline 70–84.9%), this application will route to your faculty mentor (<strong>Dr. Aris Thorne</strong>) for manual review and endorsement before final recruiter dispatch.
                  </div>
                </div>

                {/* Student Cover Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">
                    Candidate Endorsement Request Note:
                  </label>
                  <textarea
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    rows={3}
                    className="w-full text-xs rounded-lg border border-zinc-200 p-2.5 focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedOpp(null)} className="text-xs">
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={confirmApplication} className="text-xs flex items-center gap-1">
                    <FileCheck className="h-4 w-4" /> Authorize & Submit Application
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-3 text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-[#1B4332] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-zinc-900">
                    Application Successfully Registered!
                  </h4>
                  <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                    Under <strong>AI Flow Phase 4 (Matching & Escalation)</strong>, your dossier has been routed to <strong>Faculty Mentor Dr. Aris Thorne</strong> for review.
                  </p>
                </div>

                <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-left text-xs space-y-1">
                  <div className="font-semibold text-zinc-700">Next Recommended Step in Demo:</div>
                  <div className="text-zinc-600">
                    Switch to <strong>Academician (Dr. Aris Thorne)</strong> to view this candidate in the <em>Escalated Match Queue</em> and issue the official endorsement!
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedOpp(null)} className="text-xs">
                    Close Window
                  </Button>
                  <Link href="/student/applications">
                    <Button variant="primary" size="sm" className="text-xs flex items-center gap-1">
                      View Application Tracking <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
