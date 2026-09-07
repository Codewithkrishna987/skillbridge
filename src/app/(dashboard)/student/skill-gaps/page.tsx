import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, AlertTriangle, CheckCircle, TrendingUp, BookOpen, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SkillGapsPage() {
  const gaps = [
    {
      skill: "PostgreSQL & Database Optimization",
      requiredScore: 80,
      currentScore: 0,
      gap: 80,
      priority: "CRITICAL",
      reason: "Required by 75% of cloud and backend opportunities.",
      recommendedAction: "Take the 4-module PostgreSQL Advanced indexing lab.",
    },
    {
      skill: "Docker & Container Orchestration",
      requiredScore: 75,
      currentScore: 20,
      gap: 55,
      priority: "HIGH",
      reason: "Mandatory prerequisite for Cloud Engineering internships at Nexura.",
      recommendedAction: "Complete Docker build & compose benchmark assessment.",
    },
    {
      skill: "REST API Design & Security",
      requiredScore: 85,
      currentScore: 78,
      gap: 7,
      priority: "LOW",
      reason: "Near threshold. Small boost will unlock 12 additional senior roles.",
      recommendedAction: "Review JWT refresh token architecture patterns.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DFD1] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Layers className="h-6 w-6 text-[#1B4332]" />
            Skill Gap Diagnostic Engine
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Real-time benchmark of your verified skills against active corporate requirements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-[#E4DFD1] bg-white px-4 py-2 text-right">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase">Overall Readiness</div>
            <div className="text-xl font-bold text-[#1B4332]">78.4%</div>
          </div>
        </div>
      </div>

      {/* Main Gaps Analysis */}
      <div className="space-y-4">
        {gaps.map((item, idx) => (
          <Card key={idx} className="border-[#E4DFD1] bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant={item.priority === "CRITICAL" ? "destructive" : item.priority === "HIGH" ? "warning" : "default"}
                  className="text-xs"
                >
                  {item.priority} GAP: {item.gap}% Deficit
                </Badge>
                <span className="text-xs text-zinc-500">
                  Target: {item.requiredScore}% | Current: {item.currentScore}%
                </span>
              </div>
              <CardTitle className="text-base text-zinc-900 pt-1">
                {item.skill}
              </CardTitle>
              <CardDescription className="text-xs text-zinc-600">
                {item.reason}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-50/50 p-4 rounded-b-xl">
              <div className="flex items-center gap-2 text-xs text-zinc-700">
                <BookOpen className="h-4 w-4 text-[#1B4332] shrink-0" />
                <span><strong>Recommended Path:</strong> {item.recommendedAction}</span>
              </div>
              <Button variant="primary" size="sm" className="text-xs shrink-0">
                Bridge Gap <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
