import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Briefcase, MapPin, DollarSign, Calendar, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default function PostOpportunityPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <PlusCircle className="h-6 w-6 text-[#1B4332]" />
          Post New Industry Opportunity
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Publish internships, full-time positions, or joint research projects with verified skill prerequisites.
        </p>
      </div>

      <Card className="border-[#E4DFD1] bg-white">
        <CardHeader>
          <CardTitle className="text-base text-zinc-900">Opportunity Details</CardTitle>
          <CardDescription className="text-xs">
            Specify verified competency benchmarks. Our algorithm matches applicants based on proven assessment scores rather than resume keywords.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Opportunity Title" id="title" placeholder="e.g. Junior Cloud Engineer Intern" defaultValue="Junior Cloud Engineer Intern" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">Opportunity Type</label>
              <select className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-[#1B4332] focus:outline-none">
                <option>INTERNSHIP</option>
                <option>FULL_TIME</option>
                <option>RESEARCH_PROJECT</option>
                <option>FACULTY_DEVELOPMENT</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">Work Mode</label>
              <select className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-[#1B4332] focus:outline-none">
                <option>HYBRID</option>
                <option>REMOTE</option>
                <option>ON_SITE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Location" id="location" placeholder="e.g. Bengaluru, Karnataka" defaultValue="Bengaluru, Karnataka" />
            <Input label="Monthly Stipend / Salary (₹)" id="stipend" placeholder="e.g. 25000" defaultValue="25000" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">Required Skills & Weighting</label>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>React / Next.js (Min 75% Score)</span>
                <span className="font-semibold text-emerald-800">Primary Core (35%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>TypeScript (Min 70% Score)</span>
                <span className="font-semibold text-emerald-800">Primary Core (25%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Docker & Containers (Min 65% Score)</span>
                <span className="font-semibold text-amber-800">Secondary (20%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>PostgreSQL (Min 70% Score)</span>
                <span className="font-semibold text-amber-800">Secondary (20%)</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700">Role Description & Responsibilities</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-xs text-zinc-900 focus:border-[#1B4332] focus:outline-none leading-relaxed"
              defaultValue="Collaborate with engineering squads to build micro-frontends and API interfaces. Participate in code reviews, CI/CD deployment pipelines, and database optimization."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t border-zinc-100 bg-zinc-50/50 p-4 rounded-b-xl">
          <Button variant="outline" size="sm" className="text-xs">
            Save as Draft
          </Button>
          <Button variant="primary" size="sm" className="text-xs flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Publish & Run Skill-Match
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
