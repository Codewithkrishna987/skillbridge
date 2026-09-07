import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Calendar, ArrowRight, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default function CollaborationsPage() {
  const programs = [
    {
      title: "Faculty Industry Immersion Program (Next-Gen Cloud Native)",
      sponsor: "Nexura Cloud Systems",
      type: "FDP",
      duration: "4 Weeks (Summer Cohort)",
      mode: "Hybrid",
      description: "Hands-on corporate immersion covering microservices architecture, modern telemetry, and PostgreSQL partitioning to align semester curriculum.",
    },
    {
      title: "Joint Applied AI Research on Curriculum Drift",
      sponsor: "National Skill Council",
      type: "RESEARCH COLLABORATION",
      duration: "6 Months",
      mode: "Virtual",
      description: "Joint research initiative evaluating natural language processing methods to automatically detect curriculum obsolescence from job listings.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-[#1B4332]" />
          FDP & Industry Research Collaborations
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Faculty Development Programs, corporate consultancy, and university-industry joint research initiatives.
        </p>
      </div>

      <div className="space-y-4">
        {programs.map((prog, idx) => (
          <Card key={idx} className="border-[#E4DFD1] bg-white">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-emerald-800">{prog.sponsor}</div>
                  <CardTitle className="text-base text-zinc-900 mt-0.5">{prog.title}</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs font-semibold">
                  {prog.type}
                </Badge>
              </div>
              <CardDescription className="text-xs text-zinc-600 mt-2 leading-relaxed">
                {prog.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs text-zinc-600">
                <span><strong>Duration:</strong> {prog.duration}</span>
                <span>•</span>
                <span><strong>Mode:</strong> {prog.mode}</span>
              </div>
              <Button variant="primary" size="sm" className="text-xs shrink-0">
                Register Faculty Interest <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
