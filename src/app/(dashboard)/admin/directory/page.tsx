import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, CheckCircle2, Globe, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDirectoryPage() {
  const institutions = await prisma.institution.findMany({
    include: {
      students: true,
      academicians: true,
    },
  });

  const companies = await prisma.company.findMany({
    include: {
      opportunities: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#1B4332]" />
          Institutions & Corporate Directory
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Manage verified universities, colleges, and industry partner organizations participating in the SkillBridge consortium.
        </p>
      </div>

      {/* Institutions Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
          Academic Institutions ({institutions.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {institutions.map((inst) => (
            <Card key={inst.id} className="border-[#E4DFD1] bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={inst.isVerified ? "verified" : "warning"} className="text-[10px]">
                    {inst.isVerified ? "Verified Accreditation" : "Pending Audit"}
                  </Badge>
                  <span className="text-xs text-zinc-500 font-semibold">{inst.accreditationGrade || "NAAC A++"}</span>
                </div>
                <CardTitle className="text-base text-zinc-900 mt-1">{inst.name}</CardTitle>
                <CardDescription className="text-xs text-zinc-600">
                  {inst.city}, {inst.state}, {inst.country} • {inst.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex items-center justify-between text-xs text-zinc-600">
                <span>Active Mentees: {inst.students.length} | Faculty: {inst.academicians.length}</span>
                <Button variant="outline" size="sm" className="text-xs">
                  Manage Audit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Companies Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
          Industry Partners ({companies.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((comp) => (
            <Card key={comp.id} className="border-[#E4DFD1] bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={comp.isVerified ? "verified" : "warning"} className="text-[10px]">
                    {comp.isVerified ? "Verified Recruiter" : "Pending Review"}
                  </Badge>
                  <span className="text-xs text-zinc-500 font-semibold">{comp.size || "ENTERPRISE"}</span>
                </div>
                <CardTitle className="text-base text-zinc-900 mt-1">{comp.name}</CardTitle>
                <CardDescription className="text-xs text-zinc-600">
                  Sector: {comp.industrySector} • HQ: {comp.headquartersCity}, {comp.headquartersCountry}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl flex items-center justify-between text-xs text-zinc-600">
                <span>Active Opportunities: {comp.opportunities.length}</span>
                <Button variant="outline" size="sm" className="text-xs">
                  Review Credentials
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
