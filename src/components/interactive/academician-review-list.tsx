"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileCheck2,
  Check,
  X,
  ShieldCheck,
  Award,
  AlertCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface ReviewItem {
  id: string;
  candidateName: string;
  candidateCourse: string;
  opportunityTitle: string;
  companyName: string;
  matchScore: number;
  matchConfidence: string;
  coverNote: string;
  identifiedDeficit: string;
  initialEndorsed?: boolean;
}

export function AcademicianReviewList({ initialReviews }: { initialReviews: ReviewItem[] }) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [endorsedIds, setEndorsedIds] = useState<string[]>([]);
  const [mentorNotes, setMentorNotes] = useState<Record<string, string>>({
    clapp1:
      "Candidate exhibits stellar mastery in React (90%) and TypeScript (85%). He is actively completing the Docker containerization micro-module under my departmental supervision. Fully endorsed for industry interview.",
  });

  const handleEndorse = (id: string) => {
    setEndorsedIds((prev) => [...prev, id]);
  };

  const handleDefer = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500 bg-white">
          No pending escalated applications. All candidate recommendations are current!
        </div>
      ) : (
        reviews.map((app) => {
          const isEndorsed = endorsedIds.includes(app.id) || app.initialEndorsed;

          return (
            <Card key={app.id} className="border-[#E4DFD1] bg-white shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-800">
                        Candidate: {app.candidateName}
                      </span>
                      <span className="text-[11px] text-zinc-500">• {app.candidateCourse}</span>
                    </div>
                    <CardTitle className="text-base text-zinc-900 mt-1">
                      Target Role: {app.opportunityTitle} ({app.companyName})
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isEndorsed ? "verified" : "warning"} className="text-xs">
                      {isEndorsed ? "Faculty Endorsed (90% Confidence)" : `Score: ${app.matchScore}% (Borderline)`}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {app.matchConfidence} Confidence
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  <strong>Student Cover Statement:</strong> {app.coverNote}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl space-y-3">
                <div className="rounded-lg bg-amber-50/80 border border-amber-200 p-2.5 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Flowchart Phase 4 Trigger:</strong> Deficit identified in{" "}
                    <strong>{app.identifiedDeficit}</strong> (55% vs 70% threshold). Faculty mentor endorsement grants prerequisite exemption and elevates candidate profile to recruiter.
                  </div>
                </div>

                {!isEndorsed ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-zinc-700">
                      Official Faculty Endorsement Note (Visible to Recruiter & Student Portfolio):
                    </label>
                    <textarea
                      value={mentorNotes[app.id] || ""}
                      onChange={(e) =>
                        setMentorNotes({ ...mentorNotes, [app.id]: e.target.value })
                      }
                      rows={2}
                      className="w-full text-xs rounded-lg border border-zinc-200 p-2 focus:border-[#1B4332] outline-none"
                    />
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-zinc-500">
                        Signed as: <strong>Dr. Aris Thorne (Professor of Computer Science)</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDefer(app.id)}
                          className="text-xs text-red-700 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-3.5 w-3.5 mr-1" /> Defer
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleEndorse(app.id)}
                          className="text-xs flex items-center gap-1.5"
                        >
                          <Check className="h-3.5 w-3.5" /> Endorse Candidate
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                        Candidate Endorsement Seal Issued!
                      </div>
                      <Badge className="bg-[#1B4332] text-white text-[10px]">
                        Forwarded to Recruiter
                      </Badge>
                    </div>
                    <p className="text-xs text-emerald-950 italic">
                      "{mentorNotes[app.id] || "Candidate endorsed with prerequisite exemption by Dr. Aris Thorne."}"
                    </p>
                    <div className="text-[11px] text-emerald-800 pt-1 flex items-center justify-between">
                      <span>Stampted to Student Digital Portfolio (Flowchart Step 7)</span>
                      <Link
                        href="/industry/applications"
                        className="font-semibold underline flex items-center gap-1 hover:text-emerald-950"
                      >
                        Check Recruiter View <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
