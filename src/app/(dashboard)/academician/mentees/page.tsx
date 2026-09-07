import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function MenteesPage() {
  const students = await prisma.studentProfile.findMany({
    include: {
      user: true,
      skills: {
        include: { skill: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <Users className="h-6 w-6 text-[#1B4332]" />
          Assigned Student Mentees
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Monitor your students' verified competency scores, placement readiness flags, and curriculum gap diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {students.map((student) => (
          <Card key={student.id} className="border-[#E4DFD1] bg-white flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant={student.isPlacementReady ? "verified" : "warning"} className="text-[10px]">
                  {student.isPlacementReady ? "Placement Ready" : "Skill Gap Identified"}
                </Badge>
                <span className="text-xs text-zinc-500 font-semibold">CGPA: {student.cgpa || "8.7"}</span>
              </div>
              <CardTitle className="text-base text-zinc-900">{student.user.name}</CardTitle>
              <CardDescription className="text-xs text-zinc-600">
                {student.course} ({student.branch}) • Year {student.yearOfStudy}
              </CardDescription>
              <div className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                <Mail className="h-3 w-3" /> {student.user.email}
              </div>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {student.skills.slice(0, 3).map((s) => (
                  <span key={s.id} className="rounded-md bg-white border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
                    {s.skill.name}: {s.score}%
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="text-xs border-[#1B4332] text-[#1B4332]">
                Audit Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
