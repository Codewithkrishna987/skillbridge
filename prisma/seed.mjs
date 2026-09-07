import { PrismaClient, Role, AccountStatus, ProficiencyLevel, OpportunityType, WorkMode, OpportunityStatus, SkillSource } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SkillBridge database...");

  const passwordHash = await bcrypt.hash("Password123!", 10);

  // 1. Create Demo Institution
  const institution = await prisma.institution.upsert({
    where: { id: "inst_apex_tech" },
    update: {},
    create: {
      id: "inst_apex_tech",
      name: "Apex Institute of Technology",
      type: "COLLEGE",
      accreditationBody: "NAAC",
      accreditationGrade: "A++",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      website: "https://apex.edu.in",
      contactEmail: "admin@apex.edu.in",
      isVerified: true,
    },
  });

  // 2. Create Demo Company
  const company = await prisma.company.upsert({
    where: { id: "comp_nexura" },
    update: {},
    create: {
      id: "comp_nexura",
      name: "Nexura Cloud Systems",
      industrySector: "Cloud Infrastructure & Distributed Systems",
      website: "https://nexura.cloud",
      size: "MEDIUM_51_500",
      headquartersCity: "Hyderabad",
      headquartersCountry: "India",
      about: "Enterprise platform engineering and modern scalable cloud solutions.",
      isVerified: true,
    },
  });

  // 3. Create Taxonomy Skills
  const skillsData = [
    { id: "sk_typescript", name: "TypeScript", category: "Programming" },
    { id: "sk_react", name: "React.js", category: "Frontend" },
    { id: "sk_nextjs", name: "Next.js", category: "Frontend" },
    { id: "sk_nodejs", name: "Node.js", category: "Backend" },
    { id: "sk_postgresql", name: "PostgreSQL", category: "Database" },
    { id: "sk_prisma", name: "Prisma ORM", category: "Backend" },
    { id: "sk_docker", name: "Docker", category: "DevOps" },
    { id: "sk_system_design", name: "System Design", category: "Architecture" },
  ];

  for (const s of skillsData) {
    await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: {
        id: s.id,
        name: s.name,
        category: s.category,
        demandScore: 88.5,
        isActive: true,
      },
    });
  }

  // 4. Create Demo Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@skillbridge.org" },
    update: {},
    create: {
      email: "admin@skillbridge.org",
      name: "Dr. Alistair Vance (Admin)",
      passwordHash,
      role: Role.ADMIN,
      status: AccountStatus.ACTIVE,
    },
  });

  // 5. Create Demo Academician User & Profile
  const academicianUser = await prisma.user.upsert({
    where: { email: "academician@skillbridge.edu" },
    update: {},
    create: {
      email: "academician@skillbridge.edu",
      name: "Prof. Priya Sharma",
      passwordHash,
      role: Role.ACADEMICIAN,
      status: AccountStatus.ACTIVE,
      academicianProfile: {
        create: {
          institutionId: institution.id,
          department: "Computer Science & Engineering",
          designation: "Associate Professor & Placement Dean",
          specialization: "Distributed Systems & Cloud Computing",
          yearsOfExperience: 12,
        },
      },
    },
  });

  // 6. Create Demo Industry User & Profile
  const industryUser = await prisma.user.upsert({
    where: { email: "recruiter@nexura.com" },
    update: {},
    create: {
      email: "recruiter@nexura.com",
      name: "Marcus Reynolds",
      passwordHash,
      role: Role.INDUSTRY,
      status: AccountStatus.ACTIVE,
      industryProfile: {
        create: {
          companyId: company.id,
          designation: "Senior University Talent Partner",
          department: "Engineering Talent Acquisition",
        },
      },
    },
  });

  // 7. Create Demo Student User & Profile
  const studentUser = await prisma.user.upsert({
    where: { email: "student@skillbridge.edu" },
    update: {},
    create: {
      email: "student@skillbridge.edu",
      name: "Aarav Mehta",
      passwordHash,
      role: Role.STUDENT,
      status: AccountStatus.ACTIVE,
      studentProfile: {
        create: {
          institutionId: institution.id,
          enrollmentNumber: "APEX-2023-CS-042",
          course: "B.Tech",
          branch: "Computer Science and Engineering",
          yearOfStudy: 3,
          graduationYear: 2026,
          cgpa: 8.92,
          isPlacementReady: true,
          bio: "Passionate full-stack engineer focused on Next.js, PostgreSQL, and scalable web architectures.",
        },
      },
    },
    include: { studentProfile: true },
  });

  // 8. Assign Academician Mentor to Student
  const academicianProfile = await prisma.academicianProfile.findUnique({
    where: { userId: academicianUser.id },
  });

  if (studentUser.studentProfile && academicianProfile) {
    await prisma.mentorAssignment.upsert({
      where: {
        studentId_mentorId: {
          studentId: studentUser.studentProfile.id,
          mentorId: academicianProfile.id,
        },
      },
      update: {},
      create: {
        studentId: studentUser.studentProfile.id,
        mentorId: academicianProfile.id,
        isActive: true,
      },
    });

    // 9. Add assessed skills for student
    const studentSkillInputs = [
      { skillId: "sk_typescript", level: ProficiencyLevel.ADVANCED, score: 85 },
      { skillId: "sk_react", level: ProficiencyLevel.ADVANCED, score: 90 },
      { skillId: "sk_nextjs", level: ProficiencyLevel.INTERMEDIATE, score: 78 },
      { skillId: "sk_postgresql", level: ProficiencyLevel.INTERMEDIATE, score: 72 },
      { skillId: "sk_docker", level: ProficiencyLevel.BEGINNER, score: 45 },
    ];

    for (const ss of studentSkillInputs) {
      await prisma.studentSkill.upsert({
        where: {
          studentId_skillId: {
            studentId: studentUser.studentProfile.id,
            skillId: ss.skillId,
          },
        },
        update: {},
        create: {
          studentId: studentUser.studentProfile.id,
          skillId: ss.skillId,
          proficiencyLevel: ss.level,
          score: ss.score,
          source: SkillSource.ASSESSED,
          assessedAt: new Date(),
        },
      });
    }

    // 10. Create SkillGapSnapshot
    await prisma.skillGapSnapshot.create({
      data: {
        studentId: studentUser.studentProfile.id,
        overallScore: 76.5,
        summary: "Strong full-stack foundations with high proficiency in React/TypeScript. Primary industry gap is in Containerization (Docker) and Cloud Systems.",
        gaps: [
          { skillName: "Docker", currentLevel: "BEGINNER", targetLevel: "INTERMEDIATE", gapScore: 35, priority: "HIGH" },
          { skillName: "PostgreSQL", currentLevel: "INTERMEDIATE", targetLevel: "ADVANCED", gapScore: 18, priority: "MEDIUM" },
        ],
      },
    });
  }

  // 11. Create a Sample Opportunity
  const opportunity = await prisma.opportunity.create({
    data: {
      postedById: industryUser.id,
      companyId: company.id,
      title: "Cloud Software Engineer Intern (Summer 2026)",
      type: OpportunityType.INTERNSHIP,
      description: "Join our core systems engineering group developing microservices, database optimizations, and resilient cloud architectures.",
      responsibilities: "Collaborate with senior distributed systems engineers; implement TypeScript APIs; optimize SQL query performance.",
      workMode: WorkMode.HYBRID,
      location: "Bengaluru, Karnataka (Hybrid)",
      stipendOrSalaryMin: 45000,
      stipendOrSalaryMax: 60000,
      currency: "INR",
      durationMonths: 6,
      numberOfOpenings: 3,
      status: OpportunityStatus.OPEN,
      requiredSkills: {
        create: [
          { skillId: "sk_typescript", minProficiency: ProficiencyLevel.INTERMEDIATE, weight: 1.5, isMandatory: true },
          { skillId: "sk_nextjs", minProficiency: ProficiencyLevel.INTERMEDIATE, weight: 1.2, isMandatory: false },
          { skillId: "sk_postgresql", minProficiency: ProficiencyLevel.INTERMEDIATE, weight: 1.0, isMandatory: true },
          { skillId: "sk_docker", minProficiency: ProficiencyLevel.INTERMEDIATE, weight: 1.0, isMandatory: false },
        ],
      },
    },
  });

  // 12. Create a Matched Application with embedded match score
  if (studentUser.studentProfile && academicianProfile) {
    await prisma.application.create({
      data: {
        studentId: studentUser.studentProfile.id,
        opportunityId: opportunity.id,
        status: "UNDER_REVIEW",
        coverNote: "I have built production-grade full stack applications using TypeScript, Next.js, and PostgreSQL. Excited to contribute to Nexura's cloud infrastructure.",
        matchScore: 84.5,
        matchConfidence: "HIGH",
        isEscalated: false,
        reviewDecision: "APPROVED",
        reviewedById: academicianProfile.id,
        reviewedAt: new Date(),
        mentorComments: "Candidate has proven technical track record and matches 84.5% of role requirements. Recommended for interview.",
      },
    });
  }

  console.log("✅ Seed completed successfully!");
  console.log("-----------------------------------------");
  console.log("Demo Credentials (Password: Password123!):");
  console.log("Student:      student@skillbridge.edu");
  console.log("Academician:  academician@skillbridge.edu");
  console.log("Industry:     recruiter@nexura.com");
  console.log("Admin:        admin@skillbridge.org");
  console.log("-----------------------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
