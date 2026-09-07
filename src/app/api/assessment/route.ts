import { NextRequest, NextResponse } from "next/server";
import { generateAssessmentQuestions, scoreAssessmentAnswers } from "@/lib/groq";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "REPLACE_WITH_YOUR_GROQ_API_KEY") {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 503 });
    }

    const body = await req.json();
    const { action, skill, difficulty, count, questions, userAnswers } = body;

    if (action === "generate") {
      const result = await generateAssessmentQuestions(skill, difficulty, count || 5);
      return NextResponse.json({ success: true, ...result });
    }

    if (action === "score") {
      const result = await scoreAssessmentAnswers(skill, questions, userAnswers);
      return NextResponse.json({ success: true, ...result });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    console.error("[Assessment API]", err);
    return NextResponse.json({ error: err?.message || "Failed" }, { status: 500 });
  }
}
