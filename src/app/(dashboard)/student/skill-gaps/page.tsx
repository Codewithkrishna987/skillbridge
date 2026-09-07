"use client";

import React, { useState } from "react";
import { Layers, AlertTriangle, CheckCircle, TrendingUp, BookOpen, ArrowRight, Sparkles, Loader2, BarChart3, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const DEMO_SKILLS = [
  { name: "React", score: 88 },
  { name: "TypeScript", score: 84 },
  { name: "Node.js", score: 78 },
  { name: "CSS", score: 80 },
  { name: "Git", score: 85 },
];

interface Gap {
  skill: string;
  currentScore: number;
  requiredScore: number;
  gap: number;
  priority: string;
  reason: string;
  action: string;
}

interface GapReport {
  gaps: Gap[];
  overallReadiness: number;
  topStrengths: string[];
}

export default function SkillGapsPage() {
  const [report, setReport] = useState<GapReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customSkills, setCustomSkills] = useState<string>(
    DEMO_SKILLS.map(s => `${s.name}: ${s.score}`).join(", ")
  );

  async function runGapAnalysis() {
    setLoading(true);
    setError(null);

    try {
      // Parse skills from input
      const skills = customSkills.split(",").map(s => {
        const parts = s.trim().split(":");
        return { name: parts[0]?.trim() || s.trim(), score: parseInt(parts[1]?.trim() || "70", 10) };
      }).filter(s => s.name);

      const res = await fetch("/api/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed to analyze");

      setReport(data);
    } catch (err: any) {
      // Fallback demo data
      setError("Using demo data — add GROQ_API_KEY to .env for live AI analysis.");
      setReport({
        gaps: [
          { skill: "PostgreSQL & Database Optimization", currentScore: 0, requiredScore: 80, gap: 80, priority: "CRITICAL", reason: "Required by 75% of cloud and backend opportunities at Infosys, TCS, Wipro.", action: "Complete the 4-module PostgreSQL Advanced indexing lab (Est. 2 weeks)" },
          { skill: "Docker & Container Orchestration", currentScore: 20, requiredScore: 75, gap: 55, priority: "HIGH", reason: "Mandatory prerequisite for Cloud Engineering internships at Nexura Technologies.", action: "Complete Docker build & compose benchmark assessment (Est. 10 days)" },
          { skill: "REST API Design & Security", currentScore: 78, requiredScore: 85, gap: 7, priority: "LOW", reason: "Near threshold. Small boost will unlock 12 additional senior roles.", action: "Review JWT refresh token architecture patterns (Est. 2 days)" },
        ],
        overallReadiness: 78,
        topStrengths: ["React", "TypeScript", "Node.js"],
      });
    } finally {
      setLoading(false);
    }
  }

  const priorityColor = (p: string) => {
    if (p === "CRITICAL") return { badge: "destructive" as const, bar: "bg-red-500" };
    if (p === "HIGH") return { badge: "warning" as const, bar: "bg-orange-400" };
    return { badge: "default" as const, bar: "bg-blue-400" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DFD1] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Layers className="h-6 w-6 text-[#1B4332]" />
            AI Skill Gap Diagnostic Engine
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Real-time benchmark of your verified skills against active corporate requirements — powered by Groq AI.
          </p>
        </div>
        {report && (
          <div className="rounded-xl border border-[#E4DFD1] bg-white px-4 py-2 text-right">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase">Overall Readiness</div>
            <div className="text-xl font-bold text-[#1B4332]">{report.overallReadiness}%</div>
          </div>
        )}
      </div>

      {/* AI Analysis Input */}
      <Card className="border-[#E4DFD1]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#1B4332]" />
            Analyze Your Skill Profile
          </CardTitle>
          <CardDescription className="text-xs">
            Enter your skills (name: score format). Groq AI will identify your gaps against the Indian tech industry.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <input
            type="text"
            className="w-full rounded-lg border border-[#E4DFD1] px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
            value={customSkills}
            onChange={(e) => setCustomSkills(e.target.value)}
            placeholder="React: 85, TypeScript: 78, Docker: 20, Python: 60"
          />
          <p className="text-xs text-zinc-500">Format: SkillName: Score(0-100), separated by commas</p>

          {error && (
            <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            onClick={runGapAnalysis}
            disabled={loading || !customSkills.trim()}
            className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white flex items-center gap-2"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing with Groq AI...</>
            ) : (
              <><Sparkles className="h-4 w-4" /> Run Gap Analysis</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {report && (
        <>
          {/* Top Strengths */}
          {report.topStrengths && report.topStrengths.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-zinc-600 flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-emerald-600" /> Your Top Strengths:
              </span>
              {report.topStrengths.map((s) => (
                <Badge key={s} className="bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Gaps List */}
          <div className="space-y-4">
            {report.gaps.map((item, idx) => {
              const colors = priorityColor(item.priority);
              return (
                <Card key={idx} className="border-[#E4DFD1] bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={colors.badge} className="text-xs">
                        {item.priority} GAP: {item.gap}% Deficit
                      </Badge>
                      <span className="text-xs text-zinc-500">
                        Target: {item.requiredScore}% | Current: {item.currentScore}%
                      </span>
                    </div>
                    <CardTitle className="text-base text-zinc-900 pt-1">{item.skill}</CardTitle>
                    <CardDescription className="text-xs text-zinc-600">{item.reason}</CardDescription>

                    {/* Progress bar */}
                    <div className="mt-2 space-y-1">
                      <div className="w-full bg-zinc-100 rounded-full h-1.5 relative">
                        <div
                          className={`${colors.bar} h-1.5 rounded-full transition-all`}
                          style={{ width: `${item.currentScore}%` }}
                        />
                        <div
                          className="absolute top-0 h-1.5 w-0.5 bg-zinc-400"
                          style={{ left: `${item.requiredScore}%` }}
                          title={`Target: ${item.requiredScore}%`}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>0%</span>
                        <span className="text-zinc-500 font-medium">Target: {item.requiredScore}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-50/50 p-4 rounded-b-xl">
                    <div className="flex items-center gap-2 text-xs text-zinc-700">
                      <BookOpen className="h-4 w-4 text-[#1B4332] shrink-0" />
                      <span><strong>Recommended Path:</strong> {item.action}</span>
                    </div>
                    <Button variant="primary" size="sm" className="text-xs shrink-0">
                      Bridge Gap <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button variant="outline" onClick={runGapAnalysis} className="border-[#1B4332] text-[#1B4332] flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Re-run Analysis
          </Button>
        </>
      )}

      {!report && !loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400 space-y-3">
          <BarChart3 className="h-12 w-12" />
          <p className="text-sm">Enter your skills above and click "Run Gap Analysis" to get your AI-powered diagnostic report.</p>
        </div>
      )}
    </div>
  );
}
