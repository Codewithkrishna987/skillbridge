"use client";

import React, { useState } from "react";
import {
  Target, CheckCircle, Clock, Award, ArrowRight, ShieldCheck, Sparkles,
  Loader2, RefreshCw, AlertCircle, Trophy, XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface AssessmentItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  questions: number;
  difficulty: string;
  status: string;
  score?: number;
  verifiedDate?: string;
  recommendedFor?: string;
  skill?: string;
  diff?: string;
}

const STATIC_ASSESSMENTS: AssessmentItem[] = [
  { id: "react-101", title: "React & Modern Frontend Architecture", category: "Frontend Development", duration: "45 mins", questions: 25, difficulty: "Advanced", status: "COMPLETED", score: 90, verifiedDate: "Verified 2 days ago" },
  { id: "ts-201", title: "TypeScript Core Types & Generics", category: "Frontend Development", duration: "30 mins", questions: 20, difficulty: "Intermediate", status: "COMPLETED", score: 85, verifiedDate: "Verified 1 week ago" },
  { id: "node-301", title: "Node.js REST API & Microservices", category: "Backend Development", duration: "40 mins", questions: 20, difficulty: "Intermediate", status: "COMPLETED", score: 78, verifiedDate: "Verified 2 weeks ago" },
  { id: "docker-401", title: "Docker & Container Orchestration", category: "DevOps & Cloud", duration: "35 mins", questions: 5, difficulty: "Intermediate", status: "AVAILABLE", recommendedFor: "High Industry Demand", skill: "Docker", diff: "Intermediate" },
  { id: "pg-501", title: "PostgreSQL Advanced Queries & Indexing", category: "Databases", duration: "45 mins", questions: 5, difficulty: "Advanced", status: "AVAILABLE", recommendedFor: "Closes Cloud Gap", skill: "PostgreSQL", diff: "Advanced" },
  { id: "python-601", title: "Python Data Structures & Algorithms", category: "Core CS", duration: "60 mins", questions: 5, difficulty: "Advanced", status: "AVAILABLE", recommendedFor: "Recruiter Priority", skill: "Python", diff: "Advanced" },
];

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

type Screen = "list" | "loading" | "quiz" | "result";

export default function AssessmentsPage() {
  const [screen, setScreen] = useState<Screen>("list");
  const [activeAssessment, setActiveAssessment] = useState<AssessmentItem | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [groqError, setGroqError] = useState(false);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(STATIC_ASSESSMENTS);

  async function startAssessment(test: AssessmentItem) {
    setActiveAssessment(test);

    setScreen("loading");
    setGroqError(false);
    setUserAnswers([]);
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", skill: test.skill || test.title, difficulty: test.diff || test.difficulty, count: 5 }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      if (!data.questions || data.questions.length === 0) throw new Error("No questions returned");
      setQuestions(data.questions);
      setScreen("quiz");
    } catch {
      setGroqError(true);
      // Fallback: use static demo questions
      const fallback: Question[] = [
        { id: "f1", question: `What is a core concept in ${test.title}?`, options: ["Option A (Demo)", "Option B (Demo)", "Option C (Demo)", "Option D (Demo)"], correctIndex: 0, explanation: "⚠️ Demo mode: Add your GROQ_API_KEY in .env to get real AI-generated questions." },
        { id: "f2", question: "Groq API is not connected. This is a demo question.", options: ["Add GROQ_API_KEY", "Check .env file", "Visit console.groq.com", "All of the above"], correctIndex: 3, explanation: "Get your free Groq API key at console.groq.com and add it to .env as GROQ_API_KEY" },
      ];
      setQuestions(fallback);
      setScreen("quiz");
    }
  }

  function handleAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
  }

  function nextQuestion() {
    const newAnswers = [...userAnswers, selected ?? -1];
    setUserAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      // Calculate score
      let correct = 0;
      questions.forEach((q, i) => {
        if (newAnswers[i] === q.correctIndex) correct++;
      });
      const score = Math.round((correct / questions.length) * 100);
      setFinalScore(score);
      setFeedback(
        score >= 85 ? "Excellent! Strong proficiency demonstrated. Skill verified ✓" :
        score >= 70 ? "Good performance. Minor gaps — targeted practice recommended." :
        score >= 50 ? "Foundational understanding present. Study required for industry readiness." :
        "Critical gap detected. Comprehensive review needed before applying to related roles."
      );
      setScreen("result");

      // Update the assessment status in local state
      if (activeAssessment) {
        setAssessments(prev => prev.map(a =>
          a.id === activeAssessment.id
            ? { ...a, status: "COMPLETED", score, verifiedDate: "Just now" }
            : a
        ));
      }
    }
  }

  return (
    <div className="space-y-6">
      {screen === "list" && (
        <>
          <div className="rounded-2xl border border-[#E4DFD1] bg-[#1B4332] p-6 sm:p-8 text-white shadow-sm">
            <div className="max-w-2xl space-y-2">
              <Badge className="bg-[#E8B84B] text-[#1B4332] font-semibold border-none flex items-center gap-1 w-fit">
                <Sparkles className="h-3 w-3" /> AI-Powered Assessment Engine
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Standardized Skill Assessments</h1>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Take AI-generated, industry-calibrated assessments. Each assessment uses Groq LLaMA to create fresh questions aligned to current hiring requirements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assessments.map((test) => {
              const isCompleted = test.status === "COMPLETED";
              return (
                <Card key={test.id} className="border-[#E4DFD1] bg-white hover:border-[#1B4332]/40 transition-all flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">{test.category}</span>
                      {isCompleted ? (
                        <Badge variant="verified" className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">{test.recommendedFor}</Badge>
                      )}
                    </div>
                    <CardTitle className="text-base text-zinc-900 leading-snug">{test.title}</CardTitle>
                    <CardDescription className="text-xs text-zinc-500 flex items-center gap-3 pt-1">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {test.duration}</span>
                      <span>•</span>
                      <span>{isCompleted ? test.questions : 5} Questions</span>
                      <span>•</span>
                      <span>{test.difficulty}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    {isCompleted ? (
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="text-xs text-zinc-500">Verified Score</div>
                          <div className="text-lg font-bold text-[#1B4332]">{test.score}%</div>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs border-[#1B4332] text-[#1B4332]"
                          onClick={() => startAssessment(test)}>
                          Retake
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs text-zinc-600 font-medium flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5 text-[#1B4332]" /> AI-Generated Questions
                        </span>
                        <Button size="sm" className="text-xs bg-[#1B4332] hover:bg-[#2D6A4F] text-white flex items-center gap-1"
                          onClick={() => startAssessment(test)}>
                          Start <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {screen === "loading" && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-[#1B4332]" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-[#1B4332]/20 border-t-[#1B4332] animate-spin" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-zinc-800">Groq AI is generating your assessment...</h2>
            <p className="text-sm text-zinc-500 mt-1">{activeAssessment?.title}</p>
            <p className="text-xs text-zinc-400 mt-2 flex items-center justify-center gap-1">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Creating fresh, industry-calibrated questions just for you
            </p>
          </div>
        </div>
      )}

      {screen === "quiz" && questions.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-5">
          {groqError && (
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>⚠️ Demo mode: Add your GROQ_API_KEY in .env to get real AI-generated questions.</span>
            </div>
          )}

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-zinc-700">{activeAssessment?.title}</span>
              <span className="text-zinc-500">{currentQ + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div
                className="bg-[#1B4332] h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-[#E4DFD1]">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-[#1B4332]" />
                <span className="text-xs text-zinc-500 uppercase tracking-wide">Question {currentQ + 1}</span>
              </div>
              <CardTitle className="text-base text-zinc-900 leading-relaxed font-medium">
                {questions[currentQ].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions[currentQ].options.map((opt, idx) => {
                const isCorrect = idx === questions[currentQ].correctIndex;
                const isSelected = idx === selected;

                let cls = "w-full text-left rounded-xl border p-3.5 text-sm transition-all ";
                if (selected === null) {
                  cls += "border-zinc-200 hover:border-[#1B4332]/40 hover:bg-emerald-50/50 cursor-pointer";
                } else if (isCorrect) {
                  cls += "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium";
                } else if (isSelected && !isCorrect) {
                  cls += "border-red-400 bg-red-50 text-red-700";
                } else {
                  cls += "border-zinc-100 bg-zinc-50 text-zinc-400";
                }

                return (
                  <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                      {selected !== null && isCorrect && <CheckCircle className="h-4 w-4 ml-auto text-emerald-600" />}
                      {selected !== null && isSelected && !isCorrect && <XCircle className="h-4 w-4 ml-auto text-red-500" />}
                    </div>
                  </button>
                );
              })}

              {showExplanation && (
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-800 mt-2">
                  <strong>💡 Explanation:</strong> {questions[currentQ].explanation}
                </div>
              )}

              {selected !== null && (
                <Button
                  onClick={nextQuestion}
                  className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white mt-2"
                >
                  {currentQ < questions.length - 1 ? (
                    <span className="flex items-center gap-2">Next Question <ArrowRight className="h-4 w-4" /></span>
                  ) : (
                    <span className="flex items-center gap-2"><Trophy className="h-4 w-4" /> Submit & View Results</span>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {screen === "result" && finalScore !== null && (
        <div className="max-w-2xl mx-auto space-y-5">
          <Card className="border-[#E4DFD1]">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${finalScore >= 70 ? "bg-emerald-100" : "bg-red-50"}`}>
                {finalScore >= 70 ? (
                  <Trophy className="h-12 w-12 text-[#1B4332]" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-red-500" />
                )}
              </div>
              <div>
                <div className="text-5xl font-extrabold text-[#1B4332]">{finalScore}%</div>
                <div className="text-sm text-zinc-500 mt-1">
                  {userAnswers.filter((a, i) => a === questions[i]?.correctIndex).length} / {questions.length} Correct
                </div>
              </div>
              <p className="text-sm text-zinc-700 max-w-md mx-auto">{feedback}</p>
              {finalScore >= 70 && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1 mx-auto w-fit text-sm py-1 px-3">
                  <ShieldCheck className="h-4 w-4" /> Skill Verified — Added to Profile
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Answer review */}
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800 text-sm">Review Answers</h3>
            {questions.map((q, i) => {
              const correct = userAnswers[i] === q.correctIndex;
              return (
                <div key={q.id} className={`rounded-xl border p-4 text-xs ${correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-medium text-zinc-800 mb-1">{q.question}</p>
                      <p className="text-zinc-600">Correct: <span className="font-semibold">{q.options[q.correctIndex]}</span></p>
                      {!correct && userAnswers[i] !== undefined && userAnswers[i] !== -1 && (
                        <p className="text-red-600">Your answer: {q.options[userAnswers[i]]}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setScreen("list")} variant="outline" className="border-[#1B4332] text-[#1B4332]">
              <ArrowRight className="h-4 w-4 rotate-180 mr-1" /> Back to Assessments
            </Button>
            <Button onClick={() => activeAssessment && startAssessment(activeAssessment)} className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white">
              <RefreshCw className="h-4 w-4 mr-1" /> Retake Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
