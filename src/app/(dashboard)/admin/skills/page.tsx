import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, PlusCircle, Edit3, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DFD1] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Layers className="h-6 w-6 text-[#1B4332]" />
            Skill Taxonomy & Competency Hierarchy
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Standardized ontology of technical and soft skills mapped to university curriculum codes and industry demand weights.
          </p>
        </div>
        <Button variant="primary" size="sm" className="text-xs flex items-center gap-1">
          <PlusCircle className="h-3.5 w-3.5" /> Add Taxonomy Node
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="border-[#E4DFD1] bg-white flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  {skill.category}
                </Badge>
                <span className="text-xs font-bold text-[#1B4332] flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> {skill.demandScore || 85}/100
                </span>
              </div>
              <CardTitle className="text-base text-zinc-900">{skill.name}</CardTitle>
              <CardDescription className="text-xs text-zinc-600 line-clamp-2 mt-1">
                {skill.description || "Standard industry competency benchmark."}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-3 rounded-b-xl flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-medium">{skill.isActive ? "Active Ontology" : "Deprecated"}</span>
              <Button variant="outline" size="sm" className="text-xs">
                Edit Weight
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
