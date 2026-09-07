"use client";

import { useState } from "react";
import type { McqQuestion } from "@/lib/question-bank";

export interface QuizResult {
  total: number;
  correct: number;
  byArea: Record<string, { correct: number; total: number }>;
  answers: { question: McqQuestion; selected: number; correct: boolean }[];
}

export default function McqQuiz({
  questions,
  onFinish,
  onEachAnswer,
}: {
  questions: McqQuestion[];
  onFinish?: (result: QuizResult) => void;
  onEachAnswer?: (question: McqQuestion, selected: number, correct: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<QuizResult["answers"]>([]);
  const [done, setDone] = useState(false);

  const q = questions[index];

  function submit() {
    if (selected === null) return;
    const correct = selected === q.correctIndex;
    setRevealed(true);
    onEachAnswer?.(q, selected, correct);
    setAnswers((prev) => [...prev, { question: q, selected, correct }]);
  }

  function next() {
    if (index + 1 >= questions.length) {
      const finalAnswers = answers;
      const byArea: QuizResult["byArea"] = {};
      for (const a of finalAnswers) {
        const key = a.question.area;
        byArea[key] ??= { correct: 0, total: 0 };
        byArea[key].total += 1;
        if (a.correct) byArea[key].correct += 1;
      }
      const result: QuizResult = {
        total: finalAnswers.length,
        correct: finalAnswers.filter((a) => a.correct).length,
        byArea,
        answers: finalAnswers,
      };
      setDone(true);
      onFinish?.(result);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  if (done) {
    const correctCount = answers.filter((a) => a.correct).length;
    return (
      <div className="rounded-xl border border-[#262b38] bg-[#151822] p-6 text-center">
        <p className="font-display text-2xl font-semibold">
          {correctCount} / {answers.length}
        </p>
        <p className="mt-1 text-sm text-[#8b91a3]">Quiz complete — results saved to your progress.</p>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="rounded-xl border border-[#262b38] bg-[#151822] p-6">
      <div className="flex items-center justify-between text-xs text-[#8b91a3]">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span className="font-mono-data">
          {q.area} · {q.topic}
        </span>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{q.prompt}</p>

      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = revealed && i === q.correctIndex;
          const isWrongSelected = revealed && i === selected && i !== q.correctIndex;
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => setSelected(i)}
              className={`block w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                isCorrect
                  ? "border-[#3ddc97]/50 bg-[#3ddc97]/10"
                  : isWrongSelected
                  ? "border-[#e8617a]/50 bg-[#e8617a]/10"
                  : selected === i
                  ? "border-[#e8a33d]/60 bg-[#e8a33d]/5"
                  : "border-[#262b38] hover:border-[#3a4054]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 rounded-lg border border-[#262b38] bg-[#0f121a] p-4 text-sm text-[#c9cede]">
          {q.explanation}
        </div>
      )}

      <div className="mt-5 flex justify-end gap-2">
        {!revealed ? (
          <button
            onClick={submit}
            disabled={selected === null}
            className="rounded-lg bg-[#e8a33d] px-4 py-2 text-sm font-medium text-[#0d0f14] disabled:opacity-40"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={next}
            className="rounded-lg bg-[#e8a33d] px-4 py-2 text-sm font-medium text-[#0d0f14]"
          >
            {index + 1 >= questions.length ? "Finish" : "Next question"}
          </button>
        )}
      </div>
    </div>
  );
}
