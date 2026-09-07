import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Github, ExternalLink, ShieldCheck, PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function PortfolioPage() {
  const portfolioItems = [
    {
      title: "SkillBridge Matching Engine (Prototype)",
      type: "PROJECT",
      description: "Full-stack Next.js application implementing continuous curriculum feedback and skill-gap matching.",
      skills: ["React", "TypeScript", "Next.js", "Prisma", "PostgreSQL"],
      verified: true,
      githubUrl: "https://github.com/Codewithkrishna987/skillbridge",
    },
    {
      title: "Distributed Microservices Architecture",
      type: "PROJECT",
      description: "Asynchronous task worker system using Docker, Redis pub/sub, and PostgreSQL partitioned tables.",
      skills: ["Docker", "Node.js", "Redis"],
      verified: true,
    },
    {
      title: "PostgreSQL Advanced DBA Certification",
      type: "CERTIFICATION",
      description: "Verified institutional certification for indexing, query planning, and database schema design.",
      skills: ["PostgreSQL", "SQL Optimization"],
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DFD1] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Award className="h-6 w-6 text-[#1B4332]" />
            Verified Digital Portfolio
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Proof-of-work repository authenticated by academic faculty and corporate mentors.
          </p>
        </div>
        <Button variant="primary" size="sm" className="text-xs flex items-center gap-1">
          <PlusCircle className="h-3.5 w-3.5" /> Add Project / Credential
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {portfolioItems.map((item, idx) => (
          <Card key={idx} className="border-[#E4DFD1] bg-white flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] font-semibold tracking-wider">
                  {item.type}
                </Badge>
                {item.verified && (
                  <Badge variant="verified" className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5" /> Faculty Verified
                  </Badge>
                )}
              </div>
              <CardTitle className="text-base text-zinc-900">{item.title}</CardTitle>
              <CardDescription className="text-xs text-zinc-600 leading-relaxed mt-1">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="rounded-md bg-white border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
                    {skill}
                  </span>
                ))}
              </div>
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 p-1"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
