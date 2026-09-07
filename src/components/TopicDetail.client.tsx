"use client";

import type { TopicContent } from "@/lib/topics";
import { masteryLabel, masteryColor } from "@/lib/mastery";
import { useLiveStore } from "@/lib/use-live-store";
import TopicMasterySection from "@/components/TopicMasterySection";

export default function TopicDetail({ topic }: { topic: TopicContent }) {
  const store = useLiveStore();
  const mastery = store.topicMastery[topic.slug] ?? "L0";

  return (
    <>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-display text-2xl font-semibold">{topic.name}</h1>
        <span
          className={`rounded-full border px-3 py-1 font-mono-data text-xs ${masteryColor[mastery]}`}
        >
          {mastery} · {masteryLabel[mastery]}
        </span>
      </div>

      <div className="mt-8 space-y-10">
        <Section n="1" title="Quick revision">
          <p>{topic.quickRevision}</p>
        </Section>

        <Section n="2" title="Core concepts">
          <ul className="list-disc space-y-2 pl-5">
            {topic.coreConcepts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section n="3" title="Mathematical intuition">
          <p>{topic.mathIntuition}</p>
        </Section>

        <Section n="4" title="Example">
          <p>{topic.example}</p>
        </Section>

        <Section n="5" title="Implementation">
          <pre className="overflow-x-auto rounded-lg border border-[#262b38] bg-[#0f121a] p-4 font-mono-data text-xs leading-relaxed text-[#c9cede]">
            {topic.implementation.code}
          </pre>
        </Section>

        <Section n="6" title="Common mistakes">
          <ul className="list-disc space-y-2 pl-5">
            {topic.commonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section n="7" title="Interview questions">
          <ul className="space-y-2">
            {topic.interviewQuestions.map((q) => (
              <li key={q} className="rounded-lg border border-[#262b38] bg-[#0f121a] px-4 py-3 text-sm">
                {q}
              </li>
            ))}
          </ul>
        </Section>

        <Section n="8" title="Scenario question">
          <div className="rounded-lg border border-[#e8a33d]/30 bg-[#e8a33d]/5 px-4 py-3 text-sm">
            {topic.scenarioQuestion}
          </div>
          <p className="mt-2 text-xs text-[#8b91a3]">
            Try answering out loud or in writing before checking the interview questions above for
            comparison — that&apos;s the &quot;explain it yourself&quot; step.
          </p>
        </Section>

        <Section n="9" title="Mastery test">
          <TopicMasterySection slug={topic.slug} topicName={topic.name} quizArea={topic.quizArea} />
        </Section>
      </div>
    </>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-baseline gap-2 font-display text-lg font-semibold">
        <span className="font-mono-data text-sm text-[#8b91a3]">{n}</span>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-[#c9cede]">{children}</div>
    </section>
  );
}
