import { practiceCategories, sampleQuestions } from "@/lib/mock-data";

const difficultyColor: Record<string, string> = {
  Easy: "text-[#3ddc97] border-[#3ddc97]/40",
  Medium: "text-[#e8a33d] border-[#e8a33d]/40",
  Interview: "text-[#e8617a] border-[#e8617a]/40",
};

export default function Practice() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <h1 className="font-display text-2xl font-semibold">Practice center</h1>
      <p className="mt-1 text-sm text-[#8b91a3]">
        Deliberate practice, not question dumps. Attempt before revealing
        the explanation.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {practiceCategories.map((cat) => (
          <span
            key={cat.name}
            className="rounded-full border border-[#262b38] bg-[#151822] px-3 py-1.5 text-xs text-[#c9cede]"
          >
            {cat.name} <span className="text-[#8b91a3]">· {cat.count}</span>
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {sampleQuestions.map((q) => (
          <div
            key={q.id}
            className="rounded-xl border border-[#262b38] bg-[#151822] p-5"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span
                className={`rounded-full border px-2 py-0.5 font-mono-data ${difficultyColor[q.difficulty] ?? "text-[#8b91a3] border-[#3a4054]"}`}
              >
                {q.difficulty}
              </span>
              <span className="text-[#8b91a3]">{q.topic}</span>
              <span className="text-[#8b91a3]">· {q.skill}</span>
              <span className="ml-auto font-mono-data text-[#8b91a3]">
                {q.time}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{q.prompt}</p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-[#e8a33d] px-4 py-2 text-xs font-medium text-[#0d0f14]">
                Attempt
              </button>
              <button className="rounded-lg border border-[#262b38] px-4 py-2 text-xs hover:bg-[#1b1f2b]">
                Hint
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
