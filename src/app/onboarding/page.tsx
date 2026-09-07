"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import McqQuiz, { QuizResult } from "@/components/McqQuiz";
import { getDiagnosticSet } from "@/lib/question-bank";
import { saveProfile, recordAttempt } from "@/lib/store";

const specializations = ["Computer Vision", "NLP / GenAI", "Healthcare AI"];
const roles = ["Data Scientist", "ML Engineer", "CV Engineer", "NLP Engineer", "GenAI Engineer", "Healthcare AI"];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<"profile" | "diagnostic" | "result">("profile");
  const [name, setName] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [specialization, setSpecialization] = useState(specializations[0]);
  const [hours, setHours] = useState(2);
  const [result, setResult] = useState<QuizResult | null>(null);

  function startDiagnostic(e: React.FormEvent) {
    e.preventDefault();
    saveProfile({ name: name.trim() || "there", targetRole: role, specialization, hoursPerDay: hours });
    setStep("diagnostic");
  }

  function handleFinish(r: QuizResult) {
    // persist every diagnostic answer as a real attempt, so the dashboard's
    // readiness computation has actual evidence from question one
    for (const a of r.answers) {
      recordAttempt({
        questionId: a.question.id,
        area: a.question.area,
        topic: a.question.topic,
        correct: a.correct,
      });
    }
    setResult(r);
    setStep("result");
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-14 md:px-10">
      {step === "profile" && (
        <form onSubmit={startDiagnostic}>
          <p className="font-mono-data text-xs text-[#8b91a3]">STEP 1 OF 2</p>
          <h1 className="mt-1 font-display text-2xl font-semibold">Tell us where you're starting from</h1>

          <label className="mt-6 block text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ananya"
            className="mt-1.5 w-full rounded-lg border border-[#262b38] bg-[#151822] px-3 py-2 text-sm outline-none focus:border-[#e8a33d]/60"
          />

          <label className="mt-4 block text-sm font-medium">Target role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[#262b38] bg-[#151822] px-3 py-2 text-sm outline-none focus:border-[#e8a33d]/60"
          >
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <label className="mt-4 block text-sm font-medium">Specialization</label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[#262b38] bg-[#151822] px-3 py-2 text-sm outline-none focus:border-[#e8a33d]/60"
          >
            {specializations.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <label className="mt-4 block text-sm font-medium">
            Hours you can realistically study per day: {hours}h
          </label>
          <input
            type="range"
            min={1}
            max={6}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="mt-2 w-full accent-[#e8a33d]"
          />

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-[#e8a33d] px-4 py-2.5 text-sm font-medium text-[#0d0f14]"
          >
            Start diagnostic quiz →
          </button>
        </form>
      )}

      {step === "diagnostic" && (
        <div>
          <p className="font-mono-data text-xs text-[#8b91a3]">STEP 2 OF 2</p>
          <h1 className="mt-1 mb-5 font-display text-2xl font-semibold">
            Quick diagnostic — no cramming, just answer what you know
          </h1>
          <McqQuiz questions={getDiagnosticSet()} onFinish={handleFinish} />
        </div>
      )}

      {step === "result" && result && (
        <div className="text-center">
          <p className="font-mono-data text-xs text-[#8b91a3]">DIAGNOSTIC COMPLETE</p>
          <p className="mt-2 font-display text-3xl font-semibold text-[#e8a33d]">
            {result.correct} / {result.total}
          </p>
          <p className="mt-2 text-sm text-[#8b91a3]">
            This is real signal, not a placeholder — your dashboard readiness scores below are computed
            directly from these answers.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-8 rounded-lg bg-[#e8a33d] px-5 py-2.5 text-sm font-medium text-[#0d0f14]"
          >
            Go to dashboard
          </button>
        </div>
      )}
    </div>
  );
}
