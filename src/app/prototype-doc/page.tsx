"use client";

import React from "react";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Compass,
  CheckCircle2,
  ShieldCheck,
  Award,
  Layers,
  Users,
  Briefcase,
  FileText,
  Printer,
  ArrowRight,
  TrendingUp,
  Server,
  Database,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function PrototypeDocPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#1F2420] py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Action Bar (Hidden in Print) */}
        <div className="flex items-center justify-between bg-white border border-[#E4DFD1] p-4 rounded-xl shadow-xs print:hidden">
          <Link href="/login" className="text-xs font-semibold text-emerald-900 hover:underline flex items-center gap-1">
            ← Return to SkillBridge Portal
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">Tip: Press Ctrl + P to save as a clean PDF</span>
            <Button
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
              variant="primary"
              size="sm"
              className="text-xs flex items-center gap-1.5"
            >
              <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Document Header */}
        <header className="border-b-2 border-[#1B4332] pb-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                <Compass className="h-6 w-6 text-emerald-200" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                Skill<span className="text-emerald-800">Bridge</span>
              </span>
            </div>
            <Badge className="bg-[#E8B84B] text-[#1B4332] font-bold border-none px-3 py-1">
              SIH 2026 Prototype
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1B4332] tracking-tight">
            Prototype Architecture & Demonstration Brief
          </h1>
          <p className="text-sm text-zinc-600">
            <strong>Problem Statement:</strong> Academia-Industry Collaboration via Skill-Gap-First Matching (Not Keyword Filtering) • <strong>Evaluation Status:</strong> Fully Operational
          </p>
        </header>

        {/* Section 1: Executive Paradigm Shift */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1B4332] border-b border-[#E4DFD1] pb-2">
            1. The Problem & Core Innovation
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700">
            Traditional campus placement and internship boards fail because they rely on <strong>unverified resume keyword matching</strong>. This incentivizes keyword inflation, blinds academic institutions to curriculum obsolescence, and forces recruiters to spend hundreds of engineering hours filtering unqualified applicants.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-2">
              <h3 className="font-bold text-red-900 text-sm">Traditional Keyword Matching (Broken)</h3>
              <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                <li>Candidates claim unverified buzzwords on PDFs.</li>
                <li>Zero signal for universities on curriculum drift.</li>
                <li>Recruiters drown in unqualified applicants.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-2">
              <h3 className="font-bold text-emerald-950 text-sm">SkillBridge Skill-Gap Matching (Closed Loop)</h3>
              <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                <li>Skills assessed, scored (0–100%), and verified.</li>
                <li>Borderline matches (70–84%) escalated to faculty mentors.</li>
                <li>Aggregated gap data feeds back into college curricula.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 1.5: Skill Portal AI Implementation Flow */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1B4332] border-b border-[#E4DFD1] pb-2">
            2. Skill Portal AI Implementation Flow (5 Core Phases)
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Our automated multi-stage AI pipeline orchestrates real-time indexing, semantic processing, and human-in-the-loop escalation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
            {[
              { num: "1", title: "Skill Data Indexing", text: "Student assessment responses and industry skill requirements are structured and embedded in the database, with continuous checks to keep the skill taxonomy accurate and up to date." },
              { num: "2", title: "Assessment Processing", text: "Each student's questionnaire and aptitude test responses are semantically matched against the current industry skill taxonomy to identify strengths and gaps in real time." },
              { num: "3", title: "Skill Profile Generation", text: "The recommendation engine combines the student's skill profile with live industry and internship data to generate personalized course, internship, and career suggestions." },
              { num: "4", title: "Matching & Escalation", text: "High-confidence matches are shown to the student instantly; ambiguous or low-confidence cases are flagged and routed to a mentor or academic advisor for manual review." },
              { num: "5", title: "Continuous Feedback Loop", text: "Outcomes from internships and placements, along with student and recruiter feedback, are fed back into the model to keep recommendations accurate over time." },
            ].map((p) => (
              <div key={p.num} className="bg-white border border-[#E4DFD1] p-3.5 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="h-6 w-6 rounded-full bg-[#1B4332] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {p.num}
                    </span>
                    <span className="font-bold text-xs text-zinc-900">{p.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1.6: End-to-End Skill Mapping & Placement Flow */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1B4332] border-b border-[#E4DFD1] pb-2">
            3. End-to-End Skill Mapping & Placement Flow (9-Step Timeline)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { s: "1", title: "Student Registration", desc: "The student registers and logs into the unified Academia-Industry portal." },
              { s: "2", title: "Skill Assessment", desc: "The student completes AI-driven questionnaires and technical aptitude tests." },
              { s: "3", title: "Profile Generation", desc: "The system analyses test results to create a verified digital skill profile." },
              { s: "4", title: "Smart Matching", desc: "The engine maps the profile to exact internships and jobs posted by industries." },
              { s: "5", title: "Student Applies", desc: "The student reviews matched opportunities and submits applications directly." },
              { s: "6", title: "Application Tracking", desc: "The portal tracks the application status through interviews to final placement." },
              { s: "7", title: "Feedback & Portfolio", desc: "Mentor feedback and certificates auto-populate the student's digital portfolio." },
              { s: "8", title: "Academician Loop", desc: "Academicians receive analytics to make data-driven curriculum updates." },
              { s: "9", title: "Institutional Analytics", desc: "Aggregated placement and skill gap data updates the university's dashboard." },
            ].map((step) => (
              <div key={step.s} className="bg-white border border-[#E4DFD1] p-3 rounded-xl flex items-start gap-2.5">
                <span className="h-6 w-6 rounded-md bg-[#E8B84B] text-[#1B4332] text-xs font-bold flex items-center justify-center shrink-0">
                  {step.s}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{step.title}</h4>
                  <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Complete Completed Work Inventory */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1B4332] border-b border-[#E4DFD1] pb-2">
            4. What Has Been Built Till Now (Technical Inventory)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E4DFD1] p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#1B4332]">17</div>
              <div className="text-xs font-semibold text-zinc-500 uppercase mt-1">Operational Routes</div>
              <div className="text-[11px] text-zinc-600 mt-1">Zero 404 errors across all 4 role portals</div>
            </div>
            <div className="bg-white border border-[#E4DFD1] p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#1B4332]">25</div>
              <div className="text-xs font-semibold text-zinc-500 uppercase mt-1">Prisma Schema Models</div>
              <div className="text-[11px] text-zinc-600 mt-1">Isolated in PostgreSQL `skillbridge` namespace</div>
            </div>
            <div className="bg-white border border-[#E4DFD1] p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#1B4332]">4</div>
              <div className="text-xs font-semibold text-zinc-500 uppercase mt-1">Pre-Seeded Roles</div>
              <div className="text-[11px] text-zinc-600 mt-1">1-Click demo logins for instant evaluation</div>
            </div>
          </div>

          <div className="bg-white border border-[#E4DFD1] rounded-xl overflow-hidden mt-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B4332] text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Role Workspace</th>
                  <th className="p-3">Implemented Subpages</th>
                  <th className="p-3">Core Deliverable & Capabilities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="p-3 font-bold text-zinc-900">Student Portal</td>
                  <td className="p-3 font-mono text-[11px] text-zinc-600">/student, assessments, skill-gaps, opportunities, applications, portfolio</td>
                  <td className="p-3 text-zinc-700">Competency radar, standardized test catalog, deficit diagnostic, live opportunity matching with match confidence %, and proof-of-work portfolio.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-900">Academician Portal</td>
                  <td className="p-3 font-mono text-[11px] text-zinc-600">/academician, mentees, reviews, verifications, collaborations</td>
                  <td className="p-3 text-zinc-700">Advisee directory, <strong>Escalated Match Review Queue (70–84% borderline applications)</strong>, portfolio authentication, and industry FDP programs.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-900">Industry Recruiter</td>
                  <td className="p-3 font-mono text-[11px] text-zinc-600">/industry, post, applications, skill-demand</td>
                  <td className="p-3 text-zinc-700">Opportunity creator with skill weighting, candidate pipeline ranked strictly by verified scores, and talent supply vs demand analytics.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-900">Admin Console</td>
                  <td className="p-3 font-mono text-[11px] text-zinc-600">/admin, directory, skills, assessments, audits</td>
                  <td className="p-3 text-zinc-700">University & corporate directory, hierarchical skill taxonomy ontology, test question rubrics, and immutable compliance audit logs.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: 5-Minute Demonstration Script */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1B4332] border-b border-[#E4DFD1] pb-2">
            3. 5-Minute Evaluation Script for SIH Judges
          </h2>
          <div className="space-y-3">
            <div className="bg-white border-l-4 border-[#1B4332] p-4 rounded-r-xl shadow-xs space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase">Step 1 • The Pitch (Landing Page)</div>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Open <code>http://localhost:3000</code>. Explain how SkillBridge ends the "PDF resume keyword arms race" and closes the loop between college syllabus and industry demand. Click <strong>"Enter Portal"</strong>.
              </p>
            </div>

            <div className="bg-white border-l-4 border-[#1B4332] p-4 rounded-r-xl shadow-xs space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase">Step 2 • 1-Click Instant Demo Login</div>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Show the <strong>Instant Demo Access</strong> buttons at the bottom of the sign-in card. Click <strong>"Student: Aarav Mehta"</strong> to authenticate instantly without typing credentials.
              </p>
            </div>

            <div className="bg-white border-l-4 border-[#1B4332] p-4 rounded-r-xl shadow-xs space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase">Step 3 • Verified Skills & Gap Diagnostic</div>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Show the Student Dashboard: React is verified at 90%. Open <strong>"Skill Gap Analysis"</strong> to show a 55% deficit in Docker. Open <strong>"Matched Opportunities"</strong> to show the Nexura Cloud internship with an <strong>84.5% Match Score</strong>.
              </p>
            </div>

            <div className="bg-white border-l-4 border-[#1B4332] p-4 rounded-r-xl shadow-xs space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase">Step 4 • Faculty Escalation Queue (Key Differentiator)</div>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Switch role to <strong>Academician (Prof. Priya Sharma)</strong>. Navigate to <strong>"Escalated Match Queue"</strong>. Show how borderline matches (70–84%) are held for professor review so capable students are not screened out by raw algorithms.
              </p>
            </div>

            <div className="bg-white border-l-4 border-[#1B4332] p-4 rounded-r-xl shadow-xs space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase">Step 5 • Corporate Recruiter Pipeline & Analytics</div>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Switch to <strong>Industry Recruiter</strong>. Show the <strong>"Candidate Pipeline"</strong> ordered strictly by verified competency, not keyword frequency. Show <strong>"Skill Gap Analytics"</strong> where recruiters see talent supply deficits.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Moving Forward Roadmap */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1B4332] border-b border-[#E4DFD1] pb-2">
            4. What Needs to Be Done Moving Forward (Roadmap)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E4DFD1] p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-sm text-[#1B4332] flex items-center gap-1.5">
                <Server className="h-4 w-4 text-emerald-700" /> Phase 2: Live Code Sandbox & Profiling
              </h3>
              <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside">
                <li>Integrate in-browser code editor (Monaco) with test runner for programming assessments.</li>
                <li>Dynamic multi-step onboarding wizard for newly registered students and recruiters.</li>
                <li>Bulk university roster import via CSV/Excel for automated cohort onboarding.</li>
              </ul>
            </div>

            <div className="bg-white border border-[#E4DFD1] p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-sm text-[#1B4332] flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-700" /> Phase 3: AI Curriculum Drift Engine
              </h3>
              <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside">
                <li>NLP vector embeddings comparing live syllabus PDFs against thousands of corporate job listings.</li>
                <li>Automated "Curriculum Modernization Brief" generated for Academic Councils.</li>
                <li>W3C cryptographically signed verifiable credentials (compatible with DigiLocker).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#E4DFD1] pt-6 text-center text-xs text-zinc-500 space-y-1">
          <div>SkillBridge — Academia-Industry Collaboration Portal • Smart India Hackathon (SIH 2026)</div>
          <div>Pre-seeded Demo Password for All Roles: <code>Password123!</code></div>
        </footer>
      </div>
    </div>
  );
}
