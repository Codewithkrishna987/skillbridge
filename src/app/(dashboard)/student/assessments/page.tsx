import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Clock, Award, ArrowRight, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AssessmentsPage() {
  const assessments = [
    {
      id: "react-101",
      title: "React & Modern Frontend Architecture",
      category: "Frontend Development",
      duration: "45 mins",
      questions: 25,
      difficulty: "Advanced",
      status: "COMPLETED",
      score: 90,
      verifiedDate: "Verified 2 days ago",
    },
    {
      id: "ts-201",
      title: "TypeScript Core Types & Generics",
      category: "Frontend Development",
      duration: "30 mins",
      questions: 20,
      difficulty: "Intermediate",
      status: "COMPLETED",
      score: 85,
      verifiedDate: "Verified 1 week ago",
    },
    {
      id: "node-301",
      title: "Node.js REST API & Microservices",
      category: "Backend Development",
      duration: "40 mins",
      questions: 20,
      difficulty: "Intermediate",
      status: "COMPLETED",
      score: 78,
      verifiedDate: "Verified 2 weeks ago",
    },
    {
      id: "docker-401",
      title: "Docker & Container Orchestration",
      category: "DevOps & Cloud",
      duration: "35 mins",
      questions: 15,
      difficulty: "Intermediate",
      status: "AVAILABLE",
      recommendedFor: "High Industry Demand",
    },
    {
      id: "pg-501",
      title: "PostgreSQL Advanced Queries & Indexing",
      category: "Databases",
      duration: "45 mins",
      questions: 25,
      difficulty: "Advanced",
      status: "AVAILABLE",
      recommendedFor: "Closes Cloud Gap",
    },
    {
      id: "python-601",
      title: "Python Data Structures & Algorithms",
      category: "Core Computer Science",
      duration: "60 mins",
      questions: 30,
      difficulty: "Advanced",
      status: "AVAILABLE",
      recommendedFor: "Recruiter Priority",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-[#E4DFD1] bg-[#1B4332] p-6 sm:p-8 text-white shadow-sm">
        <div className="max-w-2xl space-y-2">
          <Badge className="bg-[#E8B84B] text-[#1B4332] font-semibold border-none">
            Verified Competency Engine
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Standardized Skill Assessments
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Take verified, timed assessments to benchmark your skills directly against industry hiring requirements. Scores update your live Skill Gap diagnostic and recruiter visibility.
          </p>
        </div>
      </div>

      {/* Grid of Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assessments.map((test) => {
          const isCompleted = test.status === "COMPLETED";

          return (
            <Card
              key={test.id}
              className="border-[#E4DFD1] bg-white hover:border-[#1B4332]/40 transition-all flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                    {test.category}
                  </span>
                  {isCompleted ? (
                    <Badge variant="verified" className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="text-[10px]">
                      {test.recommendedFor}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base text-zinc-900 leading-snug">
                  {test.title}
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500 flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {test.duration}
                  </span>
                  <span>•</span>
                  <span>{test.questions} Questions</span>
                  <span>•</span>
                  <span>{test.difficulty}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                {isCompleted ? (
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="text-xs text-zinc-500">Verified Score</div>
                      <div className="text-lg font-bold text-[#1B4332]">{test.score}%</div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs border-[#1B4332] text-[#1B4332]">
                      Retake Test
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-zinc-600 font-medium">Ready to attempt</span>
                    <Button variant="primary" size="sm" className="text-xs flex items-center gap-1">
                      Start Assessment <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
