# SkillBridge — SIH 2026 Prototype Evaluation Report

**Project Title**: SkillBridge — Academia-Industry Collaboration Portal  
**Theme / Paradigm**: Skill-Gap-First Matching (Not Resume Keyword Filtering)  
**Submission Category**: Smart India Hackathon (SIH 2026) Prototype Review  
**Date**: September 2026  
**Status**: Prototype Fully Operational & Deployed on Local Development Server  

---

## Executive Summary

SkillBridge solves the critical disconnect between tertiary education and industrial workforce requirements. Traditional job boards rely on **resume keyword matching**, which incentivizes keyword inflation, leaves universities blind to curriculum drift, and forces recruiters to spend hundreds of engineering hours filtering unqualified applicants.

SkillBridge establishes a **closed-loop feedback ecosystem**:
1. **Students** take standardized, timed assessments; their verified competency scores (0–100%) and skill gap deficits are calculated in real time.
2. **Opportunities** (jobs, internships, joint research, FDPs) are matched using verified competency scores and algorithmically determined confidence levels.
3. **Faculty Mentors** intervene on borderline applications (70–84% match score), providing recommendations or prescribing prerequisite courses before corporate review.
4. **Recruiters** review a pipeline ranked strictly by verified skill proficiency rather than self-reported resume claims.
5. **Curriculum Feedback** flows back into academic departments, giving universities actionable signals to modernize their syllabus.

---

## 1. What Has Been Built Till Now (Completed Work)

### 1.1 Architecture & Core Foundation
- **Framework**: Next.js 14 (App Router, Server Components, Route Handlers, TypeScript).
- **Database & Storage**: PostgreSQL hosted on **Neon Cloud** with SSL encryption and connection pooling.
- **Namespace Isolation**: All tables and migrations are isolated in a dedicated PostgreSQL schema (`&schema=skillbridge`), ensuring complete data safety.
- **ORM & Data Layer**: Prisma ORM with **25 consolidated models** covering identity, academic profiles, skills taxonomy, timed assessments, applications, and audit logs.
- **Authentication**: NextAuth.js (v4) with JWT session strategy, bcrypt password hashing, client-side session context, and edge middleware route protection.
- **Design System**: A strict **Zero-Blue institutional design system** inspired by classic academic aesthetics:
  - Deep Forest Green (`#1B4332`) — Primary brand, CTA buttons, hero accents.
  - Warm Parchment (`#F7F4EC`) — Editorial body and section background.
  - Soft Moss Green (`#74A97E`) — Secondary indicators, checkmarks, progress metrics.
  - Warm Gold (`#E8B84B`) — Verified indicators, stat highlights.
  - Warm Charcoal Ink (`#1F2420`) — High-contrast text legibility.
  - Cream Card (`#FFFFFF` with `1px solid #E4DFD1`) — Clean, subtle card surfaces.
- **Security & Version Control**:
  - Independent Git repository initialized exclusively for `SIH 2026 PROTOTYPE`.
  - Comprehensive `.gitignore` protecting live database credentials, JWT secrets, `.env` files, and build artifacts.

---

### 1.2 Implemented & Operational Pages (17 Routes — 0 Broken Links)

| Portal / Role | Implemented Routes | Key Capabilities & Features |
| :--- | :--- | :--- |
| **Public & Auth** | `/`<br>`/login`<br>`/register`<br>`/unauthorized`<br>`/api/auth/error` | Landing page with dark forest hero band, comparison grid, credentials sign-in with **1-click instant demo role switchers**, registration, role boundary guards, and error redirection. |
| **Student Workspace** | `/student`<br>`/student/assessments`<br>`/student/skill-gaps`<br>`/student/opportunities`<br>`/student/applications`<br>`/student/portfolio` | Dashboard overview, verified skill radar, standardized assessment catalog, live skill gap deficit diagnostics, matched opportunity listings with live PostgreSQL data, application tracking, and authenticated digital portfolio. |
| **Academician Portal** | `/academician`<br>`/academician/mentees`<br>`/academician/reviews`<br>`/academician/verifications`<br>`/academician/collaborations` | Departmental overview, student mentee directory with CGPA & readiness flags, **escalated match review queue (borderline 70–84% applications)**, portfolio verification queue, and FDP/joint research collaborations. |
| **Industry Recruiter** | `/industry`<br>`/industry/post`<br>`/industry/applications`<br>`/industry/skill-demand` | Recruiter dashboard, opportunity creator with skill weighting and minimum score thresholds, candidate pipeline ranked by verified competency, and corporate demand vs university supply analytics. |
| **Admin Governance** | `/admin`<br>`/admin/directory`<br>`/admin/skills`<br>`/admin/assessments`<br>`/admin/audits` | Governance console, institution & company directory with accreditation grades (NAAC A++), hierarchical skill taxonomy manager, assessment question bank rubrics, and immutable audit logs. |

---

### 1.3 Database Seeding & Mockup Context
The PostgreSQL database on Neon is pre-seeded with realistic institutional context:
- **Academic Institution**: Apex Institute of Technology (NAAC A++ Accredited).
- **Industry Partner**: Nexura Cloud Systems (Enterprise Cloud & DevOps Solutions).
- **Curated Skill Taxonomy**: React.js, TypeScript, Next.js, Node.js, Docker, PostgreSQL, Python, Cloud Architecture.
- **Pre-seeded Accounts** (Password for all: `Password123!`):
  1. `student@skillbridge.edu` — Aarav Mehta (B.Tech CSE, 3rd Year, CGPA 8.7)
  2. `academician@skillbridge.edu` — Prof. Priya Sharma (Head of CSE Mentorship)
  3. `recruiter@nexura.com` — Talent Acquisition Lead (Nexura Cloud)
  4. `admin@skillbridge.org` — Consortium Compliance Administrator

---

## 2. The 5-Minute Demonstration Script for SIH Evaluators

When presenting the prototype to the SIH judges tomorrow, follow this structured narrative:

```
[1. Landing Page]  --> Explain the Broken Keyword Paradigm vs Closed-Loop Matching
       |
[2. Login Page]    --> Show 1-Click Instant Demo Roles (No typing required)
       |
[3. Student]       --> Show Verified Skills (React 90%) & Skill Gap Diagnostic (Docker Gap)
       |
[4. Opportunity]   --> Show 84.5% Match Score & Apply with Verified Profile
       |
[5. Academician]   --> Open Escalated Review Queue (Faculty endorses borderline candidate)
       |
[6. Recruiter]     --> View Candidate Pipeline ranked by Verified Skill Score, NOT keywords
       |
[7. Admin/Loop]    --> Show Skill Demand Analytics feeding back to University Curriculum
```

### Detailed Presentation Steps:

1. **Start at Landing Page (`http://localhost:3000`)**:
   - Point out the headline: *"Bridging Academia and Industry Through Verified Skills, Not Keyword Matching."*
   - Highlight the comparison section: *"Why Resume Keyword Filtering Fails"* (Ghost resumes, 0 signal on curriculum drift, inflated claims).
   - Click **"Enter Portal"** or **"Sign In"**.

2. **Login Page (`http://localhost:3000/login`)**:
   - Point out the **1-Click Demo Buttons** at the bottom of the card.
   - Click **"Student: Aarav Mehta"** to log in instantly.

3. **Student Dashboard (`/student`)**:
   - Show the verified skill radar (React: 90%, TypeScript: 85%).
   - Navigate to **"Skill Gap Analysis"** (`/student/skill-gaps`): Show how the system flags a 55% deficit in Docker and recommends the exact bridging course.
   - Navigate to **"Matched Opportunities"** (`/student/opportunities`): Show the live "Junior Cloud Engineer Intern" role at Nexura with a calculated **84.5% Match Confidence**.

4. **Switch to Academician (`/academician`)**:
   - Click the top-right profile dropdown $\to$ **Switch / Test Roles** $\to$ Click **"Academician"**.
   - Navigate to **"Escalated Match Queue"** (`/academician/reviews`):
   - Explain to judges: *"This candidate had an 84.5% match with a deficit in Docker. Instead of rejecting the student, our algorithm escalated the application to their professor for review."*
   - Show the professor's **"Endorse Candidate"** action.

5. **Switch to Industry Recruiter (`/industry`)**:
   - Switch role to **"Industry"**.
   - Navigate to **"Candidate Pipeline"** (`/industry/applications`):
   - Point out that candidates are ordered by **Verified Match Score** with institutional badges, not keyword counts.
   - Navigate to **"Skill Gap Analytics"** (`/industry/skill-demand`): Show how the system compares corporate hiring demand against university talent supply.

---

## 3. What Needs to Be Done Moving Forward (Roadmap)

To transition SkillBridge from this operational prototype into a production-grade national platform, here is the prioritized roadmap:

### Phase 2: Interactive Assessment & Onboarding Engine (Near-Term)
1. **Interactive Code & Quiz Assessment Runner**:
   - Integrate an in-browser code editor (Monaco Editor / Ace) for hands-on programming tests.
   - Implement serverless code execution sandboxes (e.g. Judge0 or Piston) to run test cases for Python, SQL, and JavaScript in real time.
2. **Dynamic Multi-Step Onboarding Wizards**:
   - Build a progressive profiling wizard for newly registered students to upload transcripts, select branches, and self-assess baseline competencies.
   - Build an institutional verification portal for universities to bulk-import student cohorts via CSV/Excel.
3. **Application Lifecycle State Machine**:
   - Enable full end-to-end status transitions: Applied $\to$ Mentor Review $\to$ Shortlisted $\to$ Interview Scheduled $\to$ Offer Extended.

### Phase 3: AI Intelligence & Curriculum Modernization (Mid-Term)
4. **AI-Driven Curriculum Drift Detection (NLP Engine)**:
   - Ingest thousands of live job postings and scrape university syllabus PDFs.
   - Use vector embeddings (OpenAI / Gemini / HuggingFace) to compute cosine similarity between course syllabi and hiring trends.
   - Automatically generate an "Annual Curriculum Modernization Brief" for academic boards of study.
5. **W3C Verifiable Credentials & Digital Badges**:
   - Export student skill verifications as cryptographically signed credentials (compatible with OpenBadges 3.0 / DigiLocker).
6. **Automated Notification Webhooks**:
   - Integrate WhatsApp Business API / SendGrid for real-time alerts when applications are escalated to mentors or when match scores are published.

---

## Summary Checklist for Tomorrow's Presentation

- [x] Local development server running on `http://localhost:3000`.
- [x] Database connected to Neon PostgreSQL with schema `skillbridge`.
- [x] All 17 subpages accessible with 0 broken links or 404s.
- [x] NextAuth session working with 1-click role switcher buttons.
- [x] Strict Zero-Blue institutional design applied across all views.
- [x] Git repository clean, synchronized, and credentials protected via `.gitignore`.
