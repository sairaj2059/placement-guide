"use client";

import { useState } from "react";
import McqQuiz, { QuizResult } from "./McqQuiz";
import { getQuestionsByArea } from "@/lib/question-bank";
import { setTopicMastery, recordAttempt, logMistake } from "@/lib/store";
import { masteryFromScore, masteryLabel } from "@/lib/mastery";
import { useLiveStore } from "@/lib/use-live-store";
import type { Area } from "@/lib/store";

export default function TopicMasterySection({
  slug,
  topicName,
  quizArea,
}: {
  slug: string;
  topicName: string;
  quizArea: Area | null;
}) {
  const store = useLiveStore();
  const [result, setResult] = useState<QuizResult | null>(null);
  const currentMastery = store.topicMastery[slug] ?? "L0";

  if (!quizArea) {
    return (
      <div className="rounded-lg border border-dashed border-[#262b38] bg-[#0f121a] p-4 text-sm text-[#8b91a3]">
        No quiz bank is wired up for this topic yet — it&apos;s scoped into the next push alongside
        Practice and Mock Interviews. Mastery will stay at its current level until then.
      </div>
    );
  }

  const questions = getQuestionsByArea(quizArea);

  function handleFinish(r: QuizResult) {
    for (const a of r.answers) {
      recordAttempt({
        questionId: a.question.id,
        area: a.question.area,
        topic: a.question.topic,
        correct: a.correct,
      });
      if (!a.correct) {
        logMistake({
          question: a.question.prompt,
          topic: a.question.topic,
          area: a.question.area,
          category: "Conceptual misunderstanding",
        });
      }
    }
    const fraction = r.correct / r.total;
    const newMastery = masteryFromScore(fraction);
    setTopicMastery(slug, newMastery);
    setResult(r);
  }

  if (result) {
    const fraction = result.correct / result.total;
    const newMastery = masteryFromScore(fraction);
    return (
      <div className="rounded-xl border border-[#262b38] bg-[#151822] p-6 text-center">
        <p className="font-display text-2xl font-semibold">
          {result.correct} / {result.total}
        </p>
        <p className="mt-2 text-sm text-[#8b91a3]">
          {topicName} mastery updated to{" "}
          <span className="font-medium text-[#e8a33d]">
            {newMastery} — {masteryLabel[newMastery]}
          </span>
        </p>
        <button
          onClick={() => setResult(null)}
          className="mt-4 rounded-lg border border-[#262b38] px-4 py-2 text-xs hover:bg-[#1b1f2b]"
        >
          Retake
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-xs text-[#8b91a3]">
        Current mastery: <span className="font-medium text-[#e7e9ee]">{currentMastery}</span> — questions
        are drawn from the broader {quizArea} bank, not only {topicName} specifically.
      </p>
      <McqQuiz questions={questions} onFinish={handleFinish} />
    </div>
  );
}
