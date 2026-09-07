# SkillBridge — Academia-Industry Collaboration Portal

> **Skill-gap-first matching, not resume-keyword filtering.**  
> A platform that connects Students, Academic Institutions, and Industry around continuous curriculum feedback and verified competency.

---

## 🌟 The Core Problem

Traditional campus recruitment and internship portals suffer from a broken feedback loop:
1. **Students** don't know what skills industry actually demands and waste time preparing irrelevant coursework.
2. **Academic Institutions** receive zero real-time signals on curriculum obsolescence and graduate placement readiness.
3. **Industry Recruiters** drown in keyword-stuffed, unverified resumes with low match confidence.

**SkillBridge closes this loop:**
- A student's skills are assessed, scored, and verified.
- Real opportunities (jobs, internships, joint research, FDPs) are matched based on **verified skill gaps**.
- Aggregate gap diagnostics flow back in real time to university faculty to inform curriculum updates.

---

## 🏗️ Architecture & Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon](https://neon.tech/))
- **ORM**: [Prisma ORM](https://www.prisma.io/) (25 consolidated models in an isolated schema namespace)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (JWT session strategy, Credentials Provider with bcrypt)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a strict Zero-Blue institutional design system (Deep Forest `#1B4332`, Warm Parchment `#F7F4EC`, Soft Moss `#74A97E`, Gold `#E8B84B`)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 👥 Stakeholder Workspaces

| Role | Core Capabilities |
| :--- | :--- |
| **Student** | Verified skill profiles, skill-gap diagnostic snapshots, curated opportunities with live match scores, and direct application tracking. |
| **Academician / Mentor** | Mentee progress monitoring, placement readiness diagnostics, faculty development programs (FDPs), and escalated match recommendation reviews. |
| **Industry Recruiter** | Opportunity posting (internships, jobs, collaborative research), verified candidate filtering by verified scores rather than keywords. |
| **Admin** | University & corporate verification, curriculum taxonomy management, audit logging, and platform governance. |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18.17+ or v20+
- PostgreSQL database (or Neon/Supabase instance)

### 2. Environment Setup
Copy the example environment file and configure your credentials:
```bash
cp .env.example .env
```
Fill in your database URL and NextAuth secret in `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require&schema=skillbridge"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-key"
```

### 3. Install Dependencies & Generate Prisma Client
```bash
npm install
npx prisma db push
node prisma/seed.mjs
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Prototype Demo Accounts

All accounts use the password: `Password123!`

| Role | Email |
| :--- | :--- |
| **Student** | `student@skillbridge.edu` |
| **Academician** | `academician@skillbridge.edu` |
| **Industry Recruiter** | `recruiter@nexura.com` |
| **System Admin** | `admin@skillbridge.org` |

---

## 📄 License
This project was developed for the **Smart India Hackathon (SIH 2026)**.
