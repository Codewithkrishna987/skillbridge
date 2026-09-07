import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeWithGroq } from "@/lib/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "REPLACE_WITH_YOUR_GROQ_API_KEY") {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 503 });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const rawText = formData.get("text") as string | null;

    let resumeText = "";

    if (rawText) {
      resumeText = rawText;
    } else if (file) {
      if (file.type === "application/pdf") {
        // For PDF, read as ArrayBuffer and extract text
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        try {
          const pdfParse = require("pdf-parse");
          const pdfData = await pdfParse(buffer);
          resumeText = pdfData.text;
        } catch {
          // Fallback: try to read as text
          resumeText = buffer.toString("utf8").replace(/[^\x20-\x7E\n\r\t]/g, " ");
        }
      } else {
        // txt, doc etc - read as text
        resumeText = await file.text();
      }
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract text from resume. Please try a text file or paste your resume text." },
        { status: 400 }
      );
    }

    const analysis = await analyzeResumeWithGroq(resumeText);
    return NextResponse.json({ success: true, analysis });
  } catch (err: any) {
    console.error("[Resume Analyze API]", err);
    return NextResponse.json(
      { error: err?.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
