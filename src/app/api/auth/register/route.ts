import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Role, AccountStatus } from "@prisma/client";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["STUDENT", "ACADEMICIAN", "INDUSTRY"]),
  organization: z.string().min(2, "Institution or Company name is required"),
  identifier: z.string().min(1, "Identifier is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    const { name, email, password, role, organization, identifier } = parsed.data;

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { message: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // If Student or Academician, ensure an Institution exists or link to one
    if (role === "STUDENT" || role === "ACADEMICIAN") {
      let institution = await prisma.institution.findFirst({
        where: { name: { contains: organization, mode: "insensitive" } },
      });

      if (!institution) {
        institution = await prisma.institution.create({
          data: {
            name: organization,
            city: "Bengaluru",
            isVerified: false,
          },
        });
      }

      if (role === "STUDENT") {
        await prisma.user.create({
          data: {
            name,
            email: email.toLowerCase(),
            passwordHash,
            role: Role.STUDENT,
            status: AccountStatus.ACTIVE,
            studentProfile: {
              create: {
                institutionId: institution.id,
                enrollmentNumber: identifier,
                course: "B.Tech",
                branch: "Computer Science",
                isPlacementReady: true,
              },
            },
          },
        });
      } else {
        await prisma.user.create({
          data: {
            name,
            email: email.toLowerCase(),
            passwordHash,
            role: Role.ACADEMICIAN,
            status: AccountStatus.ACTIVE,
            academicianProfile: {
              create: {
                institutionId: institution.id,
                department: identifier,
                designation: "Faculty Member",
              },
            },
          },
        });
      }
    } else {
      // Industry
      let company = await prisma.company.findFirst({
        where: { name: { contains: organization, mode: "insensitive" } },
      });

      if (!company) {
        company = await prisma.company.create({
          data: {
            name: organization,
            isVerified: false,
          },
        });
      }

      await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          passwordHash,
          role: Role.INDUSTRY,
          status: AccountStatus.ACTIVE,
          industryProfile: {
            create: {
              companyId: company.id,
              designation: identifier,
            },
          },
        },
      });
    }

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Server error occurred during account creation." },
      { status: 500 }
    );
  }
}
