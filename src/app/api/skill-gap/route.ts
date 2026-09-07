import { NextRequest, NextResponse } from "next/server";
import { generateSkillGapReport } from "@/lib/groq";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "REPLACE_WITH_YOUR_GROQ_API_KEY") {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 503 });
    }

    const body = await req.json();
    const { skills } = body;

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json({ error: "skills array required" }, { status: 400 });
    }

    const report = await generateSkillGapReport(skills);
    return NextResponse.json({ success: true, ...report });
  } catch (err: any) {
    console.error("[Skill Gap API]", err);
    return NextResponse.json({ error: err?.message || "Failed" }, { status: 500 });
  }
}
