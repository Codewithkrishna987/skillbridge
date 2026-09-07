import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Compass,
  ArrowRight,
  GraduationCap,
  Building2,
  Briefcase,
  Layers,
  Target,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Award,
  GitBranch,
  Sparkles,
  Check,
  X as CloseIcon,
} from "lucide-react";

export default function HomePage() {
  const statCards = [
    {
      metric: "25 Models",
      label: "Consolidated Unified Schema",
      detail: "Clean single-record architecture with embedded scoring & audit logs.",
    },
    {
      metric: "Real-Time",
      label: "Curriculum Gap Signals",
      detail: "Aggregate industry deficit data flows directly back to universities.",
    },
    {
      metric: "Mentor Loop",
      label: "Human-in-the-Loop Escalation",
      detail: "Ambiguous candidate matches route to faculty advisors for endorsement.",
    },
    {
      metric: "Verified Fit",
      label: "Objective Competency Index",
      detail: "Skill assessment benchmarking replaces unverified resume buzzwords.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-parchment text-ink">
      {/* 1. HERO BAND (The ONLY dark full-bleed band on the page) */}
      <section className="relative overflow-hidden bg-forest text-parchment py-20 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-forest-dark">
        <div className="relative mx-auto max-w-4xl text-center space-y-7">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-moss/40 bg-forest-dark/60 px-4 py-1.5 text-xs font-medium text-moss-light">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>Academia-Industry Collaboration Portal</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Skill-Gap-First Matching for{" "}
            <span className="text-gold">
              Higher Education & Industry
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-parchment/85 leading-relaxed font-normal">
            Eliminate unverified resume keyword filtering. Students prove competencies through 
            benchmarked assessments, recruiters match with verified skill confidence, and institutions 
            receive continuous real-time signals on curriculum gaps.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link href="/login">
              <Button size="lg" className="bg-gold text-ink font-semibold hover:bg-gold-dark shadow-sm">
                Enter Portal Workspace
                <ArrowRight className="h-4 w-4 text-ink" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-parchment/30 bg-forest-dark/40 text-parchment hover:bg-forest-light hover:border-parchment/50">
                Register Institution or Corporate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STAT CARDS (Sitting on Warm Parchment with Generous Spacing & Identical Treatment) */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-parchment border-b border-cream-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {statCards.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-cream-border bg-white p-6 sm:p-7 shadow-xs hover:border-[#c8c0af] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Subtle small gold accent line */}
                  <div className="h-1 w-8 rounded-full bg-gold mb-4" />
                  <div className="text-3xl font-extrabold text-forest tracking-tight">
                    {stat.metric}
                  </div>
                  <div className="text-sm font-semibold text-ink mt-2">
                    {stat.label}
                  </div>
                </div>
                <div className="text-xs text-ink-muted leading-relaxed mt-3 pt-3 border-t border-cream-border/60">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 TECH STACK STRIP (Mirroring the slide's tech stack sidebar) */}
      <section className="bg-forest-dark border-y border-forest-light/20 py-6 px-6 sm:px-8 lg:px-12 text-parchment">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="gold" className="text-[11px] font-bold tracking-wider uppercase">
              Production Tech Stack
            </Badge>
            <span className="text-xs text-parchment/80 font-medium">Standardized for National Scale</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
            {["Next.js 14", "Tailwind CSS", "React 18", "REST API", "TypeScript", "Prisma ORM", "LangGraph / AI", "Neon PostgreSQL", "NextAuth.js", "AWS / Cloud", "Vercel"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-parchment font-medium shadow-xs hover:border-gold transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SKILL PORTAL AI IMPLEMENTATION FLOW (5-STAGE HORIZONTAL PIPELINE) */}
      <section id="ai-flow" className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 bg-white border-b border-cream-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="moss" className="text-xs">Proprietary AI Pipeline</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest">
              Skill Portal AI Implementation Flow
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Our automated 5-stage intelligence pipeline transforms raw assessment telemetry into verified placements with human-in-the-loop escalation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                num: "01",
                step: "Skill Data Indexing",
                tag: "Taxonomy & Vector Embeddings",
                desc: "Student assessment responses and industry skill requirements are structured and embedded in the database, with continuous checks to keep the skill taxonomy accurate and up to date.",
              },
              {
                num: "02",
                step: "Assessment Processing",
                tag: "Real-Time Semantic Evaluation",
                desc: "Each student's questionnaire and aptitude test responses are semantically matched against the current industry skill taxonomy to identify strengths and gaps in real time.",
              },
              {
                num: "03",
                step: "Skill Profile Generation",
                tag: "Hybrid Recommendation Engine",
                desc: "The recommendation engine combines the student's skill profile with live industry and internship data to generate personalized course, internship, and career suggestions.",
              },
              {
                num: "04",
                step: "Matching & Escalation",
                tag: "Human-in-the-Loop Safeguard",
                desc: "High-confidence matches are shown to the student instantly; ambiguous or low-confidence cases are flagged and routed to a mentor or academic advisor for manual review.",
              },
              {
                num: "05",
                step: "Continuous Feedback Loop",
                tag: "Curriculum Adaptation Signal",
                desc: "Outcomes from internships and placements, along with student and recruiter feedback, are fed back into the model to keep recommendations accurate over time.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-cream-border bg-parchment/60 hover:bg-white p-6 shadow-xs transition-all hover:border-forest hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-full group-hover:bg-forest group-hover:text-white transition-colors">
                      {item.num}
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-forest group-hover:text-forest-dark transition-colors">
                    {item.step}
                  </h3>
                  <div className="text-[11px] font-medium text-ink-muted mt-0.5 mb-3">
                    {item.tag}
                  </div>
                  <p className="text-xs text-ink-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-cream-border/60 flex items-center justify-between text-[11px] text-moss-dark font-medium">
                  <span>Verified Pipeline</span>
                  <CheckCircle2 className="h-4 w-4 text-moss" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. END-TO-END SKILL MAPPING & PLACEMENT FLOW (9-STEP CHRONOLOGICAL JOURNEY) */}
      <section id="placement-flow" className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 bg-parchment border-b border-cream-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="gold" className="text-xs">End-to-End Operational Lifecycle</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest">
              End-to-End Skill Mapping & Placement Flow
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Complete traceable journey from onboarding to institutional analytics, linking candidate competencies directly to campus academic planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Student Registration",
                desc: "The student registers and logs into the unified Academia-Industry portal.",
                role: "Student",
                badge: "Onboarding",
              },
              {
                step: "02",
                title: "Skill Assessment",
                desc: "The student completes AI-driven questionnaires and technical aptitude tests.",
                role: "Evaluation",
                badge: "Diagnostic",
              },
              {
                step: "03",
                title: "Profile Generation",
                desc: "The system analyses test results to create a verified digital skill profile.",
                role: "AI Engine",
                badge: "Synthesis",
              },
              {
                step: "04",
                title: "Smart Matching",
                desc: "The engine maps the profile to exact internships and jobs posted by industries.",
                role: "AI Engine",
                badge: "Matching",
              },
              {
                step: "05",
                title: "Student Applies",
                desc: "The student reviews matched opportunities and submits applications directly.",
                role: "Student",
                badge: "Action",
              },
              {
                step: "06",
                title: "Application Tracking",
                desc: "The portal tracks the application status through interviews to final placement.",
                role: "Recruiter & Student",
                badge: "Workflow",
              },
              {
                step: "07",
                title: "Feedback & Portfolio",
                desc: "Mentor feedback and certificates auto-populate the student's digital portfolio.",
                role: "Mentor & Student",
                badge: "Verification",
              },
              {
                step: "08",
                title: "Academician Loop",
                desc: "Academicians receive analytics to make data-driven curriculum updates.",
                role: "Academician",
                badge: "Feedback Loop",
              },
              {
                step: "09",
                title: "Institutional Analytics",
                desc: "Aggregated placement and skill gap data updates the university's dashboard.",
                role: "University Admin",
                badge: "Governance",
              },
            ].map((stepItem, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-cream-border bg-white p-6 shadow-xs hover:border-forest/40 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-8 w-8 rounded-lg bg-forest text-parchment font-extrabold text-xs flex items-center justify-center">
                      {stepItem.step}
                    </div>
                    <Badge variant="outline" className="text-[10px] font-semibold">
                      {stepItem.badge}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-forest mt-2">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-ink-light leading-relaxed mt-2">
                    {stepItem.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-cream-border/60 flex items-center justify-between text-[11px] text-ink-muted">
                  <span>Stakeholder: <strong className="text-forest font-semibold">{stepItem.role}</strong></span>
                  <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARADIGM SHIFT (Why Resume Keyword Screening Fails) */}
      <section id="solution" className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 bg-white border-b border-cream-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="moss" className="text-xs">The Closed-Loop Ecosystem</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest">
              Why Resume Keyword Filtering Fails
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Traditional job portals act as open dumps where recruiters filter keywords while colleges 
              remain blind to curriculum deficits. SkillBridge closes the loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* The Conventional Way */}
            <div className="rounded-2xl border border-cream-border bg-white p-8 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                  Conventional System
                </span>
                <span className="text-xs text-ink-muted">Resume Keyword Screening</span>
              </div>
              <h3 className="text-xl font-bold text-ink">
                Unverified Claims & Disconnected Curricula
              </h3>
              <ul className="space-y-4 text-sm text-ink-light">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CloseIcon className="h-3.5 w-3.5" />
                  </div>
                  <span>Students inflate resumes with unverified keywords to pass ATS filters.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CloseIcon className="h-3.5 w-3.5" />
                  </div>
                  <span>Recruiters spend hundreds of manual hours filtering unqualified applicants.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CloseIcon className="h-3.5 w-3.5" />
                  </div>
                  <span>Academic institutions receive zero structured feedback on why graduates struggle.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CloseIcon className="h-3.5 w-3.5" />
                  </div>
                  <span>Borderline candidates are rejected with no mentorship intervention path.</span>
                </li>
              </ul>
            </div>

            {/* The SkillBridge Way */}
            <div className="rounded-2xl border-2 border-forest/20 bg-white p-8 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-forest bg-moss/20 border border-moss/40 px-3 py-1 rounded-full">
                  SkillBridge Platform
                </span>
                <span className="text-xs text-moss-dark font-medium">Skill-Gap-First Matching</span>
              </div>
              <h3 className="text-xl font-bold text-forest">
                Verified Proficiencies & Curriculum Feedback
              </h3>
              <ul className="space-y-4 text-sm text-ink-light">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-moss/25 text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-forest" />
                  </div>
                  <span>Objective assessments verify competencies across a standardized skill taxonomy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-moss/25 text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-forest" />
                  </div>
                  <span>Opportunities carry skill weights and minimum proficiency bars for algorithmic scoring.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-moss/25 text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-forest" />
                  </div>
                  <span>Ambiguous matches escalate to faculty mentors for human domain endorsement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-moss/25 text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-forest" />
                  </div>
                  <span>Aggregate gap data returns to colleges, revealing exactly what to teach next semester.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROLE WORKSPACES (Dedicated Stakeholder Portals) */}
      <section id="students" className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 bg-parchment border-b border-cream-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="gold" className="text-xs">Tailored Stakeholder Portals</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest">
              Built for Every Collaboration Partner
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Clean, focused tooling designed for the exact operational workflows of students, educators, and talent leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="rounded-2xl border border-cream-border bg-white p-8 flex flex-col justify-between shadow-xs hover:border-[#c8c0af] transition-all">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-forest">For Students</h3>
                  <p className="text-xs text-ink-muted mt-1">Undergraduate and postgraduate candidates.</p>
                </div>
                <div className="space-y-3 pt-2 text-xs text-ink-light">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-moss shrink-0 mt-0.5" />
                    <span>Objective skill diagnostics and personalized gap alerts.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-moss shrink-0 mt-0.5" />
                    <span>Matched opportunities with transparent match percentages.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-moss shrink-0 mt-0.5" />
                    <span>Verified digital portfolio with faculty endorsements.</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-cream-border">
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    Sign In as Student
                  </Button>
                </Link>
              </div>
            </div>

            {/* Academician Card */}
            <div id="institutions" className="rounded-2xl border border-cream-border bg-white p-8 flex flex-col justify-between shadow-xs hover:border-[#c8c0af] transition-all">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-[#8c6710]">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-forest">For Institutions & Faculty</h3>
                  <p className="text-xs text-ink-muted mt-1">Professors, placement deans, and mentors.</p>
                </div>
                <div className="space-y-3 pt-2 text-xs text-ink-light">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Review escalated candidate matches with mentor comments.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Verify student certifications, internships, and project work.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Real-time signals on curriculum alignment vs industry demand.</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-cream-border">
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    Sign In as Faculty
                  </Button>
                </Link>
              </div>
            </div>

            {/* Industry Card */}
            <div id="industry" className="rounded-2xl border border-cream-border bg-white p-8 flex flex-col justify-between shadow-xs hover:border-[#c8c0af] transition-all">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-forest">For Industry Recruiters</h3>
                  <p className="text-xs text-ink-muted mt-1">Corporate talent teams and hiring managers.</p>
                </div>
                <div className="space-y-3 pt-2 text-xs text-ink-light">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-moss shrink-0 mt-0.5" />
                    <span>Post roles with weighted required skills and proficiency bars.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-moss shrink-0 mt-0.5" />
                    <span>Receive pre-scored applicants ranked by verified match.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-moss shrink-0 mt-0.5" />
                    <span>Post-placement feedback loop to guide campus curricula.</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-cream-border">
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    Sign In as Recruiter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="mt-auto border-t border-cream-border bg-parchment py-12 px-6 sm:px-8 lg:px-12 text-ink-muted text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-parchment">
              <Compass className="h-4 w-4 text-gold" />
            </div>
            <div>
              <span className="font-bold text-forest text-sm">SkillBridge</span>
              <span className="text-ink-muted ml-2">— Academia-Industry Collaboration Portal</span>
            </div>
          </div>
          <div className="text-center sm:text-right text-[11px] text-ink-muted">
            Strict Palette: Forest Green, Soft Moss, Warm Gold, and Parchment. Zero blue.
          </div>
        </div>
      </footer>
    </div>
  );
}
