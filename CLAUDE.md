# SkillBridge — Academia-Industry Collaboration Portal

## Project Overview
SkillBridge is a full-stack platform that connects Students, Academic Institutions, and Industry/Recruiters around **skill-gap-first matching**, moving beyond keyword-based resume screening.
- **Students**: Take AI-driven skill assessments, identify curriculum-to-industry gaps, discover matched opportunities, receive mentor review for low-confidence matches, and maintain a verified digital portfolio.
- **Academicians**: Mentor assigned students, review escalated matching recommendations, verify portfolio credentials, and access institutional gap analytics and FDP/research collaborations.
- **Industry / Recruiters**: Post skill-weighted opportunities, evaluate matched candidate cohorts, manage pipeline stages, and provide direct post-placement feedback.
- **Administrators**: Govern institution and corporate directories, skill taxonomy, and system-wide assessment catalogs.

## Locked Tech Stack
- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS (**Strict Zero-Blue Policy**: Deep emerald, warm amber, and refined charcoal zinc palette)
- **ORM**: Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js / Auth.js (Credentials + Role-based session tokens)
- **Validation & Forms**: Zod, React Hook Form, @hookform/resolvers
- **Icons & Client Utilities**: Lucide React, @tanstack/react-query

## Database Architecture Rules
- **Source of Truth**: `prisma/schema.prisma` is the single source of truth for all data models.
- **Consolidation Principles**:
  - 25 consolidated models (reduced from 40).
  - `Application` holds match scores (`matchScore`, `matchConfidence`, `isEscalated`) and mentor reviews (`reviewDecision`, `reviewedById`, `mentorComments`) directly.
  - `PortfolioItem` unifies certifications, projects, and internships via `PortfolioItemType` enum and `metadata` JSON.
  - `AssessmentAttempt.responses` and `SkillGapSnapshot.gaps` are stored as atomic JSON arrays.
  - `Opportunity` covers internships, jobs, training, FDPs, consultancy, and joint research via `OpportunityType`.
  - Admin is handled via `User.role = ADMIN` without a separate profile table.
  - Industry skill demand is computed dynamically over `OpportunitySkill`.
- **Migrations**: Always run `npx prisma migrate dev --name <description>` to generate tracked migrations.

## Design & Aesthetics Standard
- **No Blue Policy**: Completely avoid blue, indigo, sky, or cyan colors to avoid generic AI-generated aesthetics.
- **Official Color Palette**:
  - `--color-forest` (`#1B4332`): Deep forest green, for primary brand moments only (nav logo mark, primary button fill, key headline words). Full-bleed dark forest background is strictly for the hero band only.
  - `--color-moss` (`#74A97E`): Soft moss green, secondary accent, supporting text highlights and checkmarks.
  - `--color-gold` (`#E8B84B`): Warm gold, for the "verified/success" accent (stat numbers, checkmarks, verified skills) — used sparingly.
  - `--color-parchment` (`#F7F4EC`): Warm off-white, the DEFAULT background for all main sections and body (lets the page breathe).
  - `--color-ink` (`#1F2420`): Near-black warm charcoal for primary body text on light sections.
  - `--color-cream-card` (`#FFFFFF` with `1px solid #E4DFD1` border): Card surfaces.
- **Stat Cards Rule**: Every stat card shares the exact same calm visual treatment (white/cream card surface, consistent generous gap, single small gold/moss accent, charcoal ink label, one supporting line). Never alternate competing bold headline colors from card to card.
- **Navbar Rule**: Simplified to logo/wordmark (left), 4-5 links max (center), one primary CTA button (right). No cluttered prototype badges. Collapses to mobile hamburger. User profile dropdown in place of bare sign out.

## Folder Structure Conventions
```
src/
├── app/
│   ├── (auth)/             # Login and Registration flows
│   ├── (dashboard)/        # Role-based dashboard interfaces
│   │   ├── student/        # Student portal
│   │   ├── academician/    # Faculty & mentor portal
│   │   ├── industry/       # Recruiter & corporate portal
│   │   └── admin/          # Platform administration
│   ├── api/                # Route handlers (auth, webhooks)
│   ├── globals.css         # Custom tokens & design system styles
│   └── layout.tsx          # Root application shell
├── components/
│   ├── ui/                 # Reusable atomic UI components (Button, Card, Badge, etc.)
│   ├── layout/             # Navbar, Sidebar, PageHeader
│   └── auth/               # LoginForm, RegisterForm, RoleGuard
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── db.ts               # PrismaClient instance
│   └── utils.ts            # Common helpers (cn)
├── types/                  # Shared TypeScript interfaces & NextAuth augmentations
└── middleware.ts           # Route protection & role enforcement
```

## Common Commands
- `npm run dev` — Start the local development server (default port 3000)
- `npx prisma generate` — Generate Prisma Client
- `npx prisma migrate dev` — Run database migrations
- `npx prisma studio` — Launch database GUI inspector
- `npm run build` — Build production bundle & check types

## Changelog
- **Phase 1 (Foundation)**: Initialized Next.js App Router, Tailwind zero-blue design tokens, consolidated 25-model Prisma schema, NextAuth credentials provider with role-based JWT sessions, route-protection middleware, and role dashboard shells.
