"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, Sparkles, CheckCircle, AlertCircle, Loader2, User, Zap, Target, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SkillResult {
  name: string;
  category: string;
  proficiency: string;
  score: number;
}

interface GapResult {
  skill: string;
  priority: string;
  reason: string;
}

interface AnalysisResult {
  name: string;
  summary: string;
  skills: SkillResult[];
  experience: string[];
  education: string[];
  overallScore: number;
  gaps: GapResult[];
}

const GROQ_CONFIGURED = process.env.NEXT_PUBLIC_GROQ_CONFIGURED !== "false";

export default function ResumeUploadPage() {
  const [step, setStep] = useState<"upload" | "analyzing" | "result">("upload");
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [textInput, setTextInput] = useState("");
  const [inputMode, setInputMode] = useState<"file" | "text">("file");
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function runAnalysis(formData?: FormData) {
    setStep("analyzing");
    setError(null);

    try {
      const fd = formData || new FormData();
      if (inputMode === "text") {
        fd.append("text", textInput);
      }

      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis(data.analysis);
      setStep("result");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setStep("upload");
    }
  }

  function handleFileSelect(file: File) {
    setSelectedFile(file);
  }

  function handleAnalyze() {
    if (inputMode === "file" && selectedFile) {
      const fd = new FormData();
      fd.append("resume", selectedFile);
      runAnalysis(fd);
    } else if (inputMode === "text" && textInput.trim().length > 50) {
      runAnalysis();
    }
  }

  const priorityColor = (p: string) => {
    if (p === "CRITICAL") return "bg-red-100 text-red-700 border-red-200";
    if (p === "HIGH") return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const scoreColor = (s: number) =>
    s >= 80 ? "text-emerald-600" : s >= 60 ? "text-amber-600" : "text-red-600";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[#E4DFD1] bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] p-6 sm:p-8 text-white shadow-sm">
        <div className="max-w-2xl space-y-2">
          <Badge className="bg-[#E8B84B] text-[#1B4332] font-semibold border-none flex items-center gap-1 w-fit">
            <Sparkles className="h-3 w-3" /> AI Resume Intelligence Engine
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Our Groq-powered AI instantly parses your resume, extracts verified skills, identifies industry gaps, and calculates your placement readiness score.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-emerald-200">
          <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Supports PDF &amp; TXT</span>
          <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Powered by Groq LLaMA 3.1</span>
          <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Results in &lt; 5 seconds</span>
        </div>
      </div>

      {step === "upload" && (
        <>
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <strong>Error: </strong>{error}
                {error.includes("GROQ_API_KEY") && (
                  <p className="mt-1 text-xs text-red-600">
                    ⚠️ Please set your GROQ_API_KEY in the .env file. Get a free key at{" "}
                    <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="underline font-medium">console.groq.com</a>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Input mode toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setInputMode("file")}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                inputMode === "file"
                  ? "border-[#1B4332] bg-[#1B4332] text-white"
                  : "border-[#E4DFD1] bg-white text-zinc-600 hover:border-[#1B4332]/40"
              }`}
            >
              <Upload className="h-4 w-4" /> Upload File
            </button>
            <button
              onClick={() => setInputMode("text")}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                inputMode === "text"
                  ? "border-[#1B4332] bg-[#1B4332] text-white"
                  : "border-[#E4DFD1] bg-white text-zinc-600 hover:border-[#1B4332]/40"
              }`}
            >
              <FileText className="h-4 w-4" /> Paste Text
            </button>
          </div>

          {inputMode === "file" ? (
            <div
              className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-all cursor-pointer ${
                dragOver
                  ? "border-[#1B4332] bg-emerald-50"
                  : selectedFile
                  ? "border-[#1B4332]/60 bg-emerald-50/50"
                  : "border-[#E4DFD1] bg-white hover:border-[#1B4332]/40 hover:bg-zinc-50/50"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFileSelect(f);
              }}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileSelect(f);
                }}
              />
              {selectedFile ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="font-semibold text-zinc-800">{selectedFile.name}</p>
                  <p className="text-xs text-zinc-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  <p className="text-xs text-emerald-600 font-medium">Ready to analyze — click Analyze or drop a different file</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto">
                    <Upload className="h-7 w-7 text-zinc-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-700">Drop your resume here</p>
                    <p className="text-xs text-zinc-500 mt-1">or click to browse — PDF, TXT, DOC up to 5MB</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                className="w-full h-64 rounded-xl border border-[#E4DFD1] p-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 resize-none"
                placeholder="Paste your resume text here...

Example:
John Doe
Software Engineer

SKILLS: React, TypeScript, Node.js, PostgreSQL, Python

EXPERIENCE:
- Frontend Developer at TechCorp (2022-2024)
  Built scalable dashboards using React and TypeScript

EDUCATION:
- B.Tech Computer Science, IIT Delhi (2022)
"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <p className="text-xs text-zinc-500">{textInput.length} characters — minimum 50 required</p>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={
              (inputMode === "file" && !selectedFile) ||
              (inputMode === "text" && textInput.trim().length < 50)
            }
            className="w-full sm:w-auto bg-[#1B4332] hover:bg-[#2D6A4F] text-white flex items-center gap-2 h-11 px-8"
          >
            <Sparkles className="h-4 w-4" />
            Analyze with AI
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Demo hint */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>💡 Demo Tip:</strong> For testing without a real resume, use "Paste Text" mode and paste any tech skills list. The AI will analyze it instantly.
          </div>
        </>
      )}

      {step === "analyzing" && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-[#1B4332]" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-[#1B4332]/20 border-t-[#1B4332] animate-spin" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-zinc-800">Groq AI is analyzing your resume...</h2>
            <p className="text-sm text-zinc-500">Extracting skills • Identifying gaps • Calculating readiness score</p>
          </div>
          <div className="flex gap-2 text-xs text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>LLaMA 3.1 8B Instant Model • Usually takes 3-8 seconds</span>
          </div>
        </div>
      )}

      {step === "result" && analysis && (
        <div className="space-y-5">
          {/* Score Banner */}
          <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <User className="h-7 w-7 text-[#1B4332]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900">{analysis.name || "Your Profile"}</h2>
                <p className="text-sm text-zinc-600 max-w-lg">{analysis.summary}</p>
              </div>
            </div>
            <div className="text-center shrink-0 bg-emerald-50 rounded-xl px-6 py-3 border border-emerald-200">
              <div className="text-3xl font-extrabold text-[#1B4332]">{analysis.overallScore}%</div>
              <div className="text-xs text-zinc-600 font-medium">Placement Readiness</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Skills */}
            <div className="lg:col-span-2">
              <Card className="border-[#E4DFD1]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#1B4332]" /> Extracted Skills
                    <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                      {analysis.skills.length} skills found
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {analysis.skills.map((s, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
                        <div>
                          <div className="text-sm font-medium text-zinc-800">{s.name}</div>
                          <div className="text-[11px] text-zinc-500">{s.category} · {s.proficiency}</div>
                        </div>
                        <span className={`text-sm font-bold ${scoreColor(s.score)}`}>{s.score}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: Education + Experience */}
            <div className="space-y-4">
              <Card className="border-[#E4DFD1]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-[#1B4332]" /> Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {analysis.education.map((e, i) => (
                      <li key={i} className="text-xs text-zinc-700 flex items-start gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> {e}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#E4DFD1]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <Target className="h-4 w-4 text-[#1B4332]" /> Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {analysis.experience.map((e, i) => (
                      <li key={i} className="text-xs text-zinc-700 flex items-start gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> {e}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Skill Gaps */}
          {analysis.gaps && analysis.gaps.length > 0 && (
            <Card className="border-[#E4DFD1]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" /> AI-Detected Skill Gaps
                </CardTitle>
                <CardDescription className="text-xs">
                  These gaps were identified by comparing your skills to current Indian industry requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.gaps.map((g, i) => (
                    <div key={i} className={`flex items-start gap-3 rounded-xl border p-4 ${priorityColor(g.priority)}`}>
                      <Badge className={`shrink-0 text-[10px] border ${priorityColor(g.priority)}`}>
                        {g.priority}
                      </Badge>
                      <div>
                        <p className="text-sm font-semibold">{g.skill}</p>
                        <p className="text-xs mt-0.5 opacity-80">{g.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => { setStep("upload"); setAnalysis(null); setSelectedFile(null); setTextInput(""); }}
              variant="outline"
              className="border-[#1B4332] text-[#1B4332]"
            >
              Analyze Another Resume
            </Button>
            <Button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white">
              View Skill Gap Diagnostic →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
