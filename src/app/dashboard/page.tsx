import ProgressBar from "@/components/ProgressBar";
import {
  student,
  readinessBreakdown,
  weakestAreas,
  todayPlan,
} from "@/lib/mock-data";

function readinessLevel(score: number) {
  if (score <= 30) return "Foundation needed";
  if (score <= 50) return "Developing";
  if (score <= 70) return "Interview preparation";
  if (score <= 85) return "Interview ready";
  return "Placement ready";
}

export default function Dashboard() {
  const totalMinutes = todayPlan.reduce((sum, t) => sum + t.minutes, 0);
  const doneMinutes = todayPlan
    .filter((t) => t.done)
    .reduce((sum, t) => sum + t.minutes, 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono-data text-xs text-[#8b91a3]">
            DAY {student.day} / {student.totalDays} · WEEK {student.week} of{" "}
            {student.totalWeeks}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold">
            Good to see you, {student.name}
          </h1>
        </div>
        <div className="rounded-xl border border-[#262b38] bg-[#151822] px-5 py-3">
          <p className="text-xs text-[#8b91a3]">Overall readiness</p>
          <p className="font-display text-2xl font-semibold text-[#e8a33d]">
            {student.overallReadiness}%
          </p>
          <p className="text-xs text-[#8b91a3]">
            {readinessLevel(student.overallReadiness)}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Today's plan */}
        <div className="lg:col-span-2 rounded-xl border border-[#262b38] bg-[#151822] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Today&apos;s plan</h2>
            <span className="font-mono-data text-xs text-[#8b91a3]">
              {doneMinutes}m / {totalMinutes}m
            </span>
          </div>
          <ul className="mt-4 divide-y divide-[#1f2330]">
            {todayPlan.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                    item.done
                      ? "border-[#3ddc97] bg-[#3ddc97]/15 text-[#3ddc97]"
                      : "border-[#3a4054] text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span
                  className={`flex-1 text-sm ${
                    item.done ? "text-[#8b91a3] line-through" : "text-[#e7e9ee]"
                  }`}
                >
                  {item.task}
                </span>
                <span className="font-mono-data text-xs text-[#8b91a3]">
                  {item.minutes}m
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weakest areas */}
        <div className="rounded-xl border border-[#262b38] bg-[#151822] p-6">
          <h2 className="font-display text-lg font-semibold">
            Weakest areas right now
          </h2>
          <ul className="mt-4 space-y-4">
            {weakestAreas.map((w) => (
              <li key={w.topic}>
                <p className="text-sm font-medium">{w.topic}</p>
                <p className="mt-0.5 text-xs text-[#8b91a3]">{w.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Readiness breakdown */}
      <div className="mt-6 rounded-xl border border-[#262b38] bg-[#151822] p-6">
        <h2 className="font-display text-lg font-semibold">
          Readiness by area
        </h2>
        <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {readinessBreakdown.map((r) => (
            <div key={r.area}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span>{r.area}</span>
                <span className="font-mono-data text-[#8b91a3]">
                  {r.score}%
                </span>
              </div>
              <ProgressBar
                value={r.score}
                colorClass={
                  r.score < 50
                    ? "bg-[#e8617a]"
                    : r.score < 70
                    ? "bg-[#e8a33d]"
                    : "bg-[#3ddc97]"
                }
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-[#8b91a3]">
        Readiness is an estimate based on platform performance, not a
        guarantee of employment.
      </p>
    </div>
  );
}
