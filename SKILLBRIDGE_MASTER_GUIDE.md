# SkillBridge — Complete Master Guide & Architecture Reference

> **Academia-Industry Collaboration Portal powered by Skill-Gap-First Matching**  
> Developed for the Smart India Hackathon (SIH 2026) Prototype

---

## Table of Contents

1. [Executive Summary & Core Philosophy](#1-executive-summary--core-philosophy)
2. [Technology Stack & Architectural Constraints](#2-technology-stack--architectural-constraints)
3. [The 4 Stakeholder Roles & Complete Feature Walkthrough](#3-the-4-stakeholder-roles--complete-feature-walkthrough)
   - [Student Portal](#31-student-portal)
   - [Academician & Faculty Portal](#32-academician--faculty-portal)
   - [Industry & Corporate Recruiter Portal](#33-industry--corporate-recruiter-portal)
   - [System Administration & Governance Console](#34-system-administration--governance-console)
4. [Complete File & Directory Structure](#4-complete-file--directory-structure)
5. [Database Architecture & 25 Prisma Models](#5-database-architecture--25-prisma-models)
6. [Authentication, Middleware & Role Guards](#6-authentication-middleware--role-guards)
7. [Zero-Blue Institutional Design System](#7-zero-blue-institutional-design-system)
8. [Environment Configuration & Database Namespace](#8-environment-configuration--database-namespace)
9. [Pre-Seeded Demo Accounts & How to Test](#9-pre-seeded-demo-accounts--how-to-test)

---

## 1. Executive Summary & Core Philosophy

### The Fundamental Problem
Traditional campus placement and internship platforms operate on **resume keyword matching**. This breaks the talent pipeline in three critical ways:
1. **Students** blindly study generic coursework without knowing what specific skills modern employers actually require.
2. **Academic Institutions** operate with zero real-time telemetry on curriculum obsolescence, learning about skill gaps only after students fail campus placement drives.
3. **Industry Recruiters** waste hundreds of engineering hours filtering unverified resumes inflated with keywords and AI-generated text.

### The SkillBridge Solution: Closed-Loop Skill-Gap Matching
SkillBridge shifts the entire paradigm from **claims on paper** to **verified competency feedback**:
```
┌─────────────────┐       Takes Assessment       ┌─────────────────────────┐
│     STUDENT     ├─────────────────────────────►│    SKILL ASSESSMENTS    │
└────────┬────────┘                              └────────────┬────────────┘
         │                                                    │ Scores & Gaps
         │ Real-time                                          ▼
         │ Feedback                              ┌─────────────────────────┐
         ◄───────────────────────────────────────┤   SKILL GAP DIAGNOSTIC  │
         │                                       └────────────┬────────────┘
         │                                                    │
         ▼                                                    ▼
┌─────────────────┐     Borderline Review (70-84%)┌─────────────────────────┐
│   ACADEMICIAN   │◄─────────────────────────────┤  MATCHED OPPORTUNITIES  │
│    (FACULTY)    ├─────────────────────────────►│    (COMPANIES & R&D)    │
└────────┬────────┘     Endorsement / Feedback   └────────────┬────────────┘
         │                                                    │
         │ Aggregated Curriculum Data                         ▼
         └───────────────────────────────────────►┌─────────────────────────┐
                                                  │   INDUSTRY RECRUITER    │
                                                  │   (VERIFIED TALENT)     │
                                                  └─────────────────────────┘
```

1. **Assess & Verify**: Students take standardized, timed assessments. Skills are scored (0–100%) and verified with proof-of-work.
2. **Gap Diagnostics**: Students see exact skill deficits against target roles (e.g. *"Target requires 80% PostgreSQL; current is 0%"*).
3. **Intelligent Matching**: Opportunities are matched via mathematical match confidence, not keywords.
4. **Faculty Escalation**: Borderline matches (70–84%) trigger mentor review, where professors can endorse students or recommend prerequisite courses.
5. **Continuous Curriculum Feedback**: Aggregated gap data flows back to academic departments to inform syllabus updates.

---

## 2. Technology Stack & Architectural Constraints

- **Frontend**: Next.js 14 (App Router, Server Components, Route Handlers, TypeScript).
- **Styling**: Tailwind CSS with custom institutional color system. **Strict Zero-Blue Policy**: Absolutely zero blue, cyan, or indigo hues are permitted anywhere in the UI.
- **Database**: PostgreSQL hosted on [Neon](https://neon.tech/) with connection pooling and SSL mode enabled.
- **Database Namespace**: Dedicated PostgreSQL schema `skillbridge` (`&schema=skillbridge`) to ensure total isolation and protect other databases or tables.
- **ORM**: Prisma ORM with 25 consolidated models.
- **Authentication**: NextAuth.js (Auth.js v4) using JWT session strategy, bcrypt password hashing, and role-based route middleware.
- **Icons**: Lucide React.

---

## 3. The 4 Stakeholder Roles & Complete Feature Walkthrough

SkillBridge provides four distinct workspace portals, each guarded by role-based routing:

### 3.1 Student Portal (`/student/*`)

| Route | Page Name | Purpose & Features |
| :--- | :--- | :--- |
| `/student` | **Overview Dashboard** | Welcome banner, profile completeness, verified skill radar/progress, live skill gap diagnostic preview, and matched job/internship cards. |
| `/student/assessments` | **Skill Assessments** | Standardized technical tests across Frontend, Backend, DevOps, Databases, and Core CS. Shows completed tests with verified scores and available assessments. |
| `/student/skill-gaps` | **Skill Gap Diagnostics** | Highlights critical, high, and low priority skill deficits against industry demand. Provides direct "Recommended Path" and action buttons to bridge each gap. |
| `/student/opportunities` | **Matched Opportunities** | Live jobs and internships fetched from PostgreSQL. Shows company name, role type, work mode (Remote/Hybrid), monthly stipend, and verified match confidence score. |
| `/student/applications` | **My Applications** | Tracks submitted applications, current status (Under Review, Shortlisted, Escalated to Mentor), and faculty mentor recommendation feedback. |
| `/student/portfolio` | **Digital Portfolio** | Authenticated proof-of-work repository featuring student capstones, external certifications, verified skills, and GitHub links. |

### 3.2 Academician & Faculty Portal (`/academician/*`)

| Route | Page Name | Purpose & Features |
| :--- | :--- | :--- |
| `/academician` | **Faculty Dashboard** | Departmental overview, mentee tallies, placement readiness gauges, and pending match review alerts. |
| `/academician/mentees` | **Assigned Mentees** | Advisee directory displaying student cards, courses, branches, year of study, verified skill averages, CGPA, and placement readiness flags. |
| `/academician/reviews` | **Escalated Match Queue** | Applications with borderline match scores (70–84%) where algorithmic scoring alone is insufficient. Faculty mentors can endorse candidates or defer them with feedback. |
| `/academician/verifications` | **Portfolio Verifications** | Verification queue allowing professors to audit student capstone project links, lab credentials, and issue institutional verification badges. |
| `/academician/collaborations` | **FDP & Research** | Faculty Development Programs, corporate immersion cohorts, and university-industry joint research projects sponsored by industry partners. |

### 3.3 Industry & Corporate Recruiter Portal (`/industry/*`)

| Route | Page Name | Purpose & Features |
| :--- | :--- | :--- |
| `/industry` | **Recruiter Dashboard** | Corporate dashboard displaying active job posts, applicants under review, hire conversion rate, and top institutional partner universities. |
| `/industry/post` | **Post Opportunity** | Interactive publishing form for internships, full-time jobs, and research projects. Allows recruiters to set skill weighting and minimum score thresholds. |
| `/industry/applications` | **Candidate Pipeline** | Applicants ranked strictly by verified assessment match scores rather than keyword frequency, showing faculty endorsements and student dossiers. |
| `/industry/skill-demand` | **Skill Demand Analytics** | Intelligence on corporate recruitment demand vs university curriculum supply, identifying critical talent shortage percentages. |

### 3.4 System Administration & Governance Console (`/admin/*`)

| Route | Page Name | Purpose & Features |
| :--- | :--- | :--- |
| `/admin` | **Admin Console** | High-level ecosystem statistics, verified institutions, corporate recruiters, and system health status. |
| `/admin/directory` | **Institutions & Companies** | Directory of verified universities, accreditation grades (e.g. NAAC A++), partner companies, and verification status controls. |
| `/admin/skills` | **Skill Taxonomy** | Master ontology manager organizing skills by category (Web, AI, Cloud, Data, Soft Skills) with demand weighting. |
| `/admin/assessments` | **Assessment Library** | Standardized question banks, algorithmic difficulty rubrics, and passing criteria across universities. |
| `/admin/audits` | **Audits & Compliance** | Immutable security audit trail logging logins, verification events, match score overrides, and data access. |

---

## 4. Complete File & Directory Structure

```
SIH 2026 PROTOTYPE/
├── .env                                # Local secrets (DATABASE_URL, NEXTAUTH_SECRET) - IGNORED BY GIT
├── .env.example                        # Template for environment variables (tracked in Git)
├── .gitignore                          # Comprehensive exclusion for secrets, logs, and build artifacts
├── CLAUDE.md                           # Project instructions, locked rules, and color palette tokens
├── package.json                        # Dependencies, scripts (npm run dev, build, start)
├── postcss.config.mjs                  # PostCSS plugin configuration for Tailwind
├── tailwind.config.ts                  # Tailwind theme, zero-blue color tokens, and custom animations
├── tsconfig.json                       # TypeScript compiler options and '@/*' path aliases
├── prisma/
│   ├── schema.prisma                   # Consolidated 25-model Prisma database schema
│   └── seed.mjs                        # Database seeder with demo universities, companies, and users
├── src/
│   ├── middleware.ts                   # Edge route guard protecting dashboard boundaries and redirecting
│   ├── types/
│   │   └── next-auth.d.ts              # Extended NextAuth Session & JWT types (role, profileId, etc.)
│   ├── lib/
│   │   ├── auth.ts                     # NextAuth options (CredentialsProvider, bcrypt, jwt/session callbacks)
│   │   ├── db.ts                       # Singleton PrismaClient instance with query logging in dev
│   │   └── utils.ts                    # cn() helper merging clsx and tailwind-merge
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx              # Universal navbar with brand logo, quick links, and mobile toggle
│   │   │   ├── sidebar.tsx             # Sticky desktop sidebar and mobile navigation for dashboards
│   │   │   ├── sidebar-context.tsx     # React Context managing mobile drawer open/close state
│   │   │   ├── user-profile-dropdown.tsx # User avatar trigger, role badge, portal links, and Sign Out
│   │   │   └── global-mobile-drawer.tsx # Slide-out navigation drawer mounted globally in RootLayout
│   │   ├── providers/
│   │   │   └── session-provider.tsx    # Client-side NextAuth SessionProvider wrapper
│   │   └── ui/
│   │       ├── badge.tsx               # Institutional pill badges (default, verified, warning, destructive)
│   │       ├── button.tsx              # Styled buttons (primary forest, secondary, outline, ghost)
│   │       ├── card.tsx                # Cream/white card containers with subtle warm borders
│   │       └── input.tsx               # Accessible form input fields with labels and error states
│   └── app/
│       ├── layout.tsx                  # Root HTML document, font imports, SessionProvider, Navbar, Drawer
│       ├── globals.css                 # Global CSS variables, parchment background, and zero-blue palette
│       ├── page.tsx                    # Landing page with dark forest hero band, stat cards, and paradigm
│       ├── unauthorized/page.tsx       # Graceful 403 Forbidden page for cross-role navigation attempts
│       ├── (auth)/
│       │   ├── login/page.tsx          # Credentials sign-in page with 1-click role switcher buttons
│       │   └── register/page.tsx       # Multi-role account registration page
│       ├── api/
│       │   └── auth/
│       │       ├── [...nextauth]/route.ts # NextAuth catch-all route handler (force-dynamic)
│       │       ├── error/route.ts      # Interceptor redirecting raw /api/auth/error to /login?error=...
│       │       └── register/route.ts   # User registration API with bcrypt password hashing
│       └── (dashboard)/
│           ├── layout.tsx              # Common dashboard layout (Sidebar aside + scrollable main content)
│           ├── student/                # Student Dashboard and subpages
│           │   ├── page.tsx            # Main Student Dashboard
│           │   ├── assessments/page.tsx # Skill Assessments
│           │   ├── skill-gaps/page.tsx  # Skill Gap Diagnostics
│           │   ├── opportunities/page.tsx # Matched Opportunities
│           │   ├── applications/page.tsx # My Applications
│           │   └── portfolio/page.tsx   # Verified Digital Portfolio
│           ├── academician/            # Academician Dashboard and subpages
│           │   ├── page.tsx            # Main Faculty Dashboard
│           │   ├── mentees/page.tsx    # Assigned Mentees
│           │   ├── reviews/page.tsx    # Escalated Match Review Queue
│           │   ├── verifications/page.tsx # Portfolio Verifications
│           │   └── collaborations/page.tsx # FDP & Research
│           ├── industry/               # Industry Dashboard and subpages
│           │   ├── page.tsx            # Main Recruiter Dashboard
│           │   ├── post/page.tsx       # Post Opportunity
│           │   ├── applications/page.tsx # Candidate Pipeline
│           │   └── skill-demand/page.tsx # Skill Gap Analytics
│           └── admin/                  # System Admin Console and subpages
│               ├── page.tsx            # Main Admin Console
│               ├── directory/page.tsx  # Institutions & Companies
│               ├── skills/page.tsx     # Skill Taxonomy
│               ├── assessments/page.tsx # Assessment Library
│               └── audits/page.tsx     # Audit & Compliance
```

---

## 5. Database Architecture & 25 Prisma Models

The schema is consolidated into **25 models** following strict normalization, performance indexing, and domain separation:

### Core Identity & Account (6 Models)
1. **`User`**: Central identity with `email`, `passwordHash`, `name`, `role` (`STUDENT`, `ACADEMICIAN`, `INDUSTRY`, `ADMIN`, `MENTOR`), and `status`.
2. **`Account`**: NextAuth OAuth provider account linkage.
3. **`Session`**: NextAuth user session tokens.
4. **`VerificationToken`**: Passwordless or email verification tokens.
5. **`StudentProfile`**: Academic metadata (enrollment, course, branch, year, CGPA, resume URL, placement readiness flag).
6. **`AcademicianProfile`**: Faculty metadata (department, designation, specialization, Google Scholar URL).

### Organizational Entities (3 Models)
7. **`Institution`**: Universities and engineering colleges (type, accreditation body, grade, verification status).
8. **`Department`**: Academic branches within an institution (e.g. Computer Science, Information Technology).
9. **`Company`**: Industry recruiting firms (sector, size, headquarters, verification status).

### Profiles & Relationships (2 Models)
10. **`IndustryProfile`**: Corporate recruiter metadata linked to a `Company`.
11. **`MentorAssignment`**: Formal pairing between a Faculty Mentor and a Student advisee.

### Skills & Assessments (5 Models)
12. **`Skill`**: Hierarchical skill ontology (name, category, description, parentSkillId, market demand score).
13. **`StudentSkill`**: A student's verified score (0–100%) and assessment source for a specific skill.
14. **`Assessment`**: Timed tests with difficulty rating, duration, passing score, and target skill.
15. **`AssessmentQuestion`**: Questions inside an assessment (type, prompt, choices, explanation, weight).
16. **`AssessmentAttempt`**: Student exam submission with start/completion timestamps, total score, and atomic JSON `responses`.

### Diagnostics & Opportunities (4 Models)
17. **`SkillGapSnapshot`**: Point-in-time calculation of student skill deficits with overall score, summary, and atomic JSON `gaps`.
18. **`Opportunity`**: Unified model for Internships, Jobs, Training, FDPs, Consultancy, and Research projects with stipend, location, and deadlines.
19. **`OpportunitySkillRequirement`**: Required skills per opportunity with minimum score threshold and importance weight (`REQUIRED`, `PREFERRED`, `BONUS`).
20. **`Application`**: Candidate job application with **embedded match telemetry** (`matchScore`, `matchConfidence`, `isEscalated`, `reviewDecision`, and `mentorComments`).

### Proof-of-Work & Feedback (5 Models)
21. **`PortfolioItem`**: Unified portfolio model for capstones, hackathon projects, external certifications, and lab work with verification badges.
22. **`CurriculumFeedback`**: Aggregated skill gap signals sent back to university faculty to inform syllabus revisions.
23. **`CurriculumRecommendation`**: Concrete recommendations for academic courses to close observed industry gaps.
24. **`Notification`**: Real-time user alerts for match notifications, mentor reviews, and application updates.
25. **`AuditLog`**: Immutable audit records capturing system actions, entity IDs, timestamps, and IP addresses.

---

## 6. Authentication, Middleware & Role Guards

### Authentication Flow
- Handled by NextAuth Credentials Provider in `src/lib/auth.ts`.
- Passwords verified securely via `bcrypt.compare`.
- Sessions run on the **JWT strategy** (stateless, fast, and scalable across serverless edges).
- The JWT and Session callbacks automatically inject the user's `role`, `status`, and active profile IDs (`studentProfileId`, `academicianProfileId`, `industryProfileId`).

### Route Boundaries & Protection (`src/middleware.ts`)
- **Public Routes**: `/`, `/login`, `/register`, `/api/auth/*` are public.
- **Root Router**: Navigating to `/dashboard` automatically inspects the user's active role and issues an immediate redirect:
  - `STUDENT` $\to$ `/student`
  - `ACADEMICIAN` / `MENTOR` $\to$ `/academician`
  - `INDUSTRY` $\to$ `/industry`
  - `ADMIN` $\to$ `/admin`
- **Role Boundaries**: If a Student attempts to access `/academician` or an Academician tries to open `/industry`, middleware intercepts the request and issues a `307 Redirect` to `/unauthorized`.

---

## 7. Zero-Blue Institutional Design System

To ensure an authoritative, grounded, and premium academic aesthetic, SkillBridge strictly enforces a **Zero-Blue Policy**:

| Color Role | Token Name | Hex Value | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **Forest Green** | `--color-forest` | `#1B4332` | Primary brand moments, CTA buttons, hero band, heading accents. |
| **Warm Parchment**| `--color-parchment`| `#F7F4EC` | Default body and section background, ensuring high editorial legibility. |
| **Soft Moss** | `--color-moss` | `#74A97E` | Secondary indicators, badges, checkmarks, and progress fills. |
| **Warm Gold** | `--color-gold` | `#E8B84B` | Verified badges, stat accents, and primary button highlights. |
| **Warm Ink** | `--color-ink` | `#1F2420` | Charcoal ink for body text, avoiding harsh pure black. |
| **Cream Card** | `--color-cream-card`| `#FFFFFF` | Card surfaces with subtle `1px solid #E4DFD1` warm borders. |

---

## 8. Environment Configuration & Database Namespace

Your `.env` file must configure the following variables:

```env
# PostgreSQL Database Connection (Dedicated 'skillbridge' schema protects other projects)
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>/<DATABASE>?sslmode=require&schema=skillbridge"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-32-char-jwt-key"

# Application Environment
NODE_ENV="development"
```

> [!IMPORTANT]
> **Schema Isolation (`&schema=skillbridge`)**:
> Always include `&schema=skillbridge` in your `DATABASE_URL`. This ensures Prisma creates and reads all tables within the isolated `skillbridge` PostgreSQL schema namespace, protecting existing tables and data from other projects on the same database cluster.

---

## 9. Pre-Seeded Demo Accounts & How to Test

For fast testing and live evaluation, SkillBridge is pre-seeded with 4 test accounts covering all roles. 

### All accounts share the same password:
```
Password123!
```

| Role | Email | Name / Identity | Key Test Features |
| :--- | :--- | :--- | :--- |
| **Student** | `student@skillbridge.edu` | **Aarav Mehta** | High match scores, gap analysis, digital portfolio, and job applications. |
| **Academician** | `academician@skillbridge.edu` | **Prof. Priya Sharma** | Mentee advisee roster, escalated match review queue, and portfolio verification. |
| **Industry** | `recruiter@nexura.com` | **Nexura Cloud Recruiter** | Opportunity posting form, skill-filtered candidate pipeline, and demand analytics. |
| **System Admin**| `admin@skillbridge.org` | **System Governance** | Institutional accreditation directory, skill taxonomy ontology, and audit trail. |

### Quick 1-Click Login:
On the sign-in page (`http://localhost:3000/login`), you will find **Instant Demo Access** buttons at the bottom. Clicking any button immediately authenticates that role and redirects to its dedicated dashboard workspace.
