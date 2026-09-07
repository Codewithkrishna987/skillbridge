"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  UserCheck,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";

interface PipelineCandidate {
  id: string;
  candidateName: string;
  courseBranch: string;
  isPlacementReady: boolean;
  opportunityTitle: string;
  matchScore: number;
  status: string;
  skills: { name: string; score: number }[];
  mentorEndorsement?: string;
}

export function IndustryPipelineList({ initialCandidates }: { initialCandidates: PipelineCandidate[] }) {
  const [candidates, setCandidates] = useState<PipelineCandidate[]>(initialCandidates);
  const [selectedForInterview, setSelectedForInterview] = useState<PipelineCandidate | null>(null);
  const [interviewDate, setInterviewDate] = useState<string>("Tomorrow at 3:00 PM IST");
  const [interviewScheduledIds, setInterviewScheduledIds] = useState<string[]>([]);
  const [viewingDossier, setViewingDossier] = useState<PipelineCandidate | null>(null);

  const handleSchedule = () => {
    if (!selectedForInterview) return;
    setInterviewScheduledIds((prev) => [...prev, selectedForInterview.id]);
    setSelectedForInterview(null);
  };

  return (
    <div className="space-y-4">
      {candidates.map((app) => {
        const isScheduled = interviewScheduledIds.includes(app.id);

        return (
          <Card key={app.id} className="border-[#E4DFD1] bg-white shadow-xs hover:border-[#1B4332]/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-800">
                      {app.courseBranch}
                    </span>
                    {app.isPlacementReady && (
                      <Badge variant="verified" className="text-[10px]">
                        Placement Ready
                      </Badge>
                    )}
                    <Badge className="bg-[#1B4332] text-white text-[10px] flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-300" /> Faculty Endorsed
                    </Badge>
                  </div>
                  <CardTitle className="text-base text-zinc-900 mt-1">
                    {app.candidateName} — Applied for {app.opportunityTitle}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="verified" className="text-sm px-3 py-1 font-bold">
                    Score: {app.matchScore}%
                  </Badge>
                  <Badge variant={isScheduled ? "verified" : "outline"} className="text-xs">
                    {isScheduled ? "INTERVIEWING" : app.status}
                  </Badge>
                </div>
              </div>

              {/* Mentor Endorsement Box */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 mt-3 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                    Faculty Mentor Endorsement (Dr. Aris Thorne):
                  </span>
                  <span className="text-[10px] text-emerald-800 font-normal">Flowchart Phase 4 Verified</span>
                </div>
                <p className="text-emerald-900 italic leading-relaxed">
                  "{app.mentorEndorsement || "Candidate exhibits mastery in React (90%) and TypeScript (85%). Actively completing supervised Docker module. Fully endorsed for industry interview."}"
                </p>
              </div>

              <div className="text-xs text-zinc-600 mt-3 flex flex-wrap gap-2 items-center">
                <span className="font-semibold text-zinc-700">Verified Competencies:</span>
                {app.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded-md bg-zinc-100 border border-zinc-200/80 px-2 py-0.5 text-[11px] font-medium text-zinc-800"
                  >
                    {s.name} ({s.score}%)
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-500">
                Automated ATS pre-scoring completed. Prerequisite exemption confirmed by academic institution.
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDossier(app)}
                  className="text-xs"
                >
                  View Verified Dossier
                </Button>
                {isScheduled ? (
                  <Badge className="bg-[#1B4332] text-white text-xs py-1 px-3 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-300" /> Interview Scheduled
                  </Badge>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedForInterview(app)}
                    className="text-xs flex items-center gap-1"
                  >
                    <UserCheck className="h-3.5 w-3.5" /> Advance to Interview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Schedule Interview Modal */}
      {selectedForInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#E4DFD1] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Step 6: Application Tracking & Interview Round
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mt-1">
                  Invite {selectedForInterview.candidateName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedForInterview(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              Candidate possesses an <strong>84.5% verified score</strong> with official faculty mentor endorsement from Dr. Aris Thorne.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">Interview Slot Time:</label>
              <input
                type="text"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full text-xs rounded-lg border border-zinc-200 p-2.5 focus:border-[#1B4332] outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedForInterview(null)} className="text-xs">
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSchedule} className="text-xs flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Confirm Interview Invitation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dossier Modal */}
      {viewingDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#E4DFD1] rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-3">
              <div>
                <div className="text-xs font-semibold text-emerald-800">Verified Competency Dossier</div>
                <h3 className="text-base font-bold text-zinc-900">{viewingDossier.candidateName}</h3>
              </div>
              <button
                onClick={() => setViewingDossier(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-zinc-500 text-[11px]">Academic Institution</div>
                  <div className="font-bold text-zinc-900 mt-0.5">Indian Institute of Technology</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-zinc-500 text-[11px]">Verified Cumulative Fit</div>
                  <div className="font-bold text-emerald-800 mt-0.5">84.5% (High Tier)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-950">Benchmarked Assessment Telemetry</div>
                <div className="text-zinc-600 text-[11px] leading-relaxed">
                  • <strong>React Architecture Test:</strong> 90% (Top 5th Percentile)<br />
                  • <strong>TypeScript Static Typings:</strong> 85% (Proficient)<br />
                  • <strong>Docker & Linux DevOps:</strong> 55% (Remediation Bridging Active)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-950">Academician Human-in-the-Loop Signoff</div>
                <div className="text-amber-900 text-[11px]">
                  Dr. Aris Thorne confirmed on-campus lab practicals validate production code quality.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setViewingDossier(null)} className="text-xs">
                Close Dossier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
