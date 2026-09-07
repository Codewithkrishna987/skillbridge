import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function analyzeResumeWithGroq(resumeText: string): Promise<{
  name: string;
  skills: { name: string; category: string; proficiency: string; score: number }[];
  experience: string[];
  education: string[];
  summary: string;
  overallScore: number;
  gaps: { skill: string; priority: string; reason: string }[];
}> {
  const prompt = `You are an expert AI resume analyzer for SkillBridge, an India-focused academia-industry placement platform.

Analyze the following resume and respond ONLY with valid JSON (no markdown, no explanation):

{
  "name": "Full name extracted",
  "summary": "2-3 sentence professional summary",
  "skills": [
    {"name": "React", "category": "Frontend Development", "proficiency": "Advanced", "score": 85}
  ],
  "experience": ["Role at Company - brief description"],
  "education": ["Degree from Institution"],
  "overallScore": 78,
  "gaps": [
    {"skill": "Docker", "priority": "HIGH", "reason": "Required by 68% of tech companies"}
  ]
}

Rules:
- skills: extract ALL technical skills and rate honestly (score 0-100)
- gaps: identify 3-5 skills commonly required by Indian tech industry but missing or weak
- overallScore: weighted average placement readiness (0-100)
- Keep all arrays non-empty

RESUME TEXT:
${resumeText.slice(0, 4000)}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    max_tokens: 2000,
  });

  const responseText = completion.choices[0]?.message?.content || "{}";
  
  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Could not parse AI response");
  
  return JSON.parse(jsonMatch[0]);
}

export async function matchResumeToOpportunity(
  resumeSkills: { name: string; score: number }[],
  opportunity: { title: string; description: string; requiredSkills?: string }
): Promise<{
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  escalate: boolean;
  recommendation: string;
}> {
  const prompt = `You are SkillBridge's AI matching engine. Analyze the fit between this candidate and job opportunity.

Candidate Skills: ${JSON.stringify(resumeSkills)}

Job: ${opportunity.title}
Description: ${opportunity.description}

Respond ONLY with valid JSON:
{
  "matchScore": 84.5,
  "matchedSkills": ["React", "TypeScript"],
  "missingSkills": ["Docker", "Kubernetes"],
  "escalate": true,
  "recommendation": "Strong candidate with 2 bridgeable gaps. Recommend mentor review for Docker prerequisite."
}

Rules:
- matchScore: 0-100, precise calculation based on skill overlap
- escalate: true if matchScore is between 70-84 (borderline - needs faculty review)
- recommendation: 1-2 sentences for the recruiter`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.1,
    max_tokens: 500,
  });

  const responseText = completion.choices[0]?.message?.content || "{}";
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Could not parse match response");
  
  return JSON.parse(jsonMatch[0]);
}

export async function generateSkillGapReport(
  skills: { name: string; score: number }[]
): Promise<{
  gaps: {
    skill: string;
    currentScore: number;
    requiredScore: number;
    gap: number;
    priority: string;
    reason: string;
    action: string;
  }[];
  overallReadiness: number;
  topStrengths: string[];
}> {
  const prompt = `You are SkillBridge's curriculum gap analyzer for Indian tech industry placement.

Student's current verified skills: ${JSON.stringify(skills)}

Analyze gaps against Indian tech industry requirements in 2026. Respond ONLY with JSON:
{
  "gaps": [
    {
      "skill": "Docker",
      "currentScore": 20,
      "requiredScore": 75,
      "gap": 55,
      "priority": "HIGH",
      "reason": "Mandatory for 68% of DevOps and Cloud roles at top Indian tech firms",
      "action": "Complete Docker fundamentals + compose assessment (Est. 2 weeks)"
    }
  ],
  "overallReadiness": 78,
  "topStrengths": ["React", "TypeScript"]
}

Identify 3-5 critical gaps. Priority: CRITICAL (gap>60), HIGH (gap 30-60), LOW (gap<30).`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    max_tokens: 1500,
  });

  const responseText = completion.choices[0]?.message?.content || "{}";
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Could not parse gap report");
  
  return JSON.parse(jsonMatch[0]);
}

export async function generateAssessmentQuestions(
  skill: string,
  difficulty: string,
  count: number = 5
): Promise<{
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}> {
  const prompt = `Create ${count} multiple-choice assessment questions for SkillBridge platform.

Skill: ${skill}
Difficulty: ${difficulty}
Target: Indian engineering students (B.Tech/MCA)

Respond ONLY with JSON:
{
  "questions": [
    {
      "id": "q1",
      "question": "What does useEffect with an empty dependency array do?",
      "options": ["Runs on every render", "Runs once on mount", "Runs on unmount only", "Never runs"],
      "correctIndex": 1,
      "explanation": "An empty dependency array means the effect only runs after the first render (mount)."
    }
  ]
}

Make questions practical, industry-relevant, not trivial.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
    max_tokens: 2000,
  });

  const responseText = completion.choices[0]?.message?.content || "{}";
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Could not parse questions");
  
  return JSON.parse(jsonMatch[0]);
}

export async function scoreAssessmentAnswers(
  skill: string,
  questions: { question: string; correctIndex: number }[],
  userAnswers: number[]
): Promise<{ score: number; correctCount: number; feedback: string }> {
  let correct = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.correctIndex) correct++;
  });
  
  const score = Math.round((correct / questions.length) * 100);
  const feedback =
    score >= 85
      ? "Excellent! You demonstrate strong proficiency in this skill."
      : score >= 70
      ? "Good performance. A few gaps identified — targeted practice recommended."
      : score >= 50
      ? "Foundational understanding present. Significant practice needed for industry readiness."
      : "Critical gap detected. Comprehensive study of fundamentals required before attempting roles.";

  return { score, correctCount: correct, feedback };
}
