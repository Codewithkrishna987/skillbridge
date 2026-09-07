import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, PlusCircle, Clock, BookOpen, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminAssessmentsPage() {
  const assessmentModules = [
    { name: "Frontend Core (React & TypeScript)", questions: 45, passingScore: 70, attemptsTotal: 142 },
    { name: "Backend Architecture (Node.js & Express)", questions: 40, passingScore: 75, attemptsTotal: 98 },
    { name: "Cloud & Container Orchestration (Docker)", questions: 35, passingScore: 65, attemptsTotal: 74 },
    { name: "Relational Database Engineering (PostgreSQL)", questions: 50, passingScore: 75, attemptsTotal: 112 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DFD1] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Target className="h-6 w-6 text-[#1B4332]" />
            Standard Assessment Question Bank & Verification Rules
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Manage standardized rubrics, passing thresholds, and AI-proctored verification tests across institutions.
          </p>
        </div>
        <Button variant="primary" size="sm" className="text-xs flex items-center gap-1">
          <PlusCircle className="h-3.5 w-3.5" /> Create New Assessment Rubric
        </Button>
      </div>

      <div className="space-y-4">
        {assessmentModules.map((item, idx) => (
          <Card key={idx} className="border-[#E4DFD1] bg-white">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-base text-zinc-900">{item.name}</CardTitle>
                <Badge variant="verified">Active Rubric</Badge>
              </div>
              <CardDescription className="text-xs text-zinc-600 mt-1">
                Standardized algorithmic difficulty curve with randomized multiple-choice and practical code trace items.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-600">
              <div className="flex items-center gap-4">
                <span><strong>Questions:</strong> {item.questions}</span>
                <span>•</span>
                <span><strong>Passing Benchmark:</strong> {item.passingScore}%</span>
                <span>•</span>
                <span><strong>Student Submissions:</strong> {item.attemptsTotal}</span>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Configure Question Pool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
