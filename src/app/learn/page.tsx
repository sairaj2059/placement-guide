"use client";

import Link from "next/link";
import { topics } from "@/lib/topics";
import { masteryLabel, masteryColor } from "@/lib/mastery";
import { useLiveStore } from "@/lib/use-live-store";
import type { Mastery } from "@/lib/store";

const categories = Array.from(new Set(topics.map((t) => t.category)));

export default function LearnHub() {
  const store = useLiveStore();
  const onboarded = !!store.profile?.onboarded;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <h1 className="font-display text-2xl font-semibold">Learn</h1>
      <p className="mt-1 text-sm text-[#8b91a3]">
        Every topic follows the same arc: revise, understand, implement, defend, test. Mastery is
        earned through the test at the end of each topic, not by marking it read.
      </p>

      {!onboarded && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e8a33d]/30 bg-[#e8a33d]/5 px-5 py-4">
          <p className="text-sm">
            You haven&apos;t taken the diagnostic yet — mastery levels below start at zero until you do.
          </p>
          <Link
            href="/onboarding"
            className="shrink-0 rounded-lg bg-[#e8a33d] px-4 py-2 text-xs font-medium text-[#0d0f14]"
          >
            Take diagnostic
          </Link>
        </div>
      )}

      {categories.map((category) => (
        <div key={category} className="mt-8">
          <h2 className="mb-3 font-mono-data text-xs uppercase tracking-wide text-[#8b91a3]">
            {category}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics
              .filter((t) => t.category === category)
              .map((t) => {
                const m = (store.topicMastery[t.slug] as Mastery) ?? "L0";
                return (
                  <Link
                    key={t.slug}
                    href={`/learn/${t.slug}`}
                    className="rounded-xl border border-[#262b38] bg-[#151822] p-4 transition-colors hover:border-[#3a4054]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{t.name}</p>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 font-mono-data text-[10px] ${masteryColor[m]}`}
                      >
                        {m}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[#8b91a3]">
                      {masteryLabel[m]} · {t.importance} priority
                      {t.quizArea === null && " · quiz coming next push"}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
