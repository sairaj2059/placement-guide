export default function Interviews() {
  const roles = [
    "Data Scientist",
    "ML Engineer",
    "CV Engineer",
    "NLP Engineer",
    "GenAI Engineer",
    "Healthcare AI",
  ];
  const types = [
    "Statistics",
    "ML",
    "DL",
    "Python",
    "SQL",
    "DSA",
    "Specialization",
    "Project",
    "System design",
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:px-10">
      <h1 className="font-display text-2xl font-semibold">Interview prep</h1>
      <p className="mt-1 text-sm text-[#8b91a3]">
        Interviewers care about your reasoning, not just your definition.
      </p>

      <div className="mt-8 rounded-xl border border-[#262b38] bg-[#151822] p-6">
        <p className="mb-3 text-sm font-medium">Role</p>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-[#262b38] px-3 py-1.5 text-xs text-[#c9cede] hover:border-[#3a4054]"
            >
              {r}
            </span>
          ))}
        </div>

        <p className="mb-3 mt-6 text-sm font-medium">Round type</p>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#262b38] px-3 py-1.5 text-xs text-[#c9cede] hover:border-[#3a4054]"
            >
              {t}
            </span>
          ))}
        </div>

        <button className="mt-8 rounded-lg bg-[#e8a33d] px-5 py-2.5 text-sm font-medium text-[#0d0f14]">
          Start mock interview
        </button>
        <p className="mt-3 text-xs text-[#8b91a3]">
          The AI interviewer asks one question at a time, challenges weak
          reasoning with follow-ups, and ends with a scored report. Wire this
          button to your AI service layer (see README).
        </p>
      </div>
    </div>
  );
}
