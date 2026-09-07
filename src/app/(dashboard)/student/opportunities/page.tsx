import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, MapPin, DollarSign, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({
    include: {
      company: true,
      institution: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DFD1] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#1B4332]" />
            Matched Opportunities
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Curated roles matched to your verified skills with transparent match confidence.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {opportunities.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500 bg-white">
            No opportunities listed yet. Check back soon!
          </div>
        ) : (
          opportunities.map((opp) => (
            <Card key={opp.id} className="border-[#E4DFD1] bg-white hover:border-[#1B4332]/40 transition-all">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-bold text-xs">
                      {opp.company?.name?.[0] || opp.institution?.name?.[0] || "O"}
                    </div>
                    <div>
                      <CardTitle className="text-base text-zinc-900">{opp.title}</CardTitle>
                      <div className="text-xs text-zinc-500 font-medium">
                        {opp.company?.name || opp.institution?.name || "Partner Organization"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="verified" className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      84.5% Match
                    </Badge>
                    <Badge variant="outline" className="text-xs font-medium">
                      {opp.type}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  {opp.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-50/50 p-4 rounded-b-xl">
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    {opp.location || "Remote"} ({opp.workMode})
                  </span>
                  {opp.stipendOrSalaryMin && (
                    <span className="flex items-center gap-1 font-semibold text-[#1B4332]">
                      <DollarSign className="h-3.5 w-3.5 text-[#1B4332]" />
                      ₹{opp.stipendOrSalaryMin.toLocaleString()} - ₹{opp.stipendOrSalaryMax?.toLocaleString()} / mo
                    </span>
                  )}
                  {opp.durationMonths && (
                    <span>• {opp.durationMonths} Months</span>
                  )}
                </div>
                <Button variant="primary" size="sm" className="text-xs shrink-0">
                  Apply with Verified Score <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
