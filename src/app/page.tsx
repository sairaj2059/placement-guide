import Link from "next/link";

const loop = ["Assess", "Plan", "Learn", "Practice", "Interview", "Analyze", "Revise"];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0f14]">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8a33d]" />
          <span className="font-display text-lg font-semibold">Signal</span>
        </div>
        <Link
          href="/dashboard"
          className="rounded-full border border-[#262b38] px-4 py-2 text-sm text-[#e7e9ee] hover:bg-[#151822]"
        >
          Enter dashboard
        </Link>
      </header>

      <section className="mx-auto max-w-3xl px-6 pt-16 pb-20 text-center md:pt-24">
        <p className="font-mono-data text-xs tracking-wide text-[#8b91a3]">
          8-WEEK DATA SCIENCE PLACEMENT PROGRAM
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
          You don&apos;t need to study everything.
          <br />
          You need to master what matters.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[#8b91a3]">
          Signal diagnoses your actual gaps in Python, SQL, ML, DL and your
          chosen specialization, then builds a daily plan that closes them —
          and tests whether you can defend your answers, not just recognize
          them.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/onboarding"
            className="rounded-lg bg-[#e8a33d] px-5 py-2.5 text-sm font-medium text-[#0d0f14] hover:bg-[#f0b25a]"
          >
            Start diagnostic
          </Link>
          <Link
            href="/learn"
            className="rounded-lg border border-[#262b38] px-5 py-2.5 text-sm text-[#e7e9ee] hover:bg-[#151822]"
          >
            Browse curriculum
          </Link>
        </div>
      </section>

      <section className="border-t border-[#181c26] bg-[#0f121a] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono-data text-xs text-[#8b91a3]">
            {loop.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-[#262b38] bg-[#151822] px-3 py-1.5 text-[#e7e9ee]">
                  {step}
                </span>
                {i < loop.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-lg text-center text-sm text-[#8b91a3]">
            Content completion is not competency. A topic only counts toward
            readiness once you&apos;ve proven it — in a quiz, in code, or in
            an interview.
          </p>
        </div>
      </section>
    </div>
  );
}
