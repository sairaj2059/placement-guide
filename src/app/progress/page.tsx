import ProgressBar from "@/components/ProgressBar";
import { readinessBreakdown, student } from "@/lib/mock-data";

export default function Progress() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:px-10">
      <h1 className="font-display text-2xl font-semibold">Progress</h1>
      <p className="mt-1 text-sm text-[#8b91a3]">
        {student.streak}-day streak · Week {student.week} of {student.totalWeeks}
      </p>

      <div className="mt-8 rounded-xl border border-[#262b38] bg-[#151822] p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#8b91a3]">
              <th className="pb-3 font-normal">Area</th>
              <th className="pb-3 font-normal">Score</th>
              <th className="pb-3 font-normal">Trend</th>
            </tr>
          </thead>
          <tbody>
            {readinessBreakdown.map((r) => (
              <tr key={r.area} className="border-t border-[#1f2330]">
                <td className="py-3 pr-4">{r.area}</td>
                <td className="w-40 py-3 pr-4">
                  <ProgressBar value={r.score} />
                </td>
                <td className="py-3 font-mono-data text-[#8b91a3]">
                  {r.score}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
