import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, AlertCircle, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SkillDemandPage() {
  const trendingSkills = [
    { name: "PostgreSQL Advanced Optimization", industryDemand: 94, institutionalSupply: 38, gap: 56 },
    { name: "Docker Containerization", industryDemand: 89, institutionalSupply: 42, gap: 47 },
    { name: "TypeScript & Next.js Architecture", industryDemand: 91, institutionalSupply: 62, gap: 29 },
    { name: "REST Security & OAuth", industryDemand: 85, institutionalSupply: 54, gap: 31 },
    { name: "AI Prompt & Vector Indexing", industryDemand: 78, institutionalSupply: 22, gap: 56 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-[#1B4332]" />
          Skill Gap & Market Demand Analytics
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Comparative intelligence on corporate recruitment demand versus institutional curriculum supply.
        </p>
      </div>

      <div className="space-y-4">
        {trendingSkills.map((item, idx) => (
          <Card key={idx} className="border-[#E4DFD1] bg-white p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-900">{item.name}</h3>
                <span className="text-xs text-zinc-500">Corporate Hiring Benchmark vs University Proficiency</span>
              </div>
              <Badge variant={item.gap > 40 ? "destructive" : "warning"} className="text-xs self-start sm:self-center">
                {item.gap}% Talent Shortage
              </Badge>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1">
                  <span>Industry Demand</span>
                  <span className="text-[#1B4332]">{item.industryDemand}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <div className="h-full bg-[#1B4332] rounded-full" style={{ width: `${item.industryDemand}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-500 mb-1">
                  <span>Institutional Supply</span>
                  <span>{item.institutionalSupply}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <div className="h-full bg-[#74A97E] rounded-full" style={{ width: `${item.institutionalSupply}%` }} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
